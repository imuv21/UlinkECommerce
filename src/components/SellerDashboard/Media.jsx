import React, { Fragment, useState, useEffect } from 'react';
import empty from '../../assets/box-empty-icon.png'
import DownloadIcon from '@mui/icons-material/Download';

const Media = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [subCurrentPage, setsubCurrentPage] = useState(1);
    const handleSubPageChange = (subPageNumber) => {
        setsubCurrentPage(subPageNumber);
    };


    //Media
    const [singleFormData, setSingleFormData] = useState([]);
    useEffect(() => {
        const savedSingleFormData = JSON.parse(localStorage.getItem('singleFormData')) || [];
        setSingleFormData(savedSingleFormData.map(item => ({ ...item, images: item.images || [] })));
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
        <div className='flexcol seller-home-cont' style={{ gap: '30px' }}>
            <div className="heading">Media</div>
            <div className="descrip2">Use the upload center to upload/edit product and images</div>
            <div className="flexcol wh" style={{ gap: '10px', alignItems: 'start' }}>
                <div className="flex wh" style={{ gap: '20px', justifyContent: 'start' }}>
                    <button onClick={() => handlePageChange(1)} style={{ width: '200px' }} className={currentPage === 1 ? 'toggle-active btn-toggle box2 flex' : 'btn-toggle box2 flex'}><div className="heading2">Media Bank</div></button>
                    <button onClick={() => handlePageChange(2)} style={{ width: '200px' }} className={currentPage === 2 ? 'toggle-active btn-toggle box2 flex' : 'btn-toggle box2 flex'}><div className="heading2">Image Links Upload</div></button>
                </div>

                {currentPage === 1 && (
                    <Fragment>
                        <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                            <div className="descrip2">Manage the photos, videos and document uploads</div>
                            <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Upload Grouped Media</div></button>
                        </div>
                        <div className="flex" style={{ justifyContent: 'space-between', gap: '20px' }}>
                            <select className="box2 flex" name="role" id="role">
                                <option value="">Select type</option>
                                <option value="image">Image</option>
                                <option value="document">Document</option>
                                <option value="video">Video</option>
                            </select>
                            <input type='text' className="box2 flex" placeholder='Search...' />
                            <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'gray' }}>X</button>
                        </div>



                        {singleFormData.length === 0 ? (
                            <Fragment>
                                <div className="productlist">
                                    <img src={empty} className='productlist-img' alt="empty box" />
                                    <div className="heading5">No media found</div>
                                    <div className="descrip2">There are no media items matching the criteria</div>
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>

                                {singleFormData.map((item, index) => (
                                    <div className="productlist" key={index}>
                                        {
                                            item.images.map((image, i) => (
                                                <div className="searchBoxPro3" key={i}>
                                                    <div><img src={image.url} className='imgPro' alt={`Image ${i + 1}`} /></div>
                                                    <div className="heading2">{image.name}</div>
                                                    <div className="heading2">{formatBytes(image.size)}</div>
                                                    <div className="heading2">{item.time}</div>
                                                    <div className="heading2" onClick={() => handleDownload(image.url, image.name)}><DownloadIcon style={{ cursor: 'pointer' }} /></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))}

                            </Fragment>
                        )}
                    </Fragment>
                )}
                {currentPage === 2 && (
                    <Fragment>
                        <div className="flex wh" style={{ gap: '20px', justifyContent: 'start' }}>
                            <button onClick={() => handleSubPageChange(1)} style={{ width: '200px' }} className={subCurrentPage === 1 ? 'toggle-active btn-toggle box2 flex' : 'btn-toggle box2 flex'}><div className="heading2">View Upload Images</div></button>
                            <button onClick={() => handleSubPageChange(2)} style={{ width: '200px' }} className={subCurrentPage === 2 ? 'toggle-active btn-toggle box2 flex' : 'btn-toggle box2 flex'}><div className="heading2">Update / Upload</div></button>
                        </div>
                        {subCurrentPage === 1 && (
                            <div className="productlist">
                                <img src={empty} className='productlist-img' alt="empty box" />
                                <div className="heading5">No record found</div>
                            </div>
                        )}
                        {subCurrentPage === 2 && (
                            <div className="productlist2">
                                <div className="heading">Download images upload template</div>
                                <div className="descrip2">Click download button to download images upload template</div>
                                <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Download Images</div></button>
                                <div className="heading">Upload image templates</div>
                                <div className="descrip2">When you have your templates filled out, click the button below to upload the products.</div>
                                <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                                    <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Upload</div></button>
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }}><div className="heading2">Reset</div></button>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }}><div className="heading2">Save</div></button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Fragment>
                )}

            </div>
        </div>
    )
}

export default Media