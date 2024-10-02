import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { allOrdersTwo } from '../../Redux/OrderAdminSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Orders = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { allOrders, allLoading, allError, pagination, sort } = useSelector((state) => state.orderAdmin);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const seeOrderDetails = (orderId) => {
        navigate(`/admin-dashboard/admin-order-details/${orderId}`);
    }

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

    // pagination
    const handlePageChange = useCallback((newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPage(newPage);
        }
    }, [dispatch, pagination.totalPages]);

    const getPageNumbers = (currentPage, totalPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5; // Number of page buttons to display at once

        let startPage = Math.max(0, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        if (endPage - startPage < maxPageButtons - 1) {
            if (startPage === 0) {
                endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);
            } else if (endPage === totalPages - 1) {
                startPage = Math.max(0, endPage - maxPageButtons + 1);
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers(page, pagination.totalPages);


    useEffect(() => {
        if (id) {
            dispatch(allOrdersTwo({ id, page, size }));
        }
    }, [dispatch, id, page, size]);


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

                    <p className="textBig fontGray wh">Showing {pagination.numberOfElements} of {pagination.totalItems} orders</p>
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
                            <div className="descrip2">Order Status</div>
                        </div>
                        <div className="order-title-box">
                            <div className="descrip2">Items</div>
                        </div>
                        <div className="order-title-box last-box-title">
                            <div className="descrip2">Action</div>
                        </div>
                    </div>

                    {allLoading ? (
                        <p>Loading...</p>
                    ) : allError ? (
                        <p>Error fetching orders</p>
                    ) : (
                        allOrders && Object.values(allOrders).map((order) => (
                            <div className="admin-order-title" key={order.orderId}>
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
                                    <div className="descrip">{order.status}</div>
                                </div>
                                <div className="order-list-box">
                                    <div className="descrip">{order?.orderItems?.length}</div>
                                </div>
                                <div className="order-list-box last-box-list">
                                    <div className='divshake1' onClick={() => {seeOrderDetails(order.orderId)}}><VisibilityIcon style={{ color: 'rgb(233, 218, 0)' }} /></div>
                                    <div className='divshake3'><DeleteIcon style={{ color: 'rgb(250, 47, 47)' }} /></div>
                                </div>
                            </div>
                        ))
                    )}

                    {(allOrders && allOrders.length > 0) &&
                        (<div className="pagination" style={{ marginTop: '20px' }}>

                            <div className="flex wh" style={{ gap: '10px' }}>
                                <button className='pagination-btn' onClick={() => handlePageChange(0)} disabled={pagination.isFirst}>
                                    First Page
                                </button>
                                <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!pagination.hasPrevious}>
                                    Previous
                                </button>
                            </div>

                            <div className="flex wh" style={{ gap: '10px' }}>
                                {pageNumbers.map(index => (
                                    <button key={index} className={`pagination-btn ${index === page ? 'active' : ''}`} onClick={() => handlePageChange(index)}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <div className="flex wh" style={{ gap: '10px' }}>
                                <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!pagination.hasNext}>
                                    Next
                                </button>
                                <button className='pagination-btn' onClick={() => handlePageChange(pagination.totalPages - 1)} disabled={pagination.isLast}>
                                    Last Page
                                </button>
                            </div>

                        </div>)
                    }
                </div>
            </div>
        </Fragment>
    )
};

export default Orders;