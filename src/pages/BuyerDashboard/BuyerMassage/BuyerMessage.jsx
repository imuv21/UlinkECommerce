import React, { Fragment } from 'react'
import './BuyerMessage.css'
import { TiMessages } from "react-icons/ti";
const BuyerMessage = () => {
  return (
    <Fragment>
      <div className='mt buyer-message'>
       <div className='flex-space-beetwen'>
        <div className='message-titles-heading1'>
          <h1 className='user-title'>Message</h1>
        </div>
        <div className='message-titles-heading1'>
          <p className='message-notification'>Seller Message (0)</p>
        </div>
       </div>
       <div className='border-1'>
        <div className='border-2'>
          <div className='border-3'>
         <div className='two-item'>
         <button className='btn-1'>Inquiries</button>
            <button className='btn-2'>RFQ</button>
         </div>
         <div className='boxes inp'>
            <input  className='inpurt-boxex' type='number'  placeholder='Search by order number' />
            </div>
          </div>
          <div className='border-4'>
           <div className='content'>
           <TiMessages className='message-icon'/>
           <p className='paragraph-1'>You don’t have any messages. When buyers send you messages, you can view them here.</p>
           </div>
          </div>
        </div>
       </div>
      </div>
    </Fragment>
  )
}

export default BuyerMessage