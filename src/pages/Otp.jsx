import React, { useRef, useState, useEffect, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../Redux/otpSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Otp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error, success } = useSelector((state) => state.otp);

    // const verifyOtp = async (otp, username, role) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}/verifyOtp?otp=${otp}&username=${username}&role=${role}`);
    //         alert(`Response : ${response.data.message} And Email : ${username}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error('OTP verification failed:', error);
    //         throw error;
    //     }
    // };

    // const sellerForm = async (otp) => {
    //     const email = userData.email;
    //     const role = userData.role;

    //     try {
    //         const verificationResponse = await verifyOtp(otp, email, role);

    //         if (userData && userData.role === 'Seller') {
    //             navigate('/seller-form');
    //         } else {
    //             navigate('/login');
    //         }
    //     } catch (error) {
    //         alert('Failed to verify OTP: ' + error.message);
    //     }
    // };


    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
    // Focus management
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
            // sellerForm(newOtpDigits.join(''));
            const userData = JSON.parse(localStorage.getItem('userData'));
            dispatch(verifyOtp({ otp: newOtpDigits.join(''), username: userData.email, role: userData.role }));
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

  //new useff
    useEffect(() => {
        if (status === 'succeeded') {
            const userData = JSON.parse(localStorage.getItem('userData'));
            alert('OTP verified successfully!');
            if (userData && userData.role === 'Seller') {
                navigate('/seller-form');
            } else {
                navigate('/login');
            }
        } else if (status === 'failed') {
            alert('OTP verification failed: ' + error);
        }
    }, [status, error, navigate]);


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
                        <div className="heading2 tcenter">We have sent the OTP to example@gmail.com <br />Enter the OTP to verify your email.</div>
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
                        <button className='resend' disabled={timerRunning} onClick={handleResendClick}>
                            {timerRunning ? `Resend OTP in ${timeLeft}` : "Resend OTP"}
                        </button>
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

export default Otp