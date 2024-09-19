import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { logout } from '../../Redux/AuthReducer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import VerifiedIcon from '@mui/icons-material/Verified';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
const BASE_URL = import.meta.env.VITE_BASE_URL;


const AdminHeader = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  //popup handling
  const [isClicked, setIsClicked] = useState(false);
  const isClickedRef = useRef(null);
  const popupisClickedRef = useRef(null);

  const closeAllPopups = () => {
    setIsClicked(false);
  };

  const handleClick = () => {
    closeAllPopups();
    setIsClicked(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    const popups = [
      { containerRef: isClickedRef, popupRef: popupisClickedRef },
    ];
    const clickedInsideAny = popups.some(({ containerRef, popupRef }) =>
      containerRef.current && containerRef.current.contains(event.target) ||
      popupRef.current && popupRef.current.contains(event.target)
    );
    if (!clickedInsideAny) {
      closeAllPopups();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      closeAllPopups();
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });

      if (response.status === 200) {

        toast(<div className='toaster'> < VerifiedIcon /> {response.data}</div>,
          { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });

        if (isAuthenticated && (user.role === 'Admin' || user.role === 'Manager')) {
          navigate('/admin-login');
        }
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
    }
  };



  return (
    <div className='admin-navbar'>
      <h3 style={{ color: 'gray' }}>Welcome {user.firstname} {user.lastname}!</h3>

      <div className='admin-nav-items'>
        <NotificationsIcon className='icon-size' />
        <SettingsIcon className='icon-size' />

        <div ref={isClickedRef} className={`admin-icon-container ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
          <AccountCircleIcon className='icon-size' />
          {isClicked && (
            <div ref={popupisClickedRef} className="admin-popup admin-account">
              <div className='admin-popupbox'>
                <div className="admin-username">
                  {user.firstname} {user.lastname}
                </div>

                {user.role === 'Admin' ?
                  (<div className="warning-btn2 flex"> <VerifiedIcon style={{ width: '13px' }} />
                    Admin
                  </div>) : (
                    <div className="warning-btn3 flex"> <VerifiedIcon style={{ width: '13px' }} />
                      Manager
                    </div>)
                }
              </div>
              <div className='admin-popupbox'>
                <Link to='/admin-dashboard' className="admin-pop-options"> <DashboardIcon /> Dashboard </Link>
                <Link to='/admin-dashboard/warehouse' className="admin-pop-options"> <AllInboxIcon /> Warehouse </Link>
                <Link to='/admin-dashboard/admin-order' className="admin-pop-options"> <BookmarkBorderIcon /> Orders </Link>
              </div>
              <div className='admin-popupbox'>
                <Link to='/admin-profile' className="admin-subpop-options">My Profile</Link>
                <Link to='/admin-payment' className="admin-subpop-options">Payment Management</Link>
                <Link to='/admin-access-management' className="admin-subpop-options">Access Management</Link>
              </div>
              <div className="admin-popupbox">
                <div className="admin-subpop-options" onClick={handleLogout}>Log out</div>
              </div>
            </div>
          )}
        </div>

        <input type='text' className='admin-search' placeholder='Search...' />
      </div>
    </div>
  )
}

export default AdminHeader
