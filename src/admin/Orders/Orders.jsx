import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { allOrdersTwo } from '../../Redux/OrderAdminSlice';
import { useParams } from 'react-router-dom';

const Orders = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { allOrders, allLoading, allError, pagination, sort } = useSelector((state) => state.orderAdmin);

    const formattedDateAndTime = (dateAndTimeString) => {
        const dateObject = new Date(dateAndTimeString);
        const timeString = dateObject.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true
        });
        const dateString = dateObject.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        return `${timeString} -- ${dateString}`;
    }

    useEffect(() => {
        if (id) {
            console.log(id)
            dispatch(allOrdersTwo({id}));
        }
    }, [dispatch, id]);


    return (
        <Fragment>
            <Helmet>
                <title>Buyer Orders | Ulinkit Admin Dashboard - Efficient Order Management</title>
                <meta name="description" content="Access the Ulinkit admin dashboard to manage and review orders, track order status, and oversee the fulfillment process efficiently. Optimize your order management for a smooth and organized operation." />
                <link rel="canonical" href="https://www.ulinkit.com/admin-dashboard/admin-order" />
            </Helmet>
            <div className='adminpage'>

                <div className="admin-orders">
                    <div className="order-nav">
                        <div className="heading3 fontGray">Order List</div>
                        <select name="" id="">
                            <option value="">Select</option>
                            <option value="">This Month</option>
                            <option value="">This week</option>
                        </select>
                    </div>

                    <div className="admin-order-title order-title-padding">
                        <div className="order-title-box second-last-box-title">
                            <div className="descrip2">Order ID</div>
                        </div>
                        <div className="order-title-box second-last-box-title">
                            <div className="descrip2">Created at</div>
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
                        <div className="order-title-box">
                            <div className="descrip2">Delivery Number</div>
                        </div>
                        <div className="order-title-box">
                            <div className="descrip2">Order Status</div>
                        </div>
                        <div className="order-title-box last-box-title">
                            <div className="descrip2">Action</div>
                        </div>
                    </div>

                    {allLoading ? (
                        <p>Loading...</p>
                    ) : allError ? (
                        <p>Error: {`Unable to fetch data`}</p>
                    ) : (
                        allOrders && Object.values(allOrders).map((order) => (
                            <div className="admin-order-title" key={uuidv4()}>
                                <div className="order-list-box second-last-box-list">
                                    <div className="descrip">{order.orderId.length > 15 ? `${order.orderId.substring(0, 15)}...` : order.orderId}</div>
                                </div>
                                <div className="order-list-box second-last-box-list">
                                    <div className="descrip">{formattedDateAndTime(order.orderDate) || 'N/A'}</div>
                                </div>
                                <div className="order-list-box">
                                    <div className="descrip">{order.stage}</div>
                                </div>
                                <div className="order-list-box">
                                    <div className="descrip">{order.currencySymbol} {Number(order.totalPrice).toFixed(2)} {order.currency}</div>
                                </div>
                                <div className="order-list-box">
                                    <div className="descrip">{"Completed"}</div>
                                </div>
                                <div className="order-list-box">
                                    <div className="descrip">{order?.orderItems?.length}</div>
                                </div>
                                <div className="order-list-box">
                                    <div className="descrip">{"Delivery Number"}</div>
                                </div>
                                <div className="order-list-box">
                                    <div className="descrip">{order.status}</div>
                                </div>
                                <div className="order-list-box last-box-list">
                                    <div className='divshake1'><VisibilityIcon style={{ color: 'rgb(233, 218, 0)' }} /></div>
                                    <div className='divshake2'><BorderColorIcon style={{ color: 'rgb(12, 233, 0)' }} /></div>
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

export default Orders;