import axios from 'axios';
import React, { useState,useEffect } from 'react';
import BookItem from './bookItem';
import Input from './common/input';
import SelectMultiple from './common/multiSelect';
import Select from './common/selectInput';
import Pagination from './pagination';
import '../CSS/common.css';
import '../CSS/modl.css';
import sortByValues from '../Common/getSortValues';
import filterByValues from '../Common/getFilterValues';
import Modal from './common/modal';

const AllBooks = (props) => {

    
    const [books,setBooks] = useState([]);
    const [pages,setPages] = useState({});
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(0);
    const [searchQuery,setSearchQuery] = useState('');
    const [sortQuery,setSortQuery] = useState('');
    const [orderQuery,setOrderQuery] = useState('');
    const [showModal,setShowModal] = useState(false);
    const [editBook,setEditBook] = useState({});
    const [deleteBook,setDeleteBook] = useState({});
    const queryMap = new Map([
        ['order',orderQuery],
        ['sort',sortQuery],
        ['search',searchQuery]
    ])

    useEffect( async() => {
        const userBooks = await axios.get("http://localhost:5000/api/books",{
            withCredentials : true
        });
        setBooks(userBooks.data.book['0'].book);
        setPages(userBooks.data.pagination);
        setCurrentPage(userBooks.data.pagination['next'].page - 1);
        setTotalPage(parseInt(userBooks.data.pagination['next'].total / userBooks.data.pagination['next'].limit) + 1);
        //eslint-disable-next-line
    },[])

    const pageChange = async (newPage) => {
        if(newPage != currentPage){
            const userBooks = await axios.get(`http://localhost:5000/api/books?page=${newPage}`,{
            withCredentials : true
            });
            setBooks(userBooks.data.book['0'].book);
            setPages(userBooks.data.pagination);
            setCurrentPage(newPage);
            if(userBooks.data.pagination['next']){
                setCurrentPage(userBooks.data.pagination['next'].page - 1);
                setTotalPage(parseInt(userBooks.data.pagination['next'].total / userBooks.data.pagination['next'].limit) + 1);
            }else{
                setCurrentPage(userBooks.data.pagination['prev'].page + 1);
                setTotalPage(parseInt(userBooks.data.pagination['prev'].total / userBooks.data.pagination['prev'].limit) + 1);
            }
        }
    }

    const onButtonClick = async(e,book) =>{
        e.preventDefault();
        console.log(e.target.name,book);
        const booksInDisplay = [...books]
        switch(e.target.name){
            case "Edit" :
                setEditBook(book);
                setShowModal(true);
                break;
            case "Delete":
                setDeleteBook(book);
                const indexForDelete = books.findIndex(
                    (book) => book._id == book._id
                )
                booksInDisplay.splice(indexForDelete,1)
                const bookDeleted = await axios.delete(`http://localhost:5000/api/books/${book._id}`,{
                    withCredentials : true
                });
                console.log(bookDeleted);
                setBooks(booksInDisplay)
                setEditBook({});
                setDeleteBook({});
                setShowModal(false);
                const userBooks = await axios.get("http://localhost:5000/api/books",{
                    withCredentials : true
                });
                setBooks(userBooks.data.book['0'].book);
                setPages(userBooks.data.pagination);
                setCurrentPage(userBooks.data.pagination['next'].page - 1);
                setTotalPage(parseInt(userBooks.data.pagination['next'].total / userBooks.data.pagination['next'].limit) + 1);
                break;
            case "Cancel" :
                setEditBook({});
                setDeleteBook({});
                setShowModal(false);
                break;
            case "Submit" :
                console.log("On Submit",editBook)
                console.log(`http://localhost:5000/api/books/${editBook._id}`);
                const indexForEdit = books.findIndex(
                    (book) => book._id == editBook._id
                )
                booksInDisplay[indexForEdit] = editBook
                const bookEdited = await axios.put(`http://localhost:5000/api/books/${editBook._id}`,editBook,{
                    withCredentials : true
                });
                console.log(bookEdited);
                setBooks(booksInDisplay)
                setEditBook({});
                setDeleteBook({});
                setShowModal(false);
                break;
            case "Close" :
                setEditBook({});
                setDeleteBook({});
                setShowModal(false);
                break;
        }
    }

    const onEditFormInputChange = (e) =>{
        console.log(editBook);
        console.log("EDIT FORM VALUE",e.target.name,e.target.value);
        const editBookClone = { ...editBook}
        editBookClone[e.target.name] = e.target.value
        setEditBook(editBookClone);
    }

    const onInputChange = async(e) =>{
        for(let [key,value] of queryMap){
            console.log(key,value);
        }
        let queryString =`?`;
        let orderString = `order=${orderQuery}`
        let sortString = `sort=${sortQuery}`
        let searchString = `search=${searchQuery}`
        const seperatorString = "&&"
        switch(e.target.name){
            case "Sort Book By" :
                setOrderQuery(sortByValues.find(obj => obj.label == e.target.value).valuesForSort.order)
                setSortQuery(sortByValues.find(obj => obj.label == e.target.value).valuesForSort.sort)
                orderString = `order=${sortByValues.find(obj => obj.label == e.target.value).valuesForSort.order}`
                sortString = `sort=${sortByValues.find(obj => obj.label == e.target.value).valuesForSort.sort}`
                break;
            case "search":
                searchString =  `search=${e.target.value}`   
                setSearchQuery(e.target.value)
                break;
        }
        let additionalURL = `${queryString}${orderString}${seperatorString}${sortString}`
        if(searchString != `search=`){
            additionalURL +=`${seperatorString}${searchString}`
            const userBooks = await axios.get(`http://localhost:5000/api/books${additionalURL}`,{
            withCredentials : true
            });
            console.log("New Books",userBooks.data);
            if(userBooks.data == "No Books Found For The Query"){
                console.log("No Book Found")
                setBooks([])
                setPages({})
                setCurrentPage(0)
                setTotalPage(0)
            }else{
                console.log("New Books Found");
                setBooks(userBooks.data.book);
                setPages(userBooks.data.pagination);
                if(userBooks.data.pagination['next']){
                    setCurrentPage(userBooks.data.pagination['next'].page - 1);
                    setTotalPage(parseInt(userBooks.data.pagination['next'].total / userBooks.data.pagination['next'].limit) + 1);
                }else{
                    setCurrentPage(userBooks.data.pagination['prev'].page + 1);
                    setTotalPage(parseInt(userBooks.data.pagination['prev'].total / userBooks.data.pagination['prev'].limit) + 1);
                }
            }

        }else{
            const userBooks = await axios.get(`http://localhost:5000/api/books${additionalURL}`,{
                withCredentials : true
                });
                console.log("New Books",userBooks.data.book['0'].book);
                setBooks(userBooks.data.book['0'].book);
                setPages(userBooks.data.pagination);
                if(userBooks.data.pagination['next']){
                    setCurrentPage(userBooks.data.pagination['next'].page - 1);
                    setTotalPage(parseInt(userBooks.data.pagination['next'].total / userBooks.data.pagination['next'].limit) + 1);
                }else{
                    setCurrentPage(userBooks.data.pagination['prev'].page + 1);
                    setTotalPage(parseInt(userBooks.data.pagination['prev'].total / userBooks.data.pagination['prev'].limit) + 1);
                }
        }
        console.log(additionalURL);
        
    }

    return(
        <React.Fragment>
            <div className='filter'>
               <Input className="Item" type="search" name="search" onInputChange={onInputChange} placeholder="Search" onError={[]} purpose={"filterBook"}/>
               <Select passClassName="Item" onInputChange={onInputChange} values={sortByValues} name={"Sort Book By"} id="sort" purpose="Sort"/>
            </div>
           
            <div className='Items'>
            {
               books.length > 0 
               ?
               books.map(book => <BookItem bookToDisplay={book} key={book._id} buttonClick={onButtonClick}/>)
               :
               `No Book Found With Authors, Categories Or Title With ${searchQuery}`
            }
            </div>
            <div>
                {
                    showModal ? <Modal bookToEdit={editBook} onBtnClick={onButtonClick} onInputChange={onEditFormInputChange}/> : null
                }
            </div>
            <Pagination data={pages} onPageChange={pageChange} currentPageNumber={currentPage} totalPages={totalPage}/>
        </React.Fragment>
    )
}
 
export default AllBooks;

/*
<button type="button" className='btn-filter' onClick={ () => { showFilterDiv ? setShowFilterDiv(false) : setShowFilterDiv(true)}}>Filter Book</button>
 { showFilterDiv ? <SelectMultiple value={filterByValues} onInputChange={onInputChange} name={"Filter"} />   : null}
*/