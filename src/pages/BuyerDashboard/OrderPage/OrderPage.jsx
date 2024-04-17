import React, { Fragment } from 'react'
import './OrderPage.css'
import FilterOrder from './FilterOrder/FilterOrder'
import ShowOrder from './ShowOrder/ShowOrder'
import Metadata from '../../../components/Metadata'

const OrderPage = () => {
  return (
    <Fragment>
    <div className='order-page'>
    <Metadata title="Order Page"/>
      <div className='userDashboard'>
        <h1 className='user-titles'>Orders</h1>
      </div>
      <div className='flex seller-dash  user-titles  ' >
        <FilterOrder/>
        <ShowOrder/>
      </div>
    </div>
    </Fragment>
  )

}

export default OrderPage