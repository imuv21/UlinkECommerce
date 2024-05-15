import React from 'react';
import { Helmet } from 'react-helmet-async';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>My Profile</title>
            </Helmet>
            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading5">My Profile</div> <div className='heading3'>Back</div>
            </div>
            <div className="procont">
                <div className="profile-sel-box">
                    <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><AccountCircleIcon /> <div className="heading3">My Profile</div></div>
                    <div className="flex" style={{ gap: '20px', justifyContent: 'start',  width: '30%' }}>
                        <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px'}}>
                            <div className='heading2'>Name</div>
                            <div className='heading2'>Whatsapp</div>
                            <div className='heading2'>Language Preference</div>
                        </div>
                        <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px'}}>
                            <div className="heading2">John Snow</div>
                            <div className='heading2'>+91 1534534534523</div>
                            <div className='heading2'>English</div>
                        </div>
                    </div>
                    <div className="flex wh" style={{ justifyContent: 'start'}}>
                        <div className="btn flex box" style={{ width: '100px', cursor: 'pointer'}}>Edit</div>
                    </div>
                </div>

                <div className="profile-sel-box">
                    <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><KeyIcon /> <div className="heading3">Security</div></div>
                    <div className="flex" style={{ gap: '20px', justifyContent: 'start',  width: '30%' }}>
                        <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px'}}>
                            <div className='heading2'>Email address</div>
                            <div className='heading2'>Mobile number</div>
                        </div>
                        <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px'}}>
                            <div className="heading2">imuv21@gmail.com</div>
                            <div className='heading2'>+91 1534534534523</div>
                        </div>
                    </div>
                    <div className="flex wh" style={{ justifyContent: 'start', gap: '15px'}}>
                        <Link to={'/update-number'} className="btn flex box" style={{ width: '150px', cursor: 'pointer'}}>Update number</Link>
                        <Link to={'/update-email'} className="btn flex box" style={{ width: '150px', cursor: 'pointer'}}>Update email</Link>
                        <Link to={'/update-password'} className="btn flex box" style={{ width: '150px', cursor: 'pointer'}}>Update password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
