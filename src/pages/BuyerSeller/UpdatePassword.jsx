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
const schema = yupResolver(resetPasswordSchema);
const ResetPassword = () => {

    //images
    const logo = urls[0];
    const navigate = useNavigate();

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
    const onSubmit = (formData) => {
        console.log(formData);
        alert('Congrats! Your password has been reset successfully. Please login again.');
        navigate('/login');
    };

    return (
        <Fragment>
            <Helmet>
                <title>Update Your Password</title>
            </Helmet>
            <div className="login-cont">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Update your password</div>
                        <form className="flexcol gap" onSubmit={handleSubmit(onSubmit)}>
                            <div className="search-input">
                                <Controller name="password" control={control} defaultValue="" render={({ field }) => <input type={passwordVisible ? "text" : "password"} autoComplete="new-password" className="box flex" placeholder='Enter your password' {...field} />} />
                                <span onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            {errors.password && <div className='error'>{errors.password.message}</div>}

                            <div className="search-input">
                                <Controller name="confirmPass" control={control} defaultValue="" render={({ field }) => <input type={conPasswordVisible ? "text" : "password"} autoComplete="new-password" className="box flex" placeholder='Enter password again' {...field} />} />
                                <span onClick={toggleConPasswordVisibility}>
                                    {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            {errors.confirmPass && <div className='error'>{errors.confirmPass.message}</div>}
                            <button className='btn box flex' type='submit'><div className="heading2">Set Password</div></button>
                            <Link to={'/profile'} className=' box flex'><div className="heading2" style={{color: 'gray'}}>Cancel</div></Link>
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