import React, { useEffect, useState } from 'react';

const Media = () => {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('formData')) || [];
        setFormData(savedFormData.map(item => ({ ...item, images: item.images || [] })));
    }, []);

    const formatBytes = (bytes, decimals = 2) => {
        console.log("bytes:", bytes);
        if (typeof bytes !== 'number' || isNaN(bytes)) {
            console.log("Invalid size");
            return 'Invalid size';
        }
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const handleDownload = (url, fileName) => {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };
    

    return (
        <div className='flexcol wh mt home' >
            {formData.map((item, index) => (
                <div className="flexcol" key={index}>
                    {
                        item.images.map((image, i) => (
                            <div className='media-details' key={i}>
                                <img className='imgPro' src={image.url} alt={`Image ${i + 1}`} />
                                <p><strong>Name:</strong> {image.name}</p>
                                <p><strong>Size:</strong> {formatBytes(image.size)}</p>
                                <p><strong>Uploaded:</strong> {item.time}</p>
                                <button onClick={() => handleDownload(image.url, image.name)}>Download</button>
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    );
};

export default Media;
