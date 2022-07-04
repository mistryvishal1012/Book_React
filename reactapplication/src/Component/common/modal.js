import React from "react";
import Input from "./input";
import TextArea from "./textarea";
import SelectInput from "./selectInput";
import '../../CSS/common.css';

const Modal = (props) => {


  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


  return (
      <div className="modal-container modal" style={{ border : "1px solid black" }}>
                <form>
                    <div className="home">
                      <Input type="text" name="title" label="Title :" onInputChange={props.onInputChange} placeholder={props.bookToEdit.title} onError={[]} value={props.bookToEdit} editPurpose={true}/>
                      <Input type="text" name="authors" label="Authors :" onInputChange={props.onInputChange} placeholder={props.bookToEdit.authors} onError={[]} value={props.bookToEdit} editPurpose={true}/>
                    </div>
                    <div className="home">
                      <Input type="text" name="isbn" label="ISBN :" onInputChange={props.onInputChange} placeholder={props.bookToEdit.isbn} onError={[]} value={props.bookToEdit} editPurpose={true}/>
                      <Input type="number" name="pageCount" label="Page Count :" onInputChange={props.onInputChange} placeholder={props.bookToEdit.pageCount} onError={[]} value={props.bookToEdit} editPurpose={true}/>
                    </div>
                    <div className="home">
                      <TextArea type="text" name="shortdescription" label="Short Description :" onInputChange={props.onInputChange} placeholder={props.bookToEdit.shortdescription} onError={[]} value={props.bookToEdit} editPurpose={true}/>
                      <TextArea type="text" name="longdescription" label="Long Description :" onInputChange={props.onInputChange} placeholder={props.bookToEdit.longdescription} onError={[]} value={props.bookToEdit} editPurpose={true}/>
                    </div>
                    <div className="home">
                      <Input type="date" name="publishedDate" label="Published Date :" onInputChange={props.onInputChange} placeholder={props.bookToEdit.publishedDate} onError={[]} value={formatDate(props.bookToEdit['publishedDate'])} editPurpose={true}/>
                      <Input type="url" name="thumbnailUrl" label="Thumbnail URL" onInputChange={props.onInputChange} placeholder={props.bookToEdit.thumbnailUrl} onError={[]} value={props.bookToEdit} editPurpose={true}/>
                    </div>
                    <div className="home">
                      <SelectInput name="status" id="status" values={['Publish','Unpublish']} onInputChange={props.onInputChange} value={props.bookToEdit.status} editPurpose={true}/>
                      <SelectInput name="learningStage" id="learningStage" values={['Not Started','Started','Partially Completed','Completed']} onInputChange={props.onInputChange} value={props.bookToEdit.learningStage} editPurpose={true}/>
                    </div>
                    <div className="home">
                      <Input type="text" label="Categories" name="categories" onInputChange={props.onInputChange} placeholder={props.bookToEdit.categories} onError={[]} value={props.bookToEdit} editPurpose={true}/>
                      <Input type="number" label="Pages Completed" name="pagesCompleted" onInputChange={props.onInputChange} placeholder={props.bookToEdit.pagesCompleted} onError={[]} value={props.bookToEdit} editPurpose={true}/>
                    </div>
                    <div class="Items">
                      <button className="btn-filter" name="Submit"  onClick={e => props.onBtnClick(e,props.bookToEdit)}>Submit</button>
                      <button className="btn-filter" name="Cancel"  onClick={e => props.onBtnClick(e,props.bookToEdit)}>Cancel</button>
                      <button className="btn-filter" name="Close"   onClick={e => props.onBtnClick(e,props.bookToEdit)}>Close</button>
                    </div>
                </form>
           </div>
  );
};

export default Modal;