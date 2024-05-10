import React, { useRef, useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import * as XLSX from 'xlsx';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../Schemas/cate';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
const UploadProducts = ({ handleOptionClick }) => {

    const threeClick = () => {
        handleOptionClick('OptionThree');
    };

    const navigate = useNavigate();
    const learnMore = () => {
        navigate('/guidelines');
    };

    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.focus();
        }
    }, []);




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
    const [marketingValue, setMarketingValue] = useState(0);
    const [categoryPath, setCategoryPath] = useState('');

    useEffect(() => {
        setIsSubmitEnabled(selectedSupOption && selectedSubOption && selectedMiniSubOption && selectedMicroSubOption && marketingValue !== 0 && categoryPath !== '');
    }, [selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption, marketingValue, categoryPath]);


    const handleSupOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSupOption(selectedOption);
        setIsSecondSelectEnabled(true);
        setIsThirdSelectEnabled(false);
        setIsFourthSelectEnabled(false);
        setSelectedSubOption('');
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
        setMarketingValue(getMarginValue(selectedOption));
    };

    const handleSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSubOption(selectedOption);
        setIsThirdSelectEnabled(true);
        setIsFourthSelectEnabled(false);
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
        setCategoryPath(`${selectedSupOption}/${selectedOption}`);
    };
    const handleMiniSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMiniSubOption(selectedOption);
        setIsFourthSelectEnabled(true);
        setSelectedMicroSubOption('');
        setCategoryPath(`${selectedSupOption}/${selectedSubOption}/${selectedOption}`);
    };
    const handleMicroSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMicroSubOption(selectedOption);
        setCategoryPath(`${selectedSupOption}/${selectedSubOption}/${selectedMiniSubOption}/${selectedOption}`);
    };
    const getMarginValue = (option) => {
        switch (option) {
           
            case "ConsumerElectronics":
                return 2.5;
            case "FashionAndAccessories":
                return 10;
            case "Automotive":
                return 5;
            case "FoodAndBeverages":
                return 2;
            case "BabyCenter":
                return 5;
            case "BeautyAndFragrances":
                return 2.5;
            case "HomeGardenAndFurniture":
                return 5;
            case "MachineryAndEquipment":
                return 5;
            case "OfficeAndStationery":
                return 3;
            case "PersonalCare":
                return 3;
            case "PetAndAnimalCare":
                return 5;
            case "SportsAndFitness":
                return 5;
            case "Toys":
                return 5;
            case "ToolsAndHomeImprovement":
                return 5;
           
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

                const range = XLSX.utils.decode_range(sheet['!ref']);
                range.s.r = 1; // Set starting row to 2rd row
                sheet['!ref'] = XLSX.utils.encode_range(range);

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
                        marketingValue: marketingValue,
                        categoryPath: categoryPath,
                        selectedSupOption: selectedSupOption
                    };
                });
                setJsonData(jsonDataWithTime);
                const savedSingleFormData = JSON.parse(localStorage.getItem('singleFormData')) || [];
                const updatedSingleFormData = [...savedSingleFormData, ...jsonDataWithTime];
                localStorage.setItem('singleFormData', JSON.stringify(updatedSingleFormData));
            };
            reader.readAsArrayBuffer(file);
            alert('File uploaded successfully!');
            threeClick();
        } else {
            alert('Please select a file.');
        }
    };


    //download button
    const handleDownload = () => {
        let filename = '';
        switch (selectedSupOption) {
         
            case "ConsumerElectronics":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "FashionAndAccessories":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "Automotive":
                filename = "Automotive.xlsx";
                break;
            case "FoodAndBeverages":
                filename = "FoodAndBeverages.xlsx";
                break;
            case "BabyCenter":
                filename = "BabyCenter.xlsx";
                break;
            case "BeautyAndFragrances":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "HomeGardenAndFurniture":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "MachineryAndEquipment":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "OfficeAndStationery":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "PersonalCare":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "PetAndAnimalCare":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "SportsAndFitness":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "Toys":
                filename = "Ulinkit-template-common.xlsx";
                break;
            case "ToolsAndHomeImprovement":
                filename = "Ulinkit-template-common.xlsx";
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
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Upload Products</title>
            </Helmet>
            <div className="heading flex"><ArrowBackIosNewIcon style={{ cursor: 'pointer' }} onClick={threeClick} />&nbsp;&nbsp;Upload Products</div>
            <div className="flex seller-home">
                <div className="flexcol shone">

                    <div className="sel-box2">
                        <div className="heading3">1. Select categories</div>
                        <div className="heading2">
                            After selecting categories, please download and fill the template below.
                        </div>
                        <div className="flex">
                            <select onChange={handleSupOptionChange} >
                                <option value="">Select an option</option>
                                {supOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option.length > 15 ? `${option.substring(0, 15)}...` : option}
                                    </option>
                                ))}
                            </select>
                            <select onChange={handleSubOptionChange} >
                                <option value="">Select a sub option</option>
                                {subOptions[selectedSupOption] && subOptions[selectedSupOption].map((option, index) => (
                                    <option key={index} value={option}> {option.length > 15 ? `${option.substring(0, 15)}...` : option}</option>
                                ))}
                            </select>
                            <select onChange={handleMiniSubOptionChange} >
                                <option value="">Select minisub option</option>
                                {miniSubOptions[selectedSubOption] && miniSubOptions[selectedSubOption].map((option, index) => (
                                    <option key={index} value={option}> {option.length > 15 ? `${option.substring(0, 15)}...` : option}</option>
                                ))}
                            </select>
                            <select onChange={handleMicroSubOptionChange} >
                                <option value="">Select micro-sub option</option>
                                {microSubOptions[selectedMiniSubOption] && microSubOptions[selectedMiniSubOption].map((option, index) => (
                                    <option key={index} value={option}> {option.length > 15 ? `${option.substring(0, 15)}...` : option}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flexcol-start' style={{ fontSize: '11px', gap: '5px', color: 'green' }}>
                            <div>{errorMessage ? errorMessage : isSubmitEnabled ? `Selected path: ${categoryPath}` : 'Please make all selections'}</div>
                            <div>{selectedSupOption && `Marketing value: ${marketingValue}%`}</div>
                        </div>
                    </div>
                    <div className="sel-box2">
                        <div className="heading3">2. Download template</div>
                        <div className="heading2">
                            Download and fill this template.
                        </div>
                        <button disabled={!isSubmitEnabled} onClick={handleDownload} className='upBtns' >Download template&nbsp;&nbsp;<DownloadIcon /></button>
                    </div>
                    <div className="sel-box2">
                        <div className="heading3">3. Upload template</div>
                        <div className="heading2">
                            Upload the template here.
                        </div>
                        <input type="file" id="fileInput" disabled={!isSubmitEnabled} style={{ display: 'none' }} onChange={handleUpload} />
                        <label htmlFor="fileInput" className='upBtns'>
                            Upload template&nbsp;&nbsp;<UploadIcon />
                        </label>
                    </div>

                </div>
                <div className="flexcol shtwo" tabIndex={0} ref={scrollRef}>
                    <div className="sel-box2">
                        <div className="heading3 flex"><TipsAndUpdatesIcon />&nbsp;&nbsp;Bulk product update</div>
                        <div className="heading2">
                            Learn how to upload your products and media in bulk by using a template.
                        </div>
                        <div className='download-btn' onClick={learnMore}>Learn more</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadProducts