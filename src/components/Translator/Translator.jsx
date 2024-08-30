import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders, cancelOrder, selectCancelError, selectCancelSuccess } from '../../Redux/ordersSlice';


const Translator = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, loading, error, totalItems, totalPages, numberOfElements, hasNext, hasPrevious, isFirst, isLast } = useSelector((state) => state.orders);

    const cancelError = useSelector(selectCancelError);
    const cancelSuccess = useSelector(selectCancelSuccess);
    const [isCanceling, setIsCanceling] = useState(false);
    const [cancelingOrderId, setCancelingOrderId] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        dispatch(fetchOrders({ page, size }));
    }, [dispatch, page, size]);

    useEffect(() => {
        if (isCanceling && cancelingOrderId !== null) {
            if (cancelSuccess) {
                dispatch(fetchOrders());
                setIsCanceling(false);
                setCancelingOrderId(null);
            } else if (cancelError) {
                alert(cancelError);
                setIsCanceling(false);
                setCancelingOrderId(null);
            }
        }
    }, [cancelSuccess, cancelError, isCanceling, cancelingOrderId, dispatch]);

    const handleCancelOrder = (orderId) => {
        if (isCanceling || cancelingOrderId === orderId) return;
        setIsCanceling(true);
        setCancelingOrderId(orderId);

        try {
            dispatch(cancelOrder(orderId));
        } catch (error) {
            alert(error);
            setIsCanceling(false);
            setCancelingOrderId(null);
        }
    };

    const orderDetail = (orderId) => {
        navigate(`/order-details/${orderId}`);
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
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    }, [dispatch, totalPages]);

    const getPageNumbers = (currentPage, totalPages) => {
        const pageNumbers = [];
        const maxPageButtons = 5; // Number of page buttons to display at once

        // Determine the start and end page numbers
        let startPage = Math.max(0, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        // always show the correct number of page buttons
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
    const pageNumbers = getPageNumbers(page, totalPages);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>View Your Orders | Ulinkit - Track and Manage Your Online Orders</title>
                <meta name="description" content="View and manage your orders on Ulinkit. Track order status, access detailed invoices, and stay updated on your online shopping with ease." />
                <link rel="canonical" href="https://www.ulinkit.com/orders" />
            </Helmet>
            <div className="orderPage">
                <p className="heading wh">Showing {numberOfElements} of {totalItems} orders</p>
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <div className={`order ${order.status === 'PLACED' ? 'order-placed' : 'order-cancelled'}`} key={order.orderId}>
                            <div className="orderBtn">
                                <p className='heading2'>Order ID : {order.orderId}</p>

                                <div className="orderBtnCont">
                                    <button className="remove flex" disabled={isCanceling && cancelingOrderId === order.orderId || order.status === 'CANCELLED'} onClick={() => handleCancelOrder(order.orderId)}>
                                        {isCanceling && cancelingOrderId === order.orderId ? "Cancelling..." : order.status === "CANCELLED" ? "Cancelled" : "Cancel"}
                                    </button>
                                    <button className='btn box flex' onClick={() => orderDetail(order.orderId)} style={{ display: order.status === "CANCELLED" ? 'none' : 'flex' }}>View</button>
                                </div>
                            </div>
                            <p className='heading2'>Total Price : {order.currencySymbol} {Number(order.totalPrice).toFixed(2)} {order.currency} </p>
                            <p className="heading2">Time & Date : {formattedDateAndTime(order.orderDate) || 'N/A'}</p>
                            <p className='heading2'>Status : {order.status}</p>

                            <p className="heading2">Products : {order.orderItems.length}</p>
                            <div className="orderProducts">
                                {order.orderItems.map((product) => (
                                    <div className="product" key={product.productId}>
                                        <img src={product.imageUrl ? product.imageUrl : defaulImg} alt={product.itemName.length > 18 ? `${product.itemName.substring(0, 18)}...` : product.itemName} />
                                        <div className="productDetail">
                                            <p className="descrip">{product.itemName.length > 18 ? `${product.itemName.substring(0, 18)}...` : product.itemName}</p>
                                            <p className="descrip">Quantity : {product.quantity}</p>
                                            <p className="descrip">Price : {product.currencySymbol} {Number(product.itemPrice).toFixed(2)} {product.currency}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='heading2'>No orders found</p>
                )}

                {(orders && orders.length > 0) &&
                    (<div className="pagination">

                        <div className="flex wh" style={{ gap: '10px' }}>
                            <button className='pagination-btn' onClick={() => handlePageChange(0)} disabled={isFirst}>
                                First Page
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(page - 1)} disabled={!hasPrevious}>
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
                            <button className='pagination-btn' onClick={() => handlePageChange(page + 1)} disabled={!hasNext}>
                                Next
                            </button>
                            <button className='pagination-btn' onClick={() => handlePageChange(totalPages - 1)} disabled={isLast}>
                                Last Page
                            </button>
                        </div>

                    </div>)
                }
            </div>
        </div>
    )
}

export default Translator