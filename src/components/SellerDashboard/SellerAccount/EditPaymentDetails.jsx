import React, { useState, useEffect, Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bankSchema } from '../../Schemas/validationSchema';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';

const schema = yupResolver(bankSchema);

const EditPaymentDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { bankToEdit, index } = location.state;

    //select country form api
    const [countries, setCountries] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState(bankToEdit.bankLocation);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
                const data = response.data;
                const uniqueCountries = [...new Set(data.map(city => city.country))];
                setCountries(uniqueCountries);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const originSelectChange = (event) => {
        setSelectedOrigin(event.target.value);
    };


    //checkbox div 
    const [isChecked, setIsChecked] = useState(bankToEdit.ibankName ? true : false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
     
    //default checkbox
    const [isdefault, setIsdefault] = useState(bankToEdit.defaultValue);
    const handleDefaultChange = () => {
        setIsdefault(!isdefault);
    };

    //validation
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: schema,
        defaultValues: bankToEdit
    });

    useEffect(() => {
        reset(bankToEdit);
    }, [bankToEdit, reset]);

    const onSubmit = data => {
        data.defaultValue = isdefault;
        let bankDetails = JSON.parse(localStorage.getItem('seller-bank-details')) || [];
        if (isdefault) {
            bankDetails = bankDetails.map(detail => ({ ...detail, defaultValue: false }));
        }
        bankDetails[index] = data;
        localStorage.setItem('seller-bank-details', JSON.stringify(bankDetails));
        navigate('/seller-dashboard/payments');
    };

    const backtopayment = () => {
        navigate('/seller-dashboard/payments');
    };

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
             <Helmet>
                <title>Update Bank Account</title>
            </Helmet>
            <div className="heading flex"><ArrowBackIosNewIcon style={{ cursor: 'pointer' }} onClick={backtopayment} />&nbsp;&nbsp;Update your account</div>
            <form onSubmit={handleSubmit(onSubmit)} className="productlist2">
                <div className="heading3 wh">Account information</div>
                <div className="heading2 wh">This helps us to gather the right bank information from you.</div>
                <Controller name="bankName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter bank name' {...field} />} />
                {errors.bankName && <div className='error'>{errors.bankName?.message}</div>}
                <Controller name="bankLocation" value={selectedOrigin} onChange={originSelectChange} control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" {...field} >
                        <option value="">Select bank location</option>
                        {countries.map((country) => (
                            <option key={uuidv4()} value={country}>{country}</option>
                        ))}
                    </select>
                )}
                />
                {errors.bankLocation && <div className='error'>{errors.bankLocation?.message}</div>}

                <Controller name="iban" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter IBAN number' {...field} />} />
                {errors.iban && <div className='error'>{errors.iban?.message}</div>}

                <Controller name="accNo" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter account number' {...field} />} />
                {errors.accNo && <div className='error'>{errors.accNo?.message}</div>}

                <Controller name="accHolderName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter account holder's name" {...field} />} />
                {errors.accHolderName && <div className='error'>{errors.accHolderName?.message}</div>}

                <Controller name="swiftbic" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter swift/BIC code" {...field} />} />
                {errors.swiftbic && <div className='error'>{errors.swiftbic?.message}</div>}

                <Controller name="ifsc" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter IFSC code" {...field} />} />
                {errors.ifsc && <div className='error'>{errors.ifsc?.message}</div>}

                <div className="flex wh">
                    <input type="checkbox" name='check' checked={isChecked} onChange={handleCheckboxChange} />&nbsp;&nbsp;<div className="heading2 wh">I want to specify an intermediary bank</div>
                </div>
                {isChecked && (
                    <Fragment>
                      <div className="heading3 wh">Intermediary bank details</div>  
                      <div className="heading2 wh">Intermediary banks route your money to where ever you are.</div>

                      <Controller name='ibankName' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary bank name' {...field} />} />
                      <Controller name='iiban' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary IBAN' {...field} />} />
                      <Controller name='iaccNo' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary bank account number' {...field} />} />
                      <Controller name='iswiftbic' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary swift/BIC code' {...field} />} />
                      <Controller name='iifsc' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary IFSC code' {...field} />} />
                    </Fragment>
                )}
                <div className="flex wh">
                    <input type="checkbox" name='defaultValue' checked={isdefault} onChange={handleDefaultChange} />&nbsp;&nbsp;<div className="heading2 wh">Set bank details as default</div>
                </div>

                <div className="flex" style={{ gap: '20px' }}>
                    <button type='submit' className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Update</div></button>
                    <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Cancel</div></button>
                </div>
            </form>
        </div>
    )
}

export default EditPaymentDetails