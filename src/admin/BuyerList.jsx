
import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { HiOutlineEye } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";

const BuyerList = () => {

    const [searchItem, setSearchItem] = useState('')
    const [filteredList, setFilteredList] = useState([])

    //  show the user List item value in table
    const userList = [
        { userId: 1, userName: 'Vipin Kumar', userEmail: 'vipinkm1654@gmail.com', userRole: 'Buyer', },
        { userId: 2, userName: 'Rajesh Kumar', userEmail: 'vipinkm1654@gmail.com', userRole: 'suyer', },
        { userId: 3, userName: 'Hello Kumar', userEmail: 'vipinkm1654@gmail.com', userRole: 'Buyer', },
        { userId: 4, userName: 'Puneet Kumar', userEmail: 'vipinkm1654@gmail.com', userRole: 'Buyer', },
        { userId: 5, userName: 'Advanture Kumar', userEmail: 'vipinkm1654@gmail.com', userRole: 'suyer', },
        { userId: 4, userName: 'Puneet Kumar', userEmail: 'vipinkm1654@gmail.com', userRole: 'Buyer', },
    ]
    //  check the condition
    const handleSearchItem = (e) => {
        setSearchItem(e.target.value)
        const filteredList = userList.filter((user) => {
            return user.userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                user.userEmail.toLowerCase().includes(e.target.value.toLowerCase()) ||
                user.userRole.toLowerCase().includes(e.target.value) ||
                user.userId.toString().includes(e.target.value.toLowerCase())
        })
        setFilteredList(filteredList)
    }
    const UserDelete = (userId) => {
        const UpdateList = userList.filter((user) => user.userId !== userId)
        console.log(UpdateList)
    }
    //  add the human value added the main condition value
    return (
        <div className='buyer-list-container'>
            <div className='admin-user-dashboard'>
                <div className='buyer-dash-item'>
                    <h3>Buyer List</h3>
                    <div className='user-item'>
                        <CiSearch className='user-search-input' />
                        <input type='text' value={searchItem} onChange={handleSearchItem} className='buyer-search' placeholder='Search...' />
                    </div>
                </div>
                {/*  user role field show the  */}
                <div className='user-list-item  user-list-bg' >
                    <div className='user-list'>Buyer Id</div>
                    <div className='user-list'>Name</div>
                    <div className='user-list'>Email</div>
                    <div className='user-list'>Role</div>
                    <div className='user-list'>Action</div>
                </div>
                {filteredList.length > 0 ? (
                    filteredList.map((item, id) => (
                        <div key={id} className='user-list-item'>
                            <div className='user-list-size'>{item.userId}</div>
                            <div className='user-list-size'>{item.userName}</div>
                            <div className='user-list-size'>{item.userEmail}</div>
                            <div className='user-list-size'>{item.userRole}</div>
                            <div className='user-list-size  date-flex-item '>
                                <HiOutlineEye className='action-icon-size' />
                                <TbEdit className='action-icon-size' />
                                <MdDeleteOutline className='action-icon-size' />
                            </div>
                        </div>
                    ))
                ) : (
                    userList.map((item, id) => (
                        <div key={id} className='user-list-item'>
                            <div className='user-list-size'>{item.userId}</div>
                            <div className='user-list-size'>{item.userName}</div>
                            <div className='user-list-size'>{item.userEmail}</div>
                            <div className='user-list-size'>{item.userRole}</div>
                            <div className='user-list-size date-flex-item '>
                                <HiOutlineEye className='action-icon-size' />
                                <TbEdit className='action-icon-size' />
                                <MdDeleteOutline className='action-icon-size' onClick={() => UserDelete(item.userId)} />
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
export default BuyerList