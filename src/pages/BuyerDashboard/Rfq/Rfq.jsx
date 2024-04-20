import React, { Fragment, useEffect } from 'react'
import { useState } from "react";
import './Rfq.css'
import { CiSearch } from 'react-icons/ci'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Document from '../../../assets/document-icon.png'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
const Rfq = () => {
    const [active, setActive] = useState(false)
    const [rfqDataShow, setRfqDataShow] = useState(true)
    const [startdates, setStartDates] = useState(new Date(null));
    const [finishDates, setFinishDates] = useState(new Date(null))
    const [open, setOpen] = useState(false);
    const [rfqDataStored, setRfqDataStored] = useState([])

//    data access here code
    const location = useLocation()
    const rfqData = location.state;

    console.log("rfqData:", rfqData);
    const addproduct = rfqData?.addproduct || [];
    const startdate = rfqData?.updateadditonalDetail?.startdate;
    console.log("startdate:", startdate);
 
//     //  local Storage for storing the data
    const rfqDataStore = JSON.stringify(rfqData);
    localStorage.setItem('rfqData', rfqDataStore)
   //  Retrive the data from the local storage

   useEffect(() => {
    const rfqDatasay = localStorage.getItem('rfqData');
    const rfqData = JSON.parse(rfqDatasay);
    setRfqDataStored(rfqData);
}, []);
    const checkActive = (e) => {
        e.preventDefault()
        setActive(false)
        setRfqDataShow(true)
    }
    const checkClose = (e) => {
        e.preventDefault()
        setActive(true)
        setRfqDataShow(false)
    }
    const handleFocus = () => {
        
        setOpen(true);
    };
    const handleBlur = () => {
        setOpen(false);
    };
    const handleFocuses = () => {
        setOpen(true);
    };
    const handleBlures = () => {
        setOpen(false);
    };
    const generateId = () => {
        const alphabet = 'ULINK'
        let id = 'ULINK'
        // genrate first three character
       
        // generate random number
        const numbers = '0123456789'
        for (let i = 0; i < 7; i++) {
            id += numbers.charAt(Math.floor(Math.random() * numbers.length))
        }
        return id
    }
    // calculate the negotiable value
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        let hasNegotiable = false;

        // Iterate over each product
        addproduct.forEach(product => {
            // If the product price is negotiable, set a flag
            if (product.targetprice === 'Negotiable') {
                hasNegotiable = true;
            } else {
                // Otherwise, add the product price to the total
                totalPrice += parseFloat(product.price) || 0;
            }
        });
        // If any product has a negotiable price, return 'Negotiable'
        if (hasNegotiable) {
            return 'Negotiable';
        }
        // Otherwise, return the total price
        return totalPrice.toFixed(2); // Convert to fixed decimal places if needed
    };
    return (
        <Fragment>
            <div className='mt buyer-message'>
                <div className='flex-space-beetwen'>
                    <div className='message-titles-heading1'>
                        <h1 className='user-title  heading-2 '>My Requests for Quotations</h1>
                    </div>
                    <div className='message-titles-heading1'>
                        <Link to='/createrfq'>
                            <button className='create-btn '>CREATE RFQ</button>
                        </Link>
                    </div>
                </div>
                <div className='justify-content-start'>
                    <div className='boxes boxes-width '>
                        <CiSearch className='search-icon' />
                        <input className='inpurt-boxex input-width' type='text' placeholder='Search by RFQ Id or Product name' />
                    </div>
                    <div className='calender'>
                        <DatePicker selected={startdates}
                            onChange={(startdates) => setStartDates(startdates)}
                            onFocus={handleFocus}
                            onBlur={handleBlur} placeholderText='From (creation)' />
                    </div>
                    <div className='calender'>
                        <DatePicker selected={finishDates}
                            onChange={(finishDates) => setFinishDates(finishDates)}
                            onFocus={handleFocuses}
                            onBlur={handleBlures} d placeholderText='To (creation)' />
                    </div>
                    <select className='order-status status-width' placeholder="All Status">
                        <option>All Status</option>
                        <option>Pending Quote</option>
                        <option>Quote Received</option>
                        <option>Quote Accepted</option>
                        <option>Cancelled</option>
                        <option>Rejected</option>
                    </select>
                    <div className='message-titles-heading1'>
                        <button className='filter-btn  filter-margin'>Apply Filter</button>
                    </div>
                    <div className='message-titles-heading1'>
                        <p className='paragraph-3 '>Clear Filter</p>
                    </div>
                </div>
                <div className='two-item item-change'>
                    <button onClick={checkActive} className={`btn-1 change-btn ${active ? 'active' : ''}`}>Active</button>
                    <button onClick={checkClose} className='btn-2 change-btn'>Closed</button>
                </div>
                {active && (
                    <div className='rfq-message-show'>
                        <p className='rfq-value'>{active}</p>
                        <img src={Document} className='rfq-icon' />
                        <button className='rfq-btns'>CREATE RFQ</button>
                    </div>
                )} 
            </div>
            {rfqDataStored && rfqData && rfqData.addproduct && (
                <div className="table-container">
                    <div className='table-containers-head'>
                        <div className=''>RFQ ID</div>
                        <div className='product-name'>Product Name</div>
                        <div className=''>Quotes</div>
                        <div className=''>Total Target</div>
                        <div className=''>Created On</div>
                        <div className=''>Status</div>
                        <div className=''>Action</div>
                    </div>
                    <div className='table-containers-heads vor'>
                        <div className=''>{generateId()}</div>
                        <div className='img-flex data-width '>
                            <div className='img-data'>
                                {rfqData.addproduct.slice(0, Math.min(rfqData.addproduct.length, 4)).map((item, index) => (
                                    <img key={index} className='image-width' src={item.img} alt={`Product ${index + 1}`} />
                                ))}
                            </div>
                            <div className=''>
                                {rfqData.addproduct.slice(0, Math.min(rfqData.addproduct.length, 4)).map((item, index) => (
                                    <p key={index}>{item.pname}</p>
                                ))}
                            </div>
                        </div>
                        <div className=''>0</div>
                        <div className=''>{calculateTotalPrice()}</div>
                        <div className=''>{rfqData.updateadditonalDetail.startdate.toLocaleDateString()}</div>
                        <div className=''>Pending Quotes</div>
                        <div className=''><Link to='/rfqdetail'>View Detail</Link></div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
export default Rfq