import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import animation from "../assets/json/animation-signup.json";
import { useLottie } from "lottie-react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sellerSchema } from '../components/Schemas/validationSchema';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import logo from '../assets/logo2.png';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { updateSellerDetails } from '../Redux/sellerSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const schema = yupResolver(sellerSchema);

const SellerForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error, success } = useSelector((state) => state.seller);
    const signupData = useSelector((state) => state.auth.signupData);

    const [sellerData, setSellerData] = useState({});
    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });

    const onSubmit = async (formData) => {
        const username = signupData.email;
        const password = signupData.password;
        const updatedSellerData = { ...sellerData, ...formData };
        
        dispatch(updateSellerDetails({ username, password, sellerData: updatedSellerData }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "countryCode" || name === "countryCode2") {
            const selectedCountry = ccode.find(country => country.iso2 === value);
            setSellerData({ ...sellerData, [name]: selectedCountry.dialCode });
        } else {
            setSellerData({ ...sellerData, [name]: value });
        }
    };

    useEffect(() => {
        if (status === 'succeeded') {
            alert('Congrats! You have become a seller. Please login into your account.');
            navigate('/login');
        } else if (status === 'failed') {
            alert('Failed to update seller details: ' + error);
        }
    }, [status, error, navigate]);


    



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


    //json lottie animation
    const options = {
        animationData: animation,
        loop: true,
    };
    const { View } = useLottie(options);



    return (
        <Fragment>
            <Helmet>
                <title>Create your seller profile</title>
            </Helmet>
            <div className="login-cont">

                 <Link to='/' className="logo-otpform">
                    <img src={logo} alt="logo" />
                 </Link>

                <div className="signupcont">
                    <form className='flexcol cover' onSubmit={handleSubmit(onSubmit)}>
                        <div className="heading">Create your seller profile</div>
                        <Controller name="companyname" control={control} defaultValue="" render={({ field }) => <input value={sellerData.companyname || ''} onChange={handleChange} autoComplete="off" className="box flex" placeholder='Enter company name' {...field} />} />
                        {errors.companyname && <div className='error'>{errors.companyname.message}</div>}
                        <Controller name="countryOfoperation" value={selectedOp} onChange={operationSelectChange} control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" value={sellerData.countryOfoperation || ''} onChange={handleChange}  {...field} >
                                <option value="">Country of operation</option>
                                {coperation.map((country) => (
                                    <option key={uuidv4()} value={country}>{country}</option>
                                ))}
                            </select>
                        )}
                        />
                        {errors.countryOfoperation && <div className='error'>{errors.countryOfoperation.message}</div>}
                        <button className='btn box flex' type='submit'><div className="heading2">Continue</div></button>
                        <div className="descrip">By registering you agree to the user <Link>Terms & Conditions</Link> and <Link>Privacy Policy</Link></div>
                    </form>
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

export default SellerForm