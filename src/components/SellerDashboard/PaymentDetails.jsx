import React, { useState, useEffect, Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bankSchema } from '../Schemas/validationSchema';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const schema = yupResolver(bankSchema);

const PaymentDetails = ({ handleOptionClick }) => {


    //select country form api
    const [countries, setCountries] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
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
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const Click13 = () => {
        handleOptionClick('Option13');
    };

    //validation
    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <div className="heading flex"><ArrowBackIosNewIcon style={{ cursor: 'pointer' }} onClick={Click13} />&nbsp;&nbsp;Add a new account</div>
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

                <Controller name="iban" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter IBA number' {...field} />} />
                {errors.iban && <div className='error'>{errors.iban?.message}</div>}

                <Controller name="accNo" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter account number' {...field} />} />
                {errors.accNo && <div className='error'>{errors.accNo?.message}</div>}

                <Controller name="accHolderName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter account holder's name" {...field} />} />
                {errors.accHolderName && <div className='error'>{errors.accHolderName?.message}</div>}

                <Controller name="swiftbic" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter swift/BIC code" {...field} />} />
                {errors.swiftbic && <div className='error'>{errors.swiftbic?.message}</div>}

                <div className="flex wh">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />&nbsp;&nbsp;<div className="heading2 wh">I want to specify an intermediary bank</div>
                </div>
                {isChecked && (
                    <Fragment>
                      <div className="heading3 wh">Intermediary bank details</div>  
                      <div className="heading2 wh">Intermediary banks route your money to where ever you are.</div>
                      <input className="box flex" name='Intermediary bank name' placeholder='Intermediary bank name'/>
                      <input className="box flex" name='Intermediary IBAN' placeholder='Intermediary IBAN'/>
                      <input className="box flex" name='Intermediary bank account number*' placeholder='Intermediary bank account number'/>
                      <input className="box flex" name='Intermediary swift/BIC code' placeholder='Intermediary swift/BIC code'/>
                    </Fragment>
                )}
                <div className="flex wh">
                    <input type="checkbox" />&nbsp;&nbsp;<div className="heading2 wh">Set bank details as default</div>
                </div>

                <div className="flex" style={{ gap: '20px' }}>
                    <button type='submit' className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Save</div></button>
                    <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Cancel</div></button>
                </div>
            </form>
        </div>
    )
}

export default PaymentDetails