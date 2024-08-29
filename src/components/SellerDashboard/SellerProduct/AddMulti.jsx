import React, { useEffect, useRef } from 'react';
import empty from '../../../assets/empty.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AddMulti = () => {


    //propagation
    const navigate = useNavigate();
    const upload = (event) => {
        event.stopPropagation();
        navigate('/seller-dashboard/upload-products-bulk');
    };
    const edit = (event) => {
        event.stopPropagation();
        navigate("/seller-dashboard/edit-products-bulk");
    };
    const archive = (event) => {
        event.stopPropagation();
        navigate("/seller-dashboard/archive-products");
    };
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
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }} tabIndex={0} ref={scrollRef}>
            <Helmet>
                <title>Add Multiple Products | Ulinkit - Bulk Upload Your Inventory</title>
                <meta name="description" content="Easily add multiple products to your Ulinkit store in bulk. Streamline your inventory management and quickly update your product listings with our efficient upload tools." />
                <link rel="canonical" href="https://www.ulinkit.com/seller-dashboard/add-products-bulk" />
            </Helmet>
            <h1 className="heading">Add Multiple Products</h1>
            <h2 className="descrip2">Use the upload center to upload/edit products and images</h2>

            <article className="perfect-grid-flex">
                <section onClick={upload} className="productflex">
                    <div className="flexcol big-svg"><CloudUploadIcon /></div>
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <h1 className="heading3">Upload multiple products</h1>
                        <h2 className="descrip2">Used for uploading multiple products at a time via one or several template files</h2>
                        <div className="flex small-svg">
                            <TipsAndUpdatesIcon />&nbsp;&nbsp;
                            <div onClick={learnMore} className='download-btn'>Learn more</div>
                        </div>
                    </div>
                </section>
                <section onClick={edit} className="productflex">
                    <div className="flexcol big-svg"><EditNoteIcon /></div>
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <h1 className="heading3">Edit multiple products</h1>
                        <h2 className="descrip2">Use this option to update all or selected products by using our excel template</h2>
                        <div className="flex small-svg">
                            <TipsAndUpdatesIcon />&nbsp;&nbsp;
                            <div onClick={learnMore} className='download-btn'>Learn more</div>
                        </div>
                    </div>
                </section>
                <section onClick={archive} className="productflex">
                    <div className="flexcol big-svg"><ArchiveIcon /></div>
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <h1 className="heading3">Archive multiple products</h1>
                        <h2 className="descrip2">Use this option to archive products by using excel template</h2>
                        <div className="flex small-svg">
                            <TipsAndUpdatesIcon />&nbsp;&nbsp;
                            <div onClick={learnMore} className='download-btn'>Learn more</div>
                        </div>
                    </div>
                </section>
            </article>

            <p className="heading">Upload List</p>
            <article className="productlist">
                <img src={empty} className='productlist-img' alt="empty box" />
                <h1 className="heading">Upload your products</h1>
                <h2 className="descrip2">This is where you’ll upload your products and see the upload history</h2>
                <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Start Your Upload</div></button>
            </article>
        </div>
    )
}

export default AddMulti;