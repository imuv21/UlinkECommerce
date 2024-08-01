import React, { useState, useEffect, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bankSchema } from '../../Schemas/validationSchema';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBankDetails, updateBankDetails } from '../../../Redux/bankDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const schema = yupResolver(bankSchema);

const EditPaymentDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bankDetails, loading, error } = useSelector((state) => state.bankDetails);
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: schema
    });

    const [countries, setCountries] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isDefault, setIsDefault] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchBankDetails());
    }, [dispatch]);

    useEffect(() => {
        if (bankDetails) {
            const bankDetail = bankDetails.find((bank) => bank.id === parseInt(id));
            if (bankDetail) {
                setValue("bankName", bankDetail.bankName || '');
                setValue("bankLocation", bankDetail.bankLocation || '');
                setValue("iban", bankDetail.iban || '');
                setValue("accNo", bankDetail.accNo || '');
                setValue("accHolderName", bankDetail.accHolderName || '');
                setValue("swiftbic", bankDetail.swiftbic || '');
                setValue("ifsc", bankDetail.ifsc || '');
                setValue("ibankName", bankDetail.interMediary?.ibankName || '');
                setValue("iiban", bankDetail.interMediary?.iiban || '');
                setValue("iaccNo", bankDetail.interMediary?.iaccNo || '');
                setValue("iswiftbic", bankDetail.interMediary?.iswiftbic || '');
                setValue("iifsc", bankDetail.interMediary?.iifsc || '');
                setValue("defaultValue", bankDetail.defaultValue || false);

                const hasIntermediaryValue = bankDetail.interMediary?.ibankName || bankDetail.interMediary?.iiban || bankDetail.interMediary?.iaccNo || bankDetail.interMediary?.iswiftbic || bankDetail.interMediary?.iifsc;

                setValue("check", hasIntermediaryValue ? true : false);

                setSelectedOrigin(bankDetail.bankLocation);
                setIsChecked(hasIntermediaryValue ? true : false);
                setIsDefault(bankDetail.defaultValue);
            }
        }
    }, [bankDetails, id, setValue]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
                const data = response.data;
                const uniqueCountries = [...new Set(data.map(city => city.country))];
                setCountries(uniqueCountries);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCountries();
    }, []);

    const originSelectChange = (event) => {
        setSelectedOrigin(event.target.value);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleDefaultChange = () => {
        setIsDefault(!isDefault);
    };

    const onSubmit = async (data) => {

        if (isSubmitting) return;
        setIsSubmitting(true);

        const bankDetails = {
            id: id, 
            accHolderName: data.accHolderName,
            accNo: data.accNo,
            bankLocation: data.bankLocation,
            bankName: data.bankName,
            defaultValue: isDefault,
            swiftbic: data.swiftbic,
            ifsc: data.ifsc,
            iban: data.iban,
            interMediary: isChecked ? {
                iiban: data.iiban,
                iifsc: data.iifsc,
                ibankName: data.ibankName,
                iaccNo: data.iaccNo,
                iswiftbic: data.iswiftbic
            } : {}
        };

        try {
            await dispatch(updateBankDetails({ id: id, bankDetails })).unwrap();
            toast(<div className='toaster'> < VerifiedIcon /> {`Bank details updated successfully`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } catch (err) {
          
            toast(<div className='toaster'> < NewReleasesIcon /> {`Failed to update bank details`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitting(false);
            navigate('/seller-dashboard/payments');
        }
    };

    const backtopayment = () => {
        navigate('/seller-dashboard/payments');
    };

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Update Bank Account</title>
            </Helmet>
            <div className="heading flex">
                <ArrowBackIosNewIcon style={{ cursor: 'pointer' }} onClick={backtopayment} />&nbsp;&nbsp;Update your account
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="productlist2">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <div className="heading3 wh">Account information</div>
                <div className="heading2 wh">This helps us to gather the right bank information from you.</div>
                <Controller name="bankName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter bank name' {...field} />} />
                {errors.bankName && <div className='error'>{errors.bankName?.message}</div>}
                <Controller name="bankLocation" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" {...field} value={selectedOrigin} onChange={(e) => { field.onChange(e); originSelectChange(e); }}>
                        <option value="">Select bank location</option>
                        {countries.map((country) => (
                            <option key={uuidv4()} value={country}>{country}</option>
                        ))}
                    </select>
                )} />
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
                        <div className="heading2 wh">Intermediary banks route your money to wherever you are.</div>
                        <Controller name='ibankName' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary bank name' {...field} />} />
                        <Controller name='iiban' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary IBAN' {...field} />} />
                        <Controller name='iaccNo' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary bank account number' {...field} />} />
                        <Controller name='iswiftbic' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary swift/BIC code' {...field} />} />
                        <Controller name='iifsc' control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Intermediary IFSC code' {...field} />} />
                    </Fragment>
                )}
                <div className="flex wh">
                    <input type="checkbox" name='defaultValue' checked={isDefault} onChange={handleDefaultChange} />&nbsp;&nbsp;<div className="heading2 wh">Set bank details as default</div>
                </div>
                <div className="flex" style={{ gap: '20px' }}>
                    <button type='submit' className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }} disabled={isSubmitting}><div className="heading2">{isSubmitting ? 'Submitting...' : 'Submit'}</div></button>
                    <button type='button' className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }} onClick={backtopayment}><div className="heading2">Cancel</div></button>
                </div>
            </form>
        </div>
    );
};

export default EditPaymentDetails;
