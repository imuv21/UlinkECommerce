import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../components/Schemas/validationSchema';
import { forgotPassword } from '../Redux/forgotPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { urls } from '../components/Schemas/images';
import { Helmet } from 'react-helmet-async';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
const schema = yupResolver(resetPasswordSchema);
const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Images
    const logo = urls[0];

    //password hide and show
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [conPasswordVisible, setConPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConPasswordVisibility = () => {
        setConPasswordVisible(!conPasswordVisible);
    };


    //json lottie animation
    const options = {
        animationData: animation,
        loop: true,
    };
    const { View } = useLottie(options);



    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = async (formData) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        const { password, role, username } = formData;
        try {
            const resultAction = await dispatch(forgotPassword({ password, role, username })).unwrap();
            alert('We have sent an OTP to your email. Please check your email and enter the OTP to reset your password.');
            navigate('/verify-reset-password');
        } catch (err) {
            alert(`Failed to send OTP: ${err.message || 'Unknown error'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Fragment>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <div className="login-cont">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Reset your password</div>
                        <form className="flexcol gap" onSubmit={handleSubmit(onSubmit)}>

                            <Controller name="role" control={control} defaultValue="" render={({ field }) => (
                                <select className="box flex" {...field}>
                                    <option value="">Select a role...</option>
                                    <option value="Buyer">Buyer</option>
                                    <option value="Seller">Seller</option>
                                </select>
                            )}
                            />
                            {errors.role && <div className='error'>{errors.role.message}</div>}

                            <Controller name="username" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter your email' autoComplete="email" {...field} />} />
                            {errors.email && <div className='error'>{errors.username.message}</div>}

                            <div className="search-input">
                                <Controller name="password" control={control} defaultValue="" render={({ field }) => <input type={passwordVisible ? "text" : "password"} autoComplete="new-password" className="box flex" placeholder='Enter a new password' {...field} />} />
                                <span onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            {errors.password && <div className='error'>{errors.password.message}</div>}

                            <div className="search-input">
                                <Controller name="confirmPass" control={control} defaultValue="" render={({ field }) => <input type={conPasswordVisible ? "text" : "password"} autoComplete="new-password" className="box flex" placeholder='Enter the password again' {...field} />} />
                                <span onClick={toggleConPasswordVisibility}>
                                    {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            {errors.confirmPass && <div className='error'>{errors.confirmPass.message}</div>}
                            <button className='btn box flex' type='submit' disabled={isSubmitting}><div className="heading2">{isSubmitting ? 'Sending OTP...' : 'Send OTP'}</div></button>
                        </form>
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

export default ResetPassword