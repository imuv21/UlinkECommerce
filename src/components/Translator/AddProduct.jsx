import React, { useState, useEffect, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { testSchema } from '../Schemas/validationSchema';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useDivCount } from '../context/SuperContext';

const schema = yupResolver(testSchema);
const AddProduct = () => {

    const { divCount, addDiv, removeDiv } = useDivCount();

    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    //validation
    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = (data) => {
        const currentTime = new Date();
        data.time = currentTime.toLocaleString();
        const savedFormData = JSON.parse(localStorage.getItem('formData')) || [];
        const updatedFormData = [...savedFormData, data];
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
        navigate('/prolist');
        console.log(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div className='flexcol wh mt home' >
            <form onSubmit={handleSubmit(onSubmit)} className='flexcol'>

                <Controller name="inputone" control={control} defaultValue="" render={({ field }) => <input value={formData.inputone || ''} onChange={handleChange} className="box flex" placeholder='Enter something...' {...field} />} />
                {errors.inputone && <div className='error'>{errors.inputone.message}</div>}

                <Controller name="inputtwo" control={control} defaultValue="" render={({ field }) => <input value={formData.inputtwo || ''} onChange={handleChange} className="box flex" placeholder='Enter something...' {...field} />} />
               


                <div className="flexcol wh">
                    <div className="pricelist">
                        <div className='pldiv bg-clr'><div className="heading3">Minimum order quantity</div></div>
                        <div className='pldiv bg-clr'><div className="heading3">Unit price</div></div>
                        <div className='pldiv bg-clr'><div className="heading3">Sale price (optional)</div></div>
                    </div>
                    {[...Array(divCount)].map((_, index) => (
                        <Fragment key={index}>
                            <div className="pricelist">
                                <div className='pldiv'>
                                    <Controller name={`quantity_${index}`} control={control} defaultValue="" render={({ field }) => <input value={formData[`quantity_${index}`] || ''} onChange={handleChange} placeholder='Enter quantity' {...field} />} />
                                    {errors[`quantity_${index}`] && <div className='error'>{errors[`quantity_${index}`]?.message}</div>}
                                </div>
                                <div className='pldiv'>
                                    <div className="flex">
                                        <div className="heading2">AED</div>
                                        <Controller name={`price_${index}`} control={control} defaultValue="" render={({ field }) => <input value={formData[`price_${index}`] || ''} onChange={handleChange} placeholder='Enter price' {...field} />} />
                                    </div>
                                    {errors[`price_${index}`] && <div className='error'>{errors[`price_${index}`]?.message}</div>}
                                </div>
                                <div className='pldiv'>
                                    <div className="flex">
                                        <div className="heading2">AED</div>
                                        <Controller name={`salePrice_${index}`} control={control} defaultValue="" render={({ field }) => <input value={formData[`salePrice_${index}`] || ''} onChange={handleChange} placeholder='Enter sale price' {...field} />} />
                                        {index > 0 && <DeleteForeverIcon className='removebtn' onClick={removeDiv} />}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
                <button className='btn box2 flex' onClick={addDiv} style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)', gap: '5px' }}>
                    <AddCircleIcon /><div className="heading2">Add Tier</div>
                </button>


                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddProduct;
