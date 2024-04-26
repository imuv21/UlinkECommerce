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
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileInputValue, setFileInputValue] = useState('');

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
      setImages(savedFormData[index].images || []);
    }
  }, [index, setValue, setImages]);

  const onSubmit = (data) => {
    const currentTime = new Date();
    data.time = currentTime.toLocaleString();
    const imageUrls = images.map(image => {
      const imageSize = image.size || 0;
      return {
        url: image.url,
        name: image.name,
        size: imageSize,
        uploadDate: currentTime.toLocaleString()
      };
    });
    data.images = imageUrls;
    const updatedFormData = JSON.parse(localStorage.getItem('formData'));
    if (updatedFormData && updatedFormData[index]) {
      const updatedData = { ...data, images, selectedSupOption, margin, path };
      updatedFormData[index] = updatedData;
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      navigate('/prolist', { state: { updatedData } });
    }
    console.log(data);
  };

  const handleCancel = () => {
    navigate('/prolist');
  };



  //drag and drop
  const selectFiles = () => {
    document.getElementById('file-input').click();
  };
  const onFileSelect = (event) => {
    const files = event.target.files;
    console.log('Selected files:', files);
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i]; // Store the current file in a variable
      if (file) {
        console.log('File name:', file.name);
        if (file.type.split('/')[0] === 'image') {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImages((prevImages) => [
              ...prevImages,
              {
                name: file.name, // Use the stored file variable here
                url: e.target.result,
                size: file.size,
              },
            ]);
          };
          reader.readAsDataURL(file);
        }
      }
    }
    setFileInputValue(''); // Reset file input value
  };
  const deleteImage = (index) => {
    setImages((prevImages) => {
      if (index >= 0 && index < prevImages.length) {
        const newImages = [...prevImages];
        newImages.splice(index, 1);
        return newImages;
      }
      return prevImages;
    });
  };
  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };
  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    onFileSelect({ target: { files } });
  };
  const uploadImages = () => {
    console.log("images: ", images);
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

      <div className="card-dd">
        <div className="drag-area-dd" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
          {isDragging ? (
            <span className="select-dd">Drop images here</span>
          ) : (
            <Fragment>
              Drag & Drop image here or {" "}
              <span className="select-dd" role="button" onClick={selectFiles}>
                Browse
              </span>
            </Fragment>
          )}
          <input
            id="file-input"
            type="file"
            className='file-dd'
            multiple
            onChange={onFileSelect}
            value={fileInputValue}
            style={{ display: 'none' }} // hide input
          />
        </div>
        <div className="container-dd">
          {images.map((url, index) => (
            <div className="image-dd" key={index}>
              <span className="delete-dd" onClick={() => deleteImage(index)}>&times;</span>
              <img src={url} alt={`Image ${index}`} />
            </div>
          ))}
        </div>
      </div>

      <button type='submit'>Update</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditProduct;
