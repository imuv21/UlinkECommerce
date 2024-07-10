import React, { useEffect, useState } from 'react'
import './CompanyProfile.css'
import { CiCircleInfo } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PiIdentificationCardDuotone } from "react-icons/pi";
import { PiCertificateLight } from "react-icons/pi";
import axios from 'axios';
import { MdOutlineFileDownload } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchBusinessProfile, updateBusinessProfile } from '../../../Redux/businessProfileSlice';
import { updateCreditInfo, fetchCreditInfo } from '../../../Redux/creditInfoSlice';
import { uploadBuyerDocument, fetchUploadFile, updateBuyerInfo, deleteUploadFile } from '../../../Redux/uploadBuyerDocSlice';

const CompanyProfile = () => {
    const dispatch = useDispatch();
    const [enddate, setEndDate] = useState();
    const [expirydate, setExpiryDate] = useState('');
    const [profileDetail, setProfileDetail] = useState(false);
    const [getCountry, setCountry] = useState();
    const [selectedState, setSelectedState] = useState();
    const [getState, setState] = useState([]);
    const [cities, setCities] = useState([]);
    const [data, setData] = useState([]);
    const [creditInfo, setCreditInfo] = useState(false);
    const [open, setOpen] = useState(false);
    const [addDoc, setAddDoc] = useState(true);

    // lisence file upload here
    const [fileUpload, setFileUpload] = useState(true);
    const [selectedfile, setSelectedFile] = useState({ file: null, name: '', path: '', size: '', id: "" });
    // Identity file upload here
    const [identityFileUpload, setIdentityFileUpload] = useState(true);
    const [selectedidentityFile, setSelectedIdentityFile] = useState({ file: null, name: '', path: '', size: '', id: '' });
    // Vat certificate
    const [vatcertificate, setVatCertificate] = useState(true);
    const [selectedVatCertificate, setSelectedVatCertificate] = useState({ file: null, name: '', path: '', size: '', id: '' });
    //  Declearation Vat Certifiacte
    const [declaration, setDeclaration] = useState(true);
    const [selectedDeclaration, setSelectedDeclaration] = useState({ file: null, name: '', path: '', size: '', id: '' });
    //  documentPath all state
    const [filePath, setFilePath] = useState('')
    const [identityPath, setIdentityPath] = useState('')
    const [gstPath, setGstPath] = useState('')
    const [declarationPath, setDeclarationPath] = useState('')
    const [uploadFileUpload, setUploadFileUpload] = useState({
        selectedfile: '',
        selectedidentityFile: '',
        selectedVatCertificate: '',
        selectedDeclaration: '',
        tradeNumber: '',
        enddate: "",
        expirydate: '',
        identityNumber: '',
        vatNumber: '',
    });
    // file Upload from the database
    const { doc } = useSelector((state) => state.uploadBuyerDoc);
    const handlefileValue = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUploadFileUpload(prevState => ({
            ...prevState,
            [name]: value
        }));
        dispatch(uploadBuyerDocument({ ...uploadFileUpload, [name]: value }));
    };
    // useEffect(() => {
    //     dispatch(fetchUploadFile());
    // }, [dispatch]);

    useEffect(() => {
        if (doc) {
            console.log('Document Data:', doc);
            const tradeLicenseDoc = doc.TRADE_LICENSE?.docs?.[0];
            const identityDoc = doc.IDENTITY_DOCUMENT?.docs?.[0];
            const gstCertDoc = doc.GST_CERTIFICATE?.docs?.[0];
            const declarationDoc = doc.DECLARATION_CERTIFICATE?.docs?.[0];
          
            setUploadFileUpload(prevState => {
                const newState = {
                    ...prevState,
                    selectedfile: tradeLicenseDoc?.filename || prevState.selectedfile,
                    selectedidentityFile: identityDoc?.filename || prevState.selectedidentityFile,
                    selectedVatCertificate: gstCertDoc?.filename || prevState.selectedVatCertificate,
                    selectedDeclaration: declarationDoc?.filename || prevState.selectedDeclaration,
                    tradeNumber: doc.TRADE_LICENSE?.documentNumber || prevState.tradeNumber,
                    enddate: doc.TRADE_LICENSE?.expiryDate || prevState.enddate,
                    expirydate: doc.IDENTITY_DOCUMENT?.expiryDate || prevState.expirydate,
                    identityNumber: doc.IDENTITY_DOCUMENT?.documentNumber || prevState.identityNumber,
                    gstNumber: doc.GST_CERTIFICATE?.documentNumber || prevState.gstNumber,
                };
                setFilePath(tradeLicenseDoc?.documentPath || filePath);
                setIdentityPath(identityDoc?.documentPath || identityPath);
                setGstPath(gstCertDoc?.documentPath || gstPath);
                setDeclarationPath(declarationDoc?.documentPath || declarationPath);
                return newState;
            }, [doc]);
            setSelectedFile(prevState => ({
                ...prevState,
                file: tradeLicenseDoc,
                name: tradeLicenseDoc?.filename || prevState.name,
                path: tradeLicenseDoc?.documentPath || prevState.path,
                size: tradeLicenseDoc?.filesize || prevState.size,
                id: tradeLicenseDoc?.id || prevState.id
            }));
            setSelectedIdentityFile(prevState => ({
                ...prevState,
                file: identityDoc,
                name: identityDoc?.filename || prevState.name,
                path: identityDoc?.documentPath || prevState.path,
                size: identityDoc?.filesize || prevState.size,
                id: identityDoc?.id || prevState.id
            }))
            setSelectedVatCertificate(prevState => ({
                ...prevState,
                file: gstCertDoc,
                name: gstCertDoc?.filename || '',
                path: gstCertDoc?.documentPath || '',
                size: gstCertDoc?.filesize || '',
                id: gstCertDoc?.id || ''
            }))
            setSelectedDeclaration(prevState => ({
                ...prevState,
                file: declarationDoc,
                name: declarationDoc?.filename || '',
                path: declarationDoc?.documentPath || '',
                size: declarationDoc?.filesize || '',
                id: declarationDoc?.id || ''
            }))
        }
    }, [doc]);
    //  YE FILES SUBMIT WALA CODE HAI YAHA SE  DEKHNA HAI
    const handlefileData = async (e) => {
        e.preventDefault();
         const tradeLicenseDoc = 'TRADE_LICENSE';
         const identityDoc = 'IDENTITY_DOCUMENT';
         const gstCertDoc = 'GST_CERTIFICATE';
         const declarationDoc = 'DECLARATION_CERTIFICATE';
        const tradeLicense = {
            documentName: uploadFileUpload.selectedfile,
            documentNumber: uploadFileUpload.tradeNumber,
            expiryDate: uploadFileUpload.enddate,
            documentType: tradeLicenseDoc,
            isBusinessOwner: true
        }
        const identityDocument = {
            documentName: uploadFileUpload.selectedidentityFile,
            documentNumber: uploadFileUpload.identityNumber,
            expiryDate: uploadFileUpload.expirydate,
            documentType: identityDoc,
            isBusinessOwner: true
        }
        const gstCertificate = {
            documentName: uploadFileUpload.selectedVatCertificate,
            documentNumber: uploadFileUpload.gstNumber,
            documentType: gstCertDoc,
            isBusinessOwner: true
        }
        const declarationCertificate = {
            documentName: uploadFileUpload.selectedDeclaration,
            documentType: declarationDoc,
            isBusinessOwner: true
        }
        const documentInfo = {
            tradeLicense,
            identityDocument,
            gstCertificate,
            declarationCertificate
        }
        console.log("Documents:", documentInfo);
        try {
            const resultAction = await dispatch(updateBuyerInfo(documentInfo)).unwrap();
            console.log('File data updated successfully:', resultAction);
            setUploadFileUpload({
                selectedfile: '',
                selectedidentityFile: '',
                selectedVatCertificate: '',
                selectedDeclaration: '',
                tradeNumber: '',
                enddate: "",
                expirydate: '',
                identityNumber: '',
                gstNumber: '',
            })
           setAddDoc(true)
        }
        catch (error) {
            console.log("Error in updating file data", error)
        }
    };
    // Declaration file upload
    const handleDeclaration = (e) => {
        const selectedDeclaration = e.target.files[0];
        if (selectedDeclaration) {
            // Dispatch upload action
            dispatch(uploadBuyerDocument({ file: selectedDeclaration, docType: 'DECLARATION_CERTIFICATE' }))
                .then(() => {
                    // Update local state after successful upload
                    setUploadFileUpload(prevState => ({
                        ...prevState,
                        selectedDeclaration: selectedDeclaration.name
                    }));
                    setDeclaration(true);
                })
                .catch(error => {
                    console.error('Error uploading declaration:', error);
                });
        }
    };
    //  Vat certificate logic here
    const handleVatCertificate = (e) => {
        const selectedVatCertificate = e.target.files[0];
        if (selectedVatCertificate) {
            dispatch(uploadBuyerDocument({ file: selectedVatCertificate, docType: 'GST_CERTIFICATE' }));
            setUploadFileUpload((prevState) => ({
                ...prevState,
                selectedVatCertificate: selectedVatCertificate.name
            }))
            setVatCertificate(true)
        }
    };
    //  Identity logic here
    const handleIdentiyfile = (e) => {
        const selectedidentityFile = e.target.files[0];
        if (selectedidentityFile) {
            dispatch(uploadBuyerDocument({ file: selectedidentityFile, docType: 'IDENTITY_DOCUMENT' }))
            setUploadFileUpload((prevState) => ({
                ...prevState,
                selectedidentityFile: selectedidentityFile.name
            }))
            setIdentityFileUpload(true)
        }
    };
    // license File Upload logic here not active
    const handlefileupload = (e) => {
        const selectedfile = e.target.files[0];
        if (selectedfile) {
            dispatch(uploadBuyerDocument({ file: selectedfile, docType: 'TRADE_LICENSE' }))
            setUploadFileUpload((prevState) => ({
                ...prevState,
                selectedfile: selectedfile.name,
            }))
            setFileUpload(true)
        }
    }
    // Identity file download hear
    const dounloadIdentity = (identityPath) => {
        if (!identityPath) {
            return;
        }
        const link = document.createElement('a')
        link.href = identityPath
        link.download = identityPath.split('/').pop()
        link.target = '_blank'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleIdentityDelete = async (fileData) => {
        if (!fileData) {
            console.log('file Data is null or unidentify')
            return;
        }
        const { path: documentPath, name: filename, size: filesize, id } = fileData;
        console.log('File Data:', { documentPath, filename, filesize, id });
        if (!id) {
            console.log('ID is null or undefined')
            return;
        }
        try {
            const result = await dispatch(deleteUploadFile({ documentPath, filename, filesize, id })).unwrap();
            console.log('File deleted successfully ', result)
            setSelectedIdentityFile({ file: null, name: '', path: '', size: '', id: '' });
            setIdentityFileUpload(true)
        }
        catch (error) {
            console.log("Failed to delete file:", error)
        }
    };
    const downloadFile = (filePath) => {
        if (!filePath) {
            return;
        }
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.split('/').pop();
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    //  After submitting then those download file will be dounload option available
    const dwnload = () => {
        if (selectedfile) {
            // const url = URL.createObjectURL(selectedfile);
            const anchor = document.createElement('a');
            anchor.href = filePath;
            anchor.download = selectedfile.name;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor)
            URL.revokeObjectURL(url);
        }
    };
    const dwnloadIden = () => {
        if (selectedidentityFile) {
            const anchor = document.createElement('a')
            anchor.href = identityPath;
            anchor.download = selectedidentityFile.name;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor)
            URL.revokeObjectURL(URL)
        }
    }
    const dwnloadGST = () => {
        if (selectedVatCertificate) {
            const anchor = document.createElement('a')
            anchor.href = gstPath;
            anchor.download = selectedVatCertificate.name;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor)
            URL.revokeObjectURL(URL)
        }
    }
    const dwnloadDecl = () => {
        if (selectedDeclaration) {
            const anchor = document.createElement('a')
            anchor.href = declarationPath;
            anchor.download = selectedDeclaration.name;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor)
            URL.revokeObjectURL(URL)
        }
    }
    //   Vat Certificate dounload here
    const dounloadgst = (gstPath) => {
        if (!gstPath) {
            return;
        }
        const link = document.createElement('a')
        link.href = gstPath
        link.download = gstPath.split('/').pop()
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const DeleteVat = async (fileData) => {
        if (!fileData) {
            console.log('file Data is null or unidentify')
            return;
        }
        const { path: documentPath, name: filename, size: filesize, id } = fileData;
        console.log('File Data:', { documentPath, filename, filesize, id });

        if (!id) {
            console.log('ID is null or undefined')
            return;
        }
        try {
            const result = await dispatch(deleteUploadFile({ documentPath, filename, filesize, id })).unwrap();
            console.log('File deleted successfully ', result)
            setSelectedVatCertificate({ file: null, name: '', path: '', size: '', id: '' });
            setVatCertificate(false)
        }
        catch (error) {
            console.log("Failed to delete file:", error)
        }
    };
    // declearation file is here for dounload
    const dounloaddecleration = (declarationPath) => {
        if (!declarationPath) {
            return;
        }
        const link = document.createElement('a')
        link.href = gstPath
        link.download = gstPath.split('/').pop()
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const DeleteDecleration = async (fileData) => {
        if (!fileData) {
            console.log('File Data is null or undefined');
            return;
        }
        const { path: documentPath, filename, filesize, id } = fileData;
        console.log('File Data:', { documentPath, filename, filesize, id });

        if (!id) {
            console.log('ID is null or undefined');
            return;
        }
        try {
            const result = await dispatch(deleteUploadFile({ documentPath, filename, filesize, id })).unwrap();
            console.log('File deleted successfully ', result);
            setSelectedDeclaration({ file: null, name: '', path: '', size: '', id: '' });
            setDeclaration(false); // Update state or trigger re-fetch if needed
        } catch (error) {
            console.error("Failed to delete file:", error);

        }
    };
    const handleDelete = async (fileData) => {
        if (!fileData) {
            console.log("fileData is null or undefined.");
            return;
        }
        const { path: documentPath, name: filename, size: filesize, id } = fileData;
        console.log('File Data:', { documentPath, filename, filesize, id });
        if (!id) {
            console.log("ID is null or undefined.");
            return;
        }
        try {
            const result = await dispatch(deleteUploadFile({ documentPath, filename, filesize, id })).unwrap();
            console.log('File deleted successfully', result);
            setSelectedFile({ file: null, name: '', path: '', size: '', id: '' });
            setFileUpload(false);
        } catch (error) {
            console.log('Failed to delete file: ', error);
        }
    };
    // Decleration of the Vat
    // Credit Data 
    const { credit } = useSelector(state => state.creditInfo);
    const [dateEstablished, setDateEstablished] = useState(new Date());
    const [creditInfoData, setCreditInfoData] = useState({
        numberOfEmployees: '',
        dateEstablished: '',
        annualTurnover: ""
    });
    const { profile, status, error } = useSelector(state => state.businessProfile);
    const token = useSelector((state) => state.auth.token);
    const [formdata, setFormData] = useState({
        companyName: "",
        businessType: '',
        billingEmail: '',
        billingNumber: '',
        streetName: '',
        country: '',
        state: '',
        city: '',
        poBoxNumber: ''
    });
    // const CompanyDataSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(updateBusinessProfile(formdata, token)).then(() => {
    //         dispatch(fetchBusinessProfile());
    //     });
    //     setProfileDetail(false);
    //     console.log(formdata);
    // };
    // useEffect(() => {
    //     dispatch(fetchBusinessProfile());
    // }, [dispatch]);
    useEffect(() => {
        console.log("Status: ", status);
        console.log("Profile: ", profile);
        console.log("Error: ", error);
        if (profile) {
            setFormData({
                companyName: profile.companyName || "",
                businessType: profile.businessType || "",
                billingEmail: profile.billingEmail || "",
                billingNumber: profile.billingNumber || "",
                streetName: profile.streetName || "",
                country: profile.country || "",
                state: profile.state || "",
                city: profile.city || "",
                poBoxNumber: profile.poBoxNumber || ""
            });
        }
    }, [status, profile, error]);
    const CompanyData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // Credit Info Show Data
    const creditInfoShow = (e) => {
        const { name, value } = e.target;
        setCreditInfoData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // credit Submit
    const creditSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCreditInfo(creditInfoData, token));
        setCreditInfo(false);
    };
    // useEffect(() => {
    //     dispatch(fetchCreditInfo(token));
    // }, [dispatch, token]);
    useEffect(() => {
        console.log("Status: ", status);
        console.log("Credit: ", credit);
        console.log("Error: ", error);
        if (credit && credit.creditInformation) {
            setCreditInfoData({
                numberOfEmployees: credit.creditInformation.numberOfEmployees || '',
                dateEstablished: credit.creditInformation.dateEstablished || '',
                annualTurnover: credit.creditInformation.annualTurnover || ''
            });
        }
    }, [status, credit, error]);
    // Country State and City
    useEffect(() => {
        axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);
    const country = [...new Set(data.map(item => item.country))];
    country.sort();
    const handleCountry = (e) => {
        setCountry(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            country: e.target.value
        }));
        let states = data.filter(state => state.country === e.target.value);
        states = [...new Set(states.map(item => item.subcountry))];
        states.sort();
        setState(states);
    };
    const handleState = (e) => {
        setSelectedState(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            state: e.target.value
        }));
        let city = data.filter(cities => cities.subcountry === e.target.value);
        city.sort();
        setCities(city);
    };
    const handleCity = (e) => {
        setFormData(prevState => ({
            ...prevState,
            city: e.target.value
        }));
    };
    // Bussiness Detail
    const handleFocus = () => {
        setOpen(true);
    };
    const handleBlur = () => {
        setOpen(false);
    };
    //  call the first name last name;
    const user = useSelector((state) => state.auth.user);
    return (
        <>
            <div className='responsive'>
                <div className='company-heading'>
                    <h2>Company</h2>
                </div>
                <div className='company-border'>
                    <div className='company-padding'>
                        {/* Bussiness Profile Form */}
                        {profileDetail ? (
                            <div className='company-profile-Form'>
                                <div className='company-profile-names'>
                                    <h4>Business Profile</h4>
                                    <p className='file-formate'>This is the address your business is registered to.</p>
                                </div>
                                <form onSubmit={CompanyDataSubmit}>
                                    <div className='Bussines-Form'>
                                        <div className='Bussiness-form-data'>
                                            <label>Company Name*</label><br></br>
                                            <input className='trade-expiry-dates form-width' type="text" placeholder='company name' name='companyName' value={formdata.companyName} onChange={CompanyData} />
                                        </div>
                                        <div className='Bussiness-form-data'>
                                            <label>Bussiness Type*</label><br></br>
                                            <input className='trade-expiry-dates form-width' type="text" placeholder='bussiness type ' name='businessType' value={formdata.businessType} onChange={CompanyData} />
                                        </div>
                                        <div className='Bussiness-form-data'>
                                            <label>Billing Email Address</label><br></br>
                                            <input className='trade-expiry-dates form-width' type="text" placeholder='billing email address' name='billingEmail' value={formdata.billingEmail} onChange={CompanyData} />
                                        </div>
                                        <div className='Bussiness-form-data'>
                                            <label>Billing number or name</label><br></br>
                                            <input className='trade-expiry-dates form-width' type="text" placeholder='billing number' name='billingNumber' value={formdata.billingNumber} onChange={CompanyData} />
                                        </div>
                                        <div className='Bussiness-form-data'>
                                            <label>Enter Street Name</label><br></br>
                                            <input className='trade-expiry-dates form-width' type="text" placeholder='street' name='streetName' value={formdata.streetName} onChange={CompanyData} />
                                        </div>
                                        {/* country state and city */}
                                        <div className='Bussiness-form-data'>
                                            <label className=''>Country</label><br></br>
                                            <select onChange={(e) => handleCountry(e)} className=' trade-expiry-dates form-width' name="country">
                                                <option value=''>Select Country</option>
                                                {country.map(items => <option key={items} value={getCountry}>{items}</option>)}
                                            </select>
                                        </div>
                                        <div className='Bussiness-form-data'>
                                            <label>State</label><br></br>
                                            <select onChange={(e) => handleState(e)} className=' trade-expiry-dates form-width' name='state'>
                                                <option value=''>Select State</option>
                                                {getState.map(items => <option key={items} value={selectedState}>{items}</option>)}
                                            </select>
                                        </div>
                                        <div className='Bussiness-form-data'>
                                            <label>City</label><br></br>
                                            <select onChange={(e) => handleCity(e)} className=' trade-expiry-dates form-width' name='city'>
                                                <option value=''>Select City</option>
                                                {cities.map((items, index) => <option key={index} value={items.name}>{items.name}</option>)}
                                            </select>
                                        </div>
                                        <div className='Bussiness-form-data '>
                                            <label>PO Box Number</label><br></br>
                                            <input className='trade-expiry-dates form-width' type="text" placeholder='po box' name='poBoxNumber' value={formdata.poBoxNumber} onChange={CompanyData} />
                                        </div>
                                    </div>
                                    <div className='savecancels'>
                                        <button className='sv' type='submit'>Update</button>
                                        <button type='button' onClick={() => setProfileDetail(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className='show-company-form'>
                                <div className='company-profile'>
                                    <div className='company-profile-name'>
                                        <h4>Business Profile</h4>
                                    </div>
                                    <div className='company-profile-name'>
                                        <button className='edit-detail-button' onClick={() => setProfileDetail(true)}>Edit Detail</button>
                                    </div>
                                </div>
                                <div className='company-profile-logo'>
                                    {/* I want show only the first caracter and second first caracter */}
                                    <h3 className='name-logo'>{user.firstname.charAt(0)}{user.lastname.charAt(0)}</h3>
                                </div>
                                {/* {status === 'loading' && <p>Loading...</p>}
                                {error && <p>Error:  {JSON.stringify(error)}</p>} */}
                                <div className=''>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Company Name:</p>
                                        <p className='company-names '>{profile?.companyName}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Bussiness Type:</p>
                                        <p className='company-names'>{profile?.businessType}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'> Billing Email Address:</p>
                                        <p className='company-names'>{profile?.billingEmail}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Billing Number:</p>
                                        <p className='company-names'>{profile?.billingNumber}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Street Name:</p>
                                        <p className='company-names'>{profile?.streetName}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Country:</p>
                                        <p className='company-names'>{profile?.country}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>State:</p>
                                        <p className='company-names'>{profile?.state}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>City:</p>
                                        <p className='company-names'>{profile?.city}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>PO Box Number:</p>
                                        <p className='company-names'>{profile?.poBoxNumber}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='responsive'>
                <div className='company-border'>
                    <div className='company-padding'>
                        <div className='company-profile'>
                            <div className='company-profile-name'>
                                <CiCircleInfo className='info-icons' />
                                <h4>Credit Information</h4>
                            </div>
                        </div>
                        <div className='company-profile-logo'>
                            <p className='credit-info-detail'>This additional information will be used when assessing your eligibility for Credit Line.</p>
                        </div>
                        <>
                            <div>
                                {creditInfo ? (
                                    <div className='Bussines-Form'>
                                        <form onSubmit={creditSubmit}>
                                            <div className='Bussiness-form-data'>
                                                <label>Number of employeses*</label><br></br>
                                                <input className='trade-expiry-dates form-width' type="text" placeholder='number of employse' name='numberOfEmployees' value={creditInfoData.numberOfEmployees} onChange={creditInfoShow} />
                                            </div>
                                            <div className='Bussiness-form-data'>
                                                <label>Date Established*</label><br></br>
                                                <DatePicker name="dateEstablished" selected={dateEstablished || null}
                                                    onChange={(data) => {
                                                        const formattedDate = data.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
                                                        setCreditInfoData(prevState => ({
                                                            ...prevState,
                                                            dateEstablished: formattedDate
                                                        }));
                                                        setDateEstablished(data);
                                                    }}
                                                    onFocus={handleFocus}
                                                    minDate={new Date()}
                                                    onBlur={handleBlur} placeholderText='Expire Date'
                                                    className='card-input-value date trade-expiry-date  custom-datepicker-widths' />
                                            </div>
                                            <div className='Bussiness-form-data'>
                                                <label>Anual Turnover*</label><br></br>
                                                <input className='trade-expiry-dates form-width' type="text" placeholder='anual turnover' name='annualTurnover' value={creditInfoData.annualTurnover} onChange={creditInfoShow} />
                                            </div>
                                            <div className='savecancels'>
                                                <button className='sv' type='submit'>Update</button>
                                                <button type='button' onClick={() => setCreditInfo(false)}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <>
                                        <div className='company-profile-detail'>
                                            <div className='company-detail-name'>
                                                <p className='company-name'>Number Of Employes:</p>
                                                <p className='company-name'>Data Established:</p>
                                                <p className='company-name'>Anual Turnover :</p>
                                            </div>
                                            <div className='company-detail-name'>
                                                <p className='company-names'>{creditInfoData.numberOfEmployees}</p>
                                                <p className='company-names'>{new Date(creditInfoData.dateEstablished).toLocaleDateString()}</p>
                                                <p className='company-names'>{creditInfoData.annualTurnover}</p>
                                            </div>
                                        </div>
                                        <div className='credit-Edit'>
                                            <button className='edit-detail-button' onClick={() => setCreditInfo(true)}>Edit</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    </div>
                </div>
            </div>
            {/* Save doucument value here */}
            <>
                {addDoc ? (
                    <div className='responsive'>
                        <div className='company-border'>
                            <div className='company-padding'>
                                <div className='company-profile'>
                                    <div className='company-profile-name'>
                                        <h4>Add your business documents</h4>
                                    </div>
                                    <div className='company-profile-name'>
                                        <button className='edit-detail-button' onClick={() => setAddDoc(false)}>Add Document</button>
                                    </div>
                                </div>
                                <div className='company-profile-logo'>
                                    <p className='credit-info-detail'>Business documents let us verify you as a real business and allow you to interact with features of the site.</p>
                                </div>
                                {/* yaha se karna hai */}
                                <div className='show-flex'>
                                    <div className='show-flex-item'>
                                        <div><h4 className='credit-info-details'>Trade License:</h4></div>
                                        <div><p className='credit-info-details'>{uploadFileUpload.tradeNumber}</p></div>
                                        <div>
                                            <p className='credit-info-details'>Expiry Date:</p>
                                            <div className='credit-info-details'><p>{uploadFileUpload.enddate}</p></div>
                                        </div>
                                        <div><p className='credit-info-details status-css'>{document.status === 'Approved' ? 'Approved' : 'Pending'}</p></div>
                                        <div><p className='credit-info-details' onClick={dwnload}>Download</p></div>
                                    </div>
                                    <div className='show-flex-item'>
                                        <div><h4 className='credit-info-details'>Identity Certificate:</h4></div>
                                        <div><p className='credit-info-details'>{uploadFileUpload.identityNumber}</p></div>
                                        <div><p className='credit-info-details'>Expiry Date:</p>
                                            <div className='credit-info-details'><p>{uploadFileUpload.expirydate}</p></div>
                                        </div>
                                        <div><p className='credit-info-details status-css'>{uploadFileUpload.status === 'Approved' ? 'Approved' : 'Pending'}</p></div>
                                        <div><p className='credit-info-details' onClick={dwnloadIden}>Download</p></div>
                                    </div>
                                    <div className='show-flex-item'>
                                        <div><h4 className='credit-info-details'>VAT/GST Certificate:</h4></div>
                                        <div><p className='credit-info-details'>{uploadFileUpload.gstNumber}</p></div>
                                        <div><p className='credit-info-details'>-</p>
                                            <div className='credit-info-details'><p></p></div>
                                        </div>
                                        <div><p className='credit-info-details status-css'>{uploadFileUpload.status === 'Approved' ? 'Approved' : 'Pending'}</p></div>
                                        <div><p className='credit-info-details' onClick={dwnloadGST}>Download</p></div>
                                    </div>
                                    <div className='show-flex-item'>
                                        <div><h4 className='credit-info-details'>Declaration Certificate:</h4></div>
                                        <div><p className='credit-info-details'>-</p></div>
                                        <div><p className='credit-info-details'>-</p>
                                            <div className='credit-info-details'><p></p></div>
                                        </div>
                                        <div><p className='credit-info-details status-css'>{uploadFileUpload.status === 'Apporved' ? 'Approved' : 'Pending'}</p></div>
                                        <div><p className='credit-info-details' onClick={dwnloadDecl}>Download</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='responsive'>
                        <div className='company-border'>
                            <form onSubmit={handlefileData}>
                                <div className='company-padding'>
                                    <div className='company-profile'>
                                        <div className='company-profile-name'>
                                            <h4>Bussiness Documents</h4>
                                        </div>
                                    </div>
                                    <div className='company-profile-logo'>
                                        <p className='credit-info-detail'>We need the following documents to verify your business and give you access to all Tradeling features. We will get in touch with you when these documents need to be renewed.</p>
                                    </div>
                                    <div className='company-profile-detail trade-license-file'>
                                        <div className='company-detail-name'>
                                            <IoDocumentTextOutline className='trade-license' />
                                        </div>
                                        <div className='company-detail-name'>
                                            <h4>Trade License / Company Incorporation Certificate</h4>
                                            <p className='file-formate'>Upload a copy of your Trade Licence. This lets us verify you as an official business. This can be a JPG, PNG, PDF, JPEG, TIF.</p>
                                            <div>
                                                {fileUpload && uploadFileUpload.selectedfile ? (
                                                    <div className='file-upload'>
                                                        <label htmlFor='file-upload-input'>
                                                            <h3>{uploadFileUpload.selectedfile}</h3>
                                                        </label>
                                                        <input
                                                            id='file-upload-input'
                                                            type='file'
                                                            accept=" "
                                                            style={{ display: 'none' }}
                                                        />
                                                        <div className='dow'>
                                                            <MdOutlineFileDownload onClick={() => {
                                                                console.log('Downloading file:', filePath);
                                                                downloadFile(filePath);
                                                            }} />
                                                            <AiOutlineDelete onClick={() => handleDelete(selectedfile)} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='file-upload-sections'>
                                                        <input type='file' accept='' onChange={handlefileupload} name='tradeLicense' />
                                                    </div>

                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='licence'>
                                        <div className='card-inputs expiry-title'>
                                            <label className='expiry-title'> Expiry Date*</label><br></br>
                                            <DatePicker name="enddate" selected={enddate}
                                                onChange={(data) => {
                                                    setEndDate(data);
                                                    setUploadFileUpload({ ...uploadFileUpload, enddate: data.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) });
                                                }}
                                                value={uploadFileUpload.enddate}
                                                onFocus={handleFocus}
                                                minDate={new Date()}
                                                onBlur={handleBlur} placeholderText='Expire Date'
                                                className='card-input-value date trade-expiry-date  custom-datepicker-width '
                                                disabled={fileUpload ? false : true} />
                                        </div>
                                        <div className='expiry-title'>
                                            <label className='expiry-title'> Trade Licence Number*</label><br></br>
                                            <input type='number' onChange={handlefileValue} value={uploadFileUpload.tradeNumber} name='tradeNumber' className='card-input-value trade-expiry-dates' placeholder='Trade Number' disabled={fileUpload ? false : true} />
                                        </div>
                                    </div>
                                    <div className='company-profile-detail trade-license-file'>
                                        <div className='company-detail-name'>
                                            <PiIdentificationCardDuotone className='trade-license' />
                                        </div>
                                        <div className='company-detail-name'>
                                            <h4>Identity Document </h4>
                                            <p className='file-formate'>Your  ID lets us verify your Trade Licence. We need this to confirm you are a representative of the business.  Alternatively you can upload a copy of your passport </p>
                                            <div>
                                                {identityFileUpload && uploadFileUpload.selectedidentityFile ? (
                                                    <div className='file-upload'>
                                                        <label htmlFor='file-upload-input'>
                                                            <h3>{uploadFileUpload.selectedidentityFile}</h3>
                                                        </label>
                                                        <input
                                                            id='file-upload-input'
                                                            type='file'
                                                            accept=''
                                                            style={{ display: 'none' }} />
                                                        <div className='dow'>
                                                            <MdOutlineFileDownload onClick={() => dounloadIdentity(identityPath)} />
                                                            <AiOutlineDelete onClick={() => handleIdentityDelete(selectedidentityFile)} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='file-upload-sections'>
                                                        <input type='file' accept='' onChange={handleIdentiyfile} name='identity' />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='licence'>
                                        <div className='card-inputs expiry-title'>
                                            <label className='expiry-title'> Expiry Date*</label><br></br>
                                            <DatePicker name="expirydate" selected={expirydate}
                                                onChange={(data) => {
                                                    setExpiryDate(data);
                                                    setUploadFileUpload({ ...uploadFileUpload, expirydate: data.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) });
                                                }}
                                                value={uploadFileUpload.expirydate}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur} placeholderText='Expire Date'
                                                minDate={new Date()}
                                                className='card-input-value date trade-expiry-date custom-datepicker-width ' disabled={identityFileUpload ? false : true} />
                                        </div>
                                        <div className='expiry-title'>
                                            <label className='expiry-title'> Identity Document Number*</label><br></br>
                                            <input type='number' onChange={handlefileValue} value={uploadFileUpload.identityNumber} name='identityNumber' className='card-input-value trade-expiry-dates' placeholder='Identiy Number' disabled={identityFileUpload ? false : true} />
                                        </div>
                                    </div>
                                    <div className='company-profile-detail trade-license-file'>
                                        <div className='company-detail-name'>
                                            <PiCertificateLight className='trade-license' />
                                        </div>
                                        <div className='company-detail-name'>
                                            <h4>VAT Certificate / GST Certifiacte </h4>
                                            <p className='file-formate'>Your VAT Certificate / GST Certificate contains information needed for Ulinkit to provide you with invoices. Upload a copy of your VAT Certificate / GST Certificate</p>
                                            <div>
                                                {vatcertificate && uploadFileUpload.selectedVatCertificate ? (
                                                    <div className='file-upload'>
                                                        <label htmlFor='file-upload-input'>
                                                            <h3>{uploadFileUpload.selectedVatCertificate}</h3>
                                                        </label>
                                                        <input
                                                            id='file-upload-input'
                                                            type='file'
                                                            accept=''
                                                            style={{ display: 'none' }} />
                                                        <div className='dow'>
                                                            <MdOutlineFileDownload onClick={() => dounloadgst(gstPath)} />
                                                            <AiOutlineDelete onClick={() => DeleteVat(selectedVatCertificate)} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='file-upload-sections'>
                                                        <input className='' type='file' accept='' onChange={handleVatCertificate} name='vatCertificate' />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='licence'>
                                        <div className='expiry-title'>
                                            <label className='expiry-title'> VAT Certificate Number / GST Certificate Number *</label><br></br>
                                            <input type='number' onChange={handlefileValue} value={uploadFileUpload.gstNumber} name='gstNumber' className='card-input-value trade-expiry-dates' placeholder='VAT Number' disabled={vatcertificate ? false : true} />
                                        </div>
                                    </div>
                                    <div className='company-profile-detail trade-license-file'>
                                        <div className='company-detail-name'>
                                            <PiCertificateLight className='trade-license' />
                                        </div>
                                        <div className='company-detail-name'>
                                            <h4>Declaration of VAT Exemption (Resellers)</h4>
                                            <p className='file-formate'>Upload a copy of your VAT/GST Exempted Reseller Certificate. This lets us verify you as an exempted byuer. This can be a JPG, PNG, PDF, JPEG, TIF.</p>
                                            <div>
                                                {declaration && uploadFileUpload.selectedDeclaration ? (
                                                    <div className='file-upload'>
                                                        <label htmlFor='file-upload-input'>
                                                            <h3>{uploadFileUpload.selectedDeclaration}</h3>
                                                        </label>
                                                        <input
                                                            id='file-upload-input'
                                                            type='file'
                                                            accept=''
                                                            style={{ display: 'none' }} />
                                                        <div className='dow'>
                                                            <MdOutlineFileDownload onClick={() => dounloaddecleration(declarationPath)} />
                                                            <AiOutlineDelete onClick={() => DeleteDecleration(setSelectedDeclaration)} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='file-upload-sections'>
                                                        <input type='file' accept='' onChange={handleDeclaration} name='declaration' />
                                                    </div>

                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='savecancel'>
                                    <button type='submit' className='sv'>Save</button>
                                    <button>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        </>
    );
}
export default CompanyProfile;
