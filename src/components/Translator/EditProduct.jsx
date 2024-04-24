import React, { useState, useEffect, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { testSchema } from '../Schemas/validationSchema';
import { useParams, useNavigate } from 'react-router-dom';

const schema = yupResolver(testSchema);

const EditProduct = () => {

  //edit and validation
  const { index } = useParams();
  const navigate = useNavigate();

  const [selectedSupOption, setSelectedSupOption] = useState("");
  const [margin, setMargin] = useState("");
  const [path, setPath] = useState("");

  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: schema,
  });
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData && savedFormData[index]) {
      setFormData(savedFormData[index]);
      setValue('inputone', savedFormData[index].inputone);
      setValue('inputtwo', savedFormData[index].inputtwo);
      setValue('bulletPoints', savedFormData[index].bulletPoints);
      setMargin(savedFormData[index].margin);
      setPath(savedFormData[index].path);
      setSelectedSupOption(savedFormData[index].selectedSupOption);
    }
  }, [index, setValue]);

  const onSubmit = (data) => {
    const currentTime = new Date();
    data.time = currentTime.toLocaleString();
    const updatedFormData = JSON.parse(localStorage.getItem('formData'));
    if (updatedFormData && updatedFormData[index]) {
      const updatedData = { ...data, selectedSupOption, margin, path };
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

      <Controller name="bulletPoints" control={control} defaultValue={formData.bulletPoints || ''} render={({ field }) => <input {...field} className="box flex" placeholder='Enter points...' />} />

      {selectedSupOption === "apple" && (
        <Controller name="inputone" control={control} defaultValue={formData.inputone || ''} render={({ field }) => <input {...field} className="box flex" placeholder='Enter apple...' />} />
      )}

      {selectedSupOption === "orange" && (
        <Controller name="inputtwo" control={control} defaultValue={formData.inputtwo || ''} render={({ field }) => <input {...field} className="box flex" placeholder='Enter orange...' />} />
      )}

      <button type='submit'>Update</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditProduct;
