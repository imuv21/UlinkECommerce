import React, { Fragment } from 'react'
import './ShowOrder.css'
import Box from '../../../../assets/box.png'

const ShowOrder = () => {
  return (
    <Fragment>

      <div className='showorder'>
        <div className='box-img'>
          <img className='box-icon' src={Box} />
          <div className='headings '>You don’t have any orders yet
          </div>
          <button className=' start-shopping-btn'>Start Shopping</button>
        </div>
   
      </div>
    </Fragment>
  )
}

export default ShowOrder