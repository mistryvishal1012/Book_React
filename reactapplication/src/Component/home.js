import React, { useEffect,useState } from 'react';
import BookForm from './bookForm';
import Books from './books'
import '../CSS/common.css'
import axios from 'axios';
import BookItem from './bookItem';
import BookChart from './bookChart';
import {BrowserRouter as Router , Navigate, Route , Routes , useNavigate } from 'react-router-dom';


const Home = () =>{ 

    const [categoryOfBook,setBookByCategory] = useState({});
    const [learningStageOfBook,setBookByLearningStage] = useState({});
    const [categoryOfBookTable,setBookByCategoryTable] = useState([]);
    const [learningStageOfBookTable,setBookByLearningStageTable] = useState([]);

    useEffect(async ()=>{
        let booksToInsert = await axios.get("http://localhost:5000/api/books/home",{
            withCredentials : true
        });
        let category = [],learningStage = [], categoryTable =[] , learningStageTable = [];
        for(var i in booksToInsert.data['category']){
            let bookObject = { name:i , value: booksToInsert.data['category'][i] }
            let tableObject = [bookObject]
            category.push(bookObject);
            categoryTable.push(tableObject);
        }
        for(var i in booksToInsert.data['learningStage']){
            let bookObject = { name:i , value: booksToInsert.data['learningStage'][i] }
            learningStage.push(bookObject);
            let tableObject = [bookObject]
            learningStageTable.push(tableObject);
        }
        setBookByCategory(category);
        setBookByLearningStage(learningStage);
        setBookByCategoryTable(categoryTable);
        setBookByLearningStageTable(learningStageTable);
        console.log(category,learningStage,categoryTable,learningStageTable);
       //eslint-disable-next-line
    },[]);

    return (
        <div className="home">
                <div>
                    <BookForm />
                </div>
                <div>
                    <BookChart data={categoryOfBook} tableData={[categoryOfBookTable]} name={"Category"}/>
                    <BookChart data={learningStageOfBook} tableData={[learningStageOfBookTable]} name={"Learning Stage"}/>
                </div>
            </div>
    )
}
 
export default Home;