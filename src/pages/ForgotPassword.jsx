import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { Helmet } from 'react-helmet-async';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const resetPassword = () => {
        alert(`Please open your email "${email}" and click on the verification link.`)
        navigate('/reset-password');
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
                <title>Forgot Your Password?</title>
            </Helmet>
            <div className="login-cont">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Forgot your password?</div>
                        <div className="flexcol gap">
                            <input type='email' className="box flex" placeholder='Enter your email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button className='btn box flex' onClick={resetPassword} type='submit'><div className="heading2">Send OTP</div></button>
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