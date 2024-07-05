import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateBankDetails } from '../slices/bankDetailsSlice';
import { v4 as uuidv4 } from 'uuid';

const EditBankDetail = ({ schema, countries, selectedOrigin, originSelectChange, isChecked, handleCheckboxChange, isDefault, handleDefaultChange, backtopayment }) => {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: schema
    });

    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.bankDetails);

    const onSubmit = (data) => {
        const bankDetails = {
            id: 29, // This should be dynamically set based on the bank detail being edited
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

        dispatch(updateBankDetails({ id: 29, bankDetails }));
    };

    return (
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
                <button type='submit' className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Update</div></button>
                <button type='button' className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }} onClick={backtopayment}><div className="heading2">Cancel</div></button>
            </div>
        </form>
    );
};

export default EditBankDetail;
