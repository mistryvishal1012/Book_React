import Input from "./common/input";
import React,{ useState, useEffect } from 'react';
import axios from "axios";


const ForgotPassword = (props) => {

    const [user,setUser] = useState({
        'name' : '',
        'email' : ''
    })

    const [forgotToken,setToken] = useState('')

    const [currentState,setCurrentState] = useState('forgotPassword')

    const [securityQuestion,setSecurityQuestion] = useState({
        'Question' : '',
        'Answer' : '',
        "newPassword" : ""
    });

    const [passwordData,setPasswordData] = useState({
        'Answer' : '',
        'newPassword' : ''
    })



    const onInputSubmit = async(e) => {
        console.log("Input Submit")
        e.preventDefault();
        switch(currentState){
            case 'forgotPassword' : 
             console.log("Forgot Password");
             let forgotPassword = await axios.post(`http://localhost:5000/api/users/forgotpassword`,user)
             console.log(forgotPassword.data);
             setToken(forgotPassword.data);
             let securityQA = await axios.get(`http://localhost:5000/api/users/passwordRecovery/${forgotPassword.data}`)
             console.log(securityQA.data);
             let changePasswordData = { ...securityQA.data,"newPassword":""}
             setSecurityQuestion(changePasswordData);
             setCurrentState('securityQuestion')
             break;
            case 'securityQuestion' : 
             console.log("Security Question");
             console.log(forgotToken)
             console.log(passwordData);
             let securityQueAns = await axios.post(`http://localhost:5000/api/users/passwordRecovery/${forgotToken}`,passwordData)
             console.log(securityQueAns.data);
             break; 
        }
        console.log("End");
    } 

    const onInputChange = async(e) => {
       switch(currentState){
           case 'forgotPassword' : 
            let currentUser = { ...user}
            currentUser[e.target.name] = e.target.value
            setUser(currentUser)
            console.log(user);  
            break;
           case 'securityQuestion' : 
           console.log("Security Question"); 
           let securtiyAnswer = { ...passwordData};
           securtiyAnswer[e.target.name] = e.target.value
           console.log(securtiyAnswer);
           setPasswordData(securtiyAnswer)
           break; 
       }
    } 

    return ( 
        <React.Fragment>
                   {
                       (currentState == 'forgotPassword') &&  
                       (<React.Fragment>
                           <div className="form-style-6">
                                <form>
                                    <Input type="text" name="name" onInputChange={onInputChange} placeholder="Name" onError={[]} />
                                    <Input type="email" name="email" onInputChange={onInputChange} placeholder="Email Address" onError={[]} />
                                    <Input type="submit" value="Submit" onSubmit={onInputSubmit}/>
                                </form>
                            </div>
                        </React.Fragment>
                        )
                   }
                   {
                       (currentState == 'securityQuestion') &&  
                       (<React.Fragment>
                           <div className="form-style-6">
                                <form>
                                    <Input type="text" name="Question" onInputChange={onInputChange} placeholder="Name" value={securityQuestion.Question} onError={[]} forgotPassword={true}/>
                                    <Input type="text" name="Answer" onInputChange={onInputChange} placeholder="Enter Your Answer" onError={[]} />
                                    <Input type="password" name="newPassword" onInputChange={onInputChange} placeholder="Enter New Password" onError={[]}/>
                                    <Input type="submit" value="Submit" onSubmit={onInputSubmit}/>
                                </form>
                            </div>
                        </React.Fragment>
                        )
                   }
            </React.Fragment>
    );
}
 
export default ForgotPassword;