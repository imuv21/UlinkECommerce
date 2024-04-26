import React, { useState, useEffect, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { testSchema } from '../Schemas/validationSchema';
import { useNavigate } from 'react-router-dom';
import UploadIcon from '@mui/icons-material/Upload';
import * as XLSX from 'xlsx';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../Schemas/cate';

const schema = yupResolver(testSchema);
const AddProduct = () => {

    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    //validation
    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
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
        const updatedData = { ...data, selectedSupOption, margin, path };
        const savedFormData = JSON.parse(localStorage.getItem('formData')) || [];
        const updatedFormData = [...savedFormData, updatedData];
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
        navigate('/prolist');
        console.log(updatedData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    
    //categoryyyy
    const [selectedSupOption, setSelectedSupOption] = useState('');
    const [selectedSubOption, setSelectedSubOption] = useState('');
    const [selectedMiniSubOption, setSelectedMiniSubOption] = useState('');
    const [selectedMicroSubOption, setSelectedMicroSubOption] = useState('');
    const [isSecondSelectEnabled, setIsSecondSelectEnabled] = useState(false);
    const [isThirdSelectEnabled, setIsThirdSelectEnabled] = useState(false);
    const [isFourthSelectEnabled, setIsFourthSelectEnabled] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [margin, setMargin] = useState(0);
    const [path, setPath] = useState('');

    useEffect(() => {
        setIsSubmitEnabled(selectedSupOption && selectedSubOption && selectedMiniSubOption && selectedMicroSubOption && margin !== 0 && path !== '');
    }, [selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption, margin, path]);


    const handleSupOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSupOption(selectedOption);
        setIsSecondSelectEnabled(true);
        setIsThirdSelectEnabled(false);
        setIsFourthSelectEnabled(false);
        setSelectedSubOption('');
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
        setMargin(getMarginValue(selectedOption));
    };
    const handleSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSubOption(selectedOption);
        setIsThirdSelectEnabled(true);
        setIsFourthSelectEnabled(false);
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
        setPath(`${selectedSupOption}/${selectedOption}`);
    };
    const handleMiniSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMiniSubOption(selectedOption);
        setIsFourthSelectEnabled(true);
        setSelectedMicroSubOption('');
        setPath(`${selectedSupOption}/${selectedSubOption}/${selectedOption}`);
    };
    const handleMicroSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMicroSubOption(selectedOption);
        setPath(`${selectedSupOption}/${selectedSubOption}/${selectedMiniSubOption}/${selectedOption}`);
    };
    const getMarginValue = (option) => {
        switch (option) {
            case "apple":
                return 0.05;
            case "orange":
                return 0.03;
            case "banana":
                return 0.1;
            default:
                return 0;
        }
    };

    //upload excel
    const [jsonData, setJsonData] = useState([]);
    const handleUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                const currentTime = new Date();
                const jsonDataWithTime = jsonData.map(item => {
                    const images = [];

                    if (item.imageUrl && item.imageName) {
                        images.push({ url: item.imageUrl, name: item.imageName });
                    }

                    for (let i = 2; i <= 5; i++) {
                        const imageUrlKey = `imageUrl${i}`;
                        const imageNameKey = `imageName${i}`;

                        if (item[imageUrlKey] && item[imageNameKey]) {
                            images.push({
                                url: item[imageUrlKey],
                                name: item[imageNameKey],
                            });
                        }
                    }

                    return {
                        ...item,
                        time: currentTime.toLocaleString(),
                        images: images.length > 0 ? images : [],
                        margin: margin, 
                        path: path, 
                        selectedSupOption: selectedSupOption
                    };
                });

                setJsonData(jsonDataWithTime);
                const savedSingleFormData = JSON.parse(localStorage.getItem('formData')) || [];
                const updatedSingleFormData = [...savedSingleFormData, ...jsonDataWithTime];
                localStorage.setItem('formData', JSON.stringify(updatedSingleFormData));
            };

            reader.readAsArrayBuffer(file);
        } else {
            alert('Please select a file.');
        }
    };

    //download button
    const handleDownload = () => {
        let filename = '';
        switch (selectedSupOption) {
            case "apple":
                filename = "Ulink-template-grocery.xlsx";
                break;
            case "orange":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "banana":
                filename = "Ulink-template-grocery.xlsx";
                break;
            default:
                filename = "Ulinkit-template-common.xlsx";
        }
    
        const link = document.createElement('a');
        link.href = `/src/assets/Template/${filename}`; 
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    




    return (
        <div className='flexcol wh mt home' >
            <form onSubmit={handleSubmit(onSubmit)} className='flexcol'>

                <Controller name="bulletPoints" control={control} defaultValue="" render={({ field }) => <input value={formData.bulletPoints || ''} onChange={handleChange} className="box flex" placeholder='Enter points...' {...field} />} />


                <div className="flex">
                    <select onChange={handleSupOptionChange} disabled={isSecondSelectEnabled}>
                        <option value="">Select an option</option>
                        {supOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    <select onChange={handleSubOptionChange} disabled={!isSecondSelectEnabled || isThirdSelectEnabled}>
                        <option value="">Select a sub option</option>
                        {subOptions[selectedSupOption] && subOptions[selectedSupOption].map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    <select onChange={handleMiniSubOptionChange} disabled={!isThirdSelectEnabled || isFourthSelectEnabled}>
                        <option value="">Select minisub option</option>
                        {miniSubOptions[selectedSubOption] && miniSubOptions[selectedSubOption].map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    <select onChange={handleMicroSubOptionChange} disabled={!isFourthSelectEnabled || !!selectedMicroSubOption}>
                        <option value="">Select micro-sub option</option>
                        {microSubOptions[selectedMiniSubOption] && microSubOptions[selectedMiniSubOption].map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {selectedSupOption === "apple" && (
                    <div className="flexcol">
                        <Controller name="inputone" control={control} defaultValue="" render={({ field }) => <input value={formData.inputone || ''} onChange={handleChange} className="box flex" placeholder='Enter apple...' {...field} />} />
                    </div>
                )}
                {selectedSupOption === "orange" && (
                    <div className="flexcol">
                        <Controller name="inputtwo" control={control} defaultValue="" render={({ field }) => <input value={formData.inputtwo || ''} onChange={handleChange} className="box flex" placeholder='Enter orange...' {...field} />} />
                    </div>
                )}
                {selectedSupOption === "banana" && (
                    <input type="text" placeholder='enter banana...' />
                )}

                <div>
                    {errorMessage ? errorMessage : isSubmitEnabled ? `Selected path: ${path}` : 'Please make all selections'}
                    {selectedSupOption && (<p>Margin value: {margin}</p>)}
                </div>

                 <button disabled={!isSubmitEnabled} onClick={handleDownload}>Download Template</button>

                <input type="file" id="fileInput" style={{ display: 'none' }} disabled={!isSubmitEnabled} onChange={handleUpload} />
                <label htmlFor="fileInput" className='upBtns'>
                    Upload template&nbsp;&nbsp;<UploadIcon />
                </label>

                <button type="submit" disabled={!isSubmitEnabled}>Submit</button>
            </form>
        </div>
    );
};

export default AddProduct;
