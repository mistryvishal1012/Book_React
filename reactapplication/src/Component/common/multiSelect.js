import React from "react";

const SelectMultiple = (props) => {

      return (
        <div>
          {
            props.value.map( select => <React.Fragment>
              <label htmlFor={select.label}>{select.label}</label>
              <input type={"checkbox"} name={"select"} value={select.value} onChange={props.onInputChange} key={select.label}/>
            </React.Fragment>)
          }
        </div>
      );
}
 
export default SelectMultiple;