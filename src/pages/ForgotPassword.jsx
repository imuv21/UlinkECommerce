import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';
import { Helmet } from 'react-helmet-async';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const resetPassword = () => {
        alert(`Please open your email "${email}" and click on the verification link.`)
        navigate('/reset-password');
    }
    const [email, setEmail] = useState('');

    return (
        <Fragment>
            <Helmet>
                <title>Forgot Your Password?</title>
            </Helmet>
            <div className="flex login-cont wh">
                <div className="flex wh">
                    <img src={bg} className='bgdiv' alt="" />
                </div>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Forgot your password?</div>
                        <div className="flexcol gap">
                            <input type='email' className="box flex" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button className='btn box flex' onClick={resetPassword} type='submit'><div className="heading2">Send verification link</div></button>
                            <div className="descrip">We will send an OTP to your email</div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default ForgotPassword