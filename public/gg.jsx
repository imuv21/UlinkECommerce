import React, { useState, useEffect } from 'react';
import DescriptionIcon from '@material-ui/icons/Description'; // Adjust this import according to your icon library
import UploadFileIcon from '@material-ui/icons/CloudUpload'; // Adjust this import according to your icon library
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'; // Adjust this import according to your icon library

const BusinessDocumentsForm = () => {
    const [docErrors, setDocErrors] = useState({});
    const [isEditingDoc, setIsEditingDoc] = useState(false);
    const [regDocNumber, setRegDocNumber] = useState('');
    const [idDocNumber, setIdDocNumber] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileTwo, setSelectedFileTwo] = useState(null);
    const [selectedFileThree, setSelectedFileThree] = useState(null);
    const [showFileThreeInput, setShowFileThreeInput] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateTwo, setSelectedDateTwo] = useState('');
    const allowedFormats = ['jpg', 'jpeg', 'png', 'tif', 'pdf'];
    const maxSize = 10 * 1024 * 1024;

    const clearError = (fieldName) => {
        setDocErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: ''
        }));
    };

    const handleDoc = (event) => {
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
            console.log({
                selectedFile,
                selectedDate,
                regDocNumber,
                selectedFileTwo,
                selectedDateTwo,
                idDocNumber,
                selectedFileThree,
            });
            // Handle form submission here
            console.log("Form submitted successfully!");
            setIsEditingDoc(false);
            setDocErrors({});
        } else {
            console.log("Form submission failed. Please fix the errors.");
        }
    };

    const handleEditClickDoc = () => {
        setIsEditingDoc(true);
    };

    const cancelDoc = () => {
        setIsEditingDoc(false);
    };

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
        <form className="profile-sel-box" onSubmit={handleDoc}>
            <div className="flexcol wh" style={{ gap: '5px' }}>
                <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                    <div className="flex" style={{ gap: '10px' }}>
                        <DescriptionIcon /> <div className="heading">Add Your Business Documents</div>
                    </div>
                    {!isEditingDoc && <div className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={handleEditClickDoc}>Edit</div>}
                </div>
                {isEditingDoc && <div className="flex-start" style={{ gap: '5px', justifyContent: 'start', width: '100%' }}>
                    <div className="descrip2">We need the following documents to verify your business and give you access to all Tradeling features. We will get in touch with you when these documents need to be renewed.</div>
                </div>}
            </div>

            {isEditingDoc ? (
                <>
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
                            <input className='date-input' name='selectedDate' type="date" value={selectedDate} onChange={(e) => handleDateChange(e, setSelectedDate, 'selectedDate')} min={new Date().toISOString().split('T')[0]} />
                            {docErrors.selectedDate && <div className="error">{docErrors.selectedDate}</div>}
                        </div>

                        <div className="flexcol-start wh" style={{ gap: '5px' }}>
                            <div className="heading2">Registration document number</div>
                            <input className='reg-doc-number' name='regDocNumber' value={regDocNumber} onChange={(e) => { setRegDocNumber(e.target.value); clearError('regDocNumber'); }} type="text" placeholder='Enter here...' />
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
                            <input className='date-input' name='selectedDateTwo' type="date" value={selectedDateTwo} onChange={(e) => handleDateChange(e, setSelectedDateTwo, 'selectedDateTwo')} min={new Date().toISOString().split('T')[0]} />
                            {docErrors.selectedDateTwo && <div className="error">{docErrors.selectedDateTwo}</div>}
                        </div>

                        <div className="flexcol-start wh" style={{ gap: '5px' }}>
                            <div className="heading2">Identity document number</div>
                            <input className='id-doc-number' name='idDocNumber' value={idDocNumber} onChange={(e) => { setIdDocNumber(e.target.value); clearError('idDocNumber'); }} type="text" placeholder='Enter here...' />
                            {docErrors.idDocNumber && <div className="error">{docErrors.idDocNumber}</div>}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flexcol-start" style={{ gap: '5px', justifyContent: 'start', width: '100%' }}>
                    <div className="heading2">Business documents let us verify you as a real business and allow you to interact with features of the site.</div>
                    <div className="heading2">To change your business documents please contact Ulinkit at support@ulinkit.com</div>
                </div>
            )}
            {isEditingDoc &&
                <div className="flex" style={{ gap: '20px' }}>
                    <button className="btn flex box" type='submit' style={{ width: '100px', cursor: 'pointer' }}>Save</button>
                    <button type="button" className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={cancelDoc} >Cancel</button>
                </div>
            }
        </form>
    );
};

export default BusinessDocumentsForm;
