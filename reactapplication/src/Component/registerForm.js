import React, { useState } from 'react';
import '../CSS/form.css';
import '../CSS/common.css';
import userSchema  from '../Model/user';
import Input from './common/input';
import TextArea from './common/textarea';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const RegisterForm = (props) => { 

    const [user,setUser] = useState({
        'name' : '',
        'email' : '',
        'password' : '',
        'forgotPasswordQuestion' : '',
        'forgotPasswordAnswer' : ''
    });

    const [error,setError] = useState([]);
    const [showError,setShowError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

    const navigate = useNavigate();

    const updateState = (targetName,targetValue) => {
            let updateError = [];
            user[targetName] =  targetValue;
            if(error.length > 0){
                if(error.includes(targetName)){
                    let errorInput = [ error];
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
        if(showError === true){
            setShowError(false)
            setErrorMessage('')
        }
        updateState(e.target.name,e.target.value);
    }; 

    const updateErrorState = (inputErrors) =>{
        setError(inputErrors);
    }

    const onInputSubmit = async (e) => {
        console.log("Submitted");
        e.preventDefault();
        const result = userSchema.validate(user,{ abortEarly : false });
        const { error } = result;
        if(error){
            const error = result.error.details;
            let inputErors = [];
            error.forEach( input => {
                inputErors.push(input.context.key);
            })
            updateErrorState(inputErors);
        }else{
            let result;
           let userCookie;
            try {
                result = await axios.post('http://localhost:5000/api/users/register',user);
                console.log(result)
            } catch (error) {
                result = error.response
                console.log(result)
            }
            switch(result.status){
                case 200 :
                        console.log(result)
                        navigate(`/login`); 
                    break;
                 case 401 :
                     if(result.data.message === "User Already Exists"){
                         setErrorMessage(result.data.message)
                         setShowError(true)
                     }else{
                         let inputError = []
                         inputError.push('password')
                         updateErrorState(inputError)
                     }
                     break;
                 case 500 : 
                    setErrorMessage(result.data.message)
                    setShowError(true)
                    break;
            }
        }
    };

    return (
        <React.Fragment>
                <div className="form-style-6">
                    <form>
                        <Input  type="text" name="name" onInputChange={onInputChange} placeholder="Your Name" onError={error} />
                        <Input  type="email" name="email" onInputChange={onInputChange} placeholder="Email Address" onError={error} />
                        <Input  type="password" name="password" onInputChange={onInputChange} placeholder="Password" onError={error} />
                        <TextArea  name="forgotPasswordQuestion" onInputChange={onInputChange} placeholder="Enter Forgot Password Question" onError={error} />
                        <TextArea  name="forgotPasswordAnswer" onInputChange={onInputChange} placeholder="Enter Forgot Password Answer"  onError={error} />
                        <Input type="submit" value="Submit" onSubmit={onInputSubmit}/>
                    </form>
                </div>
                <div className='error'>
                            {
                                (showError) ? <h1>{errorMessage}</h1> : null
                            }
                </div>
        </React.Fragment>
    );

}
 
export default RegisterForm;