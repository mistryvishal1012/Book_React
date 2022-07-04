import React, { Component } from 'react';
import '../CSS/userItem.css';
import '../CSS/common.css'
import getClassName from '../Common/getClassName';

const BookItem = (props) => {


    const getClassName = (learningStage,className) =>{
        switch(learningStage){
            case "Not Started":
                return className += " border-danger"
                break;
            case "Started":
                return className += " border-dark"
                break;
            case "Partially Completed":
                return className += " border-primary"
                break;
            case "Fully Completed":
                return className += " border-danger"
                break;
        }
    }

    return (
            <div className={getClassName(props.bookToDisplay.learningStage,"card my-2")} style={{margin : '10px'}}>
                <h3 className="text-primary">
                    {props.bookToDisplay.title}
                </h3>
                <div style={{padding : '15px'}}>
                    <h5 className="text-secondary">
                        Authors : {props.bookToDisplay.authors}
                    </h5>
                </div>
                <div style={{padding : '15px'}}>
                    <h5 className="text-secondary">
                        Categories : {props.bookToDisplay.categories}
                    </h5>
                </div>
                <div className='home' style={{padding : '15px'}}>
                    <h5 className="text-secondary">
                        ISBN : {props.bookToDisplay.isbn}
                    </h5>
                    <h5 className="text-secondary">
                        Page Count : {props.bookToDisplay.pageCount}
                    </h5>
                </div>
                <div className='home' style={{padding : '15px'}}>
                    <progress value={`${props.bookToDisplay.pagesCompleted}`} max={`${props.bookToDisplay.pageCount}`}>{props.bookToDisplay.pageCompleted}</progress>
                    <h5>{`${props.bookToDisplay.pagesCompleted}/${props.bookToDisplay.pageCount}`}</h5>
                </div>
                <div className='home' style={{padding : '15px'}}>
                    <h5>
                        Stage : {props.bookToDisplay.learningStage}
                    </h5>
                </div>
                <div className='home' style={{padding : '15px'}}>
                    <button type="button" className='btn-filter' name="Edit" onClick={ (e) => props.buttonClick(e,props.bookToDisplay)}>Edit Book</button>
                    <button type="button" className='btn-filter' name="Delete" onClick={ (e) => props.buttonClick(e,props.bookToDisplay)}>Delete Book</button>
                </div>
            </div>
        );
}
 
export default BookItem;