import React, {useState} from 'react'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const handleUsernameChange = (e) => {
        e.preventDefault();

        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        e.preventDefault();

        setPassword(e.target.value);
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(!username || !password){
            setLoginErrorMessage('Please fill in all the required fields.')
            return;
        }
        props.login(username, password)
    }

    return (
        <form onSubmit = {handleFormSubmit} className = 'login-form'>
            <p className = 'error-msg'>{loginErrorMessage}</p>
            <input onChange = {handleUsernameChange} placeholder = 'username' value = {username} type = 'text' />
            <input onChange = {handlePasswordChange} placeholder = 'password' value = {password} type = 'password' />
            <input type = 'submit' value = 'Log In' />
        </form>
    )
}

export default Login
