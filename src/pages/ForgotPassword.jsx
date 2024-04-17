import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgimage from '../assets/bgImage.png';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const resetPassword = () => {
        alert('Please open your email and click on the verification link.')
        navigate('/reset-password');
    }
    const [email, setEmail] = useState('');

  return (
    <Fragment>
            <div className="flex login-cont wh">
                <div className="flex wh">
                    <img src={bgimage} className='bgdiv' alt="" />
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