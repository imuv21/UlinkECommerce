import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { Helmet } from 'react-helmet-async';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const resetPassword = () => {
        navigate('/verify-email');
    }
    const [email, setEmail] = useState('');

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
            <div className="login-cont">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Update Email Address</div>
                        <div className="flexcol gap">
                            <input type='email' className="box flex" placeholder='Enter a new email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button className='btn box flex' onClick={resetPassword} type='submit'><div className="heading2">Send verification link</div></button>
                            <Link to={'/profile'} className=' box flex'><div className="heading2" style={{color: 'gray'}}>Cancel</div></Link>
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