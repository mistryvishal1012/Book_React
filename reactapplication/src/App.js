import RegisterForm from './Component/registerForm';
import LoginForm from './Component/loginForm';
import NavBar from './Component/navBar';
import Home from './Component/home';
import AllBooks from './Component/allBooks';
import ChangePassword from './Component/changePassword';
import ForgotPassword from './Component/forgotPassword';
import User from './Component/user';
import {BrowserRouter as Router , Navigate, Route , Routes , useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import React,{ useState,useEffect } from 'react';

const App = () => {

  const [userCookie,setCookie] = useState('');

  useEffect(()=>{
    const userCookieFromBrowser = Cookies.get('x-auth-token');
    userCookieFromBrowser ? setCookie(userCookieFromBrowser) : setCookie(null);
  })

  const changeCookie = (cookieToSet) => {
    setCookie(cookieToSet);
  }

  const logOutUser = () => {
    Cookies.remove('x-auth-token');
    setCookie(null);
    return ;
  }

    return (
      <React.Fragment>
      <Router>
          <NavBar className="m-3" cookie={userCookie} logoutUser={logOutUser}/>
          <Routes>
            <Route path="/" exact element={userCookie ? <Navigate to={`/home`}/> : <LoginForm cookie={userCookie} changeCookie={(cookie) => changeCookie(cookie)} />} />
            <Route path="/register" element={userCookie ? <Navigate to={`/home`} /> : <RegisterForm cookie={userCookie} changeCookie={(cookie) => changeCookie(cookie)}/>}></Route>
            <Route path="/login" element={userCookie ? <Navigate to={`/home`} /> : <LoginForm cookie={userCookie} changeCookie={(cookie) => changeCookie(cookie)}/>}></Route>
            <Route path="/home" element={userCookie ?  <Home cookie={userCookie} /> : <Navigate to={`/login`} cookie={userCookie} changeCookie={(cookie) => changeCookie(cookie)}/>}/>
            <Route path="/books" element={ userCookie ?  <AllBooks/> : <Navigate to={`/login`} cookie={userCookie} changeCookie={(cookie) => changeCookie(cookie)}/> }/>
            <Route path="/me" element={userCookie ? <User /> : <Navigate to={`/login`} cookie={userCookie} changeCookie={(cookie) => changeCookie(cookie)}/> }/>
            <Route path="/changePassword" element={userCookie ? <ChangePassword /> : <Navigate to={`/login`} cookie={userCookie} changeCookie={(cookie) => changeCookie(cookie)}/> }/>
            <Route path="/forgotPassword" element={<ForgotPassword />}/>
          </Routes>
      </Router>
    </React.Fragment>
      );
}
 
export default App;

/*
<Route path="/auth" element={this.state.token ? <Navigate to="/competition" /> : AuthPage}
*/

/*
<Route path="/auth" element={this.state.token ? <Navigate to="/competition" /> : AuthPage}
*/