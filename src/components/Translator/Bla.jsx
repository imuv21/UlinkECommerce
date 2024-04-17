import React, { useEffect, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import * as XLSX from 'xlsx';

const Bla = () => {
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

  return (
    <div className="flexcol wh home">
      <h1>Upload Products in bulk</h1>
      <input type="file" id="fileInput" style={{display: 'none'}} onChange={handleUpload} />
        <label htmlFor="fileInput" className='upBtns'>
           Upload template&nbsp;&nbsp;<UploadIcon />
        </label>
    </div>
  );
};

export default Bla;
