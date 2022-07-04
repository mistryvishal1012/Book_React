import React, { Component } from 'react';

const TextArea = (props) => {

    const labelStyle = {
        textAlign : "center",
        margin : "auto 10px",
        fontSize : "20px"
    }
    
    const onChange = e => {
        console.log("Input Function");
        props.onInputChange(e);
    }

        if(props.editPurpose){
            return (
            <div className="home">
                <label style={labelStyle} htmlFor={props.name}>{props.label}</label>
                <textarea type={props.type} name={props.name} onChange={e => onChange(e)} placeholder={(props.placeholder == undefined) ? "" : props.placeholder} onFocus={e => e.target.value=((props.value[props.name] == undefined ? "" : props.value[props.name]))} style={(props.onError.includes(props.name)) ? {borderColor : 'red'} : {}}></textarea>
            </div>
            )
        }else if(props.value){
            console.log(props);
            return  (
            <React.Fragment>
            <label htmlFor={props.name}>{props.title}</label>
            <textarea type={props.type} name={props.name} onChange={e => onChange(e)} placeholder={props.placeholder} onFocus={e => e.target.value=props.value[props.name]} style={(props.onError.includes(props.name)) ? {borderColor : 'red'} : {}}></textarea>
            </React.Fragment>
            )
        }else{
            return <textarea type={props.type} name={props.name} onChange={e => onChange(e)} placeholder={props.placeholder} style={(props.onError.includes(props.name)) ? {borderColor : 'red'} : {}}></textarea>
        }
}
 
export default TextArea;