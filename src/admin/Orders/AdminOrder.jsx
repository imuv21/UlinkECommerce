import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders } from '../../Redux/OrderAdminSlice';
import { useNavigate } from 'react-router-dom';

const AdminOrder = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orderAdmin);

  const seeOrders = (id) => {
    console.log(id);
    navigate(`/admin-dashboard/all-orders/${id}`);
  }

  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const ends = [100, 150, 200, 250, 300, 350, 400, 450];
  const duration = 1000;
  const numberRef = useRef(null);

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setCounts(prev => prev.map((_, i) => entry.isIntersecting ? prev[i] : 0))),
      { threshold: 0.5 }
    );
    if (numberRef.current) observer.observe(numberRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const totalSteps = 100;
    const intervalTime = duration / totalSteps;
    const increments = ends.map(end => end / totalSteps);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounts(prev => prev.map((count, i) => Math.min(count + increments[i], ends[i])));
      if (currentStep >= totalSteps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [counts]);


  return (
    <Fragment>
      <Helmet>
        <title>Manage Orders | Ulinkit Admin Dashboard - Efficient Order Management</title>
        <meta name="description" content="Access the Ulinkit admin dashboard to manage and review orders, track order status, and oversee the fulfillment process efficiently. Optimize your order management for a smooth and organized operation." />
        <link rel="canonical" href="https://www.ulinkit.com/admin-dashboard/admin-order" />
      </Helmet>
      <div className='adminpage'>

        <div className='perfect-grid-admin' ref={numberRef}>
          <div className="grid-item-admin">
            <div className="orderdis">
              <div className="heading3 fontGray">Payment Refund</div>
              <div className="heading fontGrayLight">{Math.floor(counts[0])}</div>
            </div>
            <div className="orderdisicon">
              <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path d="M12 15.333c1.105 0 2-.746 2-1.666S13.105 12 12 12s-2-.746-2-1.667c0-.92.895-1.666 2-1.666m0 6.666c-1.105 0-2-.746-2-1.666m2 1.666V16m0-8v.667m0 0c1.105 0 2 .746 2 1.666"></path><path d="M17 3.338A9.95 9.95 0 0 0 12 2C6.477 2 2 6.477 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.592l2.226-.596a1.63 1.63 0 0 1 1.149.133A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10c0-1.821-.487-3.53-1.338-5"></path></g></svg>
            </div>
          </div>
          <div className="grid-item-admin">
            <div className="orderdis">
              <div className="heading3 fontGray">Order Cancel</div>
              <div className="heading fontGrayLight">{Math.floor(counts[1])}</div>
            </div>
            <div className="orderdisicon">
              <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Z"></path><path strokeLinecap="round" d="m11.5 12.5l3-3m0 3l-3-3M2 3l.261.092c1.302.457 1.953.686 2.325 1.231s.372 1.268.372 2.715V9.76c0 2.942.063 3.912.93 4.826c.866.914 2.26.914 5.05.914H12m4.24 0c1.561 0 2.342 0 2.894-.45c.551-.45.709-1.214 1.024-2.743l.5-2.424c.347-1.74.52-2.609.076-3.186c-.443-.577-1.96-.577-3.645-.577h-6.065m-6.066 0H7"></path></g></svg>
            </div>
          </div>
          <div className="grid-item-admin">
            <div className="orderdis">
              <div className="heading3 fontGray">Order Shipped</div>
              <div className="heading fontGrayLight">{Math.floor(counts[2])}</div>
            </div>
            <div className="orderdisicon">
              <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M21.984 10c-.037-1.311-.161-2.147-.581-2.86c-.598-1.015-1.674-1.58-3.825-2.708l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-2 1.05C4.271 5.56 3.195 6.125 2.597 7.14C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709l2 1.049C10.178 21.539 11.056 22 12 22s1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.42-.713.544-1.549.581-2.86M21 7.5l-4 2M12 12L3 7.5m9 4.5v9.5m0-9.5l4.5-2.25l.5-.25m0 0V13m0-3.5l-9.5-5"></path></svg>
            </div>
          </div>
          <div className="grid-item-admin">
            <div className="orderdis">
              <div className="heading3 fontGray">Order Delivering</div>
              <div className="heading fontGrayLight">{Math.floor(counts[3])}</div>
            </div>
            <div className="orderdisicon">
              <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path d="M20 10v2c0 3.771 0 5.657-1.172 6.828S15.771 20 12 20s-5.657 0-6.828-1.172S4 15.771 4 12v-2c0-3.771 0-5.657 1.172-6.828S8.229 2 12 2s5.657 0 6.828 1.172c.654.653.943 1.528 1.07 2.828"></path><path strokeLinejoin="round" d="M15.5 16H17M7 16h1.5M7 20l-1 2m11-2l1 2M10 2v.5a2 2 0 1 0 4 0V2m6 11h-4M4 13h8"></path></g></svg>
            </div>
          </div>
          <div className="grid-item-admin">
            <div className="orderdis">
              <div className="heading3 fontGray">Pending Review</div>
              <div className="heading fontGrayLight">{Math.floor(counts[4])}</div>
            </div>
            <div className="orderdisicon">
              <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></path><path strokeLinecap="round" d="m14.5 11l-5 5m0-5l5 5m6.5 0c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-3m13-8.998c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v2M8 4.002c-2.175.012-3.353.109-4.121.877S3.014 6.825 3.002 9"></path></g></svg>
            </div>
          </div>
          <div className="grid-item-admin">
            <div className="orderdis">
              <div className="heading3 fontGray">Pending Payment</div>
              <div className="heading fontGrayLight">{Math.floor(counts[5])}</div>
            </div>
            <div className="orderdisicon">
              <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M12 8v4l2.5 2.5"></path><path d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"></path></g></svg>
            </div>
          </div>
          <div className="grid-item-admin">
            <div className="orderdis">
              <div className="heading3 fontGray">Delivered</div>
              <div className="heading fontGrayLight">{Math.floor(counts[6])}</div>
            </div>
            <div className="orderdisicon">
              <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="m9 13.4l1.714 1.6L15 11"></path><path strokeLinecap="round" d="M21 16c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-3m13-8.998c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v2M8 4.002c-2.175.012-3.353.109-4.121.877S3.014 6.825 3.002 9"></path><path d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></path></g></svg>
            </div>
          </div>
          <div className="grid-item-admin">
            <div className="orderdis">
              <div className="heading3 fontGray">In Progress</div>
              <div className="heading fontGrayLight">{Math.floor(counts[7])}</div>
            </div>
            <div className="orderdisicon">
              <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path d="M2 13h3.16c.905 0 1.358 0 1.756.183s.692.527 1.281 1.214l.606.706c.589.687.883 1.031 1.281 1.214s.85.183 1.756.183h.32c.905 0 1.358 0 1.756-.183s.692-.527 1.281-1.214l.606-.706c.589-.687.883-1.031 1.281-1.214S17.934 13 18.84 13H22M8 7h8m-6 3.5h4"></path><path d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"></path></g></svg>
            </div>
          </div>
        </div>

        <div className="admin-orders">
          <div className="order-nav">
            <div className="heading3 fontGray">All Orders</div>
            <select name="" id="">
              <option value="">Select</option>
              <option value="">This Month</option>
              <option value="">This week</option>
            </select>
          </div>

          <div className="admin-order-title order-title-padding">
            <div className="order-title-box">
              <div className="descrip2">Order ID</div>
            </div>
            <div className="order-title-box">
              <div className="descrip2">Created at</div>
            </div>
            <div className="order-title-box">
              <div className="descrip2">Customer</div>
            </div>
            <div className="order-title-box">
              <div className="descrip2">Priority</div>
            </div>
            <div className="order-title-box">
              <div className="descrip2">Total</div>
            </div>
            <div className="order-title-box">
              <div className="descrip2">Payment Status</div>
            </div>
            <div className="order-title-box">
              <div className="descrip2">Items</div>
            </div>
            <div className="order-title-box second-last-box-title">
              <div className="descrip2">Delivery Number</div>
            </div>
            <div className="order-title-box">
              <div className="descrip2">Order Status</div>
            </div>
            <div className="order-title-box last-box-title">
              <div className="descrip2">Action</div>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            orders && Object.values(orders).map((order) => (
              <div className="admin-order-title" key={uuidv4()}>
                <div className="order-list-box">
                  <div className="descrip">{order.id}</div>
                </div>
                <div className="order-list-box">
                  <div className="descrip">{"Order Date"}</div>
                </div>
                <div className="order-list-box">
                  <div className="descrip">{order.name}</div>
                </div>
                <div className="order-list-box">
                  <div className="descrip">{"Priority"}</div>
                </div>
                <div className="order-list-box">
                  <div className="descrip">{"Total Amount"}</div>
                </div>
                <div className="order-list-box">
                  <div className="descrip">{"Payment Status"}</div>
                </div>
                <div className="order-list-box">
                  <div className="descrip">{order.noOfOrders}</div>
                </div>
                <div className="order-list-box second-last-box-list">
                  <div className="descrip">{"Delivery Number"}</div>
                </div>
                <div className="order-list-box">
                  <div className="descrip">{"Order Status"}</div>
                </div>
                <div className="order-list-box last-box-list">
                  <div className='divshake1' onClick={() => seeOrders(order.id)}><VisibilityIcon style={{ color: 'rgb(233, 218, 0)' }} /></div>
                  <div className='divshake3'><DeleteIcon style={{ color: 'rgb(250, 47, 47)' }} /></div>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </Fragment>
  )
};

export default AdminOrder;