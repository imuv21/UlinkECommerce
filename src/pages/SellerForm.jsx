import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sellerSchema } from '../components/Schemas/validationSchema';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet-async';

const schema = yupResolver(sellerSchema);

const SellerForm = () => {

    const navigate = useNavigate();
    
    const [sellerData, setSellerData] = useState({});
    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = (formData) => {
        const updatedSellerData = { ...sellerData, ...formData };
        localStorage.setItem('sellerData', JSON.stringify(updatedSellerData));
        navigate('/');
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
                <title>Create your seller profile</title>
            </Helmet>
            <div className="flex login-cont wh">
                <div className="flex wh">
                    <img src={bg} className='bgdiv' alt="bg" />
                </div>

                <div className="signupcont">
                    <form className='flexcol cover' onSubmit={handleSubmit(onSubmit)}>
                        <div className="heading">Create your seller profile</div>

                        
                        <Controller name="companyName" control={control} defaultValue="" render={({ field }) => <input value={sellerData.companyName || ''} onChange={handleChange} className="box flex" placeholder='Enter company name' {...field} />} />
                        {errors.companyName && <div className='error'>{errors.companyName.message}</div>}
                        <Controller name="countryOperation" value={selectedOp} onChange={operationSelectChange} control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" value={sellerData.countryOperation || ''} onChange={handleChange}  {...field} >
                                <option value="">Country of operation</option>
                                {coperation.map((country) => (
                                    <option key={uuidv4()} value={country}>{country}</option>
                                ))}
                            </select>
                        )}
                        />
                        {errors.countryOperation && <div className='error'>{errors.countryOperation.message}</div>}
                        <button className='btn box flex' type='submit'><div className="heading2">Continue</div></button>
                        <div className="descrip">By registering you agree to the user <Link>Terms & Conditions</Link> and <Link>Privacy Policy</Link></div>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default SellerForm