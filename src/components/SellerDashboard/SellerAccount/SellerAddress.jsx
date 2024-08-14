import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, fetchAddresses, updateAddress, deleteAddress, markDefaultAddress } from '../../../Redux/addressSlice';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { allCountries } from '../../Schemas/countryCodes';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SailingIcon from '@mui/icons-material/Sailing';



const SellerAddress = () => {

    const dispatch = useDispatch();
    const { addresses, status } = useSelector((state) => state.address);

    const [countries, setCountries] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [countriess, setCountriess] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [showPopup, setShowPopup] = useState(false);
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
    const [isDefaultChecked, setIsDefaultChecked] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);


    //select country form api
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
    };

    //add address
    const handleAddAddress = () => {
        setShowPopup(true);
        resetFormFields();
    };
    const handleClosePopup = () => {
        setShowPopup(false);
        resetFormFields();
    };
    const resetFormFields = () => {
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
        setIsLocationChecked(false);
        setIsBillingChecked(false);
        setIsDefaultChecked(false);
        setEditingIndex(null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const formData = {
            address,
            selectedOrigin,
            city,
            area,
            street,
            office,
            pobox,
            postCode,
            phoneNumber,
            selectedCountry: selectedCountry.dialCode,
            airport,
            seaport,
            isLocationChecked,
            isBillingChecked,
            isDefaultChecked
        };

        try {
            let response;
            if (editingIndex !== null) {
                const addressToUpdate = addresses.find(address => address.id === editingIndex);
                response = await dispatch(updateAddress({ id: addressToUpdate.id, formData }));
                if (formData.isDefaultChecked) {
                    await dispatch(markDefaultAddress(addressToUpdate.id));
                }
                await dispatch(fetchAddresses());

                toast(<div className='toaster'> < VerifiedIcon /> {`Address updated successfully`}</div>,
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            } else {
                response = await dispatch(addAddress(formData));
                const newAddress = response.payload;
                if (formData.isDefaultChecked) {
                    if (newAddress && newAddress.id) {
                        await dispatch(markDefaultAddress(newAddress.id));
                    } else {
                        console.error('Failed to retrieve new address ID');
                    }
                }
                await dispatch(fetchAddresses());

                toast(<div className='toaster'> < VerifiedIcon /> {`Address saved successfully`}</div>,
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
            setShowPopup(false);
            resetFormFields();
        } catch (error) {
            toast(<div className='toaster'> < NewReleasesIcon /> {`Error saving address`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitting(false);
        }
    };

    //edit address
    const handleEditAddress = (id) => {
        const addressToEdit = addresses.find(address => address.id === id);
        if (addressToEdit) {
            setAddress(addressToEdit.address);
            setSelectedOrigin(addressToEdit.selectedOrigin);
            setCity(addressToEdit.city);
            setArea(addressToEdit.area);
            setStreet(addressToEdit.street);
            setOffice(addressToEdit.office);
            setPobox(addressToEdit.pobox);
            setPostCode(addressToEdit.postCode);
            setPhoneNumber(addressToEdit.phoneNumber);
            setSelectedCountry(countriess.find(country => country.dialCode === addressToEdit.selectedCountry));
            setAirport(addressToEdit.airport);
            setSeaport(addressToEdit.seaport);
            setIsLocationChecked(addressToEdit.isLocationChecked);
            setIsBillingChecked(addressToEdit.isBillingChecked);
            setIsDefaultChecked(addressToEdit.isDefaultChecked);
            setEditingIndex(id);
            setShowPopup(true);
        }
    };

    //delete address
    const handleDeleteAddress = (id) => {
        dispatch(deleteAddress({ id }));
    }


    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>Error</div>;
    }

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>My Addresses</title>
            </Helmet>
            <div className="addressbox">
                <div className="flexcol" style={{ gap: '20px' }}>
                    <div className="heading wh">My Addresses</div>
                    <div className="heading2 wh">Provide information on your billing address and where you would like your items to be picked up from. <br /> We need your stock pickup location details in order to calculate accurate shipping rates. <br /> For verification you must add a default address.</div>
                </div>
                <div className="flexcol" style={{ gap: '20px' }}>
                    <button onClick={handleAddAddress} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Add New Address</div></button>
                </div>
            </div>
            <div className="productlist2">
                {addresses.length === 0 ? (
                    <div className="heading3">Address list is empty</div>
                ) : (
                    <Fragment>
                        {addresses.map((address) => (
                            <div className="constaddresswithicons" key={uuidv4()}>
                                <div className="flexcol-start" style={{ gap: '10px' }}>
                                    <div className="addresswithicons">
                                        <div className="heading3">{address.address}</div>
                                        {address.isLocationChecked && <div className='warning-btn' style={{ padding: '2px 10px' }}>Shipping</div>}
                                        {address.isBillingChecked && <div className='warning-btn2' style={{ padding: '2px 10px' }}>Billing</div>}
                                        {address.isDefaultChecked && <div className='warning-btn4' style={{ padding: '2px 10px' }}>Default</div>}
                                    </div>
                                    <div className="addresswithicons">
                                        {address.selectedOrigin && <div className='descrip2'>{address.selectedOrigin}</div>}
                                        {address.city && <div className='descrip2'>{address.city}</div>}
                                        {address.area && <div className='descrip2'>Area: {address.area.length > 15 ? `${address.area.substring(0, 15)}...` : address.area}</div>}
                                        {address.street && <div className='descrip2'>Street: {address.street} {address.street.length > 15 ? `${address.street.substring(0, 15)}...` : address.street}</div>}
                                    </div>
                                    <div className="addresswithicons">
                                        {address.office && <div className='descrip2'>Building/Office: {address.office.length > 15 ? `${address.office.substring(0, 15)}...` : address.office}</div>}
                                        {address.pobox && <div className='descrip2'>Pobox: {address.pobox}</div>}
                                        {address.postCode && <div className='descrip2'>Post code: {address.postCode}</div>}
                                    </div>
                                    <div className="addresswithicons">
                                        {(address.phoneNumber && address.selectedCountry) &&
                                            <div className='flex' style={{ gap: '5px' }}>
                                                <LocalPhoneIcon style={{ height: '15px', width: '15px' }} />   <div className="descrip2">{address.selectedCountry + " " + address.phoneNumber}</div>
                                            </div>
                                        }
                                        {address.airport && <div className='flex' style={{ gap: '5px' }} ><LocalAirportIcon style={{ height: '15px', width: '15px' }} /> <div className="descrip2">{address.airport}</div></div>}
                                        {address.seaport && <div className='flex' style={{ gap: '5px' }} ><SailingIcon style={{ height: '15px', width: '15px' }} /> <div className="descrip2">{address.seaport}</div></div>}
                                    </div>
                                </div>
                                {(!address.isDefaultChecked) &&
                                    <div className="handleditdelete">
                                        <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEditAddress(address.id)} />
                                        <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteAddress(address.id)} />
                                    </div>
                                }
                            </div>
                        ))}
                    </Fragment>
                )}
            </div>
            {showPopup && (
                <div className='popup-parent'>
                    <form className='popup-child' onSubmit={handleSubmit}>
                        <div style={{ height: '500px', overflow: 'auto' }}>
                            <div className="popupform">
                                <div className="heading wh">Add New Address</div>
                                <input type="text" placeholder='Enter address' className="box flex" value={address} onChange={(e) => setAddress(e.target.value)} />
                                <select className="box flex" value={selectedOrigin} onChange={originSelectChange} name='country'>
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
                                    <select className='box flex' name='countryCode' value={selectedCountry.iso2 || ''} onChange={handleCountryChange} required>
                                        <option value="">Select Country Code</option>
                                        {countriess.map(country => (
                                            <option key={country.iso2} value={country.iso2}>
                                                {`${country.name} (+${country.dialCode})`}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="number" placeholder="Enter phone number" className='box flex' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                </div>

                                <input type="text" placeholder='Enter nearest airport' className="box flex" value={airport} onChange={(e) => setAirport(e.target.value)} />
                                <input type="text" placeholder='Enter nearest seaport' className="box flex" value={seaport} onChange={(e) => setSeaport(e.target.value)} />

                                <div className="heading2">Address type:</div>
                                <div className="flex" style={{ gap: '20px' }}>
                                    <div className="flex">
                                        <input type="checkbox" checked={isLocationChecked} onChange={() => setIsLocationChecked(!isLocationChecked)} />&nbsp;&nbsp;<div className="heading2">Stock location</div>
                                    </div>
                                    <div className="flex">
                                        <input type="checkbox" checked={isBillingChecked} onChange={() => setIsBillingChecked(!isBillingChecked)} />&nbsp;&nbsp;<div className="heading2">Billing address</div>
                                    </div>

                                    <div className="flex">
                                        <input type="checkbox" checked={isDefaultChecked} onChange={() => setIsDefaultChecked(!isDefaultChecked)} />&nbsp;&nbsp;<div className="heading2">Default address</div>
                                    </div>
                                </div>

                                <div className="flex" style={{ gap: '20px' }}>
                                    <button className='btn box2 flex' style={{ width: 'fit-content' }} type="submit">
                                        <div className="heading2" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</div>
                                    </button>
                                    <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" onClick={handleClosePopup}>
                                        <div className="heading2">Cancel</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default SellerAddress