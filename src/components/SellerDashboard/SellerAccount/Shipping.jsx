import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SailingIcon from '@mui/icons-material/Sailing';

const Shipping = () => {

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});
    const retrieveAddresses = () => {
        const storedAddresses = localStorage.getItem('seller-addresses');
        if (storedAddresses) {
            const parsedAddresses = JSON.parse(storedAddresses);
            setAddresses(parsedAddresses);
            const defaultAddress = parsedAddresses.find(address => address.isDefaultChecked);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress);
            }
        }
    };
    useEffect(() => {
        retrieveAddresses();
    }, []);
    const handleAddressChange = (event) => {
        const selectedAddressData = addresses.find(
            (address) => address.address === event.target.value
        );
        setSelectedAddress(selectedAddressData);
    };


    //time selector 
    const [fromTime, setFromTime] = useState('12 AM');
    const [toTime, setToTime] = useState('12 AM');
    const times = [];
    for (let i = 1; i <= 12; i++) {
        times.push(`${i} AM`);
    }
    for (let i = 1; i <= 12; i++) {
        times.push(`${i} PM`);
    }
    const handleChange = (type, value) => {
        if (type === 'from') {
            setFromTime(value);
        } else {
            setToTime(value);
        }
    };

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Shipping Preferences</title>
            </Helmet>
            <div className="heading">Shipping Preferences</div>

            <div className="productlist2" style={{ gap: '35px' }}>
                <div className="flexcol-start" style={{ gap: '10px' }}>
                    <div className="heading3">International Shipping</div>
                    <div className="descrip">Opt in and out of delivery methods you are willing to provide for orders purchased outside your country.</div>
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                    <input type="checkbox" />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Ex works</div>
                        <div className="heading2">Ex works allows the buyer to collect their goods from your chosen location. It is our default delivery method that all sellers must agree to.</div>
                    </div>
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                    <input type="checkbox" />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Free on board</div>
                        <div className="heading2">As the seller I am happy to pay for transportation of the goods to the port of shipment, plus loading costs.</div>
                    </div>
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                    <input type="checkbox" />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Cost, Insurance and Freight</div>
                        <div className="heading2">I will arrange for the carriage of goods by sea to a port of destination and provide the buyer with the documents necessary to obtain them from the carrier.</div>
                    </div>
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                    <input type="checkbox" />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Door-to-door delivery</div>
                        <div className="heading2">I will cover all the costs of transport (export fees, carriage, insurance, and destination port charges) and assume all risk until the goods are unloaded at the terminal.</div>
                    </div>
                </div>
            </div>

            <div className="productlist2" style={{ gap: '35px' }}>
                <div className="flexcol-start" style={{ gap: '10px' }}>
                    <div className="heading3">Domestic Shipping</div>
                    <div className="descrip">Opt in and out of delivery methods you are willing to provide for orders purchased in your country.</div>
                </div>
                <div className="flex-start" style={{ gap: '10px' }}>
                    <div className="flexcol-start" style={{ gap: '20px' }}>
                        <div className="flexcol-start" style={{ gap: '10px' }}>
                            <div className="heading3">Ulink logistics (Default)</div>
                            <div className="descrip">Ulink can collect the goods from a location of my choice.</div>
                        </div>

                        <select className='coupon' value={selectedAddress.address || ''} onChange={handleAddressChange}>
                            <option value=''>Select address</option>
                            {addresses.map((address, index) => (
                                <option key={index} value={address.address}>
                                    {address.address} {address.isLocationChecked && '(Stock location)'} {address.isBillingChecked && '(Billing)'} {address.isDefaultChecked && '(Default)'}
                                </option>
                            ))}
                        </select>
                        {selectedAddress.address && (
                            <div className="flexcol-start wh" style={{ gap: '2px' }}>
                                <div className="flex" style={{ gap: '20px' }}>
                                    <div className="heading3">{selectedAddress.address}</div>
                                    {selectedAddress.isLocationChecked && <div className='descrip warning-btn'>Stock location</div>}
                                    {selectedAddress.isBillingChecked && <div className='descrip warning-btn2'>Billing</div>}
                                    {selectedAddress.isDefaultChecked && <div className='descrip warning-btn4'>Default</div>}
                                </div>
                                <div className="flex" style={{ gap: '10px' }}>
                                    <div className='descrip2'>{selectedAddress.selectedOrigin}</div>
                                    <div className='descrip2'>{selectedAddress.city}</div>
                                    <div className='descrip2'>{selectedAddress.area}</div>
                                    <div className='descrip2'>{selectedAddress.street}</div>
                                    <div className='descrip2'>{selectedAddress.office}</div>
                                    <div className='descrip2'>Pobox: {selectedAddress.pobox}</div>
                                    <div className='descrip2'>Post code: {selectedAddress.postCode}</div>
                                </div>
                                <div className="flex" style={{ gap: '20px' }}>
                                    <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedAddress.phoneNumber}</div>
                                    <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedAddress.airport}</div>
                                    <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedAddress.seaport}</div>
                                </div>
                            </div>
                        )}

                        <div className="flexcol-start" style={{ gap: '10px' }}>
                            <div className="heading2">Preferred time for collection</div>
                            <div className='flex-start' style={{ gap: '10px' }}>
                                <div className='flex' style={{ gap: '10px' }}>
                                    <div className='heading2'>From: </div>
                                    <select className='coupon' value={fromTime} onChange={(e) => handleChange('from', e.target.value)}>
                                        {times.map((time) => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex' style={{ gap: '10px' }}>
                                    <div className='heading2'>To: </div>
                                    <select className='coupon' value={toTime} onChange={(e) => handleChange('to', e.target.value)}>
                                        {times.map((time) => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shipping