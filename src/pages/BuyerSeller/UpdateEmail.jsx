import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urls } from '../../components/Schemas/images';
import { Helmet } from 'react-helmet-async';
import animation from "../../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ForgotPassword = () => {

    //images
    const logo = urls[0];
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const token = useSelector((state) => state.auth.token);

    const updateEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${BASE_URL}/user/update-details?email=${email}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status) {

                toast(<div className='toaster'> < VerifiedIcon /> {response.data.message}</div>,
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                navigate('/verify-update-password');
            } else {
                toast(<div className='toaster'> < NewReleasesIcon /> {`Failed to send OTP verification mail`}</div>,
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='toaster'> < NewReleasesIcon /> {`An error occurred while updating the email.`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
        navigate('/verify-update-email');
    }

    //json lottie animation
    const options = {
        animationData: animation,
        loop: true,
    };
    const { View } = useLottie(options);

    return (
        <Fragment>
            <Helmet>
                <title>Update Email Address</title>
            </Helmet>
            <div className="login-cont hvh">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Update Email Address</div>
                        <div className="flexcol gap">
                            <input type='email' className="box flex" placeholder='Enter a new email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="flexcol wh" style={{ gap: '5px' }}>
                                <button className='btn box flex' onClick={updateEmail} type='submit'><div className="heading2">Send OTP</div></button>
                                <Link to={'/profile'} className=' box flex'><div className="heading2" style={{ color: 'gray' }}>Cancel</div></Link>
                            </div>

                            <div className="descrip">We will send an OTP to your email</div>
                        </div>
                    </div>
                </div>

                <div className="svg-bg-signup">
                    <div style={{ width: '80%' }}>
                        {View}
                    </div>
                </div>

            </div>

        </Fragment>
    )
}

export default ForgotPassword