import React, { useState, useEffect, Fragment } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { allCountries } from '../../components/Schemas/countryCodes';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SailingIcon from '@mui/icons-material/Sailing';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const BuyerAddress = () => {

    //select country form api
    const [countries, setCountries] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
                const data = response.data;
                const uniqueCountries = [...new Set(data.map(city => city.country))];
                setCountries(uniqueCountries);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const originSelectChange = (event) => {
        setSelectedOrigin(event.target.value);
    };

    //select country code from data 
    const [countriess, setCountriess] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    useEffect(() => {
        const formattedCountries = allCountries.map(country => ({
            name: country[0],
            iso2: country[1],
            dialCode: country[2]
        }));

        setCountriess(formattedCountries);
    }, []);
    const handleCountryChange = (event) => {
        const countryCode = event.target.value;
        const selected = countriess.find(country => country.iso2 === countryCode);
        setSelectedCountry(selected);
    }

    //popup form
    const [showPopup, setShowPopup] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [street, setStreet] = useState('');
    const [office, setOffice] = useState('');
    const [pobox, setPobox] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [airport, setAirport] = useState('');
    const [seaport, setSeaport] = useState('');
    const [isLocationChecked, setIsLocationChecked] = useState(false);
    const [isBillingChecked, setIsBillingChecked] = useState(false);
    const [addressList, setAddressList] = useState(JSON.parse(localStorage.getItem('addresses')) || []);

    const handleAddAddress = () => {
        setShowPopup(true);
        setEditMode(false);
        setAddress('');
        setSelectedOrigin('');
        setCity('');
        setArea('');
        setStreet('');
        setOffice('');
        setPobox('');
        setPostCode('');
        setPhoneNumber('');
        setSelectedCountry('');
        setAirport('');
        setSeaport('');
        setIsLocationChecked('');
        setIsBillingChecked('');
    };

    const handleEditAddress = (index) => {
        const addressToEdit = addressList[index];
        setEditIndex(index);
        setAddress(addressToEdit.address);
        setSelectedOrigin(addressToEdit.selectedOrigin);
        setCity(addressToEdit.city);
        setArea(addressToEdit.area);
        setStreet(addressToEdit.street);
        setOffice(addressToEdit.office);
        setPobox(addressToEdit.pobox);
        setPostCode(addressToEdit.postCode);
        setPhoneNumber(addressToEdit.phoneNumber);
        setSelectedCountry(countriess.find((country) => country.iso2 === addressToEdit.selectedCountry.iso2));
        setAirport(addressToEdit.airport);
        setSeaport(addressToEdit.seaport);
        setIsLocationChecked(addressToEdit.isLocationChecked);
        setIsBillingChecked(addressToEdit.isBillingChecked);
        setShowPopup(true);
        setEditMode(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setEditMode(false);
        setAddress('');
        setSelectedOrigin('');
        setCity('');
        setArea('');
        setStreet('');
        setOffice('');
        setPobox('');
        setPostCode('');
        setPhoneNumber('');
        setSelectedCountry('');
        setAirport('');
        setSeaport('');
        setIsLocationChecked('');
        setIsBillingChecked('');
    };

    const handleSubmit = () => {
        const newAddress = { address, selectedOrigin, city, area, street, office, pobox, postCode, phoneNumber, selectedCountry, airport, seaport, isLocationChecked, isBillingChecked };
        if (editMode) {
            const updatedAddressList = [...addressList];
            updatedAddressList[editIndex] = newAddress;
            setAddressList(updatedAddressList);
            localStorage.setItem('addresses', JSON.stringify(updatedAddressList));
        } else {
            const updatedAddressList = [...addressList, newAddress];
            setAddressList(updatedAddressList);
            localStorage.setItem('addresses', JSON.stringify(updatedAddressList));
        }
        setShowPopup(false);
        setEditMode(false);
        setAddress('');
        setSelectedOrigin('');
        setCity('');
        setArea('');
        setStreet('');
        setOffice('');
        setPobox('');
        setPostCode('');
        setPhoneNumber('');
        setSelectedCountry('');
        setAirport('');
        setSeaport('');
        setIsLocationChecked('');
        setIsBillingChecked('');
    };

    const handleDeleteAddress = (index) => {
        const updatedAddressList = [...addressList];
        updatedAddressList.splice(index, 1);
        setAddressList(updatedAddressList);
        localStorage.setItem('addresses', JSON.stringify(updatedAddressList));
    };


    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>My Addresses</title>
            </Helmet>

            <div className="flex wh" style={{ justifyContent: "space-between" }} >
                <div className="heading wh">My Addresses</div>
                <button onClick={handleAddAddress} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)', whiteSpace: 'nowrap' }}><div className="heading2">Add New Address</div></button>
            </div>

            <div className="productlist2">

                {addressList.length === 0 ? (
                    <div className="heading3">Address list is empty</div>
                ) : (
                    <Fragment>
                        {addressList.map((address, index) => (
                            <div className="productlist4" key={index}>
                                <div className="flexcol-start" style={{ gap: '10px' }}>
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <div className="heading3">{address.address}</div>
                                        {address.isLocationChecked && <div className='descrip warning-btn'>Shipping</div>}
                                        {address.isBillingChecked && <div className='descrip warning-btn2'>Billing</div>}
                                    </div>
                                    <div className="flex" style={{ gap: '10px' }}>
                                        <div className='descrip2'>{address.selectedOrigin}</div>
                                        <div className='descrip2'>{address.city}</div>
                                        <div className='descrip2'>Area: {address.area.length > 15 ? `${address.area.substring(0, 15)}...` : address.area}</div>
                                        <div className='descrip2'>Street: {address.street} {address.street.length > 15 ? `${address.street.substring(0, 15)}...` : address.street}</div>
                                    </div>
                                    <div className="flex" style={{ gap: '10px' }}>
                                        <div className='descrip2'>Building/Office: {address.office.length > 15 ? `${address.office.substring(0, 15)}...` : address.office}</div>
                                        <div className='descrip2'>Pobox: {address.pobox}</div>
                                        <div className='descrip2'>Post code: {address.postCode}</div>
                                    </div>
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{address.selectedCountry.dialCode + address.phoneNumber}</div>
                                        <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{address.airport}</div>
                                        <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{address.seaport}</div>
                                    </div>
                                </div>
                                <div className="flexcol" style={{ gap: '20px' }}>
                                    <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEditAddress(index)} />
                                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteAddress(index)} />
                                </div>
                            </div>
                        ))}
                    </Fragment>
                )}
            </div>
            {showPopup && (
                <div className='popup-parent'>
                    <form className='popup-child'>
                        <div style={{ height: '500px', overflow: 'auto' }}>
                            <div className="popupform">
                                <div className="heading wh">Add New Address</div>
                                <input type="text" placeholder='Enter address' className="box flex" value={address} onChange={(e) => setAddress(e.target.value)} />
                                <select className="box flex" value={selectedOrigin} onChange={originSelectChange} name='country' >
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={uuidv4()} value={country}>{country}</option>
                                    ))}
                                </select>
                                <input type="text" placeholder='Enter city' className="box flex" value={city} onChange={(e) => setCity(e.target.value)} />
                                <input type="text" placeholder='Enter area/district' className="box flex" value={area} onChange={(e) => setArea(e.target.value)} />
                                <input type="text" placeholder='Enter street name' className="box flex" value={street} onChange={(e) => setStreet(e.target.value)} />
                                <input type="text" placeholder='Enter building/warehouse/office' className="box flex" value={office} onChange={(e) => setOffice(e.target.value)} />
                                <input type="text" placeholder='Enter PO box' className="box flex" value={pobox} onChange={(e) => setPobox(e.target.value)} />
                                <input type="text" placeholder='Enter post code' className="box flex" value={postCode} onChange={(e) => setPostCode(e.target.value)} />

                                <div className="flex" style={{ gap: '20px' }}>
                                    <select className='box flex' name='countryCode' onChange={handleCountryChange}>
                                        <option value="">Select Country Code</option>
                                        {countriess.map(country => (
                                            <option key={country.iso2} value={country.iso2}>
                                                {`${country.name} (+${country.dialCode})`}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="number" placeholder="Enter phone number" className='box flex' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>

                                <input type="text" placeholder='Enter nearest airport' className="box flex" value={airport} onChange={(e) => setAirport(e.target.value)} />
                                <input type="text" placeholder='Enter nearest seaport' className="box flex" value={seaport} onChange={(e) => setSeaport(e.target.value)} />

                                <div className="heading2">Address type:</div>
                                <div className="flex" style={{ gap: '20px' }}>
                                    <div className="flex">
                                        <input type="checkbox" checked={isLocationChecked} onChange={() => setIsLocationChecked(!isLocationChecked)} />&nbsp;&nbsp;<div className="heading2">Shipping address</div>
                                    </div>
                                    <div className="flex">
                                        <input type="checkbox" checked={isBillingChecked} onChange={() => setIsBillingChecked(!isBillingChecked)} />&nbsp;&nbsp;<div className="heading2">Billing address</div>
                                    </div>
                                </div>

                                <div className="flex" style={{ gap: '20px' }}>
                                    <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" onClick={handleSubmit}><div className="heading2">Save Address</div></button>
                                    <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" onClick={handleClosePopup}><div className="heading2">Cancel</div></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default BuyerAddress