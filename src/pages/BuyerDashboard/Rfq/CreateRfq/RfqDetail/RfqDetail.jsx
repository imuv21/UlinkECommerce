import React, { useEffect, useState } from 'react'
import './RfqDetail.css'

const RfqDetail = () => {
    const [reviewConfirmData, setReviewConfirmData] = useState(null)
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('reviewConfirmData'))
        setReviewConfirmData(data)
    }, [])
    const generateRfqId = () => {
        const charVal = 'ULINK'
        let id = "ULINK";
        const numVal = '0123456789'
        for (let i = 0; i < 7; i++) {
            id += numVal.charAt(Math.floor(Math.random() * numVal.length))
        }
        return id
    }
    return (
        <div className='mt'>
            <div className=' bor-1 border-p'>
                <div className='border-p'>
                    <h1 className='user-title  heading-2 ml-left  size'>RFQ Details</h1>
                </div>
            </div>
            <div className=' flex-space-beetwen border-5 border-p'>
                <div key={generateRfqId()} className='border-p img-flex'>
                    <h1 className='user-title  heading-2 ml-left  size'>{generateRfqId()}</h1>
                    <p className=' ml-left   quotes'>Pending Quotes</p>
                </div>
                <div key={generateRfqId()} className='border-p img-flex '>
                    <p className=''>Quotes Submited: <span className='mr-left'>0</span></p>
                    <p className='dateexpire'>Rfq Expire: <span className='mr-left'>{reviewConfirmData && reviewConfirmData.updateadditonalDetail.startdate}</span></p>
                    <p className='dateexpire'>RFQ Created On: <span className='mr-left'>02/04/2023</span></p>
                </div>
            </div>
            <div className='border-5 border-p'>
                <div className='table-containers-show-data bg'>
                    <div className=''>Product Id</div>
                    <div className=''>Product Name</div>
                    <div className=''>Quantity</div>
                    <div className=''>Unit Target Price</div>
                    <div className=''>Total Price</div>
                </div>
                {reviewConfirmData && reviewConfirmData.addproduct.map((item, index) => (
                    <div key={index} className='table-containers-show-data'>
                        <div className=''>{generateRfqId()}</div>
                        <div className='img-flex'>{item.img && <img className='rfq-imgs' src={item.img} />}{item.pname}</div>
                        <div className=''>{item.qty}{item.unit}</div>
                        <div className=''>{item.targetprice ? (item.targetprice === 'Negotiable' ? 'Negotiable' : "AED" + " " + item.price) : ''}</div>
                        <div className=''>{isNaN(item.tprice) ? '-' : item.tprice}</div>
                    </div>
                ))}
            </div>
            <div className='border-5 border-p'>
                <div className='flex-space-beetwen border-p '>
                    <div className='shipping-detail'>
                        <p className='add ' >Shipping Detail</p>
                        <p className='mt-top ml-left'>Country: <span>{reviewConfirmData && reviewConfirmData.getCountry}</span></p>
                        <p className='mt-top ml-left'>State: <span>{reviewConfirmData && reviewConfirmData.selectedState}</span></p>
                        <p className='mt-top ml-left'>City: <span>{reviewConfirmData && reviewConfirmData.cities.filter(city => city.selected).map(city => (
                            <div key={city.geonameid}>{city.name}</div>
                        ))}</span></p>
                        <p className='mt-top ml-left'>Shipping Terms: <span>{reviewConfirmData && reviewConfirmData.shippingData}</span></p>
                    </div>
                    <div className='shipping-detail'>
                        <p className='add' >Additional Detail</p>
                        <p className='mt-top ml-left'>Additional Detail: <span></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RfqDetail