import React, { Fragment, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getBuyerFullDetail } from '../Redux/buyerFullSlice';


const BuyerDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { buyers, loading, error } = useSelector((state) => state.buyerFull);

    useEffect(() => {
        if (id) {
            dispatch(getBuyerFullDetail({ id }))
        }
    }, [dispatch, id]);
    useEffect(() => {
        console.log('hey budy:', buyers)
    }, [buyers])

    //  don't add the loading value added the same condition
    //  access the address and the business profile data  
    
    
    const addr = buyers?.address?.length > 0 ? buyers.address[0] : null;
    const company = buyers?.businessProfile;
    const creditInfo = buyers?.creditInformation;
    const doc = buyers?.businessProfile?.documents;
    

    return (
        <Fragment>
            <Helmet>
                <title>Buyer Details | Ulinkit Admin Dashboard - Comprehensive Buyer Information</title>
                <meta name="description" content="View detailed information of buyers on the Ulinkit admin dashboard. Access buyer profiles, review order histories, and manage account settings efficiently for personalized buyer management." />
                <link rel="canonical" href="https://www.ulinkit.com/admin-dashboard/buyer-list" />
            </Helmet>
            <div className='buyer-list-container'>
                <div className='admin-user-dashboard'>
                    <div className='buyer-dash-item'>
                        <h3>Buyer Details</h3>
                    </div>
                    {/*  address show */}
                    <div className='buyer-dash-item address-top'>
                        <h4 className='rang'>Address</h4>
                    </div>
                    <div className='address-list-container'>
                        {addr ? (
                            <div className='address-flex'>
                                <div className='address-flex-item'>
                                    <h5>Address:</h5>
                                    <p className='add-result'>{addr.address}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Selected Origin:</h5>
                                    <p className='add-result'>{addr.selectedOrigin}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>City:</h5>
                                    <p className='add-result'>{addr.city}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Area:</h5>
                                    <p className='add-result'>{addr.area}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Street:</h5>
                                    <p className='add-result'>{addr.street}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Office:</h5>
                                    <p className='add-result'>{addr.office}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>PO Box:</h5>
                                    <p className='add-result'>{addr.pobox}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Post Code:</h5>
                                    <p className='add-result'>{addr.postCode}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Phone Number:</h5>
                                    <p className='add-result'>{addr.phoneNumber}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Country:</h5>
                                    <p className='add-result'>{addr.selectedCountry}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Airport:</h5>
                                    <p className='add-result'>{addr.airport}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Sea Port:</h5>
                                    <p className='add-result'>{addr.seaport}</p>
                                </div>
                            </div>
                        ): (
                            <p>No Address found</p>
                        )}
                    </div>
                    {/*  Company Profile */}
                    <div className='buyer-dash-item address-top'>
                        <h4 className='rang'>Company Profile</h4>
                    </div>
                    <div className='address-list-container'>
                        {company ? (
                            <div className='address-flex' >
                                <div className='address-flex-item'>
                                    <h5>Company Profile:</h5>
                                    <p className='add-result'>{company.companyName}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Bussiness Type:</h5>
                                    <p className='add-result'>{company.businessType}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Billing Email:</h5>
                                    <p className='add-result'>{company.billingEmail}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Bussiness Number:</h5>
                                    <p className='add-result'>{company.billingNumber}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Street Name:</h5>
                                    <p className='add-result'>{company.streetName}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Country:</h5>
                                    <p className='add-result'>{company.country}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>State:</h5>
                                    <p className='add-result'>{company.state}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>City:</h5>
                                    <p className='add-result'>{company.city}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>PO Box Number:</h5>
                                    <p className='add-result'>{company.poBox}</p>
                                </div>
                            </div>
                        ): (
                            <p> No Company Profile</p>
                        )}
                    </div>
                    {/*  Credit Info Data show is here */}
                    <div className='buyer-dash-item address-top'>
                        <h4 className='rang'>Credit Information</h4>
                    </div>
                    <div className='address-list-container'>
                        {creditInfo ? (
                            <div className='address-flex' >
                                <div className='address-flex-item'>
                                    <h5>Number Of Employees:</h5>
                                    <p className='add-result'>{creditInfo.numberOfEmployees}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Date Established:</h5>
                                    <p className='add-result'>{creditInfo.dateEstablised}</p>
                                </div>
                                <div className='address-flex-item'>
                                    <h5>Annual Turnover:</h5>
                                    <p className='add-result'>{creditInfo.annualTurnover}</p>
                                </div>
                            </div>
                        ) : (
                            <p>No credit Information</p>
                        )}
                    </div>
                    {/*  Bussiness Document */}
                    <div className='buyer-dash-item address-top'>
                        <h4 className='rang'>Bussiness Document</h4>
                    </div>
                    <div className='address-list-container'>
                    {doc && Object.entries(doc).map(([key, doc]) => (
                        <div className='address-flex' key={key}>
                            <div className='address-flex-item'>
                                <h5>Document Type:</h5>
                                <p className='add-result'>{doc.documentType}</p>
                            </div>
                            <div className='address-flex-item'>
                                <h5>Document Name</h5>
                                <p className='add-result'>{doc.documentName.length > 20 ? `${doc.documentName.slice(0, 20)}` : doc.documentName}</p>
                            </div>
                            <div className='address-flex-item'>
                                <h5>Document Number</h5>
                                <p className='add-result'>{doc.documentNumber}</p>
                            </div>
                            <div className='address-flex-item'>
                                <h5>Expiry Date</h5>
                                <p className='add-result'>{doc.expiryDate}</p>
                            </div>
                            <div className='address-flex-item'>
                                <h5>Status</h5>
                                <p className='add-result'>{doc.status}</p>
                            </div>
                            {doc.docs && doc.docs.map((file) => (
                            <div className='address-flex-item' key={file.id}>
                                <button className='address-flex-btn' onClick={() => window.open(file.documentPath, '_blank')}>Download</button>
                            </div>
                        ))}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default BuyerDetail