import React, { Fragment, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateNumberSchema } from '../../components/Schemas/validationSchema';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import { Helmet } from 'react-helmet-async';
import animation from "../../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { allCountries } from '../../components/Schemas/countryCodes';

const schema = yupResolver(updateNumberSchema);
const UpdateNumber = () => {

    const navigate = useNavigate();
   

    //json lottie animation
    const options = {
        animationData: animation,
        loop: true,
    };
    const { View } = useLottie(options);


    //select country code from data 
    const [ccode, setCcode] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    useEffect(() => {
        const formattedCountries = allCountries.map(country => ({
            name: country[0],
            iso2: country[1],
            dialCode: country[2]
        }));

        setCcode(formattedCountries);
    }, []);
    const handleCountryChange = (event) => {
        const countryCode = event.target.value;
        const selected = ccode.find(country => country.iso2 === countryCode);
        setSelectedCountry(selected);
    }



    const [updateUserNumber, setUpdateUserNumber] = useState({});
    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = async (formData) => {
        const updatedUserNumber = { ...updateUserNumber, ...formData };
        localStorage.setItem('updateUserNumber', JSON.stringify(updatedUserNumber));
        navigate('/verify-update-number');
    };
    const handleChange = (e) => {
        setUpdateUserNumber({ ...updateUserNumber, [e.target.name]: e.target.value });
    };

    return (
        <Fragment>
            <Helmet>
                <title>Update Mobile Number</title>
            </Helmet>
            <div className="login-cont">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Update Mobile Number</div>
                        <form className="flexcol gap" onSubmit={handleSubmit(onSubmit)}>

                            <div className="flex wh" style={{ gap: '30px' }}>
                                <Controller name="countryCode" value={selectedCountry} onChange={handleCountryChange} control={control} defaultValue="" render={({ field }) => (
                                    <select className="box flex" value={updateUserNumber.countryCode || ''} onChange={handleChange} {...field}>
                                        <option value="">Country code</option>
                                        {ccode.map(country => (
                                            <option key={country.iso2} value={country.dialCode}>
                                                {`${country.name} (+${country.dialCode})`}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                />
                                <Controller name="mobile" control={control} defaultValue="" render={({ field }) => <input value={updateUserNumber.mobile || ''} onChange={handleChange} className="box flex" autoComplete='off' placeholder='Enter your phone number' {...field} />} />
                            </div>

                            {(errors.countryCode || errors.mobile) &&
                                <div className="flex wh">
                                    <div className="flex wh">
                                        <div className='error'>{errors.countryCode?.message}</div>
                                    </div>
                                    <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                        <div className='error'>{errors.mobile?.message}</div>
                                    </div>
                                </div>
                            }

                            <button className='btn box flex' type='submit'><div className="heading2">Send OTP</div></button>
                            <Link to={'/profile'} className=' box flex'><div className="heading2" style={{ color: 'gray' }}>Cancel</div></Link>
                            <div className="descrip">We will send an OTP to your number</div>
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

export default UpdateNumber