import React, { useState, useEffect, Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bankSchema } from '../../Schemas/validationSchema';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBankDetails } from '../../../Redux/bankDetailsSlice';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const schema = yupResolver(bankSchema);

const PaymentDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    //form handler
    const [isdefault, setIsdefault] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDefaultChange = () => {
        setIsdefault(!isdefault);
    };

    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = async (data) => {

        if (isSubmitting) return;
        setIsSubmitting(true);

        const bankDetails = {
            ...data,
            defaultValue: isdefault,
            interMediary: {
                iaccNo: data.iaccNo || '',
                ibankName: data.ibankName || '',
                iiban: data.iiban || '',
                iifsc: data.iifsc || '',
                iswiftbic: data.iswiftbic || ''
            }
        };

        try {
            await dispatch(addBankDetails({ bankDetails })).unwrap();
            toast(<div className='toaster'> < VerifiedIcon /> {`Bank details added successfully`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } catch (err) {

            toast(<div className='toaster'> < NewReleasesIcon /> {`Failed to update bank details`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitting(false);
            navigate('/seller-dashboard/payments');
        }
    };





    //checkbox div 
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const backtopayment = () => {
        navigate('/seller-dashboard/payments');
    };

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Add a Bank Account | Ulinkit - Set Up Your Payment Information</title>
                <meta name="description" content="Add a new bank account to your Ulinkit profile for seamless transactions. Ensure your payment information is up-to-date for accurate and timely financial operations." />
                <link rel="canonical" href="https://www.ulinkit.com/seller-dashboard/add-a-bank-account" />
            </Helmet>
            <h1 className="heading flex"><ArrowBackIosNewIcon style={{ cursor: 'pointer' }} onClick={backtopayment} />&nbsp;&nbsp;Add a new account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="productlist2">
                <h2 className="heading3 wh">Account information</h2>
                <h3 className="heading2 wh">This helps us to gather the right bank information from you.</h3>
                <Controller name="bankName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter bank name' {...field} />} />
                {errors.bankName && <p className='error'>{errors.bankName?.message}</p>}
                <Controller name="bankLocation" value={selectedOrigin} onChange={originSelectChange} control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" {...field} >
                        <option value="">Select bank location</option>
                        {countries.map((country) => (
                            <option key={uuidv4()} value={country}>{country}</option>
                        ))}
                    </select>
                )}
                />
                {errors.bankLocation && <p className='error'>{errors.bankLocation?.message}</p>}

                <Controller name="iban" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter IBAN number' {...field} />} />
                {errors.iban && <p className='error'>{errors.iban?.message}</p>}

                <Controller name="accNo" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter account number' {...field} />} />
                {errors.accNo && <p className='error'>{errors.accNo?.message}</p>}

                <Controller name="accHolderName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter account holder's name" {...field} />} />
                {errors.accHolderName && <p className='error'>{errors.accHolderName?.message}</p>}

                <Controller name="swiftbic" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter swift/BIC code" {...field} />} />
                {errors.swiftbic && <p className='error'>{errors.swiftbic?.message}</p>}

                <Controller name="ifsc" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter IFSC code" {...field} />} />
                {errors.ifsc && <p className='error'>{errors.ifsc?.message}</p>}

                <div className="flex wh">
                    <input type="checkbox" name='check' checked={isChecked} onChange={handleCheckboxChange} />&nbsp;&nbsp;<div className="heading2 wh">I want to specify an intermediary bank</div>
                </div>
                {isChecked && (
                    <Fragment>
                        <h4 className="heading3 wh">Intermediary bank details</h4>
                        <h5 className="heading2 wh">Intermediary banks route your money to where ever you are.</h5>

                        <Controller name='ibankName' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary bank name' {...field} />} />
                        <Controller name='iiban' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary IBAN' {...field} />} />
                        <Controller name='iaccNo' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary bank account number' {...field} />} />
                        <Controller name='iswiftbic' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary swift/BIC code' {...field} />} />
                        <Controller name='iifsc' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary IFSC code' {...field} />} />
                    </Fragment>
                )}
                <div className="flex wh">
                    <input type="checkbox" name='defaultValue' checked={isdefault} onChange={handleDefaultChange} />&nbsp;&nbsp;<p className="heading2 wh">Set bank details as default</p>
                </div>

                <div className="flex" style={{ gap: '20px' }}>
                    <button type='submit' className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2" disabled={isSubmitting}> {isSubmitting ? 'Saving...' : 'Save'} </div></button>
                    <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Cancel</div></button>
                </div>
            </form>
        </div>
    )
}

export default PaymentDetails