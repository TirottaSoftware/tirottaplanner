import './App.css';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Burger from './components/Burger';
import DeletedTasks from './pages/Trash';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Sidebar from './components/Sidebar';
import tpLogo from './TP_logo.png';
import { useState, useEffect, useLayoutEffect } from 'react';

function App() {
  const [translated, setTranslated] = useState(true);
  const [authState, setAuthState] = useState({loggedUser: {}, loggedIn: false})
  const [formErrorMessage, setFormErrorMessage] = useState('');

  useLayoutEffect(() => {
    updateAuth();
  }, [])

  const updateAuth = () => {
    if(localStorage.getItem('accessToken')){
     axios.get('https://tirottaplanner.herokuapp.com/auth', {
        headers: {'accessToken': localStorage.getItem('accessToken')}
      })
      .then(res => {
        if(res.data.error){
          localStorage.removeItem('accessToken');
        }
        else{
          setAuthState({loggedUser: {...res.data}, uid: res.data.uid, username: res.data.username, loggedIn: true});
        }
      })
    }
  }

  const handleBurgerClick = () => {
    setTranslated(!translated); 
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({...authState, loggedIn: false});
  }

  const login = (username, password) => {
    axios.post('https://tirottaplanner.herokuapp.com/auth/login', {username, password}).then(res => {
      if(res.data.error){
        setFormErrorMessage(res.data.error);
      }
      else{
        localStorage.setItem('accessToken', res.data);
        updateAuth();
      }
    })
  }

  const register = (username, password, email) => {
    axios.post('https://tirottaplanner.herokuapp.com/auth', {username, password, email}).then(res => {
      localStorage.setItem('accessToken', res.data.accessToken);
      updateAuth();
    })
    .catch(err => {
      setFormErrorMessage(err);
    })
  }

  const closeSidebar = () => {
    setTranslated(true);
  }

  const translateForm = () => {
    document.querySelector('.slider').classList.toggle('slider-translated');
    document.querySelector('.login-register').classList.toggle('form-translated');
  }

  return (
    <AuthContext.Provider value = {{authState, setAuthState}}>
      <div className = "App">
        {
          authState.loggedIn?
          <Router>
            <Burger handleBurgerClick = {handleBurgerClick} />
            <Sidebar logout = {logout} close = {closeSidebar} translated = {translated} />
              <div className = 'main'>
                <Switch>
                      <Route path = '/' exact component = {Home} />
                      <Route path = '/deleted' exact component = {DeletedTasks} />
                      <Route path = '/profile' exact component = {Profile} />
                </Switch> 
              </div>
          </Router>
          :
          <div className = 'auth-container'>
            <div className = 'auth-hero'>
              <div className = 'hero-text'>
                <h1>TODO. DONE. NEXT</h1>
                <p>Tirotta Planner gives you the ability to organise your daily tasks in a simple and aesthetic way.</p>
              </div>
            </div>
            <div className = 'auth-form-container'>
              <img src = {tpLogo} alt = 'tp-logo'/>
              <div className = 'auth-button-area'>
                <div className = 'slider'></div>
                <button onClick = {translateForm}>Login</button>
                <button onClick = {translateForm}>Register</button>
              </div>
              <div className = 'login-register' >
                <p className = 'error-msg'>{formErrorMessage}</p>
                <Login login = {login} />
                <Register register = {register} />
              </div>
            </div>
          </div>
        }
      </div>
    </AuthContext.Provider>
  );
}

export default App;
