import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../components/Schemas/validationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { urls } from '../components/Schemas/images';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../Redux/AuthReducer';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const schema = yupResolver(loginSchema);

const Login = () => {

    //images
    const logo = urls[0];

    //password hide and show
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = () => {
        navigate('/signup');
    }
    const forgotPass = () => {
        navigate('/forgot-password');
    }


    const [loggedUser, setLoggedUser] = useState({});
    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = async (formData) => {
        const updatedLoggedUser = { ...loggedUser, ...formData };

        try {
            const response = await axios.post(`${BASE_URL}/Login`, updatedLoggedUser);
            const { firstname, lastname, countryCode, wpcountrycode, token, message, status, country, countryOfoperation, whatsappnumber, currency, currencySymbol, role, email, number } = response.data;
            const user = { firstname, lastname, countryCode, wpcountrycode, countryOfoperation, whatsappnumber, currency, currencySymbol, country, role, email, number };

            dispatch(loginSuccess({ token, message, user }));
            alert(`${status} : ${message}`);
            if (role === 'Seller') {
                navigate('/seller-dashboard/seller-home');
            } else {
                navigate('/');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed!';
            const status = error.response?.data?.status || 'error';
            dispatch(loginFailure({ message }));
            alert(`${status} : ${message}`);
        }
    };
    const handleChange = (e) => {
        setLoggedUser({ ...loggedUser, [e.target.name]: e.target.value });
    };

    //json lottie animation
    const options = {
        animationData: animation,
        loop: true,
    };
    const { View } = useLottie(options);

    return (
        <Fragment>
            <Helmet>
                <title>Login To Your Account</title>
            </Helmet>
            <div className="login-cont">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='flexcol cover'>

                        <div className="heading">Login to your account</div>
                        <div className='box flex'>
                            <svg className="svg" viewBox="0 0 24 24"><path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path><path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path></svg>
                            <div className="heading2">Login with Google</div>
                        </div>
                        <div className="flex or"><div className="line"></div><span style={{ margin: '0px 30px' }}>Or</span><div className="line"></div></div>


                        <form className="flexcol gap" onSubmit={handleSubmit(onSubmit)}>
                            <Controller name="role" control={control} defaultValue="" render={({ field }) => (
                                <select className="box flex" value={loggedUser.role || ''} onChange={handleChange} {...field}>
                                    <option value="">Login as a...</option>
                                    <option value="Buyer">Buyer</option>
                                    <option value="Seller">Seller</option>
                                </select>
                            )}
                            />
                            {errors.role && <div className='error'>{errors.role.message}</div>}
                            <Controller name="username" control={control} defaultValue="" render={({ field }) => <input value={loggedUser.username || ''} onChange={handleChange} className="box flex" placeholder='Enter your email' autoComplete="email" {...field} />} />
                            {errors.email && <div className='error'>{errors.username.message}</div>}

                            <div className="search-input">
                                <Controller name="password" control={control} defaultValue="" render={({ field }) => <input value={loggedUser.password || ''} onChange={handleChange} type={passwordVisible ? "text" : "password"} className="box flex" placeholder='Enter your password' autoComplete="current-password" {...field} />} />
                                <span onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>

                            {errors.password && <div className='error'>{errors.password.message}</div>}


                            <button className='btn box flex' type='submit' ><div className="heading2">Log in</div></button>
                            <div className="descrip">By registering you agree to the user Terms & Conditions and Privacy Policy</div>
                            <div className="heading2" style={{ color: 'var(--btnClr)' }}>Don't have an account? <span className='hoverr' onClick={signup}>Click here</span></div>
                            <div className="heading2 hoverr" onClick={forgotPass}>Forgot password?</div>
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

export default Login