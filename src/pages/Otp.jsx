import React, { useRef, useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';

const Otp = () => {

    const navigate = useNavigate();
    const sellerForm = (otp) => {
        console.log("OTP:", otp);
        navigate('/seller-form');
    }
    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
    // Focus management
    const otpInputs = useRef([]);
    const focusNextInput = currentIndex => {
        if (currentIndex < otpInputs.current.length - 1) {
            otpInputs.current[currentIndex + 1].focus();
        } else {
            sellerForm(otpDigits.join(''));
        }
    };

    const handleInputChange = (index, newValue) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = newValue;
        setOtpDigits(newOtpDigits);
        if (newValue !== '' && index < otpDigits.length - 1) {
            focusNextInput(index);
        }
        if (index === otpDigits.length - 1 && newValue !== '') {
            sellerForm(otpDigits.join('') + newValue);
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

            <div className="flex login-cont wh">
                <div className="flex wh">
                    <img src={bg} className='bgdiv' alt="" />
                </div>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading tcenter">Verify your email</div>
                        <div className="heading2 tcenter">We have sent the OTP to user@gmail.com <br /> Click on the link in the email or enter the OTP to verify your email.</div>
                        <div className="flex gap">

                            { otpDigits.map((digit, index) => (
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
                        {/* <button onClick={() => sellerForm(otpDigits.join(''))} className='btn box flex' type='submit'><div className="heading2">Continue</div></button> */}
                        <button className='resend' disabled={timerRunning} onClick={handleResendClick}>
                            {timerRunning ? `Resend OTP in ${timeLeft}` : "Resend OTP"}
                        </button>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}

export default Otp