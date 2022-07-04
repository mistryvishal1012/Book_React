import React, { useState } from 'react';
import '../CSS/form.css';
import '../CSS/common.css';
import userSchema  from '../Model/user';
import Input from './common/input';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate,useNavigate } from 'react-router-dom';

const LoginForm = (props) =>{

    const [user,setUser] = useState({
        'email' : '',
        'password' : ''
    });

    const [error,setError] = useState([]);

    const navigate = useNavigate();


    const updateState = (targetName,targetValue) => {
        let updateError = [];
        user[targetName] =  targetValue;
        setUser(user)
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
        setUser(user);
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
        const result = userSchema.validate(user);
        const { error } = result;
        if(error){
            const error = result.error.details;
            let inputErors = [];
            error.forEach( input => {
                inputErors.push(input.context.key);
            })
            updateErrorState( inputErors);
        }else{
            const result = await axios.post('http://localhost:5000/api/users/login',user,{withCredentials : true});
            let userCookie;
            if(result.status == 200){ 
                userCookie = Cookies.get('x-auth-token');
                if(userCookie){
                    props.changeCookie(userCookie);
                    navigate(`/home`); 
                }
            }
        }
    }; 
        return (
            <React.Fragment>
                    <div className="form-style-6">
                        <form>
                            <Input type="email" name="email" onInputChange={onInputChange} placeholder="Email Address" onError={error} />
                            <Input type="password" name="password" onInputChange={onInputChange} placeholder="Password" onError={error}/>
                            <Input type="submit" value="Submit" onSubmit={onInputSubmit}/>
                            </form>
                    </div>
            </React.Fragment>
        );
}
 
export default LoginForm;