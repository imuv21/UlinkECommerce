import React, { useRef, useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import * as XLSX from 'xlsx';

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
                const jsonDataWithTime = jsonData.map(item => ({
                    ...item,
                    time: currentTime.toLocaleString(),
                    images: [{ url: item.imageUrl, name: item.imageName }]
                }));
                setJsonData(jsonDataWithTime);

                localStorage.setItem('jsonData', JSON.stringify(jsonDataWithTime));
                const savedSingleFormData = JSON.parse(localStorage.getItem('singleFormData')) || [];
                const updatedSingleFormData = [...savedSingleFormData, ...jsonDataWithTime];
                localStorage.setItem('singleFormData', JSON.stringify(updatedSingleFormData));
            };

            reader.readAsArrayBuffer(file);
        } else {
            alert('Please select a file.');
        }
    };



    //download excel
    const downloadExcel = () => {
        fetch('../../assets/haha.xlsx')
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'haha.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                console.error('Error downloading Excel file:', error);
            });
    };




    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <div className="heading flex"><ArrowBackIosNewIcon style={{ cursor: 'pointer' }} onClick={threeClick} />&nbsp;&nbsp;Upload Products</div>
            <div className="flex seller-home">
                <div className="flexcol shone">
                    
                    <div className="sel-box2">
                        <div className="heading3">1. Download template</div>
                        <div className="heading2">
                            After selecting categories, please download and fill the template below.
                        </div>
                        <a href='../../assets/bulk_upload_temp.xlsx' download="bulk_upload_temp.xlsx" accept=".xlsx" className='upBtns' >Download template&nbsp;&nbsp;<DownloadIcon /></a>
                    </div>
                    <div className="sel-box2">
                        <div className="heading3">2. Upload template</div>
                        <div className="heading2">
                            After filling the template from above, please click the button below to upload the file with products.
                        </div>
                        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleUpload} />
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