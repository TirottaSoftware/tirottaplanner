import React, {useContext} from 'react';
import {Link} from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../AuthContext';
import TPlogo from '../TP_logo.png'

function Sidebar(props) {
    const {authState} = useContext(AuthContext);

    return (
        <div className = {props.translated?'sidebar translated':'sidebar'}>
            <div className = 'avatar' style = {{backgroundImage: `url(${authState.loggedUser.profilePictureURL})`}}></div>
            <p>Howdy,</p>
            <p>{authState.loggedUser.username}</p>
            <ul>
                <li><FontAwesomeIcon className = 'icon' icon={faInbox} /><Link className = 'nav-link' to = '/'>Home</Link></li>
                <li><FontAwesomeIcon className = 'icon' icon={faTrash} /><Link className = 'nav-link' to = '/deleted'>Trash</Link></li>
                <li><FontAwesomeIcon className = 'icon' icon={faUser} /><Link className = 'nav-link' to = '/profile'>Profile</Link></li>
                <li><FontAwesomeIcon className = 'icon' icon={faSignOutAlt} /><Link className = 'nav-link' to = '/' onClick = {props.logout}>Logout</Link></li>
            </ul>
            <img className = 'sidebar-logo' src = {TPlogo} />
        </div>
    )
}

export default Sidebar