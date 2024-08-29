import React, { Fragment, useEffect, useState } from 'react'
import { LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import './CreateRfq.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscFile } from "react-icons/vsc";
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CreateRfq = () => {
    const [open, setOpen] = useState(false)
    const [addproduct, setAddProduct] = useState([{  pname: '', qty: '', unit: '', targetprice: '', price: '', tprice: "", img: '' }])
    const [getCountry, setCountry] = useState()
    const [selectedState, setSelectedState] = useState()
    const [getState, setState] = useState([])
    const [data, setData] = useState([]);
    const [cities, setCities] = useState([])
    const [startdate, setStartDate] = useState('');
    const [uploadFile, setUploadFile] = useState(false)
    const [fileUploadDataShow, setFileUploadDataShow] = useState([])
    const [uploadFileData, setUploadFileData] = useState(false)

    //     countrty all data store
    // Shipping Data 
    const [shippingData, setShippingData] = useState({
        ddp: '',
        exwork: '',

    })
    const handleShipping = (e) => {
        const { name, value } = e.target
        setShippingData({ ...shippingData, [name]: value })
    }
    // Additionl Detail 
    const [additionalDetail, setAddition] = useState({
        startdate: '',
        additionalinfo: '',
    })
    const handleDetail = (e) => {
        const { name, value } = e.target
        setAddition({ ...additionalDetail, [name]: value })
    }
    const handleUploadFile = () => {
        setUploadFile(true)
    }
    const handleCancelUpload = () => {
        setUploadFile(false)
    }
    const handleAdd = (e) => {
        e.preventDefault()
        setAddProduct([...addproduct, { pname: '', qty: '', unit: '', targetprice: '', price: '', tprice: "", img: '' }])
        console.log(addproduct)
    }
    const handleDelete = (id) => {
        const deleteVal = [...addproduct];
        deleteVal.splice(id, 1)
        setAddProduct(deleteVal)
    }
    const handleFocus = () => {
        setOpen(true);
    };
    const handleBlur = () => {
        setOpen(false);
    };
    const handleChange = (e, id) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        const updatedProducts = [...addproduct];
        let total = 0;
        updatedProducts[id] = {
            ...updatedProducts[id],
            [name]: value
        };
        // Update the total price
        if (name === 'qty' || name === 'price') {
            const qty = parseFloat(updatedProducts[id].qty);
            const price = parseFloat(updatedProducts[id].price);
            total = isNaN(qty) || isNaN(price) ? '' : (qty * price).toFixed(2);
        }
        else {
            const qty = parseFloat(updatedProducts[id].qty);
            const price = parseFloat(updatedProducts[id].price);
            total = isNaN(qty) || isNaN(price) ? '' : (qty * price).toFixed(2)
        }
        updatedProducts[id] = {
            ...updatedProducts[id],
            tprice: total
        };
        setAddProduct(updatedProducts);
        console.log(updatedProducts)
        console.log(total)
    }
    // country
    useEffect(() => {
        axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])
    const country = [...new Set(data.map(item => item.country))]
    country.sort()
    const handleCountry = (e) => {
        setCountry(e.target.value)
        let states = data.filter(state => state.country === e.target.value);
        states = [...new Set(states.map(item => item.subcountry))];
        states.sort();
        setState(states)
    }
    const handleState = (e) => {
        setSelectedState(e.target.value)
        let city = data.filter(cities => cities.subcountry === e.target.value);
        city.sort()
        setCities(city)
    }
  
    //    upload file code here
    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const fileUploadDataShow = e.target.result;
            const workbook = XLSX.read(fileUploadDataShow, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            setFileUploadDataShow(json);
        };
    }
    const handleUpload = () => {
        if (fileUploadDataShow.length > 0) {
            setAddProduct(fileUploadDataShow.map(row => ({
                pname: row['Product Name'],
                qty: row['Quantity'],
                unit: row['Unit'],
                targetprice: row['Have a target price?'],
                price: row['Unit Target price'],
                tprice: row['Unit Target price'] * row['Quantity'],
                img: row['Image Url']
            })))
        }
        setUploadFileData(true)
        setUploadFile(false)
    }
    const navigate = useNavigate()
    // Form submit here
    const handleSubmitRfq = (e) => {
        e.preventDefault()
        const formData ={
            addproduct,
            shippingData,
            updateadditonalDetail: {...additionalDetail, startdate},
            getCountry,
            selectedState,
            cities
        }
        const formDataJson = JSON.stringify(formData);
        localStorage.setItem('formData', formDataJson)
        const updateadditonalDetail = {
            ...additionalDetail,
            startdate: startdate
        }
        // form data store in the local storege
        navigate('/review-confirm', { state: { addproduct, shippingData, updateadditonalDetail, getCountry, selectedState, cities } })
    }
    return (
        <>
        <Fragment>
       <Helmet>
            <title>Request for Quote (RFQ) | Ulinkit - Get Quotes for Products and Services</title>
            <meta name="description" content="Submit a Request for Quote (RFQ) on Ulinkit to get personalized quotes for products and services. Provide your requirements and receive competitive pricing from suppliers." />
            <link rel="canonical" href="https://www.ulinkit.com/createrfq" />
        </Helmet>
            {uploadFile && (
                <div className='background-Changer'>
                    <div className='invite-more'>
                        <div className='card-infos-bank'>
                            <div className='card-title'>
                                <h1 className=" card-title-tittles">Upload Document</h1>
                            </div>
                            <div className='card-title'>
                                <RxCross2 className='cross-icon' onClick={handleCancelUpload} />
                            </div>
                        </div>
                        <div className=''> <p className='info-details invite-quote upload-quote'>Add documents related to this RFQ. Files should no more than 10 MB.</p></div>
                        <div className='border-p'>
                            <div className='file-upload file-width'>
                                <VscFile />
                                <input type='file' className='file-choose' accept='.xlsx, .xls' onChange={handleFileChange} />
                            </div>
                            <div className='add-card-btn'>
                                <button className='add-bank-btn ' onClick={handleCancelUpload} >Cancel</button>
                                <button type='submit' className='add-bank-btns ' onClick={handleUpload}>UPLOAD</button>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            )}
            <div className='responsive'>
                <div className='userDashboard'>
                    <h1 className='user-titles pay-title bor-1'>Create a new RFQ</h1>
                </div>
                <div className='more-rule ml-rule'>
                    <p className='roles-text  pay-note '> Please fill in the product details below. The more details you add, the better our sellers will be able to cater to your product needs with relevant quotes. Product names, quantities, units and RFQ expiry date is required to create an RFQ </p>
                </div>
                <div className='border-1 border-p'>
                    <div className='card-table'>
                        <div className='table-1 font-size'>Add product to your RFQ or bulk of product</div>
                        <div className='card-table-du'>
                            <div className='dounload'>
                                <LuArrowDownToLine />
                                <a href='/bulk-products-template.xlsx' download="bulk-products-template.xlsx" accept=".xlsx" className='d'>DOWNLOAD BULK OF PRODUCT TEMPLATE</a>
                            </div>
                            <div className='upload'>
                                <LuArrowUpFromLine />
                                <p className='d pointer' onClick={handleUploadFile}>UPLOAD BULK OF PRODUCT TEMPLATE</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-1 border-p '>
                    <form onSubmit={handleSubmitRfq}>
                        <div className=''>
                            {addproduct.map((value, id) => {
                                return (
                                    <div className='crete-rfq-item' key={id}>
                                        <div className='rfq-item-input'>
                                            <img src={value.img} className='rfq-img' name="img" alt={value.pname}></img>
                                        </div>
                                        <div className='rfq-item-input input-width-change'>
                                            <label>Product Name*</label><br></br>
                                            <input type='text' name='pname' className='card-input-value full-width' placeholder='porduct name' value={value.pname || ""} onChange={(e) => handleChange(e, id)} />
                                        </div>
                                        <div className='rfq-item-input'>
                                            <label>Quantity*</label><br></br>
                                            <div className='quantity'>
                                                <input type='number' className='card-input-value' placeholder='Qty' name='qty' value={value.qty || ""} onChange={(e) => handleChange(e, id)} />
                                                <select className='card-input-value' name='unit' value={value.unit || ""} onChange={(e) => handleChange(e, id)}>
                                                    <option value="Kg">Kg</option>
                                                    <option value="mm">gr</option>
                                                    <option value="cn">lb</option>
                                                    <option value="kl">lt</option>
                                                    <option value="mt">cl</option>
                                                    <option value="lb">ml</option>
                                                    <option value="lb">gal</option>
                                                    <option value="lb">FI Oz</option>
                                                    <option value="lb">piece</option>
                                                    <option value="lb">packet</option>
                                                    <option value="lb">cartoon</option>
                                                    <option value="lb">Box</option>
                                                    <option value="lb">Roll</option>
                                                    <option value="lb">Pack</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='rfq-item-input'>
                                            <label>Have a target Price*</label><br></br>
                                            <select className='card-input-value' name='targetprice' value={value.targetprice} onChange={(e) => handleChange(e, id)}  >
                                                <option value="">Select</option>
                                                <option value="Negotiable">Negotiable</option>
                                                <option value="I have unit target price">I have unit target price</option>
                                            </select>
                                        </div>
                                        {value.targetprice === 'Negotiable' ? (
                                            <>
                                                <div className='rfq-item-input'>
                                                    <label> Price*</label><br></br>
                                                    <input type='number' className='card-input-value' placeholder='Price' name='price' value={value.price || ""} onChange={(e) => handleChange(e, id)} disabled />
                                                </div>
                                                <div className='rfq-item-input'>
                                                    <label>Total Price*</label><br></br>
                                                    <input type='text' className='card-input-value' placeholder='total price ' name='tprice' value={value.tprice || ""} onChange={(e) => handleChange(e, id)} disabled />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className='rfq-item-input'>
                                                    <label> Price*</label><br></br>
                                                    <input type='number' className='card-input-value' placeholder='Price' name='price' value={value.price || ""} onChange={(e) => handleChange(e, id)} />
                                                </div>
                                                <div className='rfq-item-input'>
                                                    <label>Total Price*</label><br></br>
                                                    <input type='text' className='card-input-value' placeholder='total price ' name='tprice' value={value.tprice || ""} onChange={(e) => handleChange(e, id)} />
                                                </div>
                                            </>
                                        )}
                                        <div className='rfq-item-input upload-icon'>
                                            <RiDeleteBin6Line onClick={handleDelete} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='border-p '>
                            <p className='add' onClick={handleAdd}>ADD ANOTHER PRODUCT</p>
                        </div>
                        <div className='border-p '>
                            <p className='add' >Where would you like your items to be shipped?</p>
                        </div>
                        <div className='c-s-c  border-p'>
                            <div className='input-width-change'>
                                <label>Country</label><br></br>
                                <select onChange={(e) => handleCountry(e)} className='selectCountry' name="country"    >
                                    <option value=''>Select Country</option>
                                    {country.map(items => <option key={items} value={getCountry} >{items}</option>)}
                                </select>
                            </div>
                            <div className='input-width-change'>
                                <label>State</label>
                                <select onChange={(e) => handleState(e)} className='selectCountry' name='state'  >
                                    <option value=''>Select State</option>
                                    {getState.map(items => <option key={items} value={selectedState} >{items}</option>)}
                                </select>
                            </div>
                            <div className='input-width-change'>
                                <label>City</label>
                                <select onChange={(e) => handleCity(e)} className='selectCountry' name='city'  >
                                    <option value=''>Select City</option>
                                    {cities.map(items => <option key={items.name} value={items.name}>{items.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className='border-p'>
                            <p className='paragraph-4 mr-left'>Select shipping terms</p>
                            <p className=' mr-left'>Tradeling offers delivery services. However you can also select other shipping options.</p>
                        </div>
                        <div className='border-p ' >
                            <div className='display-flex'>
                                <div className='select-box'>
                                    <input type='radio' id='radio' name='ddp' value='DDP' checked={shippingData.ddp === "DDP"} onChange={handleShipping} />DDP
                                    <p className=' mr-left  ' >The seller will cover off the cost of transport (export fees, carriage, insurance and destination port charges) and assume all risk until goods are unloaded at the terminal.</p>
                                </div>
                                <div className='select-box'>
                                    <input type='radio' id='radio' name='exwork' value='Ex-Work' checked={shippingData.exwork === "Ex-Work"} onChange={handleShipping} />Ex-Work
                                    <p className='  '>I will collect the goods from the sellers chosen location.</p>
                                </div>
                            </div>
                        </div>
                        <div className='boder-p'>
                            <p className='add mr-left ml-left' >ADDITIONAL INFORMATION</p>
                        </div>
                        <div className='border-p'>
                            <div className='card-inputs-filed'>
                                <div className='card-inputs'>
                                    <label>RFQ expiry date*</label><br></br>
                                    <DatePicker name="startdate" selected={startdate}
                                        onChange={(startdate) => setStartDate(startdate)}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} placeholderText='Expire Date'
                                        className='card-input-value date ' />
                                </div>
                                <div className='card-inputs '>
                                    <label>Addition Information</label><br></br>
                                    <input type='text' className='card-input-value mt-top' name="additionalinfo" value={additionalDetail.additionalinfo} onChange={handleDetail} placeholder='Additional Infor Add' />
                                </div>
                            </div>
                        </div>
                        <div className='add-card-btn subcanc'>
                            <button className='add-bank-btn cancel btn-cancel' >Cancel</button>
                            <button type='submit' className='add-bank-btns cancel btn-cancel'  >SUBMIT RFQ</button>
                        </div>
                    </form>
                </div>
            </div>
            </Fragment>
        </>
    )
}

export default CreateRfq