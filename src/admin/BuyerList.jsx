
import React, { Fragment, useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { HiOutlineEye } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getBuyerList } from '../Redux/buyerListSlice';
import { useNavigate } from 'react-router-dom';


const BuyerList = () => {
    const [searchItem, setSearchItem] = useState('');
    const [filteredItem, setFilteredItem] = useState([]);
   
   
    const { data = [], status, error, currentPage = 0, totalPages= 1 } = useSelector((state) => state.buyerList || {} );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBuyerList({userType: 'BUYER', page: 0, pageSize: 10}));
    }, [dispatch]);


    useEffect(() => {
        if (data) {
            console.log('Buyer Data:', data);
        }
    }, [data]);

    //  filter search item for the category wise data
    useEffect(() => {
        if (data && data.length) {
            const filtered = data.filter((user) =>
                user.firstname.toLowerCase().includes(searchItem.toLowerCase()) ||
                user.email.toLowerCase().includes(searchItem.toLowerCase()) ||
                user.id.toString().includes(searchItem) ||
                user.country.toLowerCase().includes(searchItem.toLowerCase())
            );
            setFilteredItem(filtered);
        }
    }, [searchItem, data])

    const navigate = useNavigate()

    const handleNavigatePage = (id) => {
        navigate(`/admin-dashboard/buyer-detail/${id}`)
    }
    const handleSearchItme = (e) => {
        setSearchItem(e.target.value)
    }
    const UserDelete = (userId) => {
        console.log(userId)
    }
    //  next and prev button

    const handlePreviousPage =()=> {
        dispatch(getBuyerList({userType: 'BUYER', page: currentPage -1, pageSize: 10}))
    }
    const handleNextPage = () => {
        dispatch(getBuyerList({userType: 'BUYER', page: currentPage + 1, pageSize: 10}))
    }

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    

    const buyers = filteredItem.length > 0 ? filteredItem : data;
    return (
        <div className='buyer-list-container'>
            <div className='admin-user-dashboard'>
                <div className='buyer-dash-item'>
                    <h3>Buyer List</h3>
                    <div className='user-item'>
                        <CiSearch className='user-search-input' />
                        <input type='text' className='buyer-search' value={searchItem} placeholder='Search...' onChange={handleSearchItme} />
                    </div>
                </div>
                {/*  user role field show the  */}
                <div className='user-list-item  user-list-bg' >
                    <div className='user-list'>Buyer Id</div>
                    <div className='user-list'>Name</div>
                    <div className='user-list'>Email</div>
                    <div className='user-list'>Country</div>
                    <div className='user-list'>Action</div>
                </div>
                {buyers.length > 0 ? (
                    buyers.map((user) => (
                        <div key={user.id} className='user-list-item'>
                            <div className='user-list-size'>{user.id}</div>
                            <div className='user-list-size'>{user.firstname} {user.lastname}</div>
                            <div className='user-list-size'>{user.email}</div>
                            <div className='user-list-size'>{user.country}</div>
                            <div className='user-list-size date-flex-item'>
                                <HiOutlineEye className='action-icon-size' onClick={() => handleNavigatePage(user.id)} />
                                <TbEdit className='action-icon-size' />
                                <MdDeleteOutline className='action-icon-size' onClick={() => UserDelete(user.id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No buyers found.</p>
                )}
                {/*  pagination */}
                <div className='user-pagination-item'>
                    <IoChevronBack className='user-pagination-icon' onClick={handlePreviousPage}  disabled ={currentPage === 0}/>
                    <p className='user-pagination-count'>{currentPage + 1} of {totalPages}</p>
                    <IoChevronForwardSharp className='user-pagination-icon' onClick={handleNextPage} disabled = {currentPage >= totalPages -1} />
                </div>
            </div>
        </div>

    )
}
export default BuyerList