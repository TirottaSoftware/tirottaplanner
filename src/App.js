import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DeletedTasks from './pages/Trash';
import Profile from './pages/Profile';
import Burger from './components/Burger';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './AuthContext';
import tpLogo from './TP_logo.png';

function App() {
  const [translated, setTranslated] = useState(true);
  const [authState, setAuthState] = useState({loggedUser: {}, loggedIn: false})
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [formTranslated, setFormTranslated] = useState(false);

  useEffect(() => {
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
        setLoginErrorMessage(res.data.error);
      }
      else{
        setLoginErrorMessage('');
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
  }
  
  const toggleOverflow = () => {
    console.log(window.location.pathname);
  }

  return (
    <AuthContext.Provider value = {{authState, setAuthState}}>
      <div className = "App">
        {
          authState.loggedIn?
            <Router>
            <Burger handleBurgerClick = {handleBurgerClick} />
            <Sidebar logout = {logout} translated = {translated} />
            <Switch>
                <div className = 'main'>
                  <Route path = '/' exact component = {Home} />
                  <Route path = '/deleted' exact component = {DeletedTasks} />
                  <Route path = '/profile' exact component = {Profile} />
                </div>
            </Switch> 
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
                <button id = {formTranslated?'auth-button-translated':''} onClick = {() => setFormTranslated(!formTranslated)}>{formTranslated?'Register':'Login'}</button>
              </div>
              <div className = {formTranslated?'login-register form-translated':'login-register'}>
                <Login translated = {formTranslated} errorMessage = {loginErrorMessage} login = {login} />
                <Register translated = {!formTranslated} register = {register} />
              </div>
            </div>
          </div>
        }
      </div>
    </AuthContext.Provider>
  );
}

export default App;
