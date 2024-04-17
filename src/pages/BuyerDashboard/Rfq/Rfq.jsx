import React, { Fragment } from 'react'
import { useState } from "react";
import './Rfq.css'
import { CiSearch } from 'react-icons/ci'
// import { HiOutlineDocumentPlus } from "react-icons/hi2";
// import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Document from '../../../assets/document-icon.png'

const Rfq = () => {
    const [active, setActive] = useState("No RFQ")
    
    const [startdate, setStartDate] = useState(new Date());
   const [finishDate, setFinishDate] = useState(new Date())
    const [open, setOpen] = useState(false);


   const checkActive = (e) => {
          setActive("No Rfq" )
   }
   const checkClose=(e)=>{
    setActive('No Closed Rfqs')
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

    return (
        <Fragment>
            <div className='mt buyer-message'>
                <div className='flex-space-beetwen'>
                    <div className='message-titles-heading1'>
                        <h1 className='user-title  heading-2 '>My Requests for Quotations</h1>
                    </div>
                    <div className='message-titles-heading1'>
                        <button className='create-btn '>CREATE RFQ</button>
                    </div>
                </div>
                <div className='justify-content-start'>
                    <div className='boxes boxes-width '>
                        <CiSearch className='search-icon' />
                        <input className='inpurt-boxex input-width' type='text' placeholder='Search by RFQ Id or Product name' />
                    </div>
                    <div className='calender'>
                        {/* <div className='boxes boxes-width-2'>
            <input   className='inpurt-boxex ' type='text' placeholder='From (creation)'  />
            </div> */}

                        <DatePicker selected={startdate}
                            onChange={(startdate) => setStartDate(startdate)}
                            onFocus={handleFocus}
                            onBlur={handleBlur} placeholderText='From (creation)' />

                    </div>
                    <div className='calender'>
                        {/* <div className='boxes boxes-width-2'>
            <input  className='inpurt-boxex' type='text'   placeholder='To (creation)' />
            </div> */}
                        <DatePicker selected={finishDate}
                            onChange={(finishDate) => setFinishDate(finishDate)}
                            onFocus={handleFocuses}
                            onBlur={handleBlures} placeholderText='To (creation)' />




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
         <button onClick={checkActive} className='btn-1 change-btn'>Active</button>
            <button onClick={checkClose}className='btn-2 change-btn'>Closed</button>
         </div>

         <div className='rfq-message-show'>
            <p className='rfq-value'>{active}</p>
            <img src={Document} className='rfq-icon'/>
            <button className='rfq-btns'>CREATE RFQ</button>
         </div>
            </div>
        </Fragment>
    )
}

export default Rfq