import React, { Component,Fragment,useEffect,useState } from 'react';
import BookItem from './bookItem';

const Books = (props) => {


    if(props.booksToDisplay == null){
        return <h1>Ooops.... No Books Are There For You !!!</h1>
    }

    
    return (
        <div className='my-2'>
            <h1>Your Books</h1>
            {
               props.booksToDisplay.map((book)=>
                    <BookItem key={book._id} bookToDisplay={book}></BookItem>
                )
            }
        </div >
    )

}
 
export default Books;


/*bookToDisplay.forEach(element => {
                        <Book key={element.id} bookToDisplay={element} />
                    })*/