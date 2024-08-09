import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../Redux/AuthReducer';
import { urls } from '../components/Schemas/images';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const GoogleCallback = () => {

    const [role, setRole] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get('code');

        if (code && role) {
            axios.get(`https://api.ulinkit.com/api/login/google/callback?code=${code}&role=${role}`)
                .then(response => {

                    const { firstname, lastname, countryCode, wpcountrycode, token, message, status, country, countryOfoperation, whatsappnumber, currency, currencySymbol, role, email, number } = response.data.data;
                    const user = { firstname, lastname, countryCode, wpcountrycode, countryOfoperation, whatsappnumber, currency, currencySymbol, country, role, email, number };

                    dispatch(loginSuccess({ token, message, user }));
                    toast(<div className='toaster'> < VerifiedIcon /> {status} : {message}</div>, { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                    if (role === 'Seller') {
                        navigate('/seller-dashboard/seller-home');
                    } else {
                        navigate('/');
                    }
                })
                .catch(error => {
                    const message = error.response?.data?.message || 'Login failed!';
                    const status = error.response?.data?.status || 'error';
                    dispatch(loginFailure({ message }));
                    toast(<div className='toaster'> < NewReleasesIcon /> {status} : {message}</div>, { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                });
        }
    }, [location, role]);

    //images
    const logo = urls[0];

    //json lottie animation
    const options = {
        animationData: animation,
        loop: true,
    };
    const { View } = useLottie(options);

    return (
        <Fragment>
            <Helmet>
                <title>Choose your role</title>
            </Helmet>
            <div className="login-cont hvh googlecallback">
                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Choose your role</div>
                        <form className="flexcol gap">
                            <select name="role" className="box flex" value={role} onChange={handleRoleChange} required>
                                <option value="">Login as a...</option>
                                <option value="Buyer">Buyer</option>
                                <option value="Seller">Seller</option>
                            </select>
                        </form>
                        {role && <div>Loging as {role}...</div>}
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
};

export default GoogleCallback;
