import React from "react";
import '../CSS/userItem.css';

const Pagination = (props) => {

    const paginationButton = [
        {name:'First',value : 1},
        {name:'Prev',value:props.currentPageNumber - 1},
        {name:'Current Page',value:props.currentPageNumber},
        {name:'Next',value: props.currentPageNumber + 1},
        {name :'Last',value: props.totalPages}
    ];

    return (
        <div className="pagination">
            {
                (props.totalPages <= 10) 
                ?
                Array.from(Array(props.totalPages),(_,index) => index + 1).map(pages => <button onClick={ e => props.onPageChange(e.target.name)} className={'p'} name={pages}>{pages}</button>) 
                :
                paginationButton.map(pages => <button onClick={props.onPageChange} className={'p'} name={pages.name}>{pages.value}</button>)
            }
        </div>
    );
}
 
export default Pagination;