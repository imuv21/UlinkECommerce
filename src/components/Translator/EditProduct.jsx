import React, { useState, useEffect, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { testSchema } from '../Schemas/validationSchema';
import { useParams, useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useDivCount } from '../context/SuperContext';

const schema = yupResolver(testSchema);

const EditProduct = () => {

  const { divCount, addDiv, removeDiv } = useDivCount();

  //edit and validation
  const { index } = useParams();
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: schema,
  });
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData && savedFormData[index]) {
      setFormData(savedFormData[index]);
      setValue('inputone', savedFormData[index].inputone);

      setValue('salePrice_0', savedFormData[index].salePrice_0);
      setValue('salePrice_1', savedFormData[index].salePrice_1);
      setValue('salePrice_2', savedFormData[index].salePrice_2);
      setValue('salePrice_3', savedFormData[index].salePrice_3);

      setValue('price_0', savedFormData[index].price_0);
      setValue('price_1', savedFormData[index].price_1);
      setValue('price_2', savedFormData[index].price_2);
      setValue('price_3', savedFormData[index].price_3);

      setValue('quantity_0', savedFormData[index].quantity_0);
      setValue('quantity_1', savedFormData[index].quantity_1);
      setValue('quantity_2', savedFormData[index].quantity_2);
      setValue('quantity_3', savedFormData[index].quantity_3);
    }
  }, [index, setValue]);

  const onSubmit = (data) => {
    const currentTime = new Date();
    data.time = currentTime.toLocaleString();
    const updatedFormData = JSON.parse(localStorage.getItem('formData'));
    if (updatedFormData && updatedFormData[index]) {
      const updatedData = { ...data };
      updatedFormData[index] = updatedData;
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      navigate('/prolist', { state: { updatedData } });
    }
    console.log(data);
  };

  const handleCancel = () => {
    navigate('/prolist');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flexcol wh mt home'>

      <Controller name="inputone" control={control} defaultValue={formData.inputone || ''} render={({ field }) => <input {...field} className="box flex" placeholder='Enter something...' />} />
      {errors.inputone && <div className='error'>{errors.inputone.message}</div>}


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
                <Controller name={`quantity_${index}`} control={control} defaultValue={formData[`quantity_${index}`] || ''} render={({ field }) => <input placeholder='Enter quantity' {...field} />} />
                {errors[`quantity_${index}`] && <div className='error'>{errors[`quantity_${index}`]?.message}</div>}
              </div>
              <div className='pldiv'>
                <div className="flex">
                  <div className="heading2">AED</div>
                  <Controller name={`price_${index}`} control={control} defaultValue={formData[`price_${index}`] || ''} render={({ field }) => <input placeholder='Enter price' {...field} />} />
                </div>
                {errors[`price_${index}`] && <div className='error'>{errors[`price_${index}`]?.message}</div>}
              </div>
              <div className='pldiv'>
                <div className="flex">
                  <div className="heading2">AED</div>
                  <Controller name={`salePrice_${index}`} control={control} defaultValue={formData[`salePrice_${index}`] || ''} render={({ field }) => <input placeholder='Enter sale price' {...field} />} />
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


      <button type='submit'>Update</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditProduct;
