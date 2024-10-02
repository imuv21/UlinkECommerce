import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { orderDetailSlice } from '../../Redux/OrderAdminSlice';
import { useParams } from 'react-router-dom';

const AdminOrderDetails = () => {

    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { orderDetailsData, detaiLoading, detailError } = useSelector((state) => state.orderAdmin);
    const address = orderDetailsData?.address;
    const orderDetails = orderDetailsData?.orderDetails;

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

    const calculateTotlTax = () => {
        if (orderDetails && orderDetails.orderItems && orderDetails.orderItems.length > 0) {
            const totalTax = orderDetails.orderItems.reduce((acc, item) => {
                return acc + Number(item.totalTax);
            }, 0);
            return totalTax.toFixed(2);
        }
        return "0.00";
    };

    useEffect(() => {
        if (orderId) {
            dispatch(orderDetailSlice(orderId));
        }
    }, [dispatch, orderId]);

    return (
        <Fragment>
            <Helmet>
                <title>Orders Details | Ulinkit Admin Dashboard - Efficient Order Management</title>
                <meta name="description" content="Access the Ulinkit admin dashboard to manage and review orders, track order status, and oversee the fulfillment process efficiently. Optimize your order management for a smooth and organized operation." />
                <link rel="canonical" href="https://www.ulinkit.com/admin-dashboard/admin-order-details" />
            </Helmet>

            {/* <div className='adminpage outline3'>
            </div> */}

            <div className="order-container">
                <div className="heading5 fontGray wh">Order Details</div>

                {detaiLoading ? (
                    <p>Loading...</p>
                ) : detailError ? (
                    <p>Error fetching order details {detailError}</p>
                ) : (
                    <>
                        <div className="order-summary">
                            <h2 className='heading6 fontGray wh'>Order Summary</h2>
                            <p><strong>Order ID:</strong> {orderDetails?.orderId}</p>
                            <p><strong>Status:</strong> {orderDetails?.status}</p>
                            <p><strong>Buyer:</strong> {orderDetailsData?.buyer}</p>
                            <p><strong>Order Date:</strong> {formattedDateAndTime(orderDetails?.orderDate) || 'N/A'}</p>
                            <p><strong>Subtotal:</strong> {orderDetails?.currencySymbol} {orderDetails?.totalSellPrice} {orderDetails?.currency}</p>
                            <p><strong>Total Tax:</strong> {orderDetails?.currencySymbol} {calculateTotlTax()} {orderDetails?.currency}</p>
                            <p><strong>Total Price:</strong> {orderDetails?.currencySymbol} {Number(orderDetails?.totalPrice).toFixed(2)} {orderDetails?.currency}</p>
                        </div>

                        <div className="address-section">
                            <h2 className='heading6 fontGray wh'>Shipping Address</h2>
                            <p><strong>Address:</strong> {address?.address}, {address?.city}, {address?.selectedOrigin}</p>
                            <p><strong>Street:</strong> {address?.street}, {address?.area}</p>
                            <p><strong>Post Code:</strong> {address?.postCode}</p>
                            <p><strong>Phone Number:</strong> {address?.phoneNumber}</p>
                            <p><strong>Office:</strong> {address?.office}</p>
                            <p><strong>Pobox:</strong> {address?.pobox}</p>
                        </div>

                        <div className="order-items-section">
                            <h2 className='heading6 fontGray wh'>Items Ordered</h2>
                            {orderDetails?.orderItems.map((item, index) => (
                                <div className="order-item" key={index}>
                                    <img src={item.imageUrl} alt={item.itemName} className="item-image" />
                                    <div className="item-details">
                                        <p><strong>Item Name:</strong> {item.itemName}</p>
                                        <p><strong>Price:</strong> {item.currencySymbol} {item.itemPrice} {item.currency}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>GST:</strong> {item.gst}</p>
                                        <p><strong>Product ID:</strong> {item.productId}</p>
                                        <p><strong>Seller:</strong> {item.seller?.name} ({item.seller?.companyName}, {item.seller?.countryOfoperation})</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Fragment>
    )
};

export default AdminOrderDetails;