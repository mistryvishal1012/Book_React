import React, { Fragment,useState,useEffect } from 'react';
import '../CSS/navBar.css';
import  { Link,useNavigate }  from 'react-router-dom';

const NavBar = (props) => {

    const navigate = useNavigate();
    const [currentActiveLink,setCurrentActiveLink] = useState('home');

    useEffect(async () =>{
        if(props.cookie){
            setCurrentActiveLink('home')
        }
    },[])

    const linkClicked = (e) =>{
        setCurrentActiveLink(e.target.name);
    }

        if(props.cookie != null){
            return(
                <Fragment>
                     <ul>
                         <li><Link to='/home' name="home" onClick={ e =>  linkClicked(e) } className={ currentActiveLink == "home" ? "active" : "" }>Home</Link></li>
                         <li><Link to='/books' name="books" onClick={ e =>  linkClicked(e) } className={ currentActiveLink == "books" ? "active" : "" }>Books</Link></li>
                         <li><Link to='/me' name="me" onClick={ e =>  linkClicked(e) } className={ currentActiveLink == "me" ? "active" : "" }>Account</Link></li>
                         <li><Link to='/changePassword' name="changePassword" onClick={ e =>  linkClicked(e) } className={ currentActiveLink == "changePassword" ? "active" : "" }>Change Password</Link></li>
                         <li><Link to='/service' name="service" onClick={ e =>  linkClicked(e) } className={ currentActiveLink == "service" ? "active" : "" }>Service</Link></li>
                         <li><button className="link" style={{border : '0px'}} onClick={props.logoutUser}>Logout</button></li>
                     </ul>
                 </Fragment>
                )
        }else{
            return(
                <Fragment>
                     <ul>
                         <li><Link to='/register' name="register" onClick={ e =>  linkClicked(e) } className={ currentActiveLink == "register" ? "active" : "" }>Register</Link></li>
                         <li><Link to='/login' name="login" onClick={ e =>  linkClicked(e) } className={ currentActiveLink == "login" ? "active" : "" }>Login</Link></li>
                         <li><Link to='/forgotPassword' name="forgotPassword" onClick={ e =>  linkClicked(e) } className={ currentActiveLink == "forgotPassword" ? "active" : "" }>Forgot Password</Link></li>
                     </ul>
                 </Fragment>
                )
        }
}
 
export default NavBar;