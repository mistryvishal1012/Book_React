import React, { Component } from 'react';
import '../../CSS/form.css'
import '../../CSS/common.css'

const Input = (props) => {

    const labelStyle = {
        textAlign : "center",
        margin : "auto 10px",
        fontSize : "20px"
    }

    if(props.onSubmit){
        return <input type={props.type} name={props.name} onClick={e => props.onSubmit(e)} placeholder={props.placeholder}></input>
    }else if(props.type == "date" && props.editPurpose){
        return ( <div className="home">
            <label style={labelStyle} htmlFor={props.name}>{props.label}</label>
            <input type={props.type} name={props.name} onChange={e => props.onInputChange(e)} placeholder={props.placeholder} defaultValue={props.value} onFocus={e => e.target.value=props.value}></input>
            </div>
            )
    }else if(props.forgotPassword){
        return (<React.Fragment>
                    <input type={props.type} name={props.name} onChange={e => props.onInputChange(e)} value={props.value} placeholder={props.placeholder}></input>
            </React.Fragment>)
    }else if(props.editPurpose){
        return ( <div className="home">
            <label style={labelStyle} htmlFor={props.name}>{props.label}</label>
            <input type={props.type} name={props.name} onChange={e => props.onInputChange(e)} placeholder={props.placeholder} onFocus={e => e.target.value=props.value[props.name]}></input>
            </div>
            )
    }else if(props.value){
        return ( 
                <React.Fragment>
                    {
                        console.log(props.value[props.name],"",props.resetField)
                    }
                    <label htmlFor={props.name}>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</label>
                    {
                        (props.resetField) ? 
                        <input type={props.type} name={props.name} onChange={e => props.onInputChange(e)} placeholder={props.placeholder} style={(props.onError.includes(props.name)) ? {borderColor : 'red'} : {}} defaultValue=""></input> :
                        <input type={props.type} name={props.name} onChange={e => props.onInputChange(e)} placeholder={props.placeholder} defaultValue={props.value[props.name]} onFocus={e => e.target.value=props.value[props.name]}></input>
                    }
                </React.Fragment>
                )
    }else if(props.changePassword){
        return ( 
                <React.Fragment>
                    <label htmlFor={props.name}>{props.placeholder}</label>
                    <input type={props.type} name={props.name} onChange={e => props.onInputChange(e)} placeholder={props.placeholder}></input>
                </React.Fragment>
                )
    }else if(props.purpose){
        return <input type={props.type} name={props.name} onKeyUp={e => props.onInputChange(e)} placeholder={props.placeholder} ></input>
    }else{
        return <input type={props.type} name={props.name} onChange={e => props.onInputChange(e)} placeholder={props.placeholder} style={(props.onError.includes(props.name)) ? {borderColor : 'red'} : {}}></input>
    }

}
 
export default Input;