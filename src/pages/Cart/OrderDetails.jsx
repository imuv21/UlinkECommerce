import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../Redux/invoiceSlice';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { urls } from '../../components/Schemas/images';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { buyer, address, orderDetails, loading, error } = useSelector((state) => state.invoices);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchInvoices(orderId));
        }
    }, [dispatch, orderId]);


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

    const download = () => {

        const input = document.querySelector('.orderDetail2');

        const loadImages = () => {
            const images = input.querySelectorAll('img');
            const promises = Array.from(images).map((img) => {
                return new Promise((resolve) => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.onload = resolve;
                        img.onerror = resolve;
                    }
                });
            });
            return Promise.all(promises);
        };

        loadImages().then(() => {
            html2canvas(input, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size

                const imgWidth = 210;
                const pageHeight = 295;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save(`order-invoice-${orderDetails.orderId}.pdf`);
            });
        });
    };

    //images
    const logo = urls[0];

    const calculateTotlTax = () => {
        if (orderDetails && orderDetails.orderItems && orderDetails.orderItems.length > 0) {
            const totalTax = orderDetails.orderItems.reduce((acc, item) => {
                return acc + Number(item.totalTax);
            }, 0);
            return totalTax.toFixed(2);
        }
        return "0.00";
    };



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!buyer || !orderDetails || !address) return <p>No data available</p>;


    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>Order Details</title>
            </Helmet>
            <div className="orderDetail">
                <div className="orderBtn">
                    <p className='heading3'>Order Details for {orderDetails.orderId}</p>
                    <button className='btn box flex' onClick={download}>Download Invoice</button>
                </div>

                <article className="orderDetail2">
                    <img src={logo} alt="ulinkit logo" />

                    <div className="orderDetailSub">
                        <div className="descrip2">Ship To : </div>
                        <div className='heading2'>{buyer}</div>
                        <div className='heading2'>{address.address || 'Null'}, {address.city || 'Null'}, {address.selectedOrigin || 'Null'}</div>
                        <div className="heading2">{address.area || 'Null'}, {address.street || 'Null'}, {address.office || 'Null'}</div>
                    </div>

                    <div className="dotLine"></div>

                    <div className="orderDetailSub">
                        <h1 className="heading2">Order ID : {orderDetails.orderId}</h1>
                    </div>

                    <div className="order">
                        <div className="heading3">Delivery Address</div>
                        <div className='heading2'>{address.address || 'Null'}, {address.city || 'Null'}, {address.selectedOrigin || 'Null'}</div>
                        <div className="heading2">{address.area || 'Null'}, {address.street || 'Null'}, {address.office || 'Null'}</div>
                        <div className='heading2'>Pobox : {address.pobox || 'Null'}</div>
                        <div className='heading2'>Post Code : {address.postCode || 'Null'}</div>
                    </div>

                    <h2 className='heading3'>Order Items ({(orderDetails && orderDetails.orderItems && orderDetails.orderItems.length) && orderDetails.orderItems.length})</h2>

                    <div className="orderProducts">
                        {orderDetails && orderDetails.orderItems && orderDetails.orderItems.length > 0 ? orderDetails.orderItems.map((item) => (
                            <div className="product" key={item.itemId}>
                                <div className="productDetail">
                                    <div className="descrip">{item.itemName.length > 18 ? `${item.itemName.substring(0, 18)}...` : item.itemName}</div>
                                    <div className="descrip">Quantity : {item.quantity}</div>
                                    <div className="descrip">Price : {item.currencySymbol} {Number(item.itemPrice).toFixed(2)}  {item.currency}</div>
                                    <div className="descrip">GST : {item.gst}</div>
                                </div>
                            </div>
                        )) : (<div className='heading2'>No items available</div>)}
                    </div>

                    <div className="orderDetailSub">
                        <div className="heading2">Buyer Name : {buyer}</div>
                        <div className="heading2">Subtotal : {Number(orderDetails.totalSellPrice).toFixed(2)}</div>
                        <div className="heading2">Total Tax : {calculateTotlTax()}</div>
                        <div className='heading2'>Total Price : {orderDetails.currencySymbol} {Number(orderDetails.totalPrice).toFixed(2)} {orderDetails.currency}</div>
                        <div className='heading2'>Time & Date : {formattedDateAndTime(orderDetails.orderDate) || 'N/A'}</div>
                        <div className="descrip">Thank you for buying from Ulinkit.com</div>
                    </div>

                    <div className="dotLine"></div>

                    <p className="heading wh flex">
                        Ulinkit.com Declaration Letter To Whomsoever It May Concern
                    </p>

                    <p className="heading2">I, {buyer}, have placed the order for</p>

                    <p className='heading3'>Order Items ({(orderDetails && orderDetails.orderItems && orderDetails.orderItems.length) && orderDetails.orderItems.length})</p>
                    <div className="orderProducts">
                        {orderDetails && orderDetails.orderItems && orderDetails.orderItems.length > 0 ? orderDetails.orderItems.map((item) => (
                            <div className="product" key={item.itemId}>
                                <div className="productDetail">
                                    <div className="descrip">{item.itemName.length > 18 ? `${item.itemName.substring(0, 18)}...` : item.itemName}</div>
                                    <div className="descrip">Quantity : {item.quantity}</div>
                                    <div className="descrip">Price : {item.currencySymbol} {Number(item.itemPrice).toFixed(2)} {item.currency}</div>
                                    <div className="descrip">GST : {item.gst}</div>
                                </div>
                            </div>
                        )) : (<div className='heading2'>No items available</div>)}
                    </div>

                    <div className="orderDetailSub">
                        <div className='heading3'>Order ID : {orderDetails.orderId}</div>
                        <div className='heading2'>{buyer}</div>
                        <div className='heading2'>{address.address || 'Null'}, {address.city || 'Null'}, {address.selectedOrigin || 'Null'}</div>
                        <div className="heading2">{address.area || 'Null'}, {address.street || 'Null'}, {address.office || 'Null'}</div>
                    </div>

                    <p className="heading2">
                        I hereby confirm that above goods are being purchased for my internal or personal purpose and not for re-sale. I further understand and agree to Ulinkits terms and conditions of sale available at Ulinkit.com or upon request.
                    </p>
                </article>
            </div>
        </div>
    );
};

export default OrderDetails;
