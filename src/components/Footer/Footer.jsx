import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import './footer.css';


const Footer = () => {
  return (

    <Fragment>
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
            <Link className="itemLink">Payment Methode</Link>
          </div>
        </div>
        <div className="footer">
          <h3 className="footer-title">Procurement</h3>
          <div className="item-list">
            <Link className="itemLink">Enterprises</Link>
            <Link className="itemLink">Terms and Conditions</Link>
            <Link className="itemLink">Return and refund policy</Link>
            <Link className="itemLink">Payment Methode</Link>
          </div>
        </div>
      </div>


      <div className="flex send-massage">
        <input className="message" type="text" placeholder="Write massage here" />
        <button className="send">Send Massage</button>
      </div>

    </Fragment>
  );
};

export default Footer;