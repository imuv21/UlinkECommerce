import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import './footer.css';
import whatsapp from '../../assets/whatsappicon.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import visa from '../../assets/visa.png';
import mastercard from '../../assets/mastercard.png';
import paypal from '../../assets/paypal.png';
import upi from '../../assets/upi.png';
import netbanking from '../../assets/netbanking.png';



const Footer = () => {
  return (

    <Fragment>
      
      <div className="supContFooter">
        <div className="footer-section">
          <div className="footer">
            <h3 className="footer-title">By On Ulinkit</h3>
            <div className="item-list">
              <Link className="itemLink">Source of Ulinkit</Link>
              <Link className="itemLink">All Category</Link>
              <Link className="itemLink">All Brands</Link>
              <Link className="itemLink">Product</Link>
            </div>
          </div>
          <div className="footer">
            <h3 className="footer-title">Sell on Ulinkit</h3>
            <div className="item-list">
              <Link className="itemLink">Start selling</Link>
              <Link className="itemLink">Webinar & EBooks</Link>
              <Link className="itemLink">Ulink Logistics</Link>
              <Link className="itemLink">Product listing policy</Link>
            </div>
          </div>
          <div className="footer">
            <h3 className="footer-title">About Ulinkit</h3>
            <div className="item-list">
              <Link className="itemLink">About us</Link>
              <Link className="itemLink">Press</Link>
              <Link className="itemLink">Careers</Link>
              <Link className="itemLink">Blog</Link>
            </div>
          </div>
          <div className="footer">
            <h3 className="footer-title">Help & Contact</h3>
            <div className="item-list">
              <Link className="itemLink">Help</Link>
              <Link className="itemLink">Contact us</Link>
              <Link className="itemLink">Terms and Conditions</Link>
              <Link className="itemLink">Return and refund policy</Link>
            </div>
          </div>
          <div className="footer">
            <h3 className="footer-title">Ulink Services</h3>
            <div className="item-list">
              <Link className="itemLink">Buy-back Program</Link>
              <Link className="itemLink">Terms and Conditions</Link>
              <Link className="itemLink">Return and refund policy</Link>
              <Link className="itemLink">Payment Method</Link>
            </div>
          </div>
          <div className="footer">
            <h3 className="footer-title">Procurement</h3>
            <div className="item-list">
              <Link className="itemLink">Enterprises</Link>
              <Link className="itemLink">Terms and Conditions</Link>
              <Link className="itemLink">Return and refund policy</Link>
              <Link className="itemLink">Payment Method</Link>
            </div>
          </div>
        </div>

        <div className="footer-nav">
          <div className="fsecone">
            <h3 className="footer-title2">Stay Updated</h3>
            <div className="flex subscribe">
              <input type="text" className="box flex" placeholder="Sign up for email updates" />
              <button className="btn2 box flex" style={{ width: 'fit-content' }}>Subscribe</button>
            </div>
          </div>

          <div className="supfsectwo">
            <div className="fsectwo">
              <h3 className="footer-title2">Connect With Us</h3>
              <div className="flex" style={{ gap: '10px' }}>
                <img src={whatsapp} style={{ width: '30px' }} alt="whatsapp" />
                <div className="flexcol" style={{ gap: '2px' }}>
                  <div className="number">+91 8750518844</div>
                  <div className="whtext">Chat On WhatsApp</div>
                </div>
              </div>
            </div>
            <div className="fsectwo">
              <h3 className="footer-title2">Follow Us On</h3>
              <div className="flex" style={{ gap: '20px' }}>
                <Link to="https://www.facebook.com/"><FacebookIcon /></Link>
                <Link to="https://www.instagram.com/"><InstagramIcon /></Link>
                <Link to="https://www.youtube.com/"><YouTubeIcon /></Link>
                <Link to="https://www.linkedin.com/"><LinkedInIcon /></Link>
                <Link to="https://www.twitter.com/"><XIcon /></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="footerfooter">
          <div className="ffone">
            <img src={mastercard} alt="mastercard" />
            <img src={visa} alt="visa" />
            <img src={paypal} alt="paypal" />
            <img src={upi} alt="upi" />
            <img src={netbanking} alt="netbanking" />
          </div>
          <div className="ffone">
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
            <Link to="/return-policy">Return and Refund policy</Link>
          </div>
          <div className="fftwo">
            <Link>© 2024 ulinkit.com. All rights reserved. U-Link outsourcing pvt. ltd. - Delhi, Uttam Nagar, Milap Nagar, School Road</Link>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default Footer;