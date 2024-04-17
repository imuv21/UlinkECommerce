
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
  const [products, setProducts] = useState("");
  const [results, setResults] = useState([]);
  const handleChange = (category) => {
    // logic

    if (category === "All Product") {
      setResults(products);
    } else {
      const filterResults = products.filter(
        (value) => value.category === category
      );

      setResults(filterResults);
    }
   
  };

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setResults(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiData();
  }, []);

  return (
    <Fragment>
      <div className="userDashboard">
        <h1 className="user-title">Hi, Vipin Kumar</h1>
        <p className="user-subtitle">Vipin Kumar</p>
      </div>
      <div className="dashboard-containers">
       <Link to="/OrderPage">
       <div className="dashboards">
          <div className="order-contant">
            <BsBox className="order-icon" />
          </div>
          <div className="containt-title">
            <h4 className="orders-title">Order</h4>
            <div className="order-info">
              <p className="order-infos">
                View your order details, manage and track current orders, and
                explore international shipping & logistics.
              </p>
            </div>
          </div>
        </div> 
       </Link>
        <Link to ="/buyermessage">
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
      </div>
      <div className="recommeded-container">
        <div className="company-detail">
          <h2 className="user-title">Recommended Product</h2>
          <select
            onChange={(e) => handleChange(e.target.value)}
            name=""
            className="select-items-value"
          >
          <option className="select-value" value='All Product'>
            All Product
          </option>
            <option className="select-value" value="electronics">
              Electronics
            </option>
            <option className="select-value" value="men's clothing">
              Men's Cloting
            </option>
            <option className="select-value" value="jewelery">
              Jewelery
            </option>
          </select>
        </div>
      </div>
      <div className="box-container-product-show">
        {products && (
          <div className="recommended-container-img">
            {results.map((value, id) => {
              return (
                <div className="show-result-data" key={id}>
                  <div className="recommended-product-image-container">
                    <img className="recommended-img" src={value.image} alt="" />
                  </div>
                  <div className="recommended-img-title">
                    <h3 className="recommended-img-title">{value.category}</h3>
                    <p className="category-price">Price:{value.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BuyerDashboard;

