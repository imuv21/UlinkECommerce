import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import Profile from '../../assets/user.jpg';

const AdminHeader = () => {
  return (
    <div className='admin-navbar'>
      <h3> WELCOME!</h3>
      <div className='admin-nav-items'>
        <IoMdNotificationsOutline className='icon-size' />
        <IoSettingsOutline className='icon-size' />
        <img className='admin-profile-img' src={Profile} alt='profile-icon' />
        <input type='text' className='admin-search' placeholder='Search...' />
      </div>
    </div>
  )
}

export default AdminHeader
