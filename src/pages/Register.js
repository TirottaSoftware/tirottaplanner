import React, {useState} from 'react'

const Register = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('');
    
    const handleUsernameChange = (e) => {
        e.preventDefault();

        setUsername(e.target.value)
    }
    
    const handlePasswordChange = (e) => {
        e.preventDefault();

        setPassword(e.target.value)
    }
    
    const handleConfirmPasswordChange = (e) => {
        e.preventDefault();

        setConfirmPassword(e.target.value)
    }
    
    const handleEmailChange = (e) => {
        e.preventDefault();

        setEmail(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if(password === confirmPassword){
            setErrorMessage('')
            props.register(username, password, email);
        }
        else{
            setErrorMessage('Passwords do not match.')
            return;
        }
    }

    return ( 
        <form onSubmit = {handleSubmit} className = 'register-form'>
            <p className = 'error-msg'>{errorMessage}</p>
            <input onChange = {handleUsernameChange} type = 'text' placeholder = 'username' />
            <input onChange = {handleEmailChange} type = 'email' placeholder = 'email' />
            <input onChange = {handlePasswordChange} type = 'password' placeholder = 'password' />
            <input onChange = {handleConfirmPasswordChange} type = 'password' placeholder = 'confirm password' />
            <input type = 'submit' value = 'Register'/>
        </form>
    )
}

export default Register;
 