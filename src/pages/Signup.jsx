import React, { Fragment, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../components/Schemas/validationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { urls } from '../components/Schemas/images';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';
import { allCountries } from '../components/Schemas/countryCodes';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { useDispatch } from 'react-redux';
import { signupSuccess, signupFailure } from '../Redux/AuthReducer';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const schema = yupResolver(signupSchema);
const Signup = () => {

    //images
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
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    //json lottie animation
    const options = {
        animationData: animation,
        loop: true,
    };
    const { View } = useLottie(options);


    const [userData, setUserData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = () => {
        navigate('/login');
    }

    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = async (formData) => {

        if (isSubmitting) return;
        setIsSubmitting(true);

        const updatedUserData = { ...userData, ...formData };

        try {
            const response = await axios.post(`${BASE_URL}/register`, updatedUserData);
            const { email, message, success } = response.data;

            if (success) {
                dispatch(signupSuccess({ signupData: updatedUserData, email, message }));
                toast(<div className='toaster'> < VerifiedIcon /> {`Signup successful. ${message}`}</div>, { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                navigate('/verify-email');
            }
        } catch (error) {
            dispatch(signupFailure({ message: error.response.data }));
            toast(<div className='toaster'> < NewReleasesIcon /> {`Signup failed: ${error.response.data} ${formData.email}`}</div>, { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    //select country code from data 
    const [ccode, setCcode] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryTwo, setSelectedCountryTwo] = useState('');
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
    const handleCountryChangeTwo = (event) => {
        const countryCode = event.target.value;
        const selected = ccode.find(country => country.iso2 === countryCode);
        setSelectedCountryTwo(selected);
    }

    //select country form api
    const [coperation, setCoperation] = useState([]);
    const [selectedOp, setSelectedOp] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
                const data = response.data;
                const uniqueCountries = [...new Set(data.map(city => city.country))];
                setCoperation(uniqueCountries);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const operationSelectChange = (event) => {
        setSelectedOp(event.target.value);
    };


    return (
        <Fragment>
            <Helmet>
                <title>Create Your Ulinkit Account | Ulinkit - Join Our Secure Online Shopping Platform</title>
                <meta name="description" content="Sign up for Ulinkit to create your account and start shopping online. Enjoy a secure and personalized shopping experience with top-quality products and great deals." />
                <link rel="canonical" href="https://www.ulinkit.com/signup" />
            </Helmet>
            <div className="login-cont hvh">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='signupform'>
                        <div className='flexcol cover'>

                            <h1 className="heading">Create your account</h1>


                            <form className="flexcol  gap" onSubmit={handleSubmit(onSubmit)}>
                                <Controller name="role" control={control} defaultValue="" render={({ field }) => (
                                    <select className="box flex" value={userData.role || ''} onChange={handleChange} {...field}>
                                        <option value="">Register as a...</option>
                                        <option value="Buyer">Buyer</option>
                                        <option value="Seller">Seller</option>
                                    </select>
                                )}
                                />
                                {errors.role && <p className='error'>{errors.role.message}</p>}

                                <div className="flex wh" style={{ gap: '30px' }}>
                                    <Controller name="firstname" control={control} defaultValue="" render={({ field }) => <input value={userData.firstname || ''} onChange={handleChange} autoComplete='off' className="box flex" placeholder='Enter your first name' {...field} />} />
                                    <Controller name="lastname" control={control} defaultValue="" render={({ field }) => <input value={userData.lastname || ''} onChange={handleChange} autoComplete='off' className="box flex" placeholder='Enter your last name' {...field} />} />
                                </div>

                                {(errors.firstname || errors.lastname) &&
                                    <div className="flex wh">
                                        <div className="flex wh">
                                            <p className='error'>{errors.firstname?.message}</p>
                                        </div>
                                        <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                            <p className='error'>{errors.lastname?.message}</p>
                                        </div>
                                    </div>
                                }


                                <Controller name="email" control={control} defaultValue="" render={({ field }) => <input value={userData.email || ''} onChange={handleChange} className="box flex" autoComplete='email' placeholder='Enter your email' {...field} />} />
                                {errors.email && <p className='error'>{errors.email.message}</p>}





                                <div className="flex wh" style={{ gap: '30px' }}>
                                    <Controller name="countryCode" value={selectedCountry} onChange={handleCountryChange} control={control} defaultValue="" render={({ field }) => (
                                        <select className="box flex" value={userData.countryCode || ''} onChange={handleChange} {...field}>
                                            <option value="">Country code</option>
                                            {ccode.map(country => (
                                                <option key={country.iso2} value={country.dialCode}>
                                                    {`${country.name} (+${country.dialCode})`}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    />
                                    <Controller name="mobile" control={control} defaultValue="" render={({ field }) => <input value={userData.mobile || ''} onChange={handleChange} className="box flex" autoComplete='off' placeholder='Enter your phone number' {...field} />} />
                                </div>
                                {(errors.countryCode || errors.mobile) &&
                                    <div className="flex wh">
                                        <div className="flex wh">
                                            <p className='error'>{errors.countryCode?.message}</p>
                                        </div>
                                        <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                            <p className='error'>{errors.mobile?.message}</p>
                                        </div>
                                    </div>
                                }
                                <div className="flex" style={{ width: '100%', gap: '10px', justifyContent: 'start' }}>
                                    <input type="checkbox" style={{ cursor: 'pointer' }} checked={isChecked} onChange={handleCheckboxChange} /><p className="heading2">My whatsapp number is different</p>
                                </div>
                                {isChecked && (
                                    <div className='flex wh' style={{ gap: '30px' }}>
                                        <Controller name="wpcountrycode" value={selectedCountryTwo} onChange={handleCountryChangeTwo} control={control} defaultValue="" render={({ field }) => (
                                            <select className="box flex" value={userData.wpcountrycode || ''} onChange={handleChange}  {...field}>
                                                <option value="">Country code</option>
                                                {ccode.map(country => (
                                                    <option key={country.iso2} value={country.dialCode}>
                                                        {`${country.name} (+${country.dialCode})`}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                        />
                                        <Controller name="whatsappnumber" control={control} defaultValue="" render={({ field }) => <input value={userData.whatsappnumber || ''} onChange={handleChange} className="box flex" autoComplete='off' placeholder='Enter your whatsapp number' {...field} />} />
                                    </div>
                                )}
                                {isChecked && (errors.whatsappnumber) &&
                                    <div className="flex wh">
                                        <div className="flex wh">
                                        </div>
                                        <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                            <p className='error'>{errors.whatsappnumber?.message}</p>
                                        </div>
                                    </div>
                                }


                                <div className="search-input">
                                    <Controller name="password" control={control} defaultValue="" render={({ field }) => <input type={passwordVisible ? "text" : "password"} value={userData.password || ''} onChange={handleChange} className="box flex" autoComplete="new-password" placeholder='Enter your password' {...field} />} />
                                    <span onClick={togglePasswordVisibility}>
                                        {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </span>
                                </div>
                                {errors.password && <p className='error'>{errors.password.message}</p>}

                                <div className="search-input">
                                    <Controller name="confirmPass" control={control} defaultValue="" render={({ field }) => <input type={conPasswordVisible ? "text" : "password"} value={userData.confirmPass || ''} onChange={handleChange} className="box flex" autoComplete="new-password" placeholder='Enter password again' {...field} />} />
                                    <span onClick={toggleConPasswordVisibility}>
                                        {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </span>
                                </div>
                                {errors.confirmPass && <p className='error'>{errors.confirmPass.message}</p>}

                                <Controller name="country" value={selectedOp} onChange={operationSelectChange} control={control} defaultValue="" render={({ field }) => (
                                    <select className="box flex" value={userData.country || ''} onChange={handleChange}  {...field} >
                                        <option value="">Choose your country</option>
                                        {coperation.map((country) => (
                                            <option key={uuidv4()} value={country}>{country}</option>
                                        ))}
                                    </select>
                                )}
                                />
                                {errors.country && <p className='error'>{errors.country.message}</p>}

                                <button className='btn box flex' type='submit'><div className="heading2" disabled={isSubmitting}>{isSubmitting ? 'Signing up...' : 'Sign up'}</div></button>
                                <p className="descrip">By registering you agree to the user Terms & Conditions and Privacy Policy</p>
                                <p className="heading2" style={{ color: 'var(--btnClr)' }}>Already have an account? <span className='hoverr' onClick={login}>Click here</span></p>


                            </form>

                        </div>
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

export default Signup