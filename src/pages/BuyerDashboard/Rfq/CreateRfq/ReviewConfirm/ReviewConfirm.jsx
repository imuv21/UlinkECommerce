import React, { Fragment, useEffect } from 'react'
import './ReviewConfirm.css'
import { useLocation } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ReviewConfirm = () => {
    const location = useLocation()
    const {addproduct, shippingData, updateadditonalDetail, getCountry, selectedState, cities} = location.state;
    console.log(location.state)
    const handleGoBack =()=>{
        window.history.back('/createrfq')
    }
    //  save data from the local storege using useEffect
    useEffect(()=>{
        localStorage.setItem('reviewConfirmData', JSON.stringify({addproduct, updateadditonalDetail, getCountry, selectedState, cities})); 
    },[addproduct, updateadditonalDetail, getCountry, selectedState, cities])
    //  retrive the data from the local storeage
   const navigate = useNavigate()
    const handleConfirm = (e)=>{
        e.preventDefault()
        const rfqData = { addproduct,updateadditonalDetail };
        navigate('/rfq', { state: rfqData });  
    }
    //  save data from the local storege
    return (
        <div>
           <Helmet>
            <title>Review and Confirm RFQ | Ulinkit - Verify Your Request for Quote</title>
            <meta name="description" content="Review and confirm your Request for Quote (RFQ) details on Ulinkit. Ensure all information is correct before finalizing your request for quotes from suppliers." />
            <link rel="canonical" href="https://www.ulinkit.com/review-confirm" />
        </Helmet>
            <Fragment>  
                <div className='mt'>
                    <div className='border-5 border-p'>
                        <div className='border-p'>
                            <h1 className='user-title  heading-2 ml-left title-size'>Review and Confirm the RFQ details</h1>
                        </div>
                    </div>
                    <div className='border-5 border-p'>
                        <div className='border-p'>
                            <h1 className='user-title  heading-2 ml-left  size'>Product Details</h1>
                        </div>
                        <div className="table-container ">
                            <div className='table-containers'>
                                <div className=''>Product Name</div>
                                <div className=''>Quantity</div>
                                <div className=''>Unit Target Price</div>
                                <div className=''>Total Price</div>
                            </div>
                            {addproduct && addproduct.map((item, id) => (
                                <div key={id} className='table-containers-data vor'>
                                    <div className='img-flex'>{item.img && <img className='rfq-imgs' src={item.img}  />}{item.pname}</div>
                                    <div className=''>{item.qty}{item.unit}</div>
                                    <div className=''>{item.targetprice ? (item.targetprice === 'Negotiable' ? 'Negotiable' : "AED"+" " + item.price) : ''}</div>
                                        <div className=''>{isNaN(item.tprice) ? '-' : item.tprice}</div>
                                </div>  
                            ))}
                        </div>
                    </div>
                    {/* shipping detail */}
                    <div className='border-5 border-p'>
                        <div className='border-p'>
                            <h1 className='user-title  heading-2 ml-left size '>Shipping Details</h1>
                        </div>
                        <div className="table-container">
                            <div className='table-containers'>
                                <div className=''>Country</div>
                                <div className=''>State</div>
                                <div className=''>City</div>
                                <div className=''>Shipping Terms</div>
                            </div>
                            <div className='table-containers-data vor'>
                                <div className=''>{getCountry}</div>
                                <div className=''>{selectedState}</div>
                                <div className=''>{cities.length > 0 && cities[0].name}</div>
                                <div className=''>{shippingData.ddp} {shippingData.exwork}</div>
                            </div>
                        </div>
                    </div>
                    {/* Additional Information */}
                    <div className='border-5 border-p'>
                        <div className='border-p'>
                            <h1 className='user-title  heading-2 ml-left  size'>Additional Details</h1>
                        </div>
                        <div className="table-container">
                            <div className='table-containers'>
                                <div className=''>RFQ Expire On</div>
                                <div className=''>Additional Detail</div>
                            </div>
                            <div  className='table-containers-data vor'>
                                <div className=''>  {updateadditonalDetail.startdate ? updateadditonalDetail.startdate.toLocaleDateString() : ''}</div>
                                <div className=''>{updateadditonalDetail.additionalinfo}</div>
                            </div>
                        </div>
                    </div>
                    <div className='add-card-btn rvw' >
                        <button className='add-bank-btn cancel' onClick={handleGoBack} >Go Back & Edit</button>
                        <button type='submit' className='add-bank-btns cancel' onClick= {handleConfirm} >Confirm</button>
                    </div>
                </div>
            </Fragment>
  </div>
    )
}
export default ReviewConfirm