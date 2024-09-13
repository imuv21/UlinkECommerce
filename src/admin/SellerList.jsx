import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { HiOutlineEye } from 'react-icons/hi2'
import { IoChevronBack, IoChevronForwardSharp } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md'
import { TbEdit } from "react-icons/tb";

const SellerList = () => {

  const [searchItem, setSearchItem] = useState('')
  const [filteredSeller, setFilteredSeller] = useState([])

  //  seller detail list
  const sellerList = [
    { sellerId: 1, sellerName: 'Vipin Kumar', sellerEmail: 'vipinkm1654@gmail.com', sellerRole: 'Buyer', },
    { sellerId: 2, sellerName: 'Rajesh Kumar', sellerEmail: 'vipinkm1654@gmail.com', sellerRole: 'suyer', },
    { sellerId: 3, sellerName: 'Hello Kumar', sellerEmail: 'vipinkm1654@gmail.com', sellerRole: 'Buyer', },
    { sellerId: 4, sellerName: 'Puneet Kumar', sellerEmail: 'vipinkm1654@gmail.com', sellerRole: 'Buyer', },
    { sellerId: 5, sellerName: 'Advanture Kumar', sellerEmail: 'vipinkm1654@gmail.com', sellerRole: 'suyer', },

  ]

  // Add here the filtered condition value

  const handleSeller = (e) => {
    setSearchItem(e.target.value)
    const filteredSeller = sellerList.filter((seller) => {
      return seller.sellerId.toString().includes(e.target.value) ||
        seller.sellerEmail.toLowerCase().includes(e.target.value.toLowerCase()) ||
        seller.sellerName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        seller.sellerRole.toLowerCase().includes(e.target.value.toLowerCase())

    })
    setFilteredSeller(filteredSeller)
  }
  // seller delete item


  const sellerDelete = (sellerId) => {
    const UpdateSellerList = sellerList.filter((seller) => seller.sellerId !== sellerId)
    console.log(UpdateSellerList)
  }
  return (
    <div className='buyer-list-container'>
      <div className='admin-user-dashboard'>
        <div className='buyer-dash-item'>
          <h3>Seller List</h3>
          <div className='user-item'>
            <CiSearch className='user-search-input' />
            <input type='text' value={searchItem} onChange={handleSeller} className='buyer-search' placeholder='Search...' />
          </div>
        </div>
        {/*  user role field show the  */}
        <div className='user-list-item  user-list-bg' >
          <div className='user-list'>Seller Id</div>
          <div className='user-list'>Name</div>
          <div className='user-list'>Email</div>
          <div className='user-list'>Role</div>
          <div className='user-list'>Action</div>
        </div>
        {filteredSeller.length > 0 ? (
          filteredSeller.map((sellerDetail, id) => (
            <div key={id} className='user-list-item'>
              <div className='user-list-size'>{sellerDetail.sellerId}</div>
              <div className='user-list-size'>{sellerDetail.sellerName}</div>
              <div className='user-list-size'>{sellerDetail.sellerEmail}</div>
              <div className='user-list-size'>{sellerDetail.sellerRole}</div>
              <div className='user-list-size  date-flex-item '>
                <HiOutlineEye className='action-icon-size' />
                <TbEdit className='action-icon-size' />
                <MdDeleteOutline className='action-icon-size' />
              </div>
            </div>
          ))
        ) : (
          sellerList.map((sellerDetail, id) => (
            <div key={id} className='user-list-item'>
              <div className='user-list-size'>{sellerDetail.sellerId}</div>
              <div className='user-list-size'>{sellerDetail.sellerName}</div>
              <div className='user-list-size'>{sellerDetail.sellerEmail}</div>
              <div className='user-list-size'>{sellerDetail.sellerRole}</div>
              <div className='user-list-size date-flex-item '>
                <HiOutlineEye className='action-icon-size' />
                <TbEdit className='action-icon-size' />
                <MdDeleteOutline className='action-icon-size' onClick={() => sellerDelete(item.userId)} />
              </div>
            </div>
          ))
        )}
        {/*  pagination */}
        <div className='user-pagination-item'>
          <IoChevronBack className='user-pagination-icon' />
          <p className='user-pagination-count'>1</p>
          <p className='user-pagination-count' >2</p>
          <p className='user-pagination-count' >3</p>
          <p className='user-pagination-count'>4</p>
          <IoChevronForwardSharp className='user-pagination-icon' />
        </div>
      </div>
    </div>
  )
}

export default SellerList