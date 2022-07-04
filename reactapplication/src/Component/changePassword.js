import axios from 'axios';
import React, { useState,useEffect } from 'react';
import Input from './common/input';

const ChangePassword = () => {

    const [currentUser,setCurrentUser] = useState({
        'name' : '',
        'email' : '',
        'currentPassword' : '',
        'newPassword' : ''
    });

    const [passwordError,setPasswordError] = useState([]);

    useEffect( async () => {
        let user = await axios.get("http://localhost:5000/api/users/me",{
            withCredentials : true
        });
        console.log("From Change Password",user.data);
        setCurrentUser(user.data);
        //eslint-disable-next-line
    },[])

    const onInputChange = (e) => {
        const user ={ ...currentUser }
        user[e.target.name] = e.target.value
        setCurrentUser(user);
        console.log(user); 
    }

    const onInputSubmit = async (e) => {
        e.preventDefault();
        console.log(currentUser.currentPassword)
        console.log(currentUser.newPassword)
        const resultCurrentUser = ((currentUser['currentPassword'].length > 6) && (currentUser['currentPassword'].length <=9))  
        const resultNewUser = ((currentUser['newPassword'].length > 6) && (currentUser['newPassword'].length <=9))  
        if(resultCurrentUser && resultNewUser){
            let user = await axios.post("http://localhost:5000/api/users/changePassword",currentUser,{
            withCredentials : true
            });
            console.log("Password Changed",user);
        }else{
            
        }
    }

    return ( 
    <div>
        <h1 className="m-2" style={{textAlign : "center"}}>Change Password</h1>
        <div className="form-style-6">
                 <form>
                     <Input type="text" name="name" onInputChange={onInputChange} placeholder="Name" value={currentUser} onError={[]}/>
                     <Input type="email" name="email" onInputChange={onInputChange} placeholder="Email" value={currentUser} onError={[]}/>
                     <Input type="password" name="currentPassword" onInputChange={onInputChange} placeholder="Enter Your Current Password" onError={[]} changePassword={true}/>
                     <Input type="password" name="newPassword" onInputChange={onInputChange} placeholder="Enter Your New Password" onError={[]} changePassword={true}/>
                     <Input type="submit" value="Submit" onSubmit={onInputSubmit}/>
                 </form>
             </div> 
     </div>
     );
}
 
export default ChangePassword;