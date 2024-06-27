import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { businessSchema } from '../../Schemas/validationSchema';
import { fetchSellerBusinessProfile, updateSellerBusinessProfile, updateSellerDocData, uploadDocument, uploadProfileImage, deleteSellerDocument } from '../../../Redux/sellerBusinessProfileSlice';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const schema = yupResolver(businessSchema);

const SellerComProfile = () => {

    const dispatch = useDispatch();
    const { sellerprofile, status, error, updateStatus, updateError } = useSelector((state) => state.sellerBusinessProfile);

    useEffect(() => {
        dispatch(fetchSellerBusinessProfile());
    }, [dispatch]);


    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: schema,
    });

    // profile edit functionality
    const [isEditing, setIsEditing] = useState(false);
    const onSubmit = (data) => {
        dispatch(updateSellerBusinessProfile(data));
        setIsEditing(false);
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const cancel = () => {
        setIsEditing(false);
    }

    //select country form api
    const [coperation, setCoperation] = useState([]);
    const [selectedOp, setSelectedOp] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
                const data = response.data;
                const uniqueCountries = [...new Set(data.map(city => city.country))];
                setCoperation(uniqueCountries);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // profile photo upload functionality
    const uploadedImageUrl = useSelector((state) => state.sellerBusinessProfile.imageUrl);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg');
    useEffect(() => {
        if (uploadedImageUrl) {
            setImageUrl(uploadedImageUrl);
        }
    }, [uploadedImageUrl]);
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target.result);
            };
            reader.readAsDataURL(file);
            dispatch(uploadProfileImage(file));
        }
    };
    
    const handleUploadClick = () => {
        document.getElementById('avatar').click();
    };







    //Doc submit and edit functionality
    const [docErrors, setDocErrors] = useState({});
    const [isEditingDoc, setIsEditingDoc] = useState(false);

    const clearError = (fieldName) => {
        setDocErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: ''
        }));
    };

    const handleDoc = async (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!selectedFile.file && !selectedFile.name) {
            newErrors.selectedFile = 'Business registration document is required.';
        }
        if (!selectedFile) {
            newErrors.selectedFile = 'Business registration document is required.';
        }
        if (!selectedDate) {
            newErrors.selectedDate = 'Expiry date is required.';
        }
        if (!regDocNumber.trim()) {
            newErrors.regDocNumber = 'Registration document number is required.';
        }
        if (!selectedFileTwo.file && !selectedFileTwo.name) {
            newErrors.selectedFileTwo = 'Identity document is required.';
        }
        if (!selectedFileTwo) {
            newErrors.selectedFileTwo = 'Identity document is required.';
        }
        if (!selectedDateTwo) {
            newErrors.selectedDateTwo = 'Expiry date is required.';
        }
        if (!idDocNumber.trim()) {
            newErrors.idDocNumber = 'Identity document number is required.';
        }
        setDocErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            const tradeLicenseData = {
                documentNumber: regDocNumber,
                isBusinessOwner,
                expiryDate: selectedDate,
                documentType: 'TRADE_LICENSE'
            };

            const identityDocData = {
                documentNumber: idDocNumber,
                isBusinessOwner,
                expiryDate: selectedDateTwo,
                documentType: 'IDENTITY_DOCUMENT'
            };

            try {
                if (selectedFile && selectedFile.file) {
                    await dispatch(uploadDocument({ file: selectedFile.file, docType: 'TRADE_LICENSE' }));
                }
                if (selectedFileTwo && selectedFileTwo.file) {
                    await dispatch(uploadDocument({ file: selectedFileTwo.file, docType: 'IDENTITY_DOCUMENT' }));
                }
                if (selectedFileThree && selectedFileThree.file) {
                    await dispatch(uploadDocument({ file: selectedFileThree.file, docType: 'IDENTITY_DOCUMENT' }));
                }
                dispatch(updateSellerDocData({ documentType: 'TRADE_LICENSE', documentData: tradeLicenseData }));
                dispatch(updateSellerDocData({ documentType: 'IDENTITY_DOCUMENT', documentData: identityDocData }));

                alert("Form submitted successfully!");
                setIsEditingDoc(false);
                setDocErrors({});
                await dispatch(fetchSellerBusinessProfile());
            } catch (error) {
                alert("Form submission failed. Please try again.");
            }

        } else {
            alert("Form submission failed. Please fix the errors.");
        }
    };

    const handleEditClickDoc = () => {
        setIsEditingDoc(true);
    };
    const cancelDoc = async () => {
        await dispatch(fetchSellerBusinessProfile());
        setIsEditingDoc(false);
    }

    //rd and ic inputs
    const [regDocNumber, setRegDocNumber] = useState('');
    const [idDocNumber, setIdDocNumber] = useState('');
    const [isBusinessOwner, setIsBusinessOwner] = useState(false);

    //file upload one, two and three
    const [selectedFile, setSelectedFile] = useState({ file: null, name: '', path: '', size: '', id: '' });
    const [selectedFileTwo, setSelectedFileTwo] = useState({ file: null, name: '', path: '', size: '', id: '' });
    const [selectedFileThree, setSelectedFileThree] = useState({ file: null, name: '', path: '', size: '', id: '' });

    useEffect(() => {
        if (sellerprofile && sellerprofile.documents) {
            if (sellerprofile.documents.TRADE_LICENSE) {
                const tradeLicense = sellerprofile.documents.TRADE_LICENSE;
                setSelectedDate(tradeLicense.expiryDate || '');
                setRegDocNumber(tradeLicense.documentNumber || '');
                if (tradeLicense.docs && tradeLicense.docs.length > 0) {
                    const tradeLicenseFile = tradeLicense.docs.length > 0 ? tradeLicense.docs[0] : { filename: '', filesize: '', documentPath: '', id: '' };
                    setSelectedFile({ file: null, name: tradeLicenseFile.filename, path: tradeLicenseFile.documentPath, size: tradeLicenseFile.filesize, id: tradeLicenseFile.id });
                }
            }
            if (sellerprofile.documents.IDENTITY_DOCUMENT) {
                const identityDocument = sellerprofile.documents.IDENTITY_DOCUMENT;
                setSelectedDateTwo(identityDocument.expiryDate || '');
                setIdDocNumber(identityDocument.documentNumber || '');
                if (identityDocument.docs && identityDocument.docs.length > 0) {
                    const identityDocumentFile = identityDocument.docs.length > 0 ? identityDocument.docs[0] : { filename: '', filesize: '', documentPath: '', id: '' };
                    setSelectedFileTwo({ file: null, name: identityDocumentFile.filename, path: identityDocumentFile.documentPath, size: identityDocumentFile.filesize, id: identityDocumentFile.id });
                }
                if (identityDocument.docs && identityDocument.docs.length > 1) {
                    const identityDocumentFileTwo = identityDocument.docs.length > 1 ? identityDocument.docs[1] : { filename: '', filesize: '', documentPath: '', id: '' };
                    setSelectedFileThree({ file: null, name: identityDocumentFileTwo.filename, path: identityDocumentFileTwo.documentPath, size: identityDocumentFileTwo.filesize, id: identityDocumentFileTwo.id });
                }
            }
            setIsBusinessOwner(sellerprofile.isBusinessOwner || false);
        }
    }, [sellerprofile]);

    const handleDeleteFile = async (fileData, setFile, event) => {
        event.stopPropagation();
        const { path: documentPath, name: filename, size: filesize, id } = fileData;
        try {
            await dispatch(deleteSellerDocument({ documentPath, filename, filesize, id }));
            setFile({ file: null, name: '', path: '', size: '', id: '' });
        } catch (error) {
            console.error("Failed to delete file:", error);
        }
    };

    const allowedFormats = ['jpg', 'jpeg', 'png', 'tif', 'pdf'];
    const maxSize = 10 * 1024 * 1024;

    const handleFileChange = (event, setFile, fieldName) => {
        const file = event.target.files[0];
        if (file) {
            const fileFormat = file.name.split('.').pop().toLowerCase();
            if (file.size <= maxSize && allowedFormats.includes(fileFormat)) {
                setFile({ file, name: file.name });
                clearError(fieldName);
            } else {
                alert('Invalid file format or size. Please upload a file within 10MB and with a JPG, JPEG, PNG, TIF, or PDF format.');
            }
        }
    };

    // date picker one and two 
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateTwo, setSelectedDateTwo] = useState('');
    const now = new Date();
    const handleDateChange = (e, setDate, fieldName) => {
        const selected = new Date(e.target.value);
        const today = new Date();
        if (selected >= today) {
            setDate(e.target.value);
            clearError(fieldName);
        } else {
            alert('Please select a date from today or later.');
        }
    };







    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Company Profile</title>
            </Helmet>
            <div className="procont">

                <div className="flexcol" style={{ gap: '20px' }}>
                    <form className="profile-sel-box" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><BusinessIcon /> <div className="heading">Business Profile</div></div>
                        {isEditing ? (
                            <div className="flex" style={{ gap: '50px', justifyContent: 'start', width: '30%' }}>

                                <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>

                                    <div className="scp-profile-image-uploader">
                                        <div className="scp-image-container">
                                            <img src={imageUrl} alt="Profile" className="scp-profile-image" />
                                            <div className="scp-edit-icon" onClick={handleUploadClick}>
                                                <AddPhotoAlternateIcon />
                                            </div>
                                        </div>
                                        <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                    </div>

                                    <Controller name="companyname" control={control} defaultValue={sellerprofile.companyname || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your company name' {...field} />} />
                                    {errors.companyname && <div className='error'>{errors.companyname.message}</div>}

                                    <Controller name="buildingNumber" control={control} defaultValue={sellerprofile.buildingNumber || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your building number' {...field} />} />
                                    {errors.buildingNumber && <div className='error'>{errors.buildingNumber.message}</div>}

                                    <Controller name="streetName" control={control} defaultValue={sellerprofile.streetName || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your street name' {...field} />} />
                                    {errors.streetName && <div className='error'>{errors.streetName.message}</div>}

                                    <Controller name="city" control={control} defaultValue={sellerprofile.city || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your city' {...field} />} />
                                    {errors.city && <div className='error'>{errors.city.message}</div>}

                                    <Controller name="state" control={control} defaultValue={sellerprofile.state || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your state' {...field} />} />
                                    {errors.state && <div className='error'>{errors.state.message}</div>}

                                    <Controller name="countryOfOperation" control={control} defaultValue={sellerprofile.countryOfoperation || ''} render={({ field }) => (
                                        <select className="box flex" onChange={(e) => { field.onChange(e); setSelectedOp(e.target.value) }}  {...field} >
                                            <option value="">Select country of operation</option>
                                            {coperation.map((country) => (
                                                <option key={uuidv4()} value={country}>{country}</option>
                                            ))}
                                        </select>
                                    )} />
                                    {errors.countryOfoperation && <div className='error'>{errors.countryOfoperation.message}</div>}



                                    <Controller name="postCode" control={control} defaultValue={sellerprofile.postCode || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your post code' {...field} />} />
                                    {errors.postCode && <div className='error'>{errors.postCode.message}</div>}

                                    <Controller name="companyDescription" control={control} defaultValue={sellerprofile.companyDescription || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your company description' {...field} />} />
                                    {errors.companyDescription && <div className='error'>{errors.companyDescription.message}</div>}

                                </div>
                            </div>
                        ) : (
                            <Fragment>
                                {sellerprofile ? (
                                    <div className="company-profile">

                                        <div className="scp-profile-image-uploader">
                                            <div className="scp-image-container">
                                                <img src={imageUrl} alt="Profile" className="scp-profile-image" />
                                            </div>
                                        </div>

                                        <div className="cp-row">
                                            <div className='descrip2'>Company Name</div> <div className='heading2'> {sellerprofile.companyname || 'Null'}</div>
                                        </div>
                                        <div className="cp-row">
                                            <div className='descrip2'>Building Number</div> <div className='heading2'> {sellerprofile.buildingNumber || 'Null'}</div>
                                        </div>
                                        <div className="cp-row">
                                            <div className='descrip2'>Street Name</div> <div className='heading2'> {sellerprofile.streetName || 'Null'}</div>
                                        </div>
                                        <div className="cp-row">
                                            <div className='descrip2'>City</div> <div className='heading2'> {sellerprofile.city || 'Null'}</div>
                                        </div>
                                        <div className="cp-row">
                                            <div className='descrip2'>State</div> <div className='heading2'> {sellerprofile.state || 'Null'}</div>
                                        </div>
                                        <div className="cp-row">
                                            <div className='descrip2'>Country Of Operation</div> <div className='heading2'> {sellerprofile.countryOfoperation || 'Null'}</div>
                                        </div>
                                        <div className="cp-row">
                                            <div className='descrip2'>Post/Zip Code</div> <div className='heading2'> {sellerprofile.postCode || 'Null'}</div>
                                        </div>
                                        <div className="cp-row">
                                            <div className='descrip2'>Company description</div> <div className='heading2'> {sellerprofile.companyDescription || 'Null'}</div>
                                        </div>
                                    </div>) : (
                                    <div className="company-profile">
                                        <div className="heading2">No Company Profile Found</div>
                                    </div>)
                                }
                            </Fragment>
                        )}
                        {isEditing ? (
                            <div className="flex" style={{ gap: '20px' }}>
                                <button className="btn flex box" type='submit' style={{ width: '100px', cursor: 'pointer' }}>Save</button>
                                <button className="btn flex box" type='button' style={{ width: '100px', cursor: 'pointer' }} onClick={cancel} >Cancel</button>
                            </div>
                        ) : (
                            <div className="btn flex box" type='button' style={{ width: '100px', cursor: 'pointer' }} onClick={handleEditClick}>Edit</div>
                        )}
                        <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><div className="heading2"> <div className="descrip2">To change your company name please contact Ulinkit at support@ulinkit.com</div> </div></div>
                    </form>

                    <form className="profile-sel-box" onSubmit={handleDoc}>
                        <div className="flexcol wh" style={{ gap: '5px' }}>
                            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                                <div className="flex" style={{ gap: '10px' }}>
                                    <DescriptionIcon /> <div className="heading">Add Your Business Documents</div>
                                </div>
                                {!isEditingDoc && <div className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={handleEditClickDoc}> {sellerprofile ? 'Edit' : 'Add'} </div>}
                            </div>
                            {isEditingDoc && <div className="flex-start" style={{ gap: '5px', justifyContent: 'start', width: '100%' }}>
                                <div className="descrip2">We need the following documents to verify your business and give you access to all Tradeling features. We will get in touch with you when these documents need to be renewed.</div>
                            </div>}
                        </div>

                        {isEditingDoc ? (
                            <Fragment>
                                <div className="flexcol" style={{ gap: '20px', alignItems: 'start', width: '100%' }}>
                                    <div className="flexcol wh" style={{ gap: '5px' }}>
                                        <div className="heading3 wh">Business registration document</div>
                                        <div className="descrip wh">Upload a copy of a relevant business registration document so that we may verify you as an official business. This can be your business license, trade license, commercial register.</div>
                                    </div>

                                    <label className="br-file-upload">
                                        {(selectedFile && selectedFile.name) ? (
                                            <div className='afterUpload flex'>
                                                <div className="heading2 wh">{selectedFile.name}</div>
                                                <DeleteForeverIcon onClick={(event) => handleDeleteFile(selectedFile, setSelectedFile, event)} />
                                            </div>
                                        ) : (
                                            <div className='beforeUpload flex'>
                                                <UploadFileIcon />
                                                <div className='flexcol wh'>
                                                    <div className="heading2 wh">Attach File</div>
                                                    <div className="descrip wh">Only JPG, JPEG, PNG, TIF, and PDF formats at 10MB or less</div>
                                                </div>
                                            </div>
                                        )}
                                        <input name='selectedFile' type="file" onChange={(e) => handleFileChange(e, setSelectedFile, 'selectedFile')} />
                                    </label>
                                    {docErrors.selectedFile && <div className="error">{docErrors.selectedFile}</div>}

                                    <div className="flexcol-start wh" style={{ gap: '5px' }}>
                                        <div className='heading2'>Select expiry date</div>
                                        <input className='date-input' name='selectedDate' type="date" value={selectedDate} onChange={(e) => handleDateChange(e, setSelectedDate, 'selectedDate')} min={now.toISOString().split('T')[0]} />
                                        {docErrors.selectedDate && <div className="error">{docErrors.selectedDate}</div>}
                                    </div>

                                    <div className="flexcol-start wh" style={{ gap: '5px' }}>
                                        <div className="heading2">Registration document number</div>
                                        <input className='date-input2' name='regDocNumber' value={regDocNumber} onChange={(e) => { setRegDocNumber(e.target.value); clearError('regDocNumber'); }} type="text" placeholder='Enter here...' />
                                        {docErrors.regDocNumber && <div className="error">{docErrors.regDocNumber}</div>}
                                    </div>

                                    <div className="flexcol wh" style={{ gap: '5px' }}>
                                        <div className="heading3 wh">Identity document</div>
                                        <div className="descrip wh">Upload your identity document so that we may verify you as a representative of your business. This could be your passport or any other officially issued identity document.</div>
                                    </div>

                                    <label className="br-file-upload">
                                        {(selectedFileTwo && selectedFileTwo.name) ? (
                                            <div className='afterUpload flex'>
                                                <div className="heading2 wh">{selectedFileTwo.name}</div>
                                                <DeleteForeverIcon onClick={(event) => handleDeleteFile(selectedFileTwo, setSelectedFileTwo, event)} />
                                            </div>
                                        ) : (
                                            <div className='beforeUpload flex'>
                                                <UploadFileIcon />
                                                <div className='flexcol wh'>
                                                    <div className="heading2 wh">Attach File</div>
                                                    <div className="descrip wh">Only JPG, JPEG, PNG, TIF, and PDF formats at 10MB or less</div>
                                                </div>
                                            </div>
                                        )}
                                        <input type="file" name='selectedFileTwo' onChange={(e) => { handleFileChange(e, setSelectedFileTwo, 'selectedFileTwo'); }} />
                                    </label>
                                    {docErrors.selectedFileTwo && <div className="error">{docErrors.selectedFileTwo}</div>}

                                    <label className="br-file-upload">
                                        {(selectedFileThree && selectedFileThree.name) ? (
                                            <div className='afterUpload flex'>
                                                <div className="heading2 wh">{selectedFileThree.name}</div>
                                                <DeleteForeverIcon onClick={(event) => handleDeleteFile(selectedFileThree, setSelectedFileThree, event)} />
                                            </div>
                                        ) : (
                                            <div className='beforeUpload flex'>
                                                <UploadFileIcon />
                                                <div className='flexcol wh'>
                                                    <div className="heading2 wh">Attach File</div>
                                                    <div className="descrip wh">Only JPG, JPEG, PNG, TIF, and PDF formats at 10MB or less</div>
                                                </div>
                                            </div>
                                        )}
                                        <input type="file" name='selectedFileThree' onChange={(e) => handleFileChange(e, setSelectedFileThree, 'selectedFileThree')} />
                                    </label>


                                    <div className="flexcol-start wh" style={{ gap: '5px' }}>
                                        <div className='heading2'>Select expiry date</div>
                                        <input className='date-input' name='selectedDateTwo' type="date" value={selectedDateTwo} onChange={(e) => handleDateChange(e, setSelectedDateTwo, 'selectedDateTwo')} min={now.toISOString().split('T')[0]} />
                                        {docErrors.selectedDateTwo && <div className="error">{docErrors.selectedDateTwo}</div>}
                                    </div>

                                    <div className="flexcol-start wh" style={{ gap: '5px' }}>
                                        <div className="heading2">Identity document number</div>
                                        <input className='date-input2' name='idDocNumber' value={idDocNumber} onChange={(e) => { setIdDocNumber(e.target.value); clearError('idDocNumber'); }} type="text" placeholder='Enter here...' />
                                        {docErrors.idDocNumber && <div className="error">{docErrors.idDocNumber}</div>}
                                    </div>

                                    <div className="flex-start wh" style={{ gap: '5px', alignItems: 'center', padding: '0px 5px' }}>
                                        <input type="checkbox" checked={isBusinessOwner} onChange={(e) => setIsBusinessOwner(e.target.checked)} name='isBusinessOwner' style={{ cursor: 'pointer', width: '15px', height: '15px' }} /> <div className="heading2">I'm not the business owner</div>
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            <div className="flexcol-start wh" style={{ gap: '20px' }}>
                                <div className="flexcol-start wh" style={{ gap: '5px' }}>
                                    <div className="heading2">Business documents let us verify you as a real business and allow you to interact with features of the site.</div>
                                    <div className="heading2">To change your business documents please contact Ulinkit at support@ulinkit.com</div>
                                </div>

                                {sellerprofile && sellerprofile.documents &&
                                    <div className="bd_overview">
                                        <div className="bd_overview_one">
                                            <div className="bd_over-heading"><div>Registration Number</div> <div className='bd_captext'>{sellerprofile?.documents?.TRADE_LICENSE?.documentNumber || 'N/A'}</div></div>
                                            <div className="bd_over-heading"><div>Identity Number</div> <div className='bd_captext'>{sellerprofile?.documents?.IDENTITY_DOCUMENT?.documentNumber || 'N/A'}</div></div>
                                        </div>
                                        <div className="bd_overview_one">
                                            <div className="bd_over-heading"><div>Expiry Date</div> <div className='bd_captext'>{sellerprofile?.documents?.TRADE_LICENSE?.expiryDate || 'N/A'}</div></div>
                                            <div className="bd_over-heading"><div>Expiry Date</div> <div className='bd_captext'>{sellerprofile?.documents?.IDENTITY_DOCUMENT?.expiryDate || 'N/A'}</div></div>
                                        </div>
                                        <div className="bd_overview_one">
                                            <div className="bd_over">
                                                <div className="bd_over_box">
                                                    <div className="descrip warning-btn3" style={{ width: 'fit-content' }}>{sellerprofile?.documents?.TRADE_LICENSE?.status || 'N/A'}</div>
                                                </div>
                                                <div className="bd_over_box">
                                                    {
                                                        sellerprofile?.documents?.TRADE_LICENSE?.docs && sellerprofile.documents.TRADE_LICENSE.docs[0] && sellerprofile.documents.TRADE_LICENSE.docs[0].documentPath ?
                                                        (<a href={sellerprofile.documents.TRADE_LICENSE.docs[0].documentPath} className='descrip2 hoverr' download="business_registration_document">Download</a>) :
                                                        (<div className='descrip2' style={{whiteSpace: 'nowrap'}}  >No document</div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="bd_over">
                                                <div className="bd_over_box">
                                                    <div className="descrip warning-btn3" style={{ width: 'fit-content' }}>{sellerprofile?.documents?.IDENTITY_DOCUMENT?.status || 'N/A'}</div>
                                                </div>
                                                <div className="bd_over_box">
                                                    {
                                                        sellerprofile?.documents?.IDENTITY_DOCUMENT?.docs && sellerprofile.documents.IDENTITY_DOCUMENT.docs[0] && sellerprofile.documents.IDENTITY_DOCUMENT.docs[0].documentPath ?
                                                        (<a href={sellerprofile.documents.IDENTITY_DOCUMENT.docs[0].documentPath} className='descrip2 hoverr' download="identity_document">Download</a>) : 
                                                        (<div className='descrip2' style={{whiteSpace: 'nowrap'}} >No document</div>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )}

                        {isEditingDoc &&
                            <div className="flex" style={{ gap: '20px' }}>
                                <button className="btn flex box" type='submit' style={{ width: '100px', cursor: 'pointer' }}> {sellerprofile ? 'Update' : 'Submit'} </button>
                                <button type="button" className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={cancelDoc} >Cancel</button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellerComProfile;