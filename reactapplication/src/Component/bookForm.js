import React, { Component, useState } from 'react';
import '../CSS/form.css';
import TextArea from './common/textarea';
import Input from './common/input';
import SelectInput from './common/selectInput';
import bookSchema from '../Model/book';
import axios from 'axios';

const BookForm = () => {

    const [books,setBooks] = useState({
       'title' : '', 
       'isbn' : '', 
       'pageCount' : '', 
       'publishedDate' : '', 
       'thumbnailUrl' : '', 
       'shortdescription' : '',
       'longdescription' : '',
       'status' : '', 
       'authors' : '',
       'categories' : '',
       'learningStage' : '',
       'pagesCompleted' : ''
    })

    const [error,setError] = useState([]);

    const updateState = (targetName,targetValue) => {
        let updateError = [];
        books[targetName] =  targetValue;
        setBooks(books);
        if(error.length > 0){
            if(error.includes(targetName)){
                let errorInput = [ error ];
                updateError = errorInput.filter((element) => {
                    if(element != targetName){
                        return true
                    }
                    return false;
                });
            }
        }
        setError(updateError);
    }

   const onInputChange = (e) => {
        updateState(e.target.name,e.target.value);
    }; 

    const updateErrorState = (inputErrors) =>{
        setError(inputErrors);
    }

    const onInputSubmit = async (e) => {
        e.preventDefault();
        const result = bookSchema.validate(books,{abortEarly : false});
        const { error } = result;
        if(error){
            const error = result.error.details;
            let inputErors = [];
            error.forEach( input => {
                inputErors.push(input.context.key);
            })
            updateErrorState( inputErors);
        }else{
            let book;
            try {
                book = await axios.post('http://localhost:5000/api/books',books,{
                    withCredentials : true    
                });
                console.log(result)
            } catch (error) {
                result = error.response
                console.log(result)
            }
            switch(book.status){
                case 200 : 
                    break;
                case 500 :
                    break
            }
        }
    };


    return(
        <React.Fragment>
            <div className="form-style-6">
                <form>
                    <Input type="text" name="title" onInputChange={onInputChange} placeholder="Enter Title Of Book" onError={error} />
                    <Input type="text" name="authors" onInputChange={onInputChange} placeholder="Enter Author Of Book" onError={error}/>
                    <Input type="text" name="isbn" onInputChange={onInputChange} placeholder="Enter ISBN Number Of Book" onError={error}/>
                    <Input type="number" name="pageCount" onInputChange={onInputChange} placeholder="Enter Page Count Of Book" onError={error}/>
                    <TextArea type="text" name="shortdescription" onInputChange={onInputChange} placeholder="Enter Short Description Of Book" onError={error}/>
                    <TextArea type="text" name="longdescription" onInputChange={onInputChange} placeholder="Enter Long Description Of Book" onError={error}/>
                    <Input type="date" name="publishedDate" onInputChange={onInputChange} placeholder="Enter Published Date Of Book" onError={error}/>
                    <Input type="url" name="thumbnailUrl" onInputChange={onInputChange} placeholder="Enter Thumbnail Url Of Book" onError={error}/>
                    <Input type="text" name="categories" onInputChange={onInputChange} placeholder="Enter Categories Of Book" onError={error}/>
                    <SelectInput name="status" id="status" values={['Publish','Unpublish']} onInputChange={onInputChange}/>
                    <SelectInput name="learningStage" id="learningStage" values={['Not Started','Started','Partially Completed','Completed']} onInputChange={onInputChange}/>
                    <Input type="number" name="pagesCompleted" onInputChange={onInputChange} placeholder="Enter Pages Completed Of Book" onError={error}/>
                    <Input type="submit" value="Submit" onSubmit={onInputSubmit}/>
                </form>
            </div>
        </React.Fragment>
    );

}
 
export default BookForm;