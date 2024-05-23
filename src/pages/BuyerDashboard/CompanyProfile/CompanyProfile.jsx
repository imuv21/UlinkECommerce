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
const CompanyProfile = () => {
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState('')
    const [expirydate, setExpiryDate] = useState('');
    const [profileDetail, setProfileDetail] = useState(false);
    const [getCountry, setCountry] = useState()
    const [selectedState, setSelectedState] = useState()
    const [getState, setState] = useState([])
    const [cities, setCities] = useState([])
    const [data, setData] = useState([]);
    const [creditInfo, setCreditInfo] = useState(false)
    const [open, setOpen] = useState(false)
    const [addDoc, setAddDoc] = useState(true)

    // lisence file upload here
    const [fileUpload, setFileUpload] = useState(true);
    const [selectedfile, setSelectedFile] = useState('');
    // Identity file upload here
    const [identityFileUpload, setIdentityFileUpload] = useState(true);
    const [selectedidentityFile, setSelectedIdentityFile] = useState('');
    // Vat certificate
    const [vatcertificate, setVatCertificate] = useState(true);
    const [selectedVatCertificate, setSelectedVatCertificate] = useState('');
    //  Declearation Vat Certifiacte
    const [declaration, setDeclaration] = useState(true);
    const [selectedDeclaration, setSelectedDeclaration] = useState('');

    const [uploadFileData, setUploadFileUpload] = useState({
        selectedfile: '',
        selectedidentityFile: '',
        selectedVatCertificate: '',
        selectedDeclaration: '',
        tradeNumber: '',
        enddate: "",
        expirydate: '',
        identityNumber: '',
        vatNumber: '',
    })

    //  Get the data form the local storage

    useEffect(() => {
        const storedData = localStorage.getItem('UploadDoc')
        if (storedData) {
            const parsedData = JSON.parse(storedData)
            setUploadFileUpload(parsedData)
        }
    }, [])
    const handlefileValue = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setUploadFileUpload(uploadFileData => ({
            ...uploadFileData,
            [name]: value
        }))
    }
    const handlefileData = (e) => {
        e.preventDefault()
        console.log(uploadFileData)
        localStorage.setItem('UploadDoc', JSON.stringify(uploadFileData))
        setAddDoc(true)
        uploadFileData.selectedfile = ''
        uploadFileData.selectedidentityFile = ''
        uploadFileData.selectedVatCertificate = ''
        uploadFileData.selectedDeclaration = ''
        uploadFileData.tradeNumber = ''
        uploadFileData.enddate = ""
        uploadFileData.expirydate = ''
        uploadFileData.identityNumber = ''
        uploadFileData.vatNumber = ''

    }
    // Declaration file upload
    const handleDeclaration = (e) => {
        const selectedDeclaration = e.target.files[0];
        setSelectedDeclaration(selectedDeclaration)
        setUploadFileUpload(uploadFileData => ({
            ...uploadFileData,
            selectedDeclaration
        }));
        setDeclaration(false)
    }
    //  Vat certificate logic here
    const handleVatCertificate = (e) => {
        const selectedVatCertificate = e.target.files[0];
        setSelectedVatCertificate(selectedVatCertificate)
        setUploadFileUpload(uploadFileData => ({
            ...uploadFileData,
            selectedVatCertificate
        }))
        setVatCertificate(false)
    }
    //  Identity logic here
    const handleIdentiyfile = (e) => {
        const selectedidentityFile = e.target.files[0];
        setSelectedIdentityFile(selectedidentityFile)
        setUploadFileUpload(uploadFileData => ({
            ...uploadFileData,
            selectedidentityFile
        }))
        setIdentityFileUpload(false)
    }
    // license File Upload logic here
    const handlefileupload = (e) => {
        const selectedfile = e.target.files[0];
        setSelectedFile(selectedfile)
        setUploadFileUpload(uploadFileData => ({
            ...uploadFileData,
            selectedfile
        }))
        setFileUpload(false)
    }
    // Identity file download heare
    const dounloadIdentity = () => {
        if (selectedidentityFile) {
            const url = URL.createObjectURL(selectedidentityFile);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = selectedidentityFile.name;
            anchor.click();
        }
    }
    const handleIdentityDelete = () => {
        setSelectedIdentityFile('')
        setIdentityFileUpload(true)
    }
    const dounloadfile = () => {
        if (selectedfile) {
            const url = URL.createObjectURL(selectedfile);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = selectedfile.name;
            anchor.click();
        }
    }
    const dwnload = () => {
        if (selectedfile) {
            const url = URL.createObjectURL(selectedfile);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = selectedfile.name;
            anchor.click();
        }
    }
    //   Vat Certificate dounload here
    const dounloadvat = () => {
        if (selectedVatCertificate) {
            const url = URL.createObjectURL(selectedVatCertificate);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = selectedVatCertificate.name;
            anchor.click();
        }
    }
    const DeleteVat = () => {
        setSelectedVatCertificate('')
        setVatCertificate(true)
    }
    // declearation  file is here
    const dounloaddecleration = () => {
        if (selectedDeclaration) {
            const url = URL.createObjectURL(selectedDeclaration);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = selectedDeclaration.name;
            anchor.click();
        }
    }
    const DeleteDecleration = () => {
        setSelectedDeclaration('')
        setDeclaration(true)
    }
    const handleDelete = () => {
        setSelectedFile('')
        setFileUpload(true)
    }
    // Decleration of the Vat
    // Credit Data 
    const [creditInfoData, setCreditInfoData] = useState({
        numberOfEmployees: '',
        startdate: '',
        anualTurnover: ""
    })
    const [formdata, setFormData] = useState({
        companyName: "",
        bussinessType: '',
        billingEmail: '',
        billingNumber: '',
        streetName: '',
        country: '',
        state: '',
        city: '',
        poBoxNumber: ''
    })
    // company data 
    const CompanyData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    // Credit Info Show Data
    const creditInfoShow = (e) => {
        const { name, value } = e.target
        setCreditInfoData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    // get the company data from the local storage
    useEffect(() => {
        const CompanyData = localStorage.getItem('Company Data')
        if (CompanyData) {
            setFormData(JSON.parse(CompanyData))
        } else {
            console.log('no data')
        }
    }, [])
    // get the creditData from the local storage
    useEffect(() => {
        const creditData = localStorage.getItem("Credit Data")
        if (creditData) {
            setCreditInfoData(JSON.parse(creditData))
        }
        else (
            console.log('no data')
        )
    }, [])
    // Company Data Submit
    const CompanyDataSubmit = (e) => {
        e.preventDefault();
        //  save data in the local stroge
        localStorage.setItem('Company Data', JSON.stringify(formdata))
        console.log(formdata)
        setProfileDetail(false)
    }
    // credit Submit
    const creditSubmit = (e) => {
        e.preventDefault();
        console.log(creditInfoData)
        // save data in the local storage
        localStorage.setItem('Credit Data', JSON.stringify(creditInfoData))
        setCreditInfo(false)
    }
    // Country State and City
    useEffect(() => {
        axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])
    const country = [...new Set(data.map(item => item.country))]
    country.sort()
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
    }
    const handleState = (e) => {
        setSelectedState(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            state: e.target.value
        }));
        let city = data.filter(cities => cities.subcountry === e.target.value);
        city.sort();
        setCities(city);
    }
    const handleCity = (e) => {
        setFormData(prevState => ({
            ...prevState,
            city: e.target.value
        }))
    }
    // Bussiness Detail
    const handleFocus = () => {
        setOpen(true);
    };
    const handleBlur = () => {
        setOpen(false);
    };
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
                                            <label >Company Name*</label><br></br>
                                            <input className='trade-expiry-dates form-width' type="text" placeholder='company name' name='companyName' value={formdata.companyName} onChange={CompanyData} />
                                        </div>
                                        <div className='Bussiness-form-data'>
                                            <label >Bussiness Type*</label><br></br>
                                            <input className='trade-expiry-dates form-width' type="text" placeholder='bussiness type ' name='bussinessType' value={formdata.bussinessType} onChange={CompanyData} />
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
                                            <select onChange={(e) => handleCountry(e)} className=' trade-expiry-dates form-width' name="country" >
                                                <option value=''>Select Country</option>
                                                {country.map(items => <option key={items} value={getCountry} >{items}</option>)}
                                            </select>
                                        </div>
                                        <div className='Bussiness-form-data'>
                                            <label>State</label><br></br>
                                            <select onChange={(e) => handleState(e)} className=' trade-expiry-dates form-width' name='state'   >
                                                <option value=''>Select State</option>
                                                {getState.map(items => <option key={items} value={selectedState} >{items}</option>)}
                                            </select>
                                        </div>
                                        <div className='Bussiness-form-data'>
                                            <label>City</label><br></br>
                                            <select onChange={(e) => handleCity(e)} className=' trade-expiry-dates form-width' name='city' >
                                                <option value=''>Select City</option>
                                                {cities.map((items, index) => <option key={index} value={items.name}>{items.name}</option>)}
                                            </select>
                                        </div>
                                        <div className='Bussiness-form-data'>
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
                                    <h3 className='name-logo'>VK</h3>
                                </div>
                                <div className=''>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Company Name:</p>
                                        <p className='company-names '>{formdata.companyName}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Bussiness Type:</p>
                                        <p className='company-names'>{formdata.bussinessType}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'> Billing Email Address:</p>
                                        <p className='company-names'>{formdata.billingEmail}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Billing Number:</p>
                                        <p className='company-names'>{formdata.billingNumber}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Street Name:</p>
                                        <p className='company-names'>{formdata.streetName}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>Country:</p>
                                        <p className='company-names'>{formdata.country}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>State:</p>
                                        <p className='company-names'>{formdata.state}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>City:</p>
                                        <p className='company-names'>{formdata.city}</p>
                                    </div>
                                    <div className='company-detail-names'>
                                        <p className='company-name'>PO Box Number:</p>
                                        <p className='company-names'>{formdata.poBoxNumber}</p>
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
                                                <label >Number of employeses*</label><br></br>
                                                <input className='trade-expiry-dates form-width' type="text" placeholder='number of employse' name='numberOfEmployees' value={creditInfoData.numberOfEmployees} onChange={creditInfoShow} />
                                            </div>
                                            <div className='Bussiness-form-data'>
                                                <label >Date Established*</label><br></br>
                                                <DatePicker name="startdate" selected={startdate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        setCreditInfoData(prevState => ({
                                                            ...prevState,
                                                            startdate: date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
                                                        }));
                                                    }}
                                                    dateFormat='yyyy-MM-dd'
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur} placeholderText='Expire Date'
                                                    className='card-input-value date trade-expiry-date custom-datepicker-widths ' />
                                            </div>
                                            <div className='Bussiness-form-data'>
                                                <label >Anual Turnover*</label><br></br>
                                                <input className='trade-expiry-dates form-width' type="text" placeholder='anual turnover' name='anualTurnover' value={creditInfoData.anualTurnover} onChange={creditInfoShow} />
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
                                                <p className='company-names'>{creditInfoData.startdate}</p>
                                                <p className='company-names'>{creditInfoData.anualTurnover}</p>
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
                                        <button className='edit-detail-button' onClick={() => setAddDoc(false)} >Add Document</button>
                                    </div>
                                </div>
                                <div className='company-profile-logo'>
                                    <p className='credit-info-detail'>Business documents let us verify you as a real business and allow you to interact with features of the site.</p>
                                </div>
                                <div className='show-flex'>
                                    <div className='show-flex-item'>
                                        <div><h4 className='credit-info-details'>Trade License:</h4></div>
                                        <div><p className='credit-info-details'>{uploadFileData.tradeNumber}</p></div>
                                        <div>
                                            <p className='credit-info-details'>Expiry Date:</p>
                                            <div className='credit-info-details'><p>{uploadFileData.expirydate}</p></div>
                                        </div>
                                        <div><p className='credit-info-details  status-css'>Pending</p></div>
                                        <div> <p className='credit-info-details' onClick={dwnload}>Download</p> </div>
                                    </div>
                                    <div className='show-flex-item'>
                                        <div><h4 className='credit-info-details'>Identiy Certificate:</h4></div>
                                        <div><p className='credit-info-details'>{uploadFileData.identityNumber}</p></div>
                                        <div><p className='credit-info-details'>Expiry Date:</p>
                                            <div className='credit-info-details'><p>{uploadFileData.expirydate}</p></div>
                                        </div>
                                        <div><p className='credit-info-details  status-css'>Pending</p></div>
                                        <div> <p className='credit-info-details'>Download</p> </div>
                                    </div>
                                    <div className='show-flex-item'>
                                        <div><h4 className='credit-info-details'>VAT/GST Certificate:</h4></div>
                                        <div><p className='credit-info-details'>{uploadFileData.vatNumber}</p></div>
                                        <div><p className='credit-info-details'>-</p>
                                            <div className='credit-info-details'><p></p></div>
                                        </div>
                                        <div><p className='credit-info-details status-css'>Pending</p></div>
                                        <div> <p className='credit-info-details'>Download</p> </div>
                                    </div>
                                    <div className='show-flex-item'>
                                        <div><h4 className='credit-info-details'>Declaration Certificate:</h4></div>
                                        <div><p className='credit-info-details'>{uploadFileData.vatNumber}</p></div>
                                        <div><p className='credit-info-details'>-</p>
                                            <div className='credit-info-details'><p></p></div>
                                        </div>
                                        <div><p className='credit-info-details status-css'>Pending</p></div>
                                        <div> <p className='credit-info-details'>Download</p> </div>
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
                                                {fileUpload ? (
                                                    <div className='file-upload-sections'>
                                                        <input type='file' accept='' onChange={handlefileupload} name='tradeLicense' />
                                                    </div>
                                                ) : (
                                                    <div className='file-upload'>
                                                        <label htmlFor='file-upload-input'>
                                                            <h3>{selectedfile.name}</h3>
                                                        </label>
                                                        <input
                                                            id='file-upload-input'
                                                            type='file'
                                                            accept=''
                                                            style={{ display: 'none' }}
                                                        />
                                                        <div className='dow'>
                                                            <MdOutlineFileDownload onClick={dounloadfile} />
                                                            <AiOutlineDelete onClick={handleDelete} />
                                                        </div>
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
                                                    setUploadFileUpload({ ...uploadFileData, enddate: data.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) });
                                                }}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur} placeholderText='Expire Date'
                                                className='card-input-value date trade-expiry-date  custom-datepicker-width '
                                                disabled={fileUpload ? true : false}
                                            />
                                        </div>
                                        <div className='expiry-title'>
                                            <label className='expiry-title'> Trade Licence Number*</label><br></br>
                                            <input type='number' onChange={handlefileValue} value={uploadFileData.tradeNumber} name='tradeNumber' className='card-input-value trade-expiry-dates' placeholder='Trade Number' disabled={fileUpload ? true : false} />
                                        </div>
                                    </div>
                                    <div className='company-profile-detail trade-license-file'>
                                        <div className='company-detail-name'>
                                            <PiIdentificationCardDuotone className='trade-license' />
                                        </div>
                                        <div className='company-detail-name'>
                                            <h4>Identity Document </h4>
                                            <p className='file-formate'>Your  ID lets us verify your Trade Licence. We need this to confirm you are a representative of the business. Please upload the front and back of your  ID. Alternatively you can upload a copy of your passport ID page and visa.</p>
                                            {identityFileUpload ? (
                                                <div className='file-upload-sections'>
                                                    <input type='file' accept='' onChange={handleIdentiyfile} name='identity' />
                                                </div>
                                            ) : (
                                                <div className='file-upload'>
                                                    <label htmlFor='file-upload-input'>
                                                        <h3>{selectedidentityFile.name}</h3>
                                                    </label>
                                                    <input
                                                        id='file-upload-input'
                                                        type='file'
                                                        accept=''
                                                        style={{ display: 'none' }}
                                                    />
                                                    <div className='dow'>
                                                        <MdOutlineFileDownload onClick={dounloadIdentity} />
                                                        <AiOutlineDelete onClick={handleIdentityDelete} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='licence'>
                                        <div className='card-inputs expiry-title'>
                                            <label className='expiry-title'> Expiry Date*</label><br></br>
                                            <DatePicker name="expirydate" selected={expirydate}
                                                onChange={(data) => {
                                                    setExpiryDate(data);
                                                    setUploadFileUpload({ ...uploadFileData, expirydate: data.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }) });
                                                }}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur} placeholderText='Expire Date'
                                                className='card-input-value date trade-expiry-date custom-datepicker-width ' disabled={identityFileUpload ? true : false} />
                                        </div>
                                        <div className='expiry-title'>
                                            <label className='expiry-title'> Identity Document Number*</label><br></br>
                                            <input type='number' onChange={handlefileValue} value={uploadFileData.identityNumber} name='identityNumber' className='card-input-value trade-expiry-dates' placeholder='Identiy Number' disabled={identityFileUpload ? true : false} />
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
                                                {vatcertificate ? (
                                                    <div className='file-upload-sections'>
                                                        <input className='' type='file' accept='' onChange={handleVatCertificate} name='vatCertificate' />
                                                    </div>
                                                ) : (
                                                    <div className='file-upload'>
                                                        <label htmlFor='file-upload-input'>
                                                            <h3>{selectedVatCertificate.name}</h3>
                                                        </label>
                                                        <input
                                                            id='file-upload-input'
                                                            type='file'
                                                            accept=''
                                                            style={{ display: 'none' }}
                                                        />
                                                        <div className='dow'>
                                                            <MdOutlineFileDownload onClick={dounloadvat} />
                                                            <AiOutlineDelete onClick={DeleteVat} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='licence'>
                                        <div className='expiry-title'>
                                            <label className='expiry-title'> VAT Certificate Number / GST Certificate Number *</label><br></br>
                                            <input type='number' onChange={handlefileValue} value={uploadFileData.vatNumber} name='vatNumber' className='card-input-value trade-expiry-dates' placeholder='VAT Number' disabled={vatcertificate ? true : false} />
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
                                                {declaration ? (
                                                    <div className='file-upload-sections'>
                                                        <input type='file' accept='' onChange={handleDeclaration} name='declaration' />
                                                    </div>
                                                ) : (
                                                    <div className='file-upload'>
                                                        <label htmlFor='file-upload-input'>
                                                            <h3>{selectedDeclaration.name}</h3>
                                                        </label>
                                                        <input
                                                            id='file-upload-input'
                                                            type='file'
                                                            accept=''
                                                            style={{ display: 'none' }}
                                                        />
                                                        <div className='dow'>
                                                            <MdOutlineFileDownload onClick={dounloaddecleration} />
                                                            <AiOutlineDelete onClick={DeleteDecleration} />
                                                        </div>
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
    )
}
export default CompanyProfile 