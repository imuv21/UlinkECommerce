import './style.css';
import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import { useCart, useUserType } from '../context/CartContext';
import logo from '../../assets/logo2.png';

import HomeIcon from '@mui/icons-material/Home';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SendIcon from '@mui/icons-material/Send';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Header = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(prevState => !prevState);
  };

  const navigate = useNavigate();
  const tocart = () => {
    navigate('/cart');
  }

  const { userType } = useUserType();
  const { cart } = useCart();
  const carttext = Object.values(cart).length;
  const numCharacters = carttext;
  let width;
  let height;
  if (numCharacters >= 0 && numCharacters <= 9) {
    width = 15;
    height = 15;
  } else if (numCharacters >= 10 && numCharacters <= 99) {
    width = 20;
    height = 17;
  } else if (numCharacters >= 100 && numCharacters <= 999) {
    width = 25;
    height = 20;
  } else {
    width = 35;
    height = 20;
  }

  const cartcount = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: 'var(--CodeOne)',
    color: 'white',
    fontSize: '10px',
    position: 'absolute',
    top: '0px',
    left: '15px',
    padding: '5px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: ' center',
  };


  return (
    <Fragment>
      <div className='header'>

        <div className="flex head-start">
          <div className='header-burger' onClick={toggleMobileMenu} >
            <ListIcon />
          </div>
          <Link to="/"><img src={logo} alt="Logo" className='logo' /></Link>
        </div>

        <div className="search-input2">
          <input type='text' placeholder='Search here...' />
          <span>
            <SearchIcon />
          </span>
        </div>

        <div className="flex head-start">
          <div className="header-nav">
             <Link to="/">Home</Link>
            {userType === 'buyer' && (<Link to="/become-a-seller">Become A Seller</Link>)}
          </div>

          <div className={`icon-container ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
            <AccountCircleIcon />
            {isClicked && (
              <div className="popup">
                <div className='popupbox'>
                  <div className="username">Uttam verma</div>
                  <div className="warning-btn3">{userType === 'buyer' ? 'Verify Your Mobile' : 'Unverified Seller'}</div>
                </div>

                <div className='popupbox'>
                  {userType === 'buyer' && (<Link to={'/buyer-dashboard'} className="pop-options"><HomeIcon />Buyer Center</Link>)}
                  {userType === 'seller' && (<div className="pop-options"> <DashboardIcon />Dashboard</div>)}
                  <div className="pop-options"> <AllInboxIcon /> Orders </div>
                  {userType === 'seller' && (<div className="pop-options"> <MessageIcon /> Messages </div>)}
                  <div className="pop-options"> <SendTimeExtensionIcon /> RFQ Marketplace </div>
                  <div className="pop-options"> <SendIcon />{userType === 'buyer' ? 'Create RFQ' : 'Manage Quotes'}</div>
                  {userType === 'seller' && (<div className="pop-options"> <StorefrontIcon />Product Catalogue</div>)}
                </div>

                <div className='popupbox'>
                  <div className="subpop-options">My Profile</div>
                  <div className="subpop-options">My Company Profile</div>
                  {userType === 'buyer' && (<div className="subpop-options">Payment Management</div>)}
                  <div className="subpop-options">Access Management</div>
                  {userType === 'buyer' && (<div className="subpop-options">Addresses</div>)}
                  {userType === 'seller' && (<div className="subpop-options">Saved Products</div>)}
                </div>

                <div className="popupbox">
                  <div className="subpop-options">Log out</div>
                </div>

                <div className='popupbox'>
                  <Link to="/login" className='btn box flex' ><div className="heading2">Log in</div></Link>
                  <Link to="/signup" className='btn box flex'><div className="heading2">Sign up</div></Link>
                </div>
              </div>
            )}
          </div>

          {userType === 'buyer' && (
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={tocart}>
              <ShoppingCartIcon />
              <div style={cartcount}>{carttext}</div>
            </div>
          )}
        </div>
        
      </div>


      <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <div className='drawer' onClick={toggleMobileMenu} onKeyDown={toggleMobileMenu}>
          <Link to="/profile">Profile dfhtrhtrhrthjtrjhrtjt</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about-us">About Us</Link>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default Header;