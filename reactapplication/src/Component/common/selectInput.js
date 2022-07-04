import React, { Component, Fragment } from 'react';
import '../../CSS/form.css';

const SelectInput = (props) => {

    if(props.editPurpose == true){
        return (<div>
            <select name={props.name} id={props.id} onChange={props.onInputChange} defaultValue={(props.value) ? props.value : ""}>
            <option value="" disabled hidden>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</option>
                        {props.values.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                </select>
        </div>
        )
    }else if(props.purpose){
        return(
            <div>
                <select name={props.name} id={props.id} onChange={props.onInputChange} defaultValue={(props.value) ? props.value : ""} className={props.passClassName}>
                    <option value="" disabled hidden>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</option>
                        { 
                        props.values.map(option => (
                            <option key={option}>
                                {option.label}
                            </option>  
                        ))
                        }
                </select>
            </div>
        )
    }else{
        return (
            <Fragment>
                <select name={props.name} id={props.id} onChange={props.onInputChange} defaultValue={(props.value) ? props.value : ""}>
                    <option value="" disabled hidden>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</option>
                        {props.values.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                </select>
            </Fragment>
        );
    }
        
}
 
export default SelectInput;