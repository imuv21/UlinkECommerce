import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, selectOrders, selectOrdersLoading, selectOrdersError, cancelOrder, selectCancelError, selectCancelSuccess } from '../../Redux/ordersSlice';
import './Translator.css';
import defaulImg from '../../assets/default.jpg';


const Translator = () => {

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

  









    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const loading = useSelector(selectOrdersLoading);
    const error = useSelector(selectOrdersError);

    const cancelError = useSelector(selectCancelError);
    const cancelSuccess = useSelector(selectCancelSuccess);
    const [isCanceling, setIsCanceling] = useState(false);
    const [cancelingOrderId, setCancelingOrderId] = useState(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>Orders</title>
            </Helmet>
            <div className="orderPage">
                <div className="heading wh">Orders ({(orders && orders.length) && orders.filter((order) => order.status !== 'CANCELLED').length})</div>
                {orders && orders.length > 0 ? (
                    orders.filter((order) => order.status !== 'CANCELLED').map((order) => (
                        <div className={`order ${order.status === 'PLACED' ? 'order-placed' : 'order-cancelled'}`} key={order.orderId}>
                            <div className="orderBtn">
                                <div className='heading2'>Order ID : {order.orderId}</div>
                                <button className="remove flex" disabled={isCanceling && cancelingOrderId === order.orderId || order.status === 'CANCELLED'} onClick={() => handleCancelOrder(order.orderId)}>
                                    {isCanceling && cancelingOrderId === order.orderId ? "Cancelling..." : order.status === "CANCELLED" ? "Cancelled" : "Cancel"}
                                </button>
                            </div>
                            <div className='heading2'>Total Price : {order.currencySymbol} {order.totalPrice} {order.currency} </div>
                            <div className='heading2'>Status : {order.status}</div>
                            <div className="heading2">Time & Date : {formattedDateAndTime(order.orderDate) || 'N/A'}</div>
                            <div className="heading2">Products : {order.orderItems.length}</div>
                            <div className="orderProducts">
                                {order.orderItems.map((product) => (
                                    <div className="product" key={product.productId}>
                                        <img src={product.imageUrl ? product.imageUrl : defaulImg} alt={product.itemName.length > 18 ? `${product.itemName.substring(0, 18)}...` : product.itemName} />
                                        <div className="productDetail">
                                            <div className="descrip">{product.itemName.length > 18 ? `${product.itemName.substring(0, 18)}...` : product.itemName}</div>
                                            <div className="descrip">Quantity : {product.quantity}</div>
                                            <div className="descrip">Price : {product.currencySymbol} {(product.itemPrice).toFixed(2)} {product.currency}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found</p>
                )}
            </div>
        </div>
    )
}

export default Translator