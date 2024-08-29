import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Helmet } from 'react-helmet-async';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Permissions = () => {

    const navigate = useNavigate();
    const accessback = () => {
        navigate('/seller-dashboard/access-management');
    };

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Roles and Permissions | Ulinkit - Define User Access Levels</title>
                <meta name="description" content="Define and manage roles and permissions on Ulinkit. Customize user access levels to ensure appropriate access to features and maintain security across your platform." />
                <link rel="canonical" href="https://www.ulinkit.com/seller-dashboard/permissions" />
            </Helmet>
            <article className="flex-start wh" style={{ gap: '5px' }}>
                <ArrowBackIosNewIcon style={{ cursor: 'pointer', marginTop: '7px' }} onClick={accessback} />
                <div className="flexcol-start wh" style={{ gap: '5px' }}>
                    <h1 className="heading5">Roles and Permissions</h1>
                    <h2 className="descrip">Use roles to set custom permissions for each person that has access to your business account. You decide who is permitted to do what. Roles are not permanent and can be changed by any Admin account.</h2>
                </div>
            </article>
            <article className="access-sel-box">
                <h1 className="heading">Management</h1>
                <div className="access2">
                    <div className='access-col2'>
                        <div className="heading-ac">Permissions</div>
                        <div className="heading-ac2">User</div>
                        <div className="heading-ac2">Supervisor</div>
                        <div className="heading-ac2">Admin</div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Invite and deactivate accounts</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Assign roles</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Edit company details</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Update financial details</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Edit addresses and shipping preferences</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                </div>
            </article>
            <article className="access-sel-box">
                <h1 className="heading">Payment</h1>
                <div className="access2">
                    <div className='access-col2'>
                        <div className="heading-ac">Permissions</div>
                        <div className="heading-ac2">User</div>
                        <div className="heading-ac2">Supervisor</div>
                        <div className="heading-ac2">Admin</div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Request full order cancellation</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Request partial order cancellation</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                </div>
            </article>
            <article className="access-sel-box">
                <h1 className="heading">Messages & Leads</h1>
                <div className="access2">
                    <div className='access-col2'>
                        <div className="heading-ac">Permissions</div>
                        <div className="heading-ac2">User</div>
                        <div className="heading-ac2">Supervisor</div>
                        <div className="heading-ac2">Admin</div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">View all messages and leads</div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Respond to all messages and leads</div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Archive leads</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                </div>
            </article>
            <article className="access-sel-box">
                <h1 className="heading">Orders</h1>
                <div className="access2">
                    <div className='access-col2'>
                        <div className="heading-ac">Permissions</div>
                        <div className="heading-ac2">User</div>
                        <div className="heading-ac2">Supervisor</div>
                        <div className="heading-ac2">Admin</div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Fulfil orders</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">View orders</div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                </div>
            </article>
            <article className="access-sel-box">
                <h1 className="heading">Inventory</h1>
                <div className="access2">
                    <div className='access-col2'>
                        <div className="heading-ac">Permissions</div>
                        <div className="heading-ac2">User</div>
                        <div className="heading-ac2">Supervisor</div>
                        <div className="heading-ac2">Admin</div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">View product inventory</div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Upload products</div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Upload media</div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                </div>
            </article>
            <article className="access-sel-box">
                <h1 className="heading">Promotions</h1>
                <div className="access2">
                    <div className='access-col2'>
                        <div className="heading-ac">Permissions</div>
                        <div className="heading-ac2">User</div>
                        <div className="heading-ac2">Supervisor</div>
                        <div className="heading-ac2">Admin</div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">Create promotions</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                    <div className='access-col2'>
                        <div className="ac-item">View promotions</div>
                        <div className="ac-item2"><CloseIcon /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                        <div className="ac-item2"><DoneIcon style={{ color: 'green' }} /></div>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default Permissions