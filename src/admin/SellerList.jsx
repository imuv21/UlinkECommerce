import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CiSearch } from 'react-icons/ci'
import { HiOutlineEye } from 'react-icons/hi2'
import { IoChevronBack, IoChevronForwardSharp } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md'
import { TbEdit } from "react-icons/tb";
import { getSellerDetail } from '../Redux/sellerListSlice';
import { useDispatch, useSelector } from 'react-redux';


const SellerList = () => {

  const dispatch = useDispatch()

  const [searchItem, setSearchItem] = useState('')
  const [filteredSeller, setFilteredSeller] = useState([])
  const { data = [], status, error, currentPage = 0, totalPages = 1 } = useSelector((state) => state.sellerList || {});

  useEffect(() => {
    dispatch(getSellerDetail({ userType: 'SELLER', page: 0, pageSize: 10 }));
  }, [dispatch])
  // seller delete item

  useEffect(() => {
    if (data) {
      console.log('Seller Data:', data)
    }
  }, [data])
  //  check the condition
  useEffect(() => {
    if (data && data.length) {
      const filtereds = data.filter((user) =>
        user.firstname.toLowerCase().includes(searchItem.toLowerCase()) ||
        user.email.toLowerCase().includes(searchItem.toLowerCase()) ||
        user.country.toLowerCase().includes(searchItem.toLowerCase()) ||
        user.id.toString().includes(searchItem)
      );
      setFilteredSeller(filtereds);
    }
  }, [searchItem, data])

  const sellerDelete = (sellerId) => {
    console.log(sellerId)
  }

  //  pagination
  const handlePreviousPage = () => {
    dispatch(getSellerDetail({ userType: 'SELLER', page: currentPage - 1, pageSize: 10 }))
  }
  const handleNextPage = () => {
    dispatch(getSellerDetail({ userType: 'SELLER', page: currentPage + 1, pageSize: 10 }))
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  const seller = filteredSeller.length > 0 ? filteredSeller : data;

  return (
    <Fragment>
      <Helmet>
        <title>Seller Management | Ulinkit Admin Dashboard - Streamline Seller Operations</title>
        <meta name="description" content="Manage and monitor seller accounts with the Ulinkit Admin Dashboard. Access seller details, track inventory listings, and ensure smooth transaction processes for effective marketplace operations." />
        <link rel="canonical" href="https://www.ulinkit.com/admin-dashboard/seller-list" />
      </Helmet>

      <div className='buyer-list-container'>
        <div className='admin-user-dashboard'>
          <div className='buyer-dash-item'>
            <h3>Seller List</h3>
            <div className='user-item'>
              <CiSearch className='user-search-input' />
              <input type='text' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} className='buyer-search' placeholder='Search...' />
            </div>
          </div>
          {/*  user role field show the  */}
          <div className='user-list-item  user-list-bg' >
            <div className='user-list'>Seller Id</div>
            <div className='user-list'>Name</div>
            <div className='user-list'>Email</div>
            <div className='user-list'>Country</div>
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
                  <MdDeleteOutline className='action-icon-size' onClick={sellerDelete(id)} />
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
            <IoChevronBack className='user-pagination-icon' onClick={handlePreviousPage} disabled={currentPage === 0} />
            <p className='user-pagination-count'>{currentPage + 1} of {totalPages}</p>
            <IoChevronForwardSharp className='user-pagination-icon' onClick={handleNextPage} disabled={currentPage >= totalPages - 1} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SellerList