import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../components/Schemas/validationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { urls } from '../components/Schemas/images';
import { Helmet } from 'react-helmet-async';
import { useLottie } from "lottie-react";
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../Redux/AuthReducer';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import animation from "../assets/json/animation-signup.json";
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = async (formData) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        const updatedLoggedUser = { ...loggedUser, ...formData };

        try {
            const response = await axios.post(`${BASE_URL}/Login`, updatedLoggedUser);
            const { firstname, lastname, countryCode, wpcountrycode, token, message, status, country, countryOfoperation, whatsappnumber, currency, currencySymbol, role, email, number } = response.data;
            const user = { firstname, lastname, countryCode, wpcountrycode, countryOfoperation, whatsappnumber, currency, currencySymbol, country, role, email, number };

            dispatch(loginSuccess({ token, message, user }));
            toast(<div className='toaster'> < VerifiedIcon /> {`${status} : ${message}`}</div>, { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });

            if (role === 'Seller') {
                navigate('/seller-dashboard/seller-home');
            } else {
                navigate('/');
            }

        } catch (error) {

            const message = error.response?.data?.message || 'Login failed!';
            const status = error.response?.data?.status || 'error';
            dispatch(loginFailure({ message }));
            toast(<div className='toaster'> < NewReleasesIcon /> {`${status} : ${message}`}</div>, { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleChange = (e) => {
        setLoggedUser({ ...loggedUser, [e.target.name]: e.target.value });
    };


    //Login with google
    const loginWithGoogle = async () => {
        try {
            const response = await axios.get('https://api.ulinkit.com/api/login/google');
            if (response.status === 200) {
                const redirectURL = response.data.redirectUrl;
                window.open(redirectURL, '_self'); 
            }
        } catch (error) {
            toast(<div className='toaster'> < NewReleasesIcon />{error || 'Failed to login with Google'}</div>, { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
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
                        <button onClick={loginWithGoogle} className='box loginwithgoogle flex'>
                            <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1720605284/pngwing.com_kapijs.png" alt="google" />
                            <div className="heading2">Login with Google</div>
                        </button>
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


                            <button className='btn box flex' type='submit' disabled={isSubmitting} ><div className="heading2">{isSubmitting ? 'Logging in...' : 'Login'}</div></button>
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