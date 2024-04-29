import React, { useRef, useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import bg from '../assets/bg.png';

const Otp = () => {

    const inputs = Array.from({ length: 6 }, () => useRef(null));
    const [otp, setOTP] = useState(Array(6).fill(''));
    const navigate = useNavigate();

    const sellerForm = () => {
        navigate('/seller-form');
    }

    const handleInputChange = (index, e) => {
        const value = e.target.value;
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);
        if (value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].current.focus();
        }
    };



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
                            {inputs.map((inputRef, index) => (
                                <input key={uuidv4()} className='box tcenter' ref={inputRef} maxLength={1} value={otp[index]} onChange={(e) => handleInputChange(index, e)} />
                            ))}
                        </div>
                        <button onClick={sellerForm} className='btn box flex' type='submit'><div className="heading2">Continue</div></button>
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