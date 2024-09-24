import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import menu_icon from '../../assets/menuuuu.jpg';
import user_icon from '../../assets/person.png';
import right_flesh from '../../assets/right.png';
import { useAuthContext } from '../../hooks/useAuthContext';


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { user } = useAuthContext();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      {showSidebar ? 
        <button onClick={toggleSidebar}>
          <img src={menu_icon} className='menu-icon' alt="menu icon" />
        </button>
        :
        null
      }
      {showSidebar ? (
        <div className='sidebar'>
          <ul>
            <li><Link to="/worker/add-worker" className="sidebar-link">add worker</Link></li>
            <li><Link to="/worker/add-intership" className="sidebar-link">ajouter stagiare</Link></li>
            <li><Link to="/worker/admin-space" className="sidebar-link">admin space</Link></li>
            <li><Link to="/worker/team-task" className="sidebar-link">team & task</Link></li>
            <li><Link to="/worker/reportprobleme" className="sidebar-link">report probleme</Link></li>
            <li><Link to="/worker/help" className="sidebar-link">help desk space</Link></li>
            <li><Link to="/worker/meet" className="sidebar-link">meet</Link></li>
            <li><Link to="/worker/mytasks" className="sidebar-link">my tasks</Link></li>
            <li><Link to="/worker/chat" className="sidebar-link"><div className='chat'><h5>chat</h5> <span>1</span></div></Link></li>
          </ul>
          <div className='user-info'>
            <img src={user_icon} alt="user icon" />
            <p>{user.username}</p>
          </div>
        </div>
      ) : (
        <div onClick={toggleSidebar} className='flesh'>
          <img src={right_flesh} alt="right arrow" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
