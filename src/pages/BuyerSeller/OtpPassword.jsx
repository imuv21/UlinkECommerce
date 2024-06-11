import React, { useRef, useState, useEffect, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import animation from "../../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { Helmet } from 'react-helmet-async';
import { urls } from '../../components/Schemas/images';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const OtpEmail = () => {

    const user = useSelector((state) => state.auth.user);

     //images
     const logo = urls[0];

    const navigate = useNavigate();
    const updatePassword = () => {
        navigate('/update-password');
    }

    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
    const otpInputs = useRef([]);
    const focusNextInput = currentIndex => {
        if (currentIndex < otpInputs.current.length - 1) {
            otpInputs.current[currentIndex + 1].focus();
        }
    };
    const handleInputChange = (index, newValue) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = newValue;
        setOtpDigits(newOtpDigits);
        if (newValue !== '' && index < otpDigits.length - 1) {
            focusNextInput(index);
        }
        const isOtpComplete = newOtpDigits.every(digit => digit !== '');

        if (isOtpComplete) {
            sellerForm(newOtpDigits.join(''));
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '') {
            e.preventDefault();
            if (index > 0) {
                otpInputs.current[index - 1].focus();
            }
        } else if (/^\d$/.test(e.key)) {
            e.preventDefault();
            handleInputChange(index, e.key);
            focusNextInput(index);
        }
    };
    useEffect(() => {
        otpInputs.current[0].focus(); 
    }, []);

    //json lottie animation
    const options = {
        animationData: animation,
        loop: true,
    };
    const { View } = useLottie(options);

    //time
    const [timeLeft, setTimeLeft] = useState(60);
    const [timerRunning, setTimerRunning] = useState(true);
    useEffect(() => {
        if (timerRunning) {
            const timerInterval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerInterval);
        }
    }, [timerRunning]);
    useEffect(() => {
        if (timeLeft === 0) {
            setTimerRunning(false);
        }
    }, [timeLeft]);
    const handleResendClick = () => {
        setTimeLeft(60);
        setTimerRunning(true);
    };

    return (
        <Fragment>
            <Helmet>
                <title>Verify Your Email</title>
            </Helmet>
            <div className="login-cont">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading tcenter">Verify your email</div>
                        <div className="heading2 tcenter">We have sent the OTP to {user.email} <br />Enter the OTP to change the password.</div>
                        <div className="flex gap">

                            {otpDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => (otpInputs.current[index] = el)}
                                    className='box tcenter otpbox'
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleInputChange(index, e.target.value)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                />
                            ))}

                        </div>
                        <button className='btn box flex' onClick={updatePassword} type='submit'><div className="heading2">Continue</div></button>
                        <Link to={'/profile'} className=' box flex'><div className="heading2" style={{color: 'gray'}}>Cancel</div></Link>
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

export default OtpEmail