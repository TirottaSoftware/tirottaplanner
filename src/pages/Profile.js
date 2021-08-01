import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

function Profile() {

    const [user, setUser] = useState({});
    const {authState, setAuthState} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const [password, setPassword] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmNewPwd, setConfirmNewPwd] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');
    const [userUpdateMessage, setUserUpdateMessage] = useState('');

    const [pwdSucess, setPwdSuccess] = useState(false);

    useEffect(() => {
        document.body.style.overflowY = 'unset';
        const id = authState.loggedUser.uid;
        axios.get('https://tirottaplanner.herokuapp.com/auth/' + id).then(res => {
            setUser(res.data);
            setUsername(res.data.username);
            setEmail(res.data.email)
            setProfilePic(res.data.profilePictureURL)
        })
    }, [])

    const updateUser = (e) => {
        e.preventDefault();

        const id = user.id;

        if(!username || !email || !profilePic){
            setUserUpdateMessage('Fields cannot be empty');
        }
        else{
            axios.put('https://tirottaplanner.herokuapp.com/auth/', {id, username, email, profilePic}).then(res => {
                localStorage.setItem('accessToken', res.data);
                setUserUpdateMessage('Successfully changed, please re-log in to see the changes')
            })
        }
    }

    const changePassword = (e) => {
        e.preventDefault();
        if(!newPwd || !confirmNewPwd || !password){
            setErrorMessage('Fields cannot be empty');
            return;
        }
        const id = user.id;
        if(newPwd === confirmNewPwd){
            if(newPwd.length >= 6){
                axios.put('https://tirottaplanner.herokuapp.com//auth/pwd', {id, pwd: password, newPwd}).then(res => {
                    if(res.data.error){
                        setErrorMessage(res.data.error);
                        return;
                    }
                    else{
                        setPwdSuccess(true);
                        setErrorMessage('Password Successfully Changed');
                    }
                })
            }
            else{
                setErrorMessage('Password must be at least 6 characters long')
                return;
            }
        }
        else{
            setErrorMessage('Passwords do not match.')
            return;
        }
    }

    const deleteAccount = (e) => {
      e.preventDefault();
  
      if (window.confirm("Are you sure you want to delete your account. This action is irrevirsible")) {
        // Delete account
        const id = user.id;
        axios.put('https://tirottaplanner.herokuapp.com//auth/delete', {id}).then(res => {
            console.log(res.data);
            localStorage.removeItem('accessToken');
        })
      } else {
        // Do nothing!
      }
    }

    const handleUsernameInput = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }
    const handleEmailInput = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const handleProfilePicInput = (e) => {
        e.preventDefault();
        setProfilePic(e.target.value);
    }

    const handlePwdInput = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleNewPwdInput = (e) => {
        e.preventDefault();
        setNewPwd(e.target.value);
    }
    const handleConfirmPwdInput = (e) => {
        e.preventDefault();
        setConfirmNewPwd(e.target.value);
    }
    
    
    return (
        <div className = 'profile-section'>
            <div className = 'user-details'>
            <div className = 'avatar' style = {{backgroundImage: `url(${authState.loggedUser.profilePictureURL})`}}></div>
                <form className = 'user-details-form' onSubmit = {updateUser} >
                    <label>username</label>
                    <input type = 'text'  onChange = {handleUsernameInput} value = {username}/>
                    <label>email</label>
                    <input type = 'email' onChange = {handleEmailInput}  value = {email} />
                    <label>profile picture URL</label>
                    <input type = 'url' onChange = {handleProfilePicInput}  value = {profilePic} />
                    <p>{userUpdateMessage}</p>
                    <input type = 'submit' value = 'Save' />
                </form>
            </div>
            <div className = 'user-profile-right'>
                <div className = 'change-pwd'>
                    <h1>Change Password</h1>
                    <form className = 'change-pwd-form' onSubmit = {changePassword}>
                        <div>
                            <label>Current password</label>
                            <input type = 'password' onChange = {handlePwdInput} value = {password} />
                        </div>
                        <div>
                            <label>New password</label>
                            <input type = 'password' onChange = {handleNewPwdInput} value = {newPwd} />
                        </div>
                        <div>
                            <label>Confirm new password</label>
                            <input type = 'password' onChange = {handleConfirmPwdInput} value = {confirmNewPwd} />
                        </div>
                        <p className = {pwdSucess ? 'msg-success' : ''} >{errorMessage}</p>
                        <input type = 'submit' value = 'Save' />
                    </form>
                </div>
                <div className = 'danger-zone'>
                    <h1>Danger zone</h1>
                    <button className = 'btn-delete-acc' onClick = {deleteAccount} >Delete account</button>
                    <p>Please note that account deletion might take up to 28 days. We advise you to reconsider the process before taking action.</p>
                </div>
                <div className = 'acc-info'>
                    <label>account created at: {user.createdAt}</label>
                    <label>last updated: {user.updatedAt}</label>
                </div>
            </div>
        </div>
    )
}

export default Profile;