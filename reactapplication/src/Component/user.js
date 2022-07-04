import axios from 'axios';
import React, { useState,useEffect } from 'react';
import Input from './common/input';
import TextArea from './common/textarea';

const User = () => {

    const [currentUser,setCurrentUser] = useState({
        'name' : '',
        'email' : '',
        'forgetPasswordQuestion' : '',
        'forgetPasswordAnswer' : ''
    });

    const [oldUser,setOldUser] = useState({
        'name' : '',
        'email' : '',
        'forgetPasswordQuestion' : '',
        'forgetPasswordAnswer' : ''
    });

    useEffect( async () => {
        let user = await axios.get("http://localhost:5000/api/users/me",{
            withCredentials : true
        });
        setOldUser(user.data);
        setCurrentUser(user.data);
        //eslint-disable-next-line
    },[])

    const updateState = (targetName,targetValue) => {
        currentUser[targetName] =  targetValue;
        setCurrentUser(currentUser);
    }

   const onInputChange = (e) => {
        updateState(e.target.name,e.target.value);
    }; 

    const onInputSubmit = async(e) =>{
        e.preventDefault();
        let user = await axios.post("http://localhost:5000/api/users/update",{
            'oldUser' : oldUser,
            'updateUser' : currentUser
        },{
            withCredentials : true
        });
        if(!user.data){
            setCurrentUser(oldUser);
        }else{
            setOldUser(currentUser);
        }
    }

    return ( 
        <div>
           <h1 className="m-2" style={{textAlign : "center"}}>Your Account</h1>
           <div className="form-style-6">
                    <form>
                        <Input type="text" name="name" onInputChange={onInputChange} placeholder={currentUser.name} value={currentUser} onError={[]}/>
                        <Input type="email" name="email" onInputChange={onInputChange} placeholder={currentUser.email} value={currentUser} onError={[]}/>
                        <TextArea name="forgetPasswordQuestion" title={"Forgot Password Question"} onInputChange={onInputChange} placeholder={currentUser.forgetPasswordQuestion} value={currentUser} onError={[]}/>
                        <TextArea name="forgetPasswordAnswer" title={"Forgot Password Answer"} onInputChange={onInputChange} placeholder={currentUser.forgetPasswordAnswer} value={currentUser} onError={[]}/>
                        <Input type="submit" value="Submit" onSubmit={onInputSubmit}/>
                    </form>
                </div> 
        </div>
     );
}
 
export default User