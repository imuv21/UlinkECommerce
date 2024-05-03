import React, { useRef, useEffect} from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import UploadIcon from '@mui/icons-material/Upload';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Helmet } from 'react-helmet-async';

const EditProducts = ({ handleOptionClick }) => {

    const threeClick = () => {
        handleOptionClick('OptionThree');
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
                <title>Edit Multiple Products</title>
            </Helmet>
            <div className="heading flex"><ArrowBackIosNewIcon style={{ cursor: 'pointer' }} onClick={threeClick} />&nbsp;&nbsp;Edit Products</div>
            <div className="flex seller-home">
                <div className="flexcol shone">
                    <div className="sel-box2">
                        <div className="heading3">1. Select the type of products you want to edit</div>
                        <div className="heading2">
                            Filter your products to do a partial product edit.
                        </div>
                        <div className="flex wh" style={{gap: '20px'}}>
                            <select className="box flex" name="availability" id="availability">
                                <option value="">Availability</option>
                                <option value="buyer">In stock</option>
                                <option value="seller">Out of stock</option>
                            </select>
                            <select className="box flex" name="state" id="state">
                                <option value="">State</option>
                                <option value="buyer">Online</option>
                                <option value="seller">Offline</option>
                            </select>
                        </div>
                        <div className="flex wh" style={{gap: '20px', justifyContent: 'start'}}>
                            <div className="heading2">Status :</div>
                            <div className="flex"><input type="checkbox" />&nbsp;&nbsp;All</div>
                            <div className="flex"><input type="checkbox" />&nbsp;&nbsp;Pending</div>
                            <div className="flex"><input type="checkbox" />&nbsp;&nbsp;Approved</div>
                            <div className="flex"><input type="checkbox" />&nbsp;&nbsp;Rejected</div>
                        </div>
                        <button className='upBtns'>Category&nbsp;&nbsp;<ManageSearchIcon /></button>
                    </div>
                    <div className="sel-box2">
                        <div className="heading3">2. Select the type of template</div>
                        <div className="heading2">
                            Select attribute groups to customize your template. You can select multiple attribute groups.
                        </div>
                        <button className='upBtns'>Export Template&nbsp;&nbsp;<SystemUpdateAltIcon /></button>
                    </div>
                    <div className="sel-box2">
                        <div className="heading3">3. Upload template</div>
                        <div className="heading2">
                            When you have your template(s) filled out, click the buttom below to upload the products.
                            You can also upload the files clicking on Upload Center on the Menu bar.
                        </div>
                        <button className='upBtns'>Upload Template&nbsp;&nbsp;<UploadIcon /></button>
                    </div>
                </div>

                <div className="flexcol shtwo" tabIndex={0} ref={scrollRef}>
                    <div className="sel-box2">
                        <div className="heading3 flex"><TipsAndUpdatesIcon />&nbsp;&nbsp;Bulk product update</div>
                        <div className="heading2">
                            Learn how to update the existing products in bulk.
                        </div>
                        <div className='download-btn'>Learn more</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProducts