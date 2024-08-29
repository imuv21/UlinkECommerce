import React, { useRef, useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { Helmet } from 'react-helmet-async';
import { urls } from '../components/Schemas/images';
import { useDispatch, useSelector } from 'react-redux';
import { verifyForgotPassword } from '../Redux/forgotPasswordSlice';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const ResetPassVerify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error, role, username } = useSelector((state) => state.forgotPassword);

    // Images
    const logo = urls[0];

    // Focus management
    const otpInputs = useRef([]);
    const focusNextInput = (currentIndex) => {
        if (currentIndex < otpInputs.current.length - 1) {
            otpInputs.current[currentIndex + 1].focus();
        }
    };

    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
    const handleInputChange = (index, newValue) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = newValue;
        setOtpDigits(newOtpDigits);
        if (newValue !== '' && index < otpDigits.length - 1) {
            focusNextInput(index);
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

    const handleSubmit = async () => {
        const otp = otpDigits.join('');
        if (otp.length === 6) {
            try {
                await dispatch(verifyForgotPassword({ otp, role, username })).unwrap();
                toast(<div className='toaster'> < VerifiedIcon /> {`Password reset successfully! Please login with your new password.`}</div>,
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                navigate('/login');
            } catch (err) {
                toast(<div className='toaster'> < NewReleasesIcon /> {`OTP verification failed: ${err.message || 'Unknown error'}`}</div>,
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        }
    };

    useEffect(() => {
        if (status === 'failed') {
            toast(<div className='toaster'> < NewReleasesIcon /> {`OTP verification failed: ${error}`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    }, [status, error]);

    // JSON lottie animation
    const options = {
        animationData: animation,
        loop: true,
    };
    const { View } = useLottie(options);

    // Timer for OTP resend
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
                <title>Verify Your Email | Ulinkit - Secure Your Account</title>
                <meta name="description" content="Verify your email address to reset your password and enhance your account security. Stay protected while shopping online." />
                <link rel="canonical" href="https://www.ulinkit.com/verify-reset-password" />
            </Helmet>
            <div className="login-cont hvh">
                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>
                <div className="signupcont">
                    <div className='flexcol cover'>
                        <h1 className="heading tcenter">Verify your email</h1>
                        <p className="heading2 tcenter">We have sent the OTP to your email.<br />Enter the OTP to reset your password.</p>
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
                        <button className='btn box flex' onClick={handleSubmit}>Verify OTP</button>
                        <button className='resend' style={{ display: 'none' }} disabled={timerRunning} onClick={handleResendClick}>
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
    );
}

export default ResetPassVerify;
