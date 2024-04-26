import React, { useRef, useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import * as XLSX from 'xlsx';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../Schemas/cate';

const UploadProducts = ({ handleOptionClick }) => {


    const threeClick = () => {
        handleOptionClick('OptionThree');
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
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <div className="heading flex"><ArrowBackIosNewIcon style={{ cursor: 'pointer' }} onClick={threeClick} />&nbsp;&nbsp;Upload Products</div>
            <div className="flex seller-home">
                <div className="flexcol shone">

                    <div className="sel-box2">
                        <div className="heading3">1. Select categories</div>
                        <div className="heading2">
                            After selecting categories, please download and fill the template below.
                        </div>
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
                        <div className='flex'>
                            {errorMessage ? errorMessage : isSubmitEnabled ? `Selected path: ${categoryPath}` : 'Please make all selections'}
                            {selectedSupOption && (<p>Marketing value: {marketingValue}</p>)}
                        </div>
                    </div>
                    <div className="sel-box2">
                        <div className="heading3">2. Download template</div>
                        <div className="heading2">
                            Download and fill this template.
                        </div>
                        <button  disabled={!isSubmitEnabled} onClick={handleDownload} className='upBtns' >Download template&nbsp;&nbsp;<DownloadIcon /></button>
                    </div>
                    <div className="sel-box2">
                        <div className="heading3">3. Upload template</div>
                        <div className="heading2">
                            Upload the template here.
                        </div>
                        <input type="file" id="fileInput" style={{ display: 'none' }} disabled={!isSubmitEnabled} onChange={handleUpload} />
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
                        <div className='download-btn'>Learn more</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadProducts