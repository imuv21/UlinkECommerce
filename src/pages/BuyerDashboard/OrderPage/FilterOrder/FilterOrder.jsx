import React, { Fragment, useState } from 'react'
import './FilterOrder.css'
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";


const FilterOrder = () => {
    const [ordernumber, setOrderNumber]= useState('')
  return (
     <Fragment>
        <div className='sidenav-container'>
           <h1 className='user-filter'><CiFilter className='filter-icon' /> Filter</h1>
           <div className='filter-items'>
            <p className='user-subtitles'>Search by order number</p>
            <div className='boxes'>
            <CiSearch className='search-icon' />
            <input onChange={(e) => setOrderNumber(e.target.value)} className='inpurt-boxex' type='number' value={ordernumber} placeholder='Search by order number' />
            </div>
            <div className='boxex-order'>
                <p className='user-subtitleses'>Order Status</p>
                <select  className='order-status'>
                   <option>Order Status (All)</option>
                    <option>Pending</option>
                    <option>Completed</option>
                </select>
            </div>
            <div className='boxex-order'>
                <p className='user-subtitleses'>Payment Status</p>
                <select className='order-status'>
                   <option>Payment Status (All)</option>
                    <option>Pending</option>
                    <option>Completed</option>
                </select>
            </div>
            <div className='boxex-order'>
                <p className='user-subtitleses'>Payment Methode</p>
                <select className='order-status'>
                   <option>Payment Methode (All)</option>
                    <option>Pending</option>
                    <option>Completed</option>
                </select>
            </div>
            <div className='boxex-order'>
                <button className='clear-filter-btn' >CLEAR FILTER</button>
            </div>
           </div>
        </div>
     </Fragment>
  )
}

export default FilterOrder