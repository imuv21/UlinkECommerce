import './style.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import { useCart, useUserType } from '../context/CartContext';
import axios from 'axios';
import logo from '../../assets/logo2.png';
import ReactFlagsSelect from "react-flags-select";

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




  //getting data from local storage (backend)
  const [loggedUser, setLoggedUser] = useState(null);
  useEffect(() => {
    const storedUserData = localStorage.getItem('loggedUser');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setLoggedUser(parsedUserData);
    }
  }, []);



  //logout
  const handleLogout = async () => {

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      const message = response.message;
      alert(message);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('userData');
    localStorage.removeItem('sellerData');
  };


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

          {loggedUser && (
            <div className='heading2' style={{ whiteSpace: 'nowrap', textTransform: 'capitalize' }}> {loggedUser.name}</div>
          )}

          {loggedUser === null && (
            <div className={`icon-container ${isClickedTwo ? 'clicked' : ''}`} onClick={handleClickTwo}>
              <div className="flex" style={{gap: '10px'}}>
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


          {loggedUser && (loggedUser.role === 'Buyer' || loggedUser.role === 'Seller') && (
            <div className={`icon-container ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
              <AccountCircleIcon style={{ color: 'black' }} />
              {isClicked && (
                <div className="popup">
                  <div className='popupbox'>
                    {loggedUser && (
                      <div className="username">
                        {loggedUser.name}
                      </div>
                    )}
                    <div className="warning-btn3">{loggedUser.role === 'Buyer' ? 'Verify Your Mobile' : 'Unverified Seller'}</div>
                  </div>

                  <div className='popupbox'>
                    {loggedUser.role === 'Buyer' && (<Link to={'/buyer-dashboard'} className="pop-options"><HomeIcon />Buyer Center</Link>)}
                    {loggedUser.role === 'Seller' && (<Link to={'/seller-dashboard/add-single-product'} className="pop-options"> <DashboardIcon />Dashboard</Link>)}
                    <Link to={loggedUser.role === 'Seller' ? '/seller-dashboard/seller-orders' : '/order-page'} className="pop-options"> <AllInboxIcon /> Orders </Link>
                    {loggedUser.role === 'Seller' && (<div className="pop-options"> <MessageIcon /> Messages </div>)}
                    <div className="pop-options"> <SendTimeExtensionIcon /> RFQ Marketplace </div>
                    <div className="pop-options"> <SendIcon />{loggedUser.role === 'Buyer' ? 'Create RFQ' : 'Manage Quotes'}</div>
                    {loggedUser.role === 'Seller' && (<Link to="/seller-dashboard/product-list" className="pop-options"> <StorefrontIcon />Product Catalogue</Link>)}
                  </div>

                  <div className='popupbox'>
                    <Link to={'/profile'} className="subpop-options">My Profile</Link>
                    <div className="subpop-options">My Company Profile</div>
                    {loggedUser.role === 'Buyer' && (<div className="subpop-options">Payment Management</div>)}
                    <div className="subpop-options">Access Management</div>
                    {loggedUser.role === 'Buyer' && (<div className="subpop-options">Addresses</div>)}
                    {loggedUser.role === 'Seller' && (<div className="subpop-options">Saved Products</div>)}
                  </div>

                  <div className="popupbox">
                    <div className="subpop-options" onClick={handleLogout}>Log out</div>
                  </div>

                </div>
              )}
            </div>
          )}


          {loggedUser && loggedUser.role === 'Buyer' && (
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
          {(loggedUser === null || (loggedUser && loggedUser.role !== 'Seller')) && (
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