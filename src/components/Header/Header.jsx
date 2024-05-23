import './style.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import { useCart } from '../context/CartContext';
import ReactFlagsSelect from "react-flags-select";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/AuthReducer';
import { urls } from '../Schemas/images';
const BASE_URL = import.meta.env.VITE_BASE_URL;

import HomeIcon from '@mui/icons-material/Home';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SendIcon from '@mui/icons-material/Send';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import StorefrontIcon from '@mui/icons-material/Storefront';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';



const Header = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);


  const [selected, setSelected] = useState("IN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(prevState => !prevState);
  };

  const [isClickedTwo, setIsClickedTwo] = useState(false);
  const handleClickTwo = () => {
    setIsClickedTwo(prevState => !prevState);
  };

  const navigate = useNavigate();
  const tocart = () => {
    navigate('/cart');
  }

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
        alert(response.data); 
        localStorage.clear();
        dispatch(logout());
      }
    } catch (error) {
      alert(error);
    }
  };


  //images
  const logo = urls[0];



  return (
    <Fragment>
      <div className="offer">
        <h4>Save up to 20% OFF on your first 10 orders.</h4> <div className="coupn">ULINKITFIRST20</div>
      </div>

      <div className='header'>
        <div className="flex head-start">
          <div className='header-burger' onClick={toggleMobileMenu} >
            <ListIcon />
          </div>
          <Link to="/"><img src={logo} alt="Logo" className='logo' /></Link>
        </div>

        <div className="flex wh" style={{ gap: '20px' }}>
          <ReactFlagsSelect id="select-contry" selected={selected} onSelect={(selected) => setSelected(selected)} placeholder="Select Country " searchable searchPlaceholder="Search countries" />{" "}
          <div className="search-input2">
            <input type='text' placeholder='Search here...' />
            <span>
              <SearchIcon />
            </span>
          </div>
        </div>

        <div className="flex head-start">

          {isAuthenticated ? (
            <div className='heading2' style={{ whiteSpace: 'nowrap', textTransform: 'capitalize' }}>Hi {user.firstname} </div>
          ) : (
            <div className={`icon-container ${isClickedTwo ? 'clicked' : ''}`} onClick={handleClickTwo}>
              <div className="flex" style={{ gap: '10px' }}>
                <AccountCircleIcon style={{ color: 'black' }} />
                <div className='LoginRegister'>Login / Register</div>
              </div>
              {isClickedTwo && (
                <div className="popup">
                  <div className='popupbox'>
                    <Link to="/login" className='loginbtn'><div className="heading2">Log in</div></Link>
                    <Link to="/signup" className='signupbtn'><div className="heading2">Register</div><div className='descrip'>It only takes 30 seconds</div></Link>
                  </div>
                  <div className="popupbox">
                    <div className="descrip">Help & Contact</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isAuthenticated && (
            <div className={`icon-container ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
              <AccountCircleIcon style={{ color: 'black' }} />
              {isClicked && (
                <div className="popup">
                  <div className='popupbox'>

                    <div className="username">
                      {user.firstname} {user.lastname}
                    </div>

                    <div className="warning-btn3">{user.role === 'Buyer' ? 'Verify Your Mobile' : 'Unverified Seller'}</div>
                  </div>

                  <div className='popupbox'>
                    {user.role === 'Buyer' && (<Link to={'/buyer-dashboard'} className="pop-options"><HomeIcon />Buyer Center</Link>)}
                    {user.role === 'Seller' && (<Link to={'/seller-dashboard/add-single-product'} className="pop-options"> <DashboardIcon />Dashboard</Link>)}
                    <Link to={user.role === 'Seller' ? '/seller-dashboard/seller-orders' : '/order-page'} className="pop-options"> <AllInboxIcon /> Orders </Link>
                    {user.role === 'Seller' && (<div className="pop-options"> <MessageIcon /> Messages </div>)}
                    <div className="pop-options"> <SendTimeExtensionIcon /> RFQ Marketplace </div>
                    <div className="pop-options"> <SendIcon />{user.role === 'Buyer' ? 'Create RFQ' : 'Manage Quotes'}</div>
                    {user.role === 'Seller' && (<Link to="/seller-dashboard/product-list" className="pop-options"> <StorefrontIcon />Product Catalogue</Link>)}
                  </div>

                  <div className='popupbox'>
                    <Link to={'/profile'} className="subpop-options">My Profile</Link>
                    <div className="subpop-options">My Company Profile</div>
                    {user.role === 'Buyer' && (<div className="subpop-options">Payment Management</div>)}
                    <div className="subpop-options">Access Management</div>
                    {user.role === 'Buyer' && (<div className="subpop-options">Addresses</div>)}
                    {user.role === 'Seller' && (<div className="subpop-options">Saved Products</div>)}
                  </div>

                  <div className="popupbox">
                    <div className="subpop-options" onClick={handleLogout}>Log out</div>
                  </div>

                </div>
              )}
            </div>
          )}


          {isAuthenticated && user.role === 'Buyer' && (
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={tocart}>
              <ShoppingCartIcon style={{ color: 'black' }} />
              <div style={cartcount}>{carttext}</div>
            </div>
          )}

        </div>
      </div>

      <div className="sub-header">
        <div className="sup-header-option">
          <div className="sub-heading3">All Categories</div>
          <div className="sub-heading2">Consumer Electronics</div>
          <div className="sub-heading2">Office & Stationery</div>
          <div className="sub-heading2">Food & Beverages</div>
          <div className="sub-heading2">Personal Care</div>
        </div>
        <div className="sup-header-option">
          <div className="sub-header-option">
            <LocalOfferIcon /> <div className="sub-heading3">Deals</div>
          </div>
          <div className="sub-header-option">
            <DepartureBoardIcon /> <div className="sub-heading3">Express</div>
          </div>
          <div className="sub-header-option">
            <SendIcon /> <div className="sub-heading3">RFQ Marketplace</div>
          </div>
          <div className="sub-header-option">
            <BusinessCenterIcon /> <div className="sub-heading3">Enterprise</div>
          </div>
          {(isAuthenticated === false || (isAuthenticated && user.role !== 'Seller')) && (
            <Link to="/become-a-seller" className='header-btns'>Become A Seller</Link>
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