import React, { Fragment, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../components/Schemas/validationSchema';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';
import { allCountries } from '../components/Schemas/countryCodes';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const schema = yupResolver(signupSchema);
const Signup = () => {

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
    const navigate = useNavigate();
    const login = () => {
        navigate('/login');
    }

    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = async (formData) => {
        const updatedUserData = { ...userData, ...formData };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        try {
            const response = await axios.post(`${BASE_URL}/api/register`, updatedUserData);
            alert(`Signup successful.`);
            console.log(`Signup successful: ${response.data}`);
            navigate('/verify-email');
            
        } catch (registerError) {
            const registerErrorMessage = registerError.response ? registerError.response.data : registerError.message;
            console.log(`Signup failed: ${registerErrorMessage}, Email: ${updatedUserData.email}`);
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
                <title>Create Your Account</title>
            </Helmet>
            <div className="login-cont">

                <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="signupcont">
                    <div className='signupform'>
                        <div className='flexcol cover'>

                            <div className="heading">Create your account</div>
                            <div className='box flex'>
                                <svg className="svg" viewBox="0 0 24 24"><path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path><path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path></svg>
                                <div className="heading2">Register with Google</div>
                            </div>
                            <div className="flex or"><div className="line"></div><span style={{ margin: '0px 30px' }}>Or</span><div className="line"></div></div>

                            <form className="flexcol  gap" onSubmit={handleSubmit(onSubmit)}>
                                <Controller name="role" control={control} defaultValue="" render={({ field }) => (
                                    <select className="box flex" value={userData.role || ''} onChange={handleChange} {...field}>
                                        <option value="">Register as a...</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="seller">Seller</option>
                                    </select>
                                )}
                                />
                                {errors.role && <div className='error'>{errors.role.message}</div>}

                                <div className="flex wh" style={{ gap: '30px' }}>
                                    <Controller name="firstname" control={control} defaultValue="" render={({ field }) => <input value={userData.firstname || ''} onChange={handleChange} autoComplete='off' className="box flex" placeholder='Enter your first name' {...field} />} />
                                    <Controller name="lastname" control={control} defaultValue="" render={({ field }) => <input value={userData.lastname || ''} onChange={handleChange} autoComplete='off' className="box flex" placeholder='Enter your last name' {...field} />} />
                                </div>

                                {(errors.firstname || errors.lastname) &&
                                    <div className="flex wh">
                                        <div className="flex wh">
                                            <div className='error'>{errors.firstname?.message}</div>
                                        </div>
                                        <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                            <div className='error'>{errors.lastname?.message}</div>
                                        </div>
                                    </div>
                                }


                                <Controller name="email" control={control} defaultValue="" render={({ field }) => <input value={userData.email || ''} onChange={handleChange} className="box flex" autoComplete='email' placeholder='Enter your email' {...field} />} />
                                {errors.email && <div className='error'>{errors.email.message}</div>}





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
                                            <div className='error'>{errors.countryCode?.message}</div>
                                        </div>
                                        <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                            <div className='error'>{errors.mobile?.message}</div>
                                        </div>
                                    </div>
                                }
                                <div className="flex" style={{ width: '100%', gap: '10px', justifyContent: 'start' }}>
                                    <input type="checkbox" style={{ cursor: 'pointer' }} checked={isChecked} onChange={handleCheckboxChange} /><div className="heading2">My whatsapp number is different</div>
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
                                        <Controller name="whatsaapNumber" control={control} defaultValue="" render={({ field }) => <input value={userData.whatsaapNumber || ''} onChange={handleChange} className="box flex" autoComplete='off' placeholder='Enter your whatsapp number' {...field} />} />
                                    </div>
                                )}
                                {isChecked && (errors.whatsaapNumber) &&
                                    <div className="flex wh">
                                        <div className="flex wh">
                                        </div>
                                        <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                            <div className='error'>{errors.whatsaapNumber?.message}</div>
                                        </div>
                                    </div>
                                }


                                <div className="search-input">
                                    <Controller name="password" control={control} defaultValue="" render={({ field }) => <input type={passwordVisible ? "text" : "password"} value={userData.password || ''} onChange={handleChange} className="box flex" autoComplete="new-password" placeholder='Enter your password' {...field} />} />
                                    <span onClick={togglePasswordVisibility}>
                                        {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </span>
                                </div>
                                {errors.password && <div className='error'>{errors.password.message}</div>}

                                <div className="search-input">
                                    <Controller name="confirmPass" control={control} defaultValue="" render={({ field }) => <input type={conPasswordVisible ? "text" : "password"} value={userData.confirmPass || ''} onChange={handleChange} className="box flex" autoComplete="new-password" placeholder='Enter password again' {...field} />} />
                                    <span onClick={toggleConPasswordVisibility}>
                                        {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </span>
                                </div>
                                {errors.confirmPass && <div className='error'>{errors.confirmPass.message}</div>}

                                <Controller name="country" value={selectedOp} onChange={operationSelectChange} control={control} defaultValue="" render={({ field }) => (
                                    <select className="box flex" value={userData.country || ''} onChange={handleChange}  {...field} >
                                        <option value="">Choose your country</option>
                                        {coperation.map((country) => (
                                            <option key={uuidv4()} value={country}>{country}</option>
                                        ))}
                                    </select>
                                )}
                                />
                                {errors.country && <div className='error'>{errors.country.message}</div>}

                                <button className='btn box flex' type='submit'><div className="heading2">Continue</div></button>
                                <div className="descrip">By registering you agree to the user Terms & Conditions and Privacy Policy</div>
                                <div className="heading2" style={{ color: 'var(--btnClr)' }}>Already have an account? <span className='hoverr' onClick={login}>Click here</span></div>


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