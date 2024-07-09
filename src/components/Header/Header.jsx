
import './style.css';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses } from '../../Redux/addressSlice';
import { setSelectedAddress } from '../../Redux/selectedAddress';
import { fetchExchangeRates, setSelectedCurrency } from '../../Redux/currencySlice';
import { logout } from '../../Redux/AuthReducer';
import { urls } from '../Schemas/images';
import { supOptions, subOptions, miniSubOptions } from '../Schemas/cate';
import currencySymbols from '../Schemas/currencySymbols';
import countryFlags from '../Schemas/countryFlags';
import countryNames from '../Schemas/countryNames';
const BASE_URL = import.meta.env.VITE_BASE_URL;

import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SendIcon from '@mui/icons-material/Send';
import PrintIcon from '@mui/icons-material/Print';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const Header = () => {

  const dispatch = useDispatch();
  const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
  const exchangeRates = useSelector(state => state.currency.exchangeRates);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const { items: cart } = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  //animation
  const [showFirst, setShowFirst] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prevShowFirst => !prevShowFirst);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  //select address
  const addresses = useSelector(state => state.address.addresses);
  const selectedAddress = useSelector(state => state.selectedAddress.address);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress = addresses.find(addr => addr.isDefaultChecked);
      dispatch(setSelectedAddress(defaultAddress || addresses[0]));
    }
  }, [addresses, selectedAddress, dispatch]);

  const handleAddressChange = (address) => {
    dispatch(setSelectedAddress(address));
  };



  //dropdown 
  const [searchQuery, setSearchQuery] = useState(''); //this one

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  const handleSelectCurrency = (currencyCode) => {
    dispatch(setSelectedCurrency(currencyCode));
    setIsOpen(false);
  };

  const handleSearchChange = (e) => {  //this one
    setSearchQuery(e.target.value);
  };

  const filteredCurrencies = Object.keys(exchangeRates).filter((currencyCode) =>   //this one
    countryNames[currencyCode].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };



  //popups handling 
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(null);
  const popupisOpenRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false);
  const isClickedRef = useRef(null);
  const popupisClickedRef = useRef(null);

  const [isClickedCate, setIsClickedCate] = useState(false);
  const isClickedCateRef = useRef(null);
  const popupisClickedCateRef = useRef(null);

  const [isClickedTwo, setIsClickedTwo] = useState(false);
  const isClickedTwoRef = useRef(null);
  const popupisClickedTwoRef = useRef(null);

  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const isClickedAddRef = useRef(null);
  const popupisClickedAddRef = useRef(null);

  const [isConsumer, setIsConsumer] = useState(false);
  const isConsumerRef = useRef(null);
  const popupisConsumerRef = useRef(null);

  const [isOffice, setIsOffice] = useState(false);
  const isOfficeRef = useRef(null);
  const popupisOfficeRef = useRef(null);

  const [isFood, setIsFood] = useState(false);
  const isFoodRef = useRef(null);
  const popupisFoodRef = useRef(null);

  const closeAllPopups = () => {
    setIsClicked(false);
    setIsClickedCate(false);
    setIsClickedTwo(false);
    setIsClickedAdd(false);
    setIsConsumer(false);
    setIsOffice(false);
    setIsFood(false);
    setIsOpen(false);
  };

  const handleClick = () => {
    closeAllPopups();
    setIsClicked(prevState => !prevState);
  };

  const handleClickCate = () => {
    closeAllPopups();
    setIsClickedCate(prevState => !prevState);
  };

  const handleClickTwo = () => {
    closeAllPopups();
    setIsClickedTwo(prevState => !prevState);
  };

  const handleClickAdd = () => {
    closeAllPopups();
    setIsClickedAdd(prevState => !prevState);
  };

  const handleConsumer = () => {
    closeAllPopups();
    setIsConsumer(prevState => !prevState);
  };

  const handleOffice = () => {
    closeAllPopups();
    setIsOffice(prevState => !prevState);
  };

  const handleFood = () => {
    closeAllPopups();
    setIsFood(prevState => !prevState);
  };

  const handleToggleDropdown = () => {
    closeAllPopups();
    setIsOpen(prevState => !prevState);
  };

  const handleClickOutside = (event) => {

    const popups = [
      { containerRef: isClickedRef, popupRef: popupisClickedRef },
      { containerRef: isClickedCateRef, popupRef: popupisClickedCateRef },
      { containerRef: isClickedTwoRef, popupRef: popupisClickedTwoRef },
      { containerRef: isClickedAddRef, popupRef: popupisClickedAddRef },
      { containerRef: isConsumerRef, popupRef: popupisConsumerRef },
      { containerRef: isOfficeRef, popupRef: popupisOfficeRef },
      { containerRef: isFoodRef, popupRef: popupisFoodRef },
      { containerRef: isOpenRef, popupRef: popupisOpenRef },
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


  const navigate = useNavigate();
  const tocart = () => {
    navigate('/cart');
  }

  const cartItems = cart || [];
  const carttext = cartItems.length;
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
        if (isAuthenticated && user.role === 'Seller') {
          navigate('/seller-center');
        }
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
    }
  };

  const convertPascalToReadable = (text) => {
    return text.replace(/([A-Z])/g, ' $1').trim();
  };

  //images
  const logo = urls[0];

  //categories
  const [hoveredOption, setHoveredOption] = useState(null);
  const handleMouseEnter = (index) => {
    setHoveredOption(index);
  };
  const handleMouseLeave = () => {
    setHoveredOption(null);
  };

  const getPopupContent = (option) => {
    const handleOptionClick = (supOption, subOption = '', miniSubOption = '') => {
      navigate('/search-results', {
        state: { supOption, subOption, miniSubOption }
      });
    };

    return (
      <div className='cate-grid'>
        {subOptions[option].slice(0, 3).map((subOption, index) => (
          <div className="popupbox-cate" key={index}>
            <div className='subpop-options underline' onClick={() => handleOptionClick(option, subOption)} >
              {convertPascalToReadable(subOption)}
            </div>
            <div className="cate-options">
              {miniSubOptions[subOption].slice(0, 18).map((miniSubOption, miniIndex) => (
                <div className='sub-cate-options' key={miniIndex} onClick={() => handleOptionClick(option, subOption, miniSubOption)}>
                  {convertPascalToReadable(miniSubOption)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getConsumerPopupContent = () => {
    return (
      <div className='cate-grid'>
        {subOptions.ConsumerElectronics.slice(0, 3).map((subOption, index) => (
          <div className="popupbox-cate" key={index}>
            <div className='subpop-options underline' onClick={() => handleOptionClick("ConsumerElectronics", subOption)}>
              {convertPascalToReadable(subOption)}
            </div>
            <div className="cate-options">
              {miniSubOptions[subOption].map((miniSubOption, miniIndex) => (
                <div className='sub-cate-options' key={miniIndex} onClick={() => handleOptionClick("ConsumerElectronics", subOption, miniSubOption)}>
                  {convertPascalToReadable(miniSubOption)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getOfficePopupContent = () => {
    return (
      <div className='cate-grid'>
        {subOptions.OfficeAndStationery.slice(0, 3).map((subOption, index) => (
          <div className="popupbox-cate" key={index}>
            <div className='subpop-options underline' onClick={() => handleOptionClick("OfficeAndStationery", subOption)}>
              {convertPascalToReadable(subOption)}
            </div>
            <div className="cate-options">
              {miniSubOptions[subOption].map((miniSubOption, miniIndex) => (
                <div className='sub-cate-options' key={miniIndex} onClick={() => handleOptionClick("OfficeAndStationery", subOption, miniSubOption)}>
                  {convertPascalToReadable(miniSubOption)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getFoodPopupContent = () => {
    return (
      <div className='cate-grid'>
        {subOptions.FoodAndBeverages.slice(4, 7).map((subOption, index) => (
          <div className="popupbox-cate" key={index}>
            <div className='subpop-options underline' onClick={() => handleOptionClick("FoodAndBeverages", subOption)}>
              {convertPascalToReadable(subOption)}
            </div>
            <div className="cate-options">
              {miniSubOptions[subOption].map((miniSubOption, miniIndex) => (
                <div className='sub-cate-options' key={miniIndex} onClick={() => handleOptionClick("FoodAndBeverages", subOption, miniSubOption)}>
                  {convertPascalToReadable(miniSubOption)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  //search-bar
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search-results?query=${query}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '';
  };


  return (
    <Fragment>

      {showFirst ? (
        <div className="offer">
          <div className='offer-text bounce-in-top'>Get 20% OFF on your first order.</div>
          <div className="coupn bounce-in-bottom">ULINKITFIRST20</div>
        </div>
      ) : (
        <div className="offer2">
          <div className="gwm slide-in-left">Global Wholesale Marketplace</div>
          <div className="fcb slide-in-right">For Cross-Border</div>
        </div>
      )}

      <div className='header'>
        <div className="flex head-start">
          <Link to="/"><img src={logo} alt="Logo" className='logo' /></Link>
        </div>

        <div className="headerflex">

          {isAuthenticated && (
            <div ref={isClickedAddRef} className={`icon-container ${isClickedAdd ? 'clicked' : ''}`} onClick={handleClickAdd}>
              <div className="flex">
                <LocationOnIcon style={{ color: 'gray' }} />
                <div className="flexcol-start">
                  {user.role === 'Buyer' && <div className="descrip">Deliver to</div>}
                  {user.role === 'Seller' && <div className="descrip">Stock location</div>}
                  {selectedAddress && <div className='descrip'>{truncateText(selectedAddress?.address, 10)}..</div>}
                </div>
              </div>

              {(isClickedAdd && addresses && addresses.length > 0) && (
                <div ref={popupisClickedAddRef} className="popup address-relative">
                  <div className="address-container">
                    {addresses.filter((address) => address.isLocationChecked).map((address) => (
                      <div key={address.id} className={`address-card ${selectedAddress?.id === address.id ? 'selected' : ''}`}>

                        <input type="radio" id={address.id} name="address" value={address.address} checked={selectedAddress?.id === address.id} onChange={() => handleAddressChange(address)} />

                        <label htmlFor={address.id}>
                          <div className="address-header">
                            <div className='heading2'>{address.address}</div>
                            <div className="tags">
                              {address.isLocationChecked && <span className="tag shipping">Shipping</span>}
                              {address.isBillingChecked && <span className="tag billing">Billing</span>}
                              {address.isDefaultChecked && <span className="tag default">Default</span>}
                            </div>
                            <div className="descrip">
                              {`${address.street}, ${address.area}, ${address.city}, ${address.selectedOrigin}`}
                            </div>
                          </div>
                        </label>

                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div ref={isOpenRef} className="dropdown-flag">
            <div className="dropdown-flag-header" onClick={handleToggleDropdown}>
              {selectedCurrency ? (
                <div className="flex descrip flagname" style={{ gap: '10px' }}>
                  <img className='flag' src={countryFlags[selectedCurrency]} alt={selectedCurrency} />
                  <div className="descrip">{truncateText(countryNames[selectedCurrency], 10)}</div> ({currencySymbols[selectedCurrency]})
                </div>
              ) : (
                <div className='descrip'>
                  <div className="syc">Select your currency</div>
                  <div className='sycmob'>Select</div>
                </div>
              )}
            </div>
            {isOpen && (
              <div ref={popupisOpenRef} className="dropdown-flag-list">
                <input type="text" className="dropdown-flag-search" placeholder="Search here..."
                  value={searchQuery} onChange={handleSearchChange} />

                {filteredCurrencies.map((currencyCode, index) => (
                  <div className="dropdown-flag-item descrip flex" key={index} onClick={() => handleSelectCurrency(currencyCode)}>
                    <img className='flag' src={countryFlags[currencyCode]} alt={currencyCode} />
                    {countryNames[currencyCode]} ({currencySymbols[currencyCode]})
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="search-input2">
            <input type='text' name="query_search" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={handleKeyPress} placeholder='Search Ulinkit...' />
            <span>
              <SearchIcon onClick={handleSearch} />
            </span>
          </div>
        </div>

        <div className="flex head-start">

          {isAuthenticated ? (
            <div className='heading2 usernameheader' style={{ whiteSpace: 'nowrap', textTransform: 'capitalize' }}>Hi {user.firstname} </div>
          ) : (
            <div ref={isClickedTwoRef} className={`icon-container ${isClickedTwo ? 'clicked' : ''}`} onClick={handleClickTwo}>
              <div className="flex" style={{ gap: '10px' }}>
                <AccountCircleIcon style={{ color: 'black' }} />
                <div className='LoginRegister'>Login / Register</div>
              </div>
              {isClickedTwo && (
                <div ref={popupisClickedTwoRef} className="popup account">
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
            <div ref={isClickedRef} className={`icon-container ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
              <AccountCircleIcon style={{ color: 'black' }} />
              {isClicked && (
                <div ref={popupisClickedRef} className="popup account">
                  <div className='popupbox'>

                    <div className="username">
                      {user.firstname} {user.lastname}
                    </div>

                    <div className="warning-btn3">{user.role === 'Buyer' ? 'Verify Your Mobile' : 'Unverified Seller'}</div>
                  </div>

                  <div className='popupbox'>
                    {user.role === 'Buyer' && (<Link to={'/buyer-dashboard'} className="pop-options"><HomeIcon />Buyer Center</Link>)}
                    {user.role === 'Seller' && (<Link to={'/seller-dashboard/seller-home'} className="pop-options"> <DashboardIcon />Dashboard</Link>)}
                    <Link to={user.role === 'Seller' ? '/seller-dashboard/seller-orders' : '/order-page'} className="pop-options"> <AllInboxIcon /> Orders </Link>
                    {user.role === 'Seller' && (<div className="pop-options"> <MessageIcon /> Messages </div>)}
                    <div className="pop-options"> <SendTimeExtensionIcon /> RFQ Marketplace </div>
                    <div className="pop-options"> <SendIcon />{user.role === 'Buyer' ? 'Create RFQ' : 'Manage Quotes'}</div>
                    {user.role === 'Seller' && (<Link to="/seller-dashboard/product-list" className="pop-options"> <StorefrontIcon />Product Catalogue</Link>)}
                  </div>

                  <div className='popupbox'>
                    <Link to={'/profile'} className="subpop-options">My Profile</Link>
                    <Link to={user.role === 'Seller' ? '/seller-dashboard/seller-company-profile' : '/company-profile'} className="subpop-options">My Company Profile</Link>
                    {user.role === 'Buyer' && (<Link to='/payment' className="subpop-options">Payment Management</Link>)}
                    <Link to={user.role === 'Seller' ? '/seller-dashboard/access-management' : '/access-management'} className="subpop-options">Access Management</Link>
                    <Link to="/my-addresses" className="subpop-options">Addresses</Link>
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

          <div className='header-burger' onClick={toggleMobileMenu} >
            <ListIcon />
          </div>

          <div ref={isClickedCateRef} className={`sub-heading3 flex icon-container ${isClickedCate ? 'clicked' : ''}`} onClick={handleClickCate} onMouseLeave={handleMouseLeave} style={{ gap: '10px' }}>
            <MenuIcon />   All Categories
            {isClickedCate && (
              <div ref={popupisClickedCateRef} className="popup cate_forntend">
                <div className='popupbox'>
                  {supOptions.map((option, index) => (
                    <div className="subpop-options options-relative" key={index} onMouseEnter={() => handleMouseEnter(index)}>

                      {convertPascalToReadable(option)}

                      {hoveredOption === index && (
                        <div className="popup options-popup">
                          {getPopupContent(option)}
                          <div className='wh'>
                            <Link to="/search-results" className="subpop-options underline" style={{ color: 'var(--CodeTwo)' }}>More categories</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div ref={isConsumerRef} className={`sub-heading2 cate-icon flex icon-container ${isConsumer ? 'clicked' : ''}`} onClick={handleConsumer} onMouseLeave={handleMouseLeave} style={{ gap: '5px' }}>
            <PhoneAndroidIcon />  Consumer Electronics
            {isConsumer && (
              <div ref={popupisConsumerRef} className="popup ce-options-popup">
                {getConsumerPopupContent()}
                <div className='wh'>
                  <Link to="/search-results" className="subpop-options underline" style={{ color: 'var(--CodeTwo)' }}>More categories</Link>
                </div>
              </div>
            )}
          </div>

          <div ref={isOfficeRef} className={`sub-heading2 cate-icon flex icon-container ${isOffice ? 'clicked' : ''}`} onClick={handleOffice} onMouseLeave={handleMouseLeave} style={{ gap: '5px' }}>
            <PrintIcon />  Office And Stationery
            {isOffice && (
              <div ref={popupisOfficeRef} className="popup oas-options-popup">
                {getOfficePopupContent()}
                <div className='wh'>
                  <Link to="/search-results" className="subpop-options underline" style={{ color: 'var(--CodeTwo)' }}>More categories</Link>
                </div>
              </div>
            )}
          </div>

          <div ref={isFoodRef} className={`sub-heading2 cate-icon flex icon-container ${isFood ? 'clicked' : ''}`} onClick={handleFood} onMouseLeave={handleMouseLeave} style={{ gap: '5px' }}>
            <FastfoodIcon />  Food And Beverages
            {isFood && (
              <div ref={popupisFoodRef} className="popup fab-options-popup">
                {getFoodPopupContent()}
                <div className='wh'>
                  <Link to="/search-results" className="subpop-options underline" style={{ color: 'var(--CodeTwo)' }}>More categories</Link>
                </div>
              </div>
            )}
          </div>

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
          <Link to="/deals">Deals</Link>
          <Link to="/express">Express</Link>
          <Link to="/rfq-marketplace">RFQ Marketplace</Link>
          <Link to="/enterprise">Enterprise</Link>
        </div>
      </Drawer>

    </Fragment>
  );
};

export default Header;