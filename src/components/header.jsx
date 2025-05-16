import React from 'react'
import { useState } from 'react'
import '../styles/header.css'
import { useNavigate } from 'react-router-dom'
import admin_avatar from '../assets/admin_avatar.png'
const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const handleAvatarClick = ()=>{
        setShowDropdown((prev) => !prev); 
    }
    const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };
  return (
     <header className="admin-header">
      <h2 className="admin-title">Admin Panel</h2>
      <div className="admin-user-info">
        <span>Welcome, Admin</span>
        <img 
          src= {admin_avatar} 
          alt="Admin Avatar" 
          onClick={()=> handleAvatarClick()}
          className="admin-avatar" 
        />
         {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleLogout} className='log_btn'>Logout</button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
