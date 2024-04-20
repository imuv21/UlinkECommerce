import React, { Fragment, useState } from 'react'
import './AcessManagement.css'
import Metadata from '../../../components/Metadata'
import { FcInfo } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { FaRegCircle } from 'react-icons/fa';


const AcessManagement = () => {

    const [inviteBox, setInviteBox] = useState(false);
    const [userRole, setUserRole] =  useState('')
    const [sendEmail, setSendEmail] = useState('')


    const handleInviteUser = () => {
        setInviteBox(true)
    }
    const handleUserRole = (e)=>{
       setUserRole(e.target.value)
       setInviteBox(true)
    }
    const handleCloseInvite=()=>{
        setInviteBox(false)
    }
    return (
        <Fragment>
            <Metadata title="Acess Management" />
            <div>
                {inviteBox && (
                    <div className='background-Changer'>
                        <div className=" invite-more ">
                            <div className='card-info-bank invite-user '>
                                <div className='card-title invite-title'>
                                    <h3 className=" card-title-tittles">Invite User</h3>
                                </div>
                                <div className='card-title'>
                                    <RxCross2 className='cross-icon' onClick={handleCloseInvite} />
                                </div>
                            </div>
                            <div className=''> <p className='info-details invite-quote'>Use this section to invite members to your organisation. You can also set user permissions.</p></div>
                            <div className=' invite-email'>
                                <label >Enter Email</label><br></br>
                                <input type='email' name='cardemail' className='card-input-value width-input' placeholder='Enter email' value={sendEmail} onChange={(e)=> setSendEmail(e.target.value)} />

                            </div>
                            <div className=' invite-email'>
                                <label >User Role*</label><br></br>
                                <div className='user-role-choose '>

                                    <input type='radio' name={userRole}  onChange={handleUserRole}/>
                                    <p className='paragraph-4'> Admin</p>
                                </div>
                                <p className='info-details invite-quotes'>Manage orders + buy items + manage roles and permissions</p>


                            </div>
                            <div className=' invite-email'>
                                
                                <div className='user-role-choose '>
                                <input type='radio' name={userRole}onChange={handleUserRole}/>
                                    <p className='paragraph-4'> Superviser</p>
                                </div>
                                <p className='info-details invite-quotes'>Manage orders + buy items + manage roles and permissions</p>
                               

                            </div>
                            <div className=' invite-email'>
                               
                                <div className='user-role-choose '>
                                <input type='radio' name={userRole} onChange={handleUserRole}/>
                                    <p className='paragraph-4'>User</p>
                                </div>
                                <p className='info-details invite-quotes'>Manage orders + buy items + manage roles and permissions</p>
                                <button type='submit' className='clear-filter-btn space-between  send-email'>Send Email</button><br></br>

                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='mt'>
                <div className='flex-space-beetwen'>
                    <div className='message-titles-heading1'>
                        <h1 className='user-title  heading-2 '>Access Management</h1>
                    </div>
                    <div className='message-titles-heading1'>
                        <button className='create-btn invite-btn ' onClick={handleInviteUser}>INVITE USER</button>
                    </div>

                </div>
                <div className='note  notes'>
                    <FcInfo className='warnings' />
                    <p className='paragraph-4'>International mobile numbers cannot be used to log in <Link to='/roles'> <span className='learn-btn'>Learn More About Roles</span></Link></p>
                </div>

                <div className='nav-section'>
                    <div className='nav-section-items'>
                        Name
                    </div>
                    <div className='nav-section-items'>
                        Email
                    </div>
                    <div className='nav-section-items'>
                        Role
                    </div>
                    <div className='nav-section-items'>
                        Status
                    </div>
                    <div className='nav-section-items'>
                        Action
                    </div>
                </div>
                <div className=' nav-section-change'>
                    <div className='nav-section-items user-names-icon nav-section-item'>
                        <div className='user-logo'>
                            <p className='u-icon'>VK</p>
                        </div>
                        <div className='user-names'>
                            <p className='user-name'>Vipin Kumar (You)</p>
                        </div>
                    </div>
                    <div className='nav-section-items  nav-section-item'>
                        <p className='user-name'>vipinkm1654@example.com</p>
                    </div>
                    <div className='nav-section-items nav-section-item'>
                        <p className='user-name'>Admin</p>


                    </div>
                    <div className='nav-section-items nav-section-item'>
                        <p className='user-name'>Active</p>
                    </div>
                    <div className='nav-section-items nav-section-item'>

                    </div>
                </div>
                <div className='more-rule'>
                    <p className='roles-text'>Roles allow you to customize the experience and permissions of accounts invited to your business. <Link to='/roles'><span>Learn More About Roles</span></Link></p>
                </div>
            </div>
        </Fragment>
    )
}

export default AcessManagement