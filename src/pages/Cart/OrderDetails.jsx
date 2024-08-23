import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../Redux/invoiceSlice';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import defaulImg from '../../assets/default.jpg';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { invoices, loading, error } = useSelector((state) => state.invoices);

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

        const input = document.querySelector('.orderDetail'); 
    
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
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!invoices) return <p>No data available</p>;

    const { orderDetails, address, buyer } = invoices;

    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>Order Details</title>
            </Helmet>
            <div className="orderDetail">
                <div className="orderBtn">
                    <div className='heading3'>Order Details for {orderDetails.orderId}</div>
                    <button className='btn box flex' onClick={download}>Download Invoice</button>
                </div>

                <div className="orderDetailSub">
                    <div className='descrip2'>Buyer : {buyer}</div>
                    <div className="descrip2">Status : {orderDetails.status}</div>
                    <div className='descrip2'>Time & Date : {formattedDateAndTime(orderDetails.orderDate) || 'N/A'}</div>
                    <div className="descrip2">Products : {orderDetails.orderItems.length}</div>
                    <div className='descrip2'>Total Price : {orderDetails.currencySymbol} {Number(orderDetails.totalPrice).toFixed(2)} {orderDetails.currency}</div>
                </div>

                <div className='heading3'>Shipping Address</div>

                <div className="orderDetailSub">
                    <div className='descrip2'>{address.address || 'Null'}, {address.city || 'Null'}, {address.selectedOrigin || 'Null'}</div>
                    <div className="descrip2">{address.area || 'Null'}, {address.street || 'Null'}, {address.office || 'Null'}</div>
                    <div className='descrip2'>Pobox : {address.pobox || 'Null'}</div>
                    <div className='descrip2'>Post Code : {address.postCode || 'Null'}</div>
                    <div className="descrip2">Number : {(address.selectedCountry && address.phoneNumber) ? `${address.selectedCountry}--${address.phoneNumber}` : 'Null'}</div>
                </div>

                <div className='heading3'>Order Items</div>
                <div className="orderProducts">
                    {orderDetails.orderItems && orderDetails.orderItems.length > 0 ? orderDetails.orderItems.map((item) => (
                        <div className="product" key={item.itemId}>
                            <img className='imgProItem' src={item.imageUrl ? item.imageUrl : defaulImg} alt={item.itemName.length > 18 ? `${item.itemName.substring(0, 18)}...` : item.itemName} />
                            <div className="productDetail">
                                <div className="descrip">{item.itemName.length > 18 ? `${item.itemName.substring(0, 18)}...` : item.itemName}</div>
                                <div className="descrip">Quantity : {item.quantity}</div>
                                <div className="descrip">Price : {item.currencySymbol} {Number(item.itemPrice).toFixed(2)}  {item.currency}</div>
                                <div className="descrip">GST : {item.gst}</div>
                            </div>
                        </div>
                    )) : (<div className='heading2'>No items available</div>)}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
