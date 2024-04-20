
import React, { Fragment, useEffect, useState } from "react";
import "./BuyerDashboard.css";
import { BsBox } from "react-icons/bs";
import { RiMessage2Line } from "react-icons/ri";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { CiWallet } from "react-icons/ci";
import {Link} from 'react-router-dom'

const BuyerDashboard = () => {
  return (
    <Fragment>
   
      <div className="userDashboard">
        <h1 className="user-title">Hi, Vipin Kumar</h1>
        <p className="user-subtitle">Vipin Kumar</p>
      </div>
      <div className="dashboard-containers">
       <Link to="/order-page">
       <div className="dashboards">
          <div className="order-contant">
            <BsBox className="order-icon" />
          </div>
          <div className="containt-title">
            <h4 className="orders-title">Order</h4>
            <div className="order-info">
              <p className="order-infos">
                View your order details, manage and track current orders,
                explore international shipping & logistics.
              </p>
            </div>
          </div>
        </div> 
       </Link>
        <Link to ="/buyer-message">
        <div className="dashboards">
          <div className="order-contant">
            <RiMessage2Line className="order-icon" />
          </div>
          <div className="containt-title">
            <h4 className="orders-title">Message</h4>
            <div className="order-info">
              <p className="order-infos">You have 0 new messages</p>
            </div>
          </div>
        </div>
        </Link>
        <Link to='/rfq'>
        <div className="dashboards">
          <div className="order-contant">
            <CiLocationArrow1 className="order-icon" />
          </div>
          <div className="containt-title">
            <h4 className="orders-title">Requests for Quotations</h4>
            <div className="order-info">
              <p className="order-infos">
                Easily source any product! Simply submit your RFQ and receive
                multiple quotations from our registered sellers.
              </p>
            </div>
          </div>
        </div>
        </Link>
      </div>
      <div className="company-detail">
        <h2 className="user-title">Company Settings</h2>
      </div>
      <div className="dashboard-containers">
        <Link to='/myprofile'>
        <div className="dashboards">
          <div className="order-contant">
            <FaRegUserCircle className="order-icon" />
          </div>
          <div className="containt-title">
            <h4 className="orders-title">My Profile</h4>
            <div className="order-info">
              <p className="order-infos">
                View your personal details and account security
              </p>
            </div>
          </div>
        </div>
        </Link>
        <div className="dashboards">
          <div className="order-contant">
            <HiOutlineBuildingLibrary className="order-icon" />
          </div>
          <div className="containt-title">
            <h4 className="orders-title">Company Profile</h4>
            <div className="order-info">
              <p className="order-infos">
                View company information and submitted documentation
              </p>
            </div>
          </div>
        </div>
        <Link to='/buyer-address'>
        <div className="dashboards">
          <div className="order-contant">
            <IoLocationOutline className="order-icon" />
          </div>
          <div className="containt-title">
            <h4 className="orders-title">Address</h4>
            <div className="order-info">
              <p className="order-infos">
                Manage your shipping and billing addresses.
              </p>
            </div>
          </div>
        </div>
        </Link>
        <Link to='/acess-management'>
        <div className="dashboards">
          <div className="order-contant">
            <PiUsersThreeLight className="order-icon" />
          </div>
          <div className="containt-title">
            <h4 className="orders-title">Access Management</h4>
            <div className="order-info">
              <p className="order-infos">
                Add or remove users to your company account and manage their
                permissions.
              </p>
            </div>
          </div>
        </div>
        </Link>
        <Link to='/payment'>
        <div className="dashboards">
          <div className="order-contant">
            <CiWallet className="order-icon" />
          </div>
          <div className="containt-title">
            <h4 className="orders-title">Payment Mangement</h4>
            <div className="order-info">
              <p className="order-infos">
                Manage your shipping and billing addresses.
              </p>
            </div>
          </div>
        </div>
       </Link>
      </div>
    </Fragment>
  );
};

export default BuyerDashboard;

