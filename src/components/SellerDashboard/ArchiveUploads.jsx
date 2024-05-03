import React, { useRef, useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import empty from '../../assets/empty.png';
import { Helmet } from 'react-helmet-async';

const ArchiveUploads = ({ handleOptionClick }) => {

    const threeClick = () => {
        handleOptionClick('OptionThree');
    };
    //toggle page
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //input type file style
    const updateFileName = (event) => {
        const fileName = event.target.files[0].name;
        document.getElementById('file-name').setAttribute('data-text', fileName);
    };
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.focus();
        }
    }, []);

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Products Archive</title>
            </Helmet>
            <div className="heading flex"><ArrowBackIosNewIcon style={{ cursor: 'pointer' }} onClick={threeClick} />&nbsp;&nbsp;Products Archival</div>
            <div className="flex wh" style={{ gap: '20px', justifyContent: 'start' }}>
                <button onClick={() => handlePageChange(1)} style={{ width: 'fit-content' }} className={currentPage === 1 ? 'toggle-active btn-toggle box2 flex' : 'btn-toggle box2 flex'}><div className="heading2">View upload product archives</div></button>
                <button onClick={() => handlePageChange(2)} style={{ width: 'fit-content' }} className={currentPage === 2 ? 'toggle-active btn-toggle box2 flex' : 'btn-toggle box2 flex'}><div className="heading2">Update/Upload</div></button>
            </div>

            {currentPage === 1 && (
                <div className="productlist">
                    <img src={empty} alt="empty box" />
                    <div className="heading5">No Record Found</div>
                </div>
            )}
            {currentPage === 2 && (
                <div className="productlist2">
                    <div className="heading3 wh">Download images upload template</div>
                    <div className="heading2 wh">Click download button to download images upload template</div>
                    <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><CloudDownloadIcon /><div className="heading2">Download product archival upload template</div></button>
                    <div className="heading3 wh">Upload images template</div>
                    <div className="heading2 wh">When you have your template(s) filled out, click the button below to upload the products for archival.</div>

                    <div className="file-input wh">
                        <label htmlFor="file-upload" className="custom-file-upload flex">
                           <AdsClickIcon />Click to upload
                        </label>
                        <input id="file-upload" type="file" onChange={updateFileName} />
                        <span id="file-name" className="file-name heading2"></span>
                    </div>
                    <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><CloudUploadIcon /><div className="heading2">Upload</div></button>
                </div>
            )}
        </div>
    )
}

export default ArchiveUploads