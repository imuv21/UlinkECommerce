import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../../components/Schemas/validationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { urls } from '../../components/Schemas/images';
import { Helmet } from 'react-helmet-async';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import animation from "../../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const schema = yupResolver(resetPasswordSchema);
const ResetPassword = () => {

    //images
    const logo = urls[0];
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    //password hide and show
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [conPasswordVisible, setConPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConPasswordVisibility = () => {
        setConPasswordVisible(!conPasswordVisible);
    };

    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = async (formData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/user/update-details?password=${formData.password}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status) {
                toast(<div className='toaster'> < VerifiedIcon /> {response.data.message}</div>,
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                navigate('/verify-update-password');
            } else {
                toast(<div className='toaster'> < NewReleasesIcon /> {`Failed to send OTP to update password!`}</div>,
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='toaster'> < NewReleasesIcon /> {`Failed to send OTP to update password!`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
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
                <title>Update Your Password</title>
            </Helmet>
            <div className="login-cont hvh">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <article className="signupcont">
                    <div className='flexcol cover'>
                        <h1 className="heading">Update your password</h1>
                        <form className="flexcol gap" onSubmit={handleSubmit(onSubmit)}>
                            <div className="search-input">
                                <Controller name="password" control={control} defaultValue="" render={({ field }) => <input type={passwordVisible ? "text" : "password"} autoComplete="new-password" className="box flex" placeholder='Enter your password' {...field} />} />
                                <span onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            {errors.password && <p className='error'>{errors.password.message}</p>}

                            <div className="search-input">
                                <Controller name="confirmPass" control={control} defaultValue="" render={({ field }) => <input type={conPasswordVisible ? "text" : "password"} autoComplete="new-password" className="box flex" placeholder='Enter password again' {...field} />} />
                                <span onClick={toggleConPasswordVisibility}>
                                    {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            {errors.confirmPass && <p className='error'>{errors.confirmPass.message}</p>}
                            <div className="flexcol wh" style={{gap: '5px'}}>
                                <button className='btn box flex' type='submit'><div className="heading2">Set Password</div></button>
                                <Link to={'/profile'} className=' box flex'><div className="heading2" style={{ color: 'gray' }}>Cancel</div></Link>
                            </div>

                        </form>
                    </div>
                </article>

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