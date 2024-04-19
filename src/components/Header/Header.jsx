import './header.css';
import './style.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../../assets/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import ReactFlagsSelect from "react-flags-select";
import { useCart } from '../context/CartContext';

const Header = () => {

  
  const navigate = useNavigate();

  const login = () => {
    navigate('/login');
  };
  const signup = () => {
    navigate('/signup');
  };
  const cartpage = () => {
    navigate('/cart');
  };
  const becomeaseller = () => {
    navigate('/become-a-seller');
  };
  const [isHovered, setIsHovered] = useState(false);

  const [selected, setSelected] = useState("");
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    const navbarMenu = document.getElementById("menu");
    const burgerMenu = document.getElementById("burger");
    const headerMenu = document.getElementById("header");

    const handleBurgerClick = () => {
      burgerMenu.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
    };

    const handleLinkClick = () => {
      burgerMenu.classList.remove("is-active");
      navbarMenu.classList.remove("is-active");
    };

    const handleScroll = () => {
      if (window.scrollY >= 85) {
        headerMenu.classList.add("on-scroll");
      } else {
        headerMenu.classList.remove("on-scroll");
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && navbarMenu.classList.contains("is-active")) {
        navbarMenu.classList.remove("is-active");
      }
    };

    burgerMenu.addEventListener("click", handleBurgerClick);

    document.querySelectorAll(".menu-link").forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      burgerMenu.removeEventListener("click", handleBurgerClick);
      document.querySelectorAll(".menu-link").forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const { cart } = useCart();

  const carttext = Object.values(cart).length;
  const numCharacters = carttext;
  let width;
  let height;
  if (numCharacters === 1){
    width = 15;
    height = 15;
  } else if (numCharacters === 2){
    width = 20;
    height = 17;
  } else if (numCharacters === 3){
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
    <header className="header" id="header">
      <nav className="navbar container">
        <a href="/" className="brand"><img src={Logo} alt="logo" /></a>
        <div className="burger" id="burger">
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
          <ReactFlagsSelect id="select-contry" selected={selected} onSelect={(selected) => setSelected(selected)} placeholder="Select Country " searchable searchPlaceholder="Search countries" />{" "}
          <input type='text' className='searchinput' placeholder='Search Here...' onChange={(e) => setKeyword(e.target.value)} />
          <button type='submit' className='searchbtn'><SearchIcon /></button>
        </form>
        <div className="menu" id="menu">
          <ul className="menu-inner">

            <li className="menu-item icon-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <a href="/" className="menu-link"> <AccountCircleIcon /></a>
              {isHovered && (
                <div className="popup flexcol">
                  <button onClick={login} className='btn box flex' style={{ bgColor: 'var(--CodeOne)' }} type='submit'><div className="heading2">Log in</div></button>
                  <button onClick={signup} className='btn box flex' type='submit'><div className="heading2">Sign up</div></button>
                </div>
              )}
            </li>

            <li className="menu-item carticon" onClick={cartpage}>
              <a className="menu-link"><ShoppingCartIcon /></a>
              <div style={cartcount}>{carttext}</div>
            </li>

          </ul>
        </div>
        <a onClick={becomeaseller} className="menu-block">Become a seller</a>
      </nav>
    </header>
  );
};

export default Header;