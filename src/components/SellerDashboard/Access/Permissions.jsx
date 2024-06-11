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
                <title>Roles and Permissions</title>
            </Helmet>
            <div className="flex-start wh" style={{ gap: '5px' }}>
                <ArrowBackIosNewIcon style={{ cursor: 'pointer', marginTop: '7px' }} onClick={accessback} />
                <div className="flexcol-start wh" style={{ gap: '5px' }}>
                    <div className="heading5">Roles and Permissions</div>
                    <div className="descrip">Use roles to set custom permissions for each person that has access to your business account. You decide who is permitted to do what. Roles are not permanent and can be changed by any Admin account.</div>
                </div>
            </div>
            <div className="access-sel-box">
                <div className="heading">Management</div>
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
            </div>
        </div>
    )
}

export default Permissions