import React, { useRef, useState, useEffect, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import animation from "../../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { Helmet } from 'react-helmet-async';
import { urls } from '../../components/Schemas/images';
import axios from 'axios';
import { logout } from '../../Redux/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const OtpProfile = () => {

    const user = useSelector((state) => state.auth.user);

     //images
     const logo = urls[0];

     const navigate = useNavigate();
     const dispatch = useDispatch();
     const token = useSelector((state) => state.auth.token);
   

     const verifyOtp = async (otp) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/user/update-details/verify?otp=${otp}&verificationType=password`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                await handleLogout();
            }

            toast(<div className='toaster'> < VerifiedIcon /> {response.data.message}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return response.data;
        } catch (error) {
            console.error('OTP verification failed:', error); 
            toast(<div className='toaster'> < NewReleasesIcon /> {`OTP verification failed`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/logout`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            if (response.status === 200) {
              
                toast(<div className='toaster'> < VerifiedIcon /> {response.data.message || 'Logged out successfully'}</div>, 
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                
                dispatch(logout());
                navigate('/login');
            } else {
                console.warn('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Logout failed:', error);
            dispatch(logout());
            navigate('/login');
        }
    };

    const sellerForm = async (otp) => {
        try {
            const verificationResponse = await verifyOtp(otp);
        } catch (error) {
            toast(<div className='toaster'> < NewReleasesIcon /> {`Failed to verify OTP!`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    };


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
                        <div className="heading2 tcenter">We have sent the OTP to {user.email} <br />Enter the OTP to update your profile.</div>
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

export default OtpProfile