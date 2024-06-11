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
const schema = yupResolver(businessSchema);

const SellerComProfile = () => {

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: schema,
    });

    // profile edit functionality
    const [isEditing, setIsEditing] = useState(false);
    const onSubmit = (data) => {
        setIsEditing(false);
        console.log(data);
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const cancel = () => {
        setIsEditing(false);
    }


    //show the business docs form data
    const getStoredFormData = () => {
        const storedData = localStorage.getItem('business-docs');
        return storedData ? JSON.parse(storedData) : null;
    };
    const [storedFormData, setStoredFormData] = useState(getStoredFormData());


    //Doc submit and edit functionality
    const [docErrors, setDocErrors] = useState({});
    const [isEditingDoc, setIsEditingDoc] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem('business-docs');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setStoredFormData(parsedData);
            setSelectedFile(parsedData.selectedFile);
            setSelectedDate(parsedData.selectedDate);
            setRegDocNumber(parsedData.regDocNumber);
            setSelectedFileTwo(parsedData.selectedFileTwo);
            setSelectedDateTwo(parsedData.selectedDateTwo);
            setIdDocNumber(parsedData.idDocNumber);
            setSelectedFileThree(parsedData.selectedFileThree);
            setIsBusinessOwner(parsedData.isBusinessOwner);
            setIsEditingDoc(true);
        }
    }, []);

    const clearError = (fieldName) => {
        setDocErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: ''
        }));
    };

    const handleDoc = async (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!selectedFile) {
            newErrors.selectedFile = 'Business registration document is required.';
        }
        if (!selectedDate) {
            newErrors.selectedDate = 'Expiry date is required.';
        }
        if (!regDocNumber.trim()) {
            newErrors.regDocNumber = 'Registration document number is required.';
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

            const convertFileToBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            };
            const selectedFileBase64 = await convertFileToBase64(selectedFile);
            const selectedFileTwoBase64 = selectedFileTwo ? await convertFileToBase64(selectedFileTwo) : null;
            const selectedFileThreeBase64 = selectedFileThree ? await convertFileToBase64(selectedFileThree) : null;

            const formData = {
                selectedFile: selectedFileBase64,
                selectedDate,
                regDocNumber,
                selectedFileTwo: selectedFileTwoBase64,
                selectedDateTwo,
                idDocNumber,
                selectedFileThree: selectedFileThreeBase64,
                isBusinessOwner,
            };

            localStorage.setItem("business-docs", JSON.stringify(formData));
            alert("Form submitted successfully!");
            setIsEditingDoc(false);
            setDocErrors({});
            setStoredFormData(formData);
        } else {
            alert("Form submission failed. Please fix the errors.");
        }
    };

    const handleEditClickDoc = () => {
        setIsEditingDoc(true);
    };
    const cancelDoc = () => {
        setIsEditingDoc(false);
    }

    //rd and ic inputs
    const [regDocNumber, setRegDocNumber] = useState('');
    const [idDocNumber, setIdDocNumber] = useState('');
    const [isBusinessOwner, setIsBusinessOwner] = useState(false);

    //file upload one, two and three
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileTwo, setSelectedFileTwo] = useState(null);
    const [selectedFileThree, setSelectedFileThree] = useState(null);
    const [showFileThreeInput, setShowFileThreeInput] = useState(false);
    const allowedFormats = ['jpg', 'jpeg', 'png', 'tif', 'pdf'];
    const maxSize = 10 * 1024 * 1024;
    useEffect(() => {
        if (!selectedFileTwo && !selectedFileThree) {
            setShowFileThreeInput(false);
        }
    }, [selectedFileTwo, selectedFileThree]);
    const handleFileChange = (event, setFile, fieldName) => {
        const file = event.target.files[0];
        if (file) {
            const fileFormat = file.name.split('.').pop().toLowerCase();
            if (file.size <= maxSize && allowedFormats.includes(fileFormat)) {
                setFile(file);
                clearError(fieldName);
            } else {
                alert('Invalid file format or size. Please upload a file within 10MB and with a JPG, JPEG, PNG, TIF, or PDF format.');
            }
        }
    };
    const handleDeleteFile = (setFile) => {
        setFile(null);
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
                                    <div className="flex wh" style={{ gap: '30px' }}>
                                        <Controller name="firstname" control={control} defaultValue={user.firstname || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your first name' {...field} />} />
                                        <Controller name="lastname" control={control} defaultValue={user.lastname || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your last name' {...field} />} />
                                    </div>

                                    {(errors.firstname || errors.lastname) &&
                                        <div className="flex wh">
                                            <div className="flex wh">
                                                <div className='error'>{errors.firstname?.message}</div>
                                            </div>
                                            <div className="flex wh">
                                                <div className='error'>{errors.lastname?.message}</div>
                                            </div>
                                        </div>
                                    }

                                    <div className='flex wh' style={{ gap: '30px' }}>
                                        <Controller name="whatsappnumber" control={control} defaultValue={user.whatsappnumber || ''} render={({ field }) => <input className="box flex" autoComplete='off' placeholder='Enter your whatsapp number' {...field} />} />
                                    </div>

                                    {(errors.whatsappnumber) &&
                                        <div className="flex wh">
                                            <div className="flex wh">
                                            </div>
                                            <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                                <div className='error'>{errors.whatsappnumber?.message}</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="flex" style={{ gap: '50px', justifyContent: 'start', width: '30%' }}>
                                <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                    <div className='heading2'>Company Name</div>
                                    <div className='heading2'>Building Number</div>
                                    <div className='heading2'>Street Name</div>
                                    <div className='heading2'>City</div>
                                    <div className='heading2'>State</div>
                                    <div className='heading2'>Country Of Operation</div>
                                    <div className='heading2'>Post/Zip Code </div>
                                    <div className='heading2'>Company description</div>
                                    <div className='heading2'>Name</div>
                                    <div className='heading2'>Whatsapp</div>
                                </div>
                                <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                    <div className='heading2'>ulinkit</div>
                                    <div className='heading2'>3534531</div>
                                    <div className='heading2'>Street Name</div>
                                    <div className='heading2'>City</div>
                                    <div className='heading2'>State</div>
                                    <div className='heading2'>Country Of Operation</div>
                                    <div className='heading2'>4355435</div>
                                    <div className='heading2'>Company description</div>
                                    <div className="heading2">{user.firstname} {user.lastname}</div>
                                    <div className='heading2'>{user.whatsappnumber}</div>
                                </div>
                            </div>
                        )}
                        {isEditing ? (
                            <div className="flex" style={{ gap: '20px' }}>
                                <div className="btn flex box" type='submit' style={{ width: '100px', cursor: 'pointer' }}>Save</div>
                                <div className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={cancel} >Cancel</div>
                            </div>
                        ) : (
                            <div className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={handleEditClick}>Edit</div>
                        )}
                        <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><div className="heading2"> <div className="descrip2">To change your company name please contact Ulinkit at support@ulinkit.com</div> </div></div>
                    </form>

                    <form className="profile-sel-box" onSubmit={handleDoc}>
                        <div className="flexcol wh" style={{ gap: '5px' }}>
                            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                                <div className="flex" style={{ gap: '10px' }}>
                                    <DescriptionIcon /> <div className="heading">Add Your Business Documents</div>
                                </div>
                                {!isEditingDoc && <div className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={handleEditClickDoc}> {storedFormData ? 'Edit' : 'Add'} </div>}
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
                                        {selectedFile ? (
                                            <div className='afterUpload flex'>
                                                <div className="heading2 wh">{selectedFile.name}</div>
                                                <DeleteForeverIcon onClick={() => handleDeleteFile(setSelectedFile)} />
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
                                        {selectedFileTwo ? (
                                            <div className='afterUpload flex'>
                                                <div className="heading2 wh">{selectedFileTwo.name}</div>
                                                <DeleteForeverIcon onClick={() => handleDeleteFile(setSelectedFileTwo)} />
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
                                        <input type="file" name='selectedFileTwo' onChange={(e) => { handleFileChange(e, setSelectedFileTwo, 'selectedFileTwo'); setShowFileThreeInput(true); }} />
                                    </label>
                                    {docErrors.selectedFileTwo && <div className="error">{docErrors.selectedFileTwo}</div>}

                                    {showFileThreeInput && (
                                        <label className="br-file-upload">
                                            {selectedFileThree ? (
                                                <div className='afterUpload flex'>
                                                    <div className="heading2 wh">{selectedFileThree.name}</div>
                                                    <DeleteForeverIcon onClick={() => handleDeleteFile(setSelectedFileThree)} />
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
                                    )}

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
                                
                                {storedFormData &&
                                    <div className="bd_overview">
                                        <div className="bd_overview_one">
                                            <div className="bd_over-heading"><div>Registration Number</div> <div className='bd_captext'>{storedFormData?.regDocNumber || 'N/A'}</div></div>
                                            <div className="bd_over-heading"><div>Identity Number</div> <div className='bd_captext'>{storedFormData?.idDocNumber || 'N/A'}</div></div>
                                        </div>
                                        <div className="bd_overview_one">
                                            <div className="bd_over-heading"><div>Expiry Date</div> <div className='bd_captext'>{storedFormData?.selectedDate || 'N/A'}</div></div>
                                            <div className="bd_over-heading"><div>Expiry Date</div> <div className='bd_captext'>{storedFormData?.selectedDateTwo || 'N/A'}</div></div>
                                        </div>
                                        <div className="bd_overview_one">
                                            <div className="bd_over">
                                                <div className="bd_over_box">
                                                    <div className="descrip warning-btn3" style={{ width: 'fit-content' }}>Pending</div>
                                                </div>
                                                <div className="bd_over_box">
                                                    <a href={storedFormData?.selectedFile} className='descrip2 hoverr' download="business_registration_document">Download</a>
                                                </div>
                                            </div>
                                            <div className="bd_over">
                                                <div className="bd_over_box">
                                                    <div className="descrip warning-btn3" style={{ width: 'fit-content' }}>Pending</div>
                                                </div>
                                                <div className="bd_over_box">
                                                    <a href={storedFormData?.selectedFileTwo} className='descrip2 hoverr' download="identity_document">Download</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )}

                        {isEditingDoc &&
                            <div className="flex" style={{ gap: '20px' }}>
                                <button className="btn flex box" type='submit' style={{ width: '100px', cursor: 'pointer' }}> {storedFormData ? 'Update' : 'Submit'} </button>
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