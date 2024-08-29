import React, { useEffect, useState } from 'react'
import './OrderPage.css'
import { CiFilter } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const OrderPage = () => {
    const [filterData, setFilterData] = useState({
        orderNumber: '',
        orderStatus: '',
        paymentStatus: '',
        paymentMethod: '',
        sortBy: ""
    })
    const handleClearFilter = (e) => {
        e.preventDefault()
        setFilterData({
            orderNumber: '',
            orderStatus: '',
            paymentStatus: '',
            paymentMethod: '',
            sortBy: ""
        })
    }
    const navigate = useNavigate()
    const ViewOrderDetail = () => {
        navigate('/view-detail')
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterData({
            ...filterData,
            [name]: value
        })
    }
    return (
        <div className='mt position bor-1'>

            <Helmet>
                <title>Order Management | Ulinkit - Track and Manage Your Orders</title>
                <meta name="description" content="View and manage your orders on Ulinkit. Track order statuses, view order details, and handle returns or cancellations directly from your order management dashboard." />
                <link rel="canonical" href="https://www.ulinkit.com/order-page" />

            </Helmet>
            <div className='userDashboard'>
                <h1 className='user-titles pay-title '>Orders</h1>
            </div>
            <div className='filter-Option '>
                <div className='filter-border-1'>
                    <div className='img-flex '>
                        <CiFilter className='filter-icon' />
                        <p className='paragraph-4'>Filter</p>
                    </div>
                    <form onSubmit={handleClearFilter}>
                        <div className='filter-option'>
                            <label className='paragraph-6'>Search by order number</label><br></br>
                            <input className='filter-option-boxex' type='text' name='orderNumber' value={filterData.orderNumber} placeholder='Enter order number' onChange={handleChange} />
                        </div>
                        <div className='filter-option'>
                            <label className='paragraph-6'>Order status
                            </label><br></br>
                            <select className='filter-option-boxex' name="orderStatus" value={filterData.orderStatus} onChange={handleChange}>
                                <option>All</option>
                                <option>Pending</option>
                                <option>Placed</option>
                                <option>In Progress </option>
                                <option>Delivered </option>
                                <option>Cancelation </option>
                            </select>
                        </div>
                        <div className='filter-option'>
                            <label className='paragraph-6'>Payment Status

                            </label><br></br>
                            <select className='filter-option-boxex' name='paymentStatus' value={filterData.paymentStatus} onChange={handleChange}>
                                <option>All</option>
                                <option> Payment Pending</option>
                                <option>Paid</option>
                                <option>Payment Pending Varification </option>
                                <option>Payment Partially Repeat </option>
                            </select>
                        </div>
                        <div className='filter-option'>
                            <label className='paragraph-6'>Payment Methode
                            </label><br></br>
                            <select className='filter-option-boxex' name=" paymentMethode" value={filterData.paymentMethod} onChange={handleChange}>
                                <option>All</option>
                                <option>Credit Card</option>
                                <option>Cash On Delivery</option>
                                <option>Bank Transfer </option>
                                <option>Credit Line</option>
                                <option>Apply Pay </option>
                            </select>
                        </div>
                        <div className='filter-option'>
                            <label className='paragraph-6'> Sort By
                            </label><br></br>
                            <select className='filter-option-boxex' value={filterData.sortBy} name='sortBy' onChange={handleChange}>
                                <option>All</option>
                                <option>Oldest</option>
                                <option>Newest</option>
                            </select>
                        </div>
                        <button className='filter-option-boxex clear' type='submit' >Clear Filter</button>
                    </form>
                </div>
                <div className='filter-border-3'>
                    <div className='filter-border-2'>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dis'>Order</p>
                                <p className='dis '>Created Date</p>
                                <p className='dis'>Payment Method</p>
                                <p className='dis'>Order Status</p>
                                <p className='dis'>Payment Status</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dis'>Total Order</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dise'>Ulink4545454</p>
                                <p className='dise '>03/07/2001</p>
                                <p className='dise'>********4254</p>
                                <p className='dise'>Cancelled</p>
                                <p className='dise'>Payment Pending</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dise'>AED 0</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <img className='rfq-image' src='https://images-na.ssl-images-amazon.com/images/I/71WGsXRgQrL._AC_UL232_SR232,232_.jpg' alt='product' />
                                <p className='paragraph-2'>2024 Mobile Phones A14 pro max 6.8Inches 16GB+1TB phone 4G Smartphone Unlock Android Blue,16g x5</p>
                            </div>
                            <div className='second-dis'>
                                <p className='disce' onClick={ViewOrderDetail}>View Detail</p>
                            </div>
                        </div>
                    </div>
                    <div className='filter-border-2'>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dis'>Order</p>
                                <p className='dis '>Created Date</p>
                                <p className='dis'>Payment Method</p>
                                <p className='dis'>Order Status</p>
                                <p className='dis'>Payment Status</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dis'>Total Order</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dise'>Ulink4545454</p>
                                <p className='dise '>03/07/2001</p>
                                <p className='dise'>********4254</p>
                                <p className='dise'>Cancelled</p>
                                <p className='dise'>Payment Pending</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dise'>AED 0</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <img className='rfq-image' src='https://images-na.ssl-images-amazon.com/images/I/71fizOWwhFL._AC_UL232_SR232,232_.jpg' alt='product' />
                                <p className='paragraph-2'>2024 Mobile Phones A14 pro max 6.8Inches 16GB+1TB phone 4G Smartphone Unlock Android Blue,16g x5</p>
                            </div>
                            <div className='second-dis'>
                                <p className='disce' onClick={ViewOrderDetail} >View Detail</p>
                            </div>
                        </div>
                    </div>
                    <div className='filter-border-2'>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dis'>Order</p>
                                <p className='dis '>Created Date</p>
                                <p className='dis'>Payment Method</p>
                                <p className='dis'>Order Status</p>
                                <p className='dis'>Payment Status</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dis'>Total Order</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dise'>Ulink4545454</p>
                                <p className='dise '>03/07/2001</p>
                                <p className='dise'>********4254</p>
                                <p className='dise'>Cancelled</p>
                                <p className='dise'>Payment Pending</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dise'>AED 0</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <img className='rfq-image' src='https://images-na.ssl-images-amazon.com/images/I/81nve2MR2aL._AC_UL232_SR232,232_.jpg' alt='product' />
                                <p className='paragraph-2'>2024 Mobile Phones A14 pro max 6.8Inches 16GB+1TB phone 4G Smartphone Unlock Android Blue,16g x5</p>
                            </div>
                            <div className='second-dis'>
                                <p className='disce' onClick={ViewOrderDetail} >View Detail</p>
                            </div>
                        </div>
                    </div>
                    <div className='filter-border-2'>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dis'>Order</p>
                                <p className='dis '>Created Date</p>
                                <p className='dis'>Payment Method</p>
                                <p className='dis'>Order Status</p>
                                <p className='dis'>Payment Status</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dis'>Total Order</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dise'>Ulink4545454</p>
                                <p className='dise '>03/07/2001</p>
                                <p className='dise'>********4254</p>
                                <p className='dise'>Cancelled</p>
                                <p className='dise'>Payment Pending</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dise'>AED 0</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <img className='rfq-image' src='https://m.media-amazon.com/images/I/814hp8QMsjL._AC_SY741_.jpg' alt='product' />
                                <p className='paragraph-2'>2024 Mobile Phones A14 pro max 6.8Inches 16GB+1TB phone 4G Smartphone Unlock Android Blue,16g x5</p>
                            </div>
                            <div className='second-dis'>
                                <p className='disce' onClick={ViewOrderDetail} >View Detail</p>
                            </div>
                        </div>
                    </div>
                    <div className='filter-border-2'>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dis'>Order</p>
                                <p className='dis '>Created Date</p>
                                <p className='dis'>Payment Method</p>
                                <p className='dis'>Order Status</p>
                                <p className='dis'>Payment Status</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dis'>Total Order</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dise'>Ulink4545454</p>
                                <p className='dise '>03/07/2001</p>
                                <p className='dise'>********4254</p>
                                <p className='dise'>Cancelled</p>
                                <p className='dise'>Payment Pending</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dise'>AED 0</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <img className='rfq-image' src='https://m.media-amazon.com/images/I/814hp8QMsjL._AC_SY741_.jpg' alt='product' />
                                <p className='paragraph-2'>2024 Mobile Phones A14 pro max 6.8Inches 16GB+1TB phone 4G Smartphone Unlock Android Blue,16g x5</p>
                            </div>
                            <div className='second-dis'>
                                <p className='disce' onClick={ViewOrderDetail} >View Detail</p>
                            </div>
                        </div>
                    </div>
                    <div className='filter-border-2'>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dis'>Order</p>
                                <p className='dis '>Created Date</p>
                                <p className='dis'>Payment Method</p>
                                <p className='dis'>Order Status</p>
                                <p className='dis'>Payment Status</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dis'>Total Order</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <p className='dise'>Ulink4545454</p>
                                <p className='dise '>03/07/2001</p>
                                <p className='dise'>********4254</p>
                                <p className='dise'>Cancelled</p>
                                <p className='dise'>Payment Pending</p>
                            </div>
                            <div className='second-dis'>
                                <p className='dise'>AED 0</p>
                            </div>
                        </div>
                        <div className='order-status'>
                            <div className='first-dis'>
                                <img className='rfq-image' src='https://m.media-amazon.com/images/I/814hp8QMsjL._AC_SY741_.jpg' alt='product' />
                                <p className='paragraph-2'>2024 Mobile Phones A14 pro max 6.8Inches 16GB+1TB phone 4G Smartphone Unlock Android Blue,16g x5</p>
                            </div>
                            <div className='second-dis'>
                                <p className='disce' onClick={ViewOrderDetail} >View Detail</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderPage