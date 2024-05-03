import React, { useEffect, useRef } from 'react'
import empty from '../../assets/empty.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AddMulti = ( {handleOptionClick} ) => {


    const sixClick = () => {
        handleOptionClick('OptionSix');
    };
    const sevenClick = () => {
        handleOptionClick('OptionSeven');
    };
    const eightClick = () => {
        handleOptionClick('OptionEight');
    };

    //propagation
    const navigate = useNavigate();
    const learnMore = (event) => {
        event.stopPropagation();
        navigate('/guidelines');
    };

    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.focus();
        }
    }, []);

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}   tabIndex={0} ref={scrollRef}>
            <Helmet>
                <title>Add Multiple Products</title>
            </Helmet>
            <div className="heading">Add Multiple Products</div>
            <div className="descrip2">Use the upload center to upload/edit products and images</div>

            <div className="perfect-grid-flex">
                <div className="productflex" onClick={sixClick} >
                    <div className="flexcol big-svg"><CloudUploadIcon /></div>
                    <div className="flexcol-start" style={{gap: '10px'}}>
                        <div className="heading3">Upload multiple products</div>
                        <div className="descrip2">Used for uploading multiple products at a time via one or several template files</div>
                        <div className="flex small-svg">
                            <TipsAndUpdatesIcon />&nbsp;&nbsp;
                            <div onClick={learnMore} className='download-btn'>Learn more</div>
                        </div>
                    </div>
                </div>
                <div className="productflex" onClick={sevenClick}>
                    <div className="flexcol big-svg"><EditNoteIcon /></div>
                    <div className="flexcol-start" style={{gap: '10px'}}>
                        <div className="heading3">Edit multiple products</div>
                        <div className="descrip2">Use this option to update all or selected products by using our excel template</div>
                        <div className="flex small-svg">
                            <TipsAndUpdatesIcon />&nbsp;&nbsp;
                            <div onClick={learnMore} className='download-btn'>Learn more</div>
                        </div>
                    </div>
                </div>
                <div className="productflex" onClick={eightClick}>
                    <div className="flexcol big-svg"><ArchiveIcon  /></div>
                    <div className="flexcol-start" style={{gap: '10px'}}>
                        <div className="heading3">Archive multiple products</div>
                        <div className="descrip2">Use this option to archive products by using excel template</div>
                        <div className="flex small-svg">
                            <TipsAndUpdatesIcon />&nbsp;&nbsp;
                            <div onClick={learnMore} className='download-btn'>Learn more</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="heading">Upload List</div>
            <div className="productlist">
                <img src={empty} className='productlist-img' alt="empty box" />
                <div className="heading">Upload your products</div>
                <div className="descrip2">This is where you’ll upload your products and see the upload history</div>
                <button className='btn box2 flex' onClick={sixClick} style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Start Your Upload</div></button>
            </div>
        </div>
    )
}

export default AddMulti;