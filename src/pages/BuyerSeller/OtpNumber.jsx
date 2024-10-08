import React, { useRef, useState, useEffect, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import animation from "../../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { Helmet } from 'react-helmet-async';
import { urls } from '../../components/Schemas/images';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const OtpNumber = () => {

    //images
    const logo = urls[0];
    const navigate = useNavigate();

    //getting data from local storage
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
        }
    }, []);

    const verifyOtp = async (otp, username, role) => {
        try {
            const response = await axios.post(`http://ulinkit.eu-north-1.elasticbeanstalk.com/api/verifyOtp?otp=${otp}&username=${username}&role=${role}`);

            toast(<div className='toaster'> < VerifiedIcon /> {`Response : ${response.data.message} And Email : ${username}`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });

            return response.data;
        } catch (error) {
            console.error('OTP verification failed:', error);
            throw error;
        }
    };

    const sellerForm = async (otp) => {
        const email = userData.email;
        const role = userData.role;

        try {
            const verificationResponse = await verifyOtp(otp, email, role);

            if (userData && userData.role === 'seller') {
                navigate('/seller-form');
            } else {
                navigate('/login');
            }
        } catch (error) {
            toast(<div className='toaster'> < NewReleasesIcon /> {`Failed to verify OTP: ${error.message}`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    };

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
        otpInputs.current[0].focus(); // Set focus on the first input when component mounts
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
                <title>Verify Your Phone Number | Ulinkit - Secure Your Account</title>
                <meta name="description" content="Verify your phone number to complete your Ulinkit account setup. Enhance your account security and enjoy a seamless shopping experience with added protection." />
                <link rel="canonical" href="https://www.ulinkit.com/verify-update-number" />
            </Helmet>
            <div className="login-cont hvh">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <article className='flexcol cover'>
                        <h1 className="heading tcenter">Verify your number</h1>
                        <h2 className="heading2 tcenter">We have sent the OTP to 435787547387 <br />Enter the OTP to verify your number.</h2>
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
                        <button className='resend' style={{ display: 'none' }} disabled={timerRunning} onClick={handleResendClick}>
                            {timerRunning ? `Resend OTP in ${timeLeft}` : "Resend OTP"}
                        </button>
                        <Link to={'/profile'} className=' box flex'><div className="heading2" style={{ color: 'gray' }}>Cancel</div></Link>
                    </article>
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

export default OtpNumber