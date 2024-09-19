
import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { HiOutlineEye } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getBuyerList } from '../Redux/buyerListSlice';


const BuyerList = () => {


    const [searchItem, setSearchItem] = useState('');
    const [filteredItem, setFilteredItem] = useState([]);

    //   accessing the element login 
    const { data, status, error } = useSelector((state) => state.buyerList || { data: {} });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBuyerList());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            console.log('Buyer Data:', data);  // Log the data to verify structure
        }
    }, [data]);

//  filter search item for the category wise data

useEffect(() => {
    if(data?.BUYER){
        const filtered = data.BUYER.filter((user) => 
             user.firstname.toLowerCase().includes(searchItem.toLowerCase()) ||
            user.email.toLowerCase().includes(searchItem.toLowerCase()) ||
            user.id.toString().includes(searchItem) ||
            user.country.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredItem(filtered);
    }
}, [searchItem, data])

const handleSearchItme = (e)=> {
    setSearchItem(e.target.value)
}
    const UserDelete = (userId) => {
        console.log(userId)
    }

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    // Ensure data.BUYER is accessed correctly
    const buyers = filteredItem.length > 0 ? filteredItem : data?.BUYER || [];
    return (
        <div className='buyer-list-container'>
            <div className='admin-user-dashboard'>
                <div className='buyer-dash-item'>
                    <h3>Buyer List</h3>
                    <div className='user-item'>
                        <CiSearch className='user-search-input' />
                        <input type='text' className='buyer-search' value={searchItem} placeholder='Search...'  onChange={handleSearchItme} />
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
                                <HiOutlineEye className='action-icon-size' />
                                <TbEdit className='action-icon-size' />
                                <MdDeleteOutline className='action-icon-size' onClick={() => UserDelete(item.userId)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No buyers found.</p>
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
export default BuyerList