import React, { useState, useEffect, useRef } from 'react'; 
import './Navbar.css'; 
import laramimg from '../../assets/laram.png';
import menuicon from '../../assets/menu.png';
import notification_icon from '../../assets/notification.png';
import message_icon from '../../assets/email.png';
import { useAuthContext } from '../../hooks/useAuthContext';
import  { useLogout } from '../../hooks/useLogout';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const { logout }=useLogout()
    const { user } = useAuthContext();
    const [showMenu, setShowMenu] = useState(true);
    const [showNotif, setShowNotif] = useState(false); 

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleNotif = () => { 
        setShowNotif(!showNotif); 
        console.log('Notification Toggled:', !showNotif);
    };
    const handleClick= ()=> { 
        logout()
    }

  

    return (
        <>
        <nav className="bg-black text-white">
            <div className='main-nav'>
                <img className='img-fluid' src={laramimg} alt="Logo" />
                <button onClick={toggleMenu}>
                    <img src={menuicon} alt="Menu" />
                </button>
            </div>
            {showMenu && 
                <ul className='text-center'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/worker">Worker Space</Link></li>
                    <li>{!user ? 
                        <Link to="/login">Sign up / Sign in</Link>
                    :
                    <div className='none' onClick={handleClick}>
                        Log out
                    </div> }</li>
                    <div onClick={toggleNotif} className='notif'>
                        <img className='notif-icon' src={notification_icon} alt="Notification" />
                        {!showNotif && <p className='notification-count'>1</p>}
                    </div>
                </ul>
            }
        </nav>
        {showNotif &&
            <div  className="notification-dropdown">
                <ul className='notif-ul'>
                    <li className='d-flex'>
                        <img src={message_icon} alt="Message" />
                        <p>Oussama message 2h</p>     
                    </li>
                    <li className='d-flex'>
                        <img src={message_icon} alt="Message" />
                        <p>Oussama message 2h</p>     
                    </li>
                    <li className='d-flex'>
                        <img src={message_icon} alt="Message" />
                        <p>Oussama message 2h</p>     
                    </li>
                </ul>
            </div>
        }
        </>
    );
}

export default Navbar;
