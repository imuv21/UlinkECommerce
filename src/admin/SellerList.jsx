import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { HiOutlineEye } from 'react-icons/hi2'
import { IoChevronBack, IoChevronForwardSharp } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md'
import { TbEdit } from "react-icons/tb";
import { getSellerDetail } from '../Redux/sellerListSlice';
import { useDispatch, useSelector } from 'react-redux';


const SellerList = () => {

  const dispatch = useDispatch()
   const {data, status, error} = useSelector((state) => state.sellerList || {data: {}});

   
  const [searchItem, setSearchItem] = useState('')
  const [filteredSeller, setFilteredSeller] = useState([])

  // Add here the filtered condition value
  useEffect(()=> {
    dispatch(getSellerDetail())
  },[dispatch])
  // seller delete item
  
   useEffect(() => {
    if(data) {
      console.log('Seller Data:', data)
    }
   }, [data])
//  check the condition
  useEffect (() => {
    if(data?.SELLER) {
        const filtereds =  data.SELLER.filter((user) => 
          user.firstname.toLowerCase().includes(searchItem.toLowerCase()) ||
          user.email.toLowerCase().includes(searchItem.toLowerCase())||
          user.country.toLowerCase().includes(searchItem.toLowerCase())||
          user.id.toString().includes(searchItem)
    );
    setFilteredSeller(filtereds);
    }
  }, [searchItem, data])

  const sellerDelete = (sellerId) => {
     console.log(sellerId)
  }

  if(status === 'loading'){
    return <div>Loading...</div>
  }
  if(status === 'failed'){
    return <div>Error: {error}</div>
  }

  const seller = filteredSeller.length > 0 ? filteredSeller : data?.SELLER || [];
  return (
    <div className='buyer-list-container'>
      <div className='admin-user-dashboard'>
        <div className='buyer-dash-item'>
          <h3>Seller List</h3>
          <div className='user-item'>
            <CiSearch className='user-search-input' />
            <input type='text' value={searchItem}  onChange={(e) => setSearchItem(e.target.value)} className='buyer-search' placeholder='Search...' />
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
        {seller.length > 0 ? (
          seller.map((sellerDetail, id) => (
            <div key={sellerDetail.id} className='user-list-item'>
              <div className='user-list-size'>{sellerDetail.id}</div>
              <div className='user-list-size'>{sellerDetail.firstname} {sellerDetail.lastname}</div>
              <div className='user-list-size'>{sellerDetail.email}</div>
              <div className='user-list-size'>{sellerDetail.country}</div>
              <div className='user-list-size  date-flex-item '>
                <HiOutlineEye className='action-icon-size' />
                <TbEdit className='action-icon-size' />
                <MdDeleteOutline className='action-icon-size' onClick={sellerDelete(id)}/>
              </div>
            </div>
          ))
        ) : (
          <div className='user-list-item'>
            <p>No user found</p>
          </div>
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