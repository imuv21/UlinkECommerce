import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SailingIcon from '@mui/icons-material/Sailing';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const Shipping = () => {

    //default selected address
    const [exworks, setExworks] = useState(false);
    const [fob, setFob] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [selectedExwork, setSelectedExwork] = useState({});

    const retrieveAddresses = () => {
        const storedAddresses = localStorage.getItem('seller-addresses');
        if (storedAddresses) {
            const parsedAddresses = JSON.parse(storedAddresses);
            setAddresses(parsedAddresses);

            const storedSelectedAddress = localStorage.getItem('selected-address');
            if (storedSelectedAddress) {
                const selectedAddressData = parsedAddresses.find(
                    address => address.address === storedSelectedAddress
                );
                if (selectedAddressData) {
                    setSelectedAddress(selectedAddressData);
                } else {
                    const defaultAddress = parsedAddresses.find(address => address.isDefaultChecked);
                    if (defaultAddress) {
                        setSelectedAddress(defaultAddress);
                    }
                }
            } else {
                const defaultAddress = parsedAddresses.find(address => address.isDefaultChecked);
                if (defaultAddress) {
                    setSelectedAddress(defaultAddress);
                }
            }

            const storedSelectedExwork = localStorage.getItem('selected-exwork');
            if (storedSelectedExwork) {
                const selectedExworkData = parsedAddresses.find(
                    address => address.address === storedSelectedExwork
                );
                if (selectedExworkData) {
                    setSelectedExwork(selectedExworkData);
                } else {
                    const defaultExwork = parsedAddresses.find(address => address.isDefaultChecked);
                    if (defaultExwork) {
                        setSelectedExwork(defaultExwork);
                    }
                }
            } else {
                const defaultExwork = parsedAddresses.find(address => address.isDefaultChecked);
                if (defaultExwork) {
                    setSelectedExwork(defaultExwork);
                }
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
        localStorage.setItem('selected-address', event.target.value);
    };

    const handleExworkChange = (event) => {
        const selectedExworkData = addresses.find(
            (address) => address.address === event.target.value
        );
        setSelectedExwork(selectedExworkData);
        localStorage.setItem('selected-exwork', event.target.value);
    };


    //time selector 
    // const [fromTime, setFromTime] = useState('12 AM');
    // const [toTime, setToTime] = useState('12 AM');
    // const times = [];
    // for (let i = 1; i <= 12; i++) {
    //     times.push(`${i} AM`);
    // }
    // for (let i = 1; i <= 12; i++) {
    //     times.push(`${i} PM`);
    // }
    // const parseTime = (time) => {
    //     const [hour, period] = time.split(' ');
    //     return {
    //         hour: parseInt(hour, 10),
    //         period,
    //     };
    // };
    // const isValidTimeRange = (from, to) => {
    //     const fromParsed = parseTime(from);
    //     const toParsed = parseTime(to);

    //     if (fromParsed.period === 'AM' && toParsed.period === 'AM') {
    //         return fromParsed.hour <= toParsed.hour;
    //     } else if (fromParsed.period === 'PM' && toParsed.period === 'PM') {
    //         return fromParsed.hour <= toParsed.hour;
    //     } else if (fromParsed.period === 'AM' && toParsed.period === 'PM') {
    //         return true;
    //     }
    //     return false;
    // };
    // const handleChange = (type, value) => {
    //     if (type === 'from') {
    //         if (isValidTimeRange(value, toTime)) {
    //             setFromTime(value);
    //         } else {
    //             alert('Invalid time range');
    //         }
    //     } else {
    //         if (isValidTimeRange(fromTime, value)) {
    //             setToTime(value);
    //         } else {
    //             alert('Invalid time range');
    //         }
    //     }
    // };


    // Retrieve initial values from localStorage or set defaults
   

    const initialFromTime = localStorage.getItem('fromTime') || '10 AM';
    const initialToTime = localStorage.getItem('toTime') || '10 PM';
    const [fromTime, setFromTime] = useState(initialFromTime);
    const [toTime, setToTime] = useState(initialToTime);
    const times = [];
    for (let i = 1; i <= 12; i++) {
        times.push(`${i} AM`);
    }
    for (let i = 1; i <= 12; i++) {
        times.push(`${i} PM`);
    }
    const parseTime = (time) => {
        const [hour, period] = time.split(' ');
        return {
            hour: parseInt(hour, 10),
            period,
        };
    };
    const isValidTimeRange = (from, to) => {
        const fromParsed = parseTime(from);
        const toParsed = parseTime(to);

        if (fromParsed.period === 'AM' && toParsed.period === 'AM') {
            return fromParsed.hour <= toParsed.hour;
        } else if (fromParsed.period === 'PM' && toParsed.period === 'PM') {
            return fromParsed.hour <= toParsed.hour;
        } else if (fromParsed.period === 'AM' && toParsed.period === 'PM') {
            return true;
        }
        return false;
    };

    const handleChange = (type, value) => {
        if (type === 'from') {
            if (isValidTimeRange(value, toTime)) {
                setFromTime(value);
                localStorage.setItem('fromTime', value);
                localStorage.setItem('selectedTime', JSON.stringify({ fromTime: value, toTime }));
            } else {
              
                toast(<div className='toaster'> < NewReleasesIcon /> {`Invalid time range`}</div>, 
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } else {
            if (isValidTimeRange(fromTime, value)) {
                setToTime(value);
                localStorage.setItem('toTime', value);
                localStorage.setItem('selectedTime', JSON.stringify({ fromTime, toTime: value }));
            } else {
                toast(<div className='toaster'> < NewReleasesIcon /> {`Invalid time range`}</div>, 
                    { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        }
    };

    // Saving the initial default values in localStorage
    useEffect(() => {
        localStorage.setItem('fromTime', fromTime);
        localStorage.setItem('toTime', toTime);
        localStorage.setItem('selectedTime', JSON.stringify({ fromTime, toTime }));
    }, []);



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
                <div className="flex-start" style={{ gap: '10px' }}>
                    <input type="checkbox" style={{ marginTop: '3px', cursor: 'pointer' }} value={exworks} onChange={() => setExworks(!exworks)} />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Ex works</div>
                        <div className="heading2">Ex works allows the buyer to collect their goods from your chosen location. It is our default delivery method that all sellers must agree to.</div>
                        {exworks &&
                            <>
                                <select className='coupon' value={selectedExwork.address || ''} onChange={handleExworkChange}>
                                    <option value=''>Select address</option>
                                    {addresses.map((address, index) => (
                                        <option key={index} value={address.address}>
                                            {address.address} {address.isLocationChecked && '(Stock location)'} {address.isBillingChecked && '(Billing)'} {address.isDefaultChecked && '(Default)'}
                                        </option>
                                    ))}
                                </select>
                                {selectedExwork.address && (
                                    <div className="flexcol-start wh" style={{ gap: '2px' }}>
                                        <div className="flex" style={{ gap: '20px' }}>
                                            <div className="heading3">{selectedExwork.address}</div>
                                            {selectedExwork.isLocationChecked && <div className='descrip warning-btn'>Stock location</div>}
                                            {selectedExwork.isBillingChecked && <div className='descrip warning-btn2'>Billing</div>}
                                            {selectedExwork.isDefaultChecked && <div className='descrip warning-btn4'>Default</div>}
                                        </div>
                                        <div className="flex" style={{ gap: '10px' }}>
                                            <div className='descrip2'>{selectedExwork.selectedOrigin}</div>
                                            <div className='descrip2'>{selectedExwork.city}</div>
                                            <div className='descrip2'>{selectedExwork.area}</div>
                                            <div className='descrip2'>{selectedExwork.street}</div>
                                            <div className='descrip2'>{selectedExwork.office}</div>
                                            <div className='descrip2'>Pobox: {selectedExwork.pobox}</div>
                                            <div className='descrip2'>Post code: {selectedExwork.postCode}</div>
                                        </div>
                                        <div className="flex" style={{ gap: '20px' }}>
                                            <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedExwork.phoneNumber}</div>
                                            <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedExwork.airport}</div>
                                            <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedExwork.seaport}</div>
                                        </div>
                                    </div>
                                )}
                            </>
                        }
                    </div>
                </div>
                <div className="flex-start" style={{ gap: '10px' }}>
                    <input type="checkbox" style={{ marginTop: '3px', cursor: 'pointer' }} value={fob} onChange={() => setFob(!fob)} />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Free on board</div>
                        <div className="heading2">As the seller I am happy to pay for transportation of the goods to the port of shipment, plus loading costs.</div>
                        {fob &&
                            <select className='coupon'>
                                <option value="">Choose your preferred port</option>
                            </select>
                        }
                    </div>
                </div>
                <div className="flex-start" style={{ gap: '10px' }}>
                    <input type="checkbox" style={{ marginTop: '3px', cursor: 'pointer' }} />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Cost, Insurance and Freight</div>
                        <div className="heading2">I will arrange for the carriage of goods by sea to a port of destination and provide the buyer with the documents necessary to obtain them from the carrier.</div>
                    </div>
                </div>
                <div className="flex-start" style={{ gap: '10px' }}>
                    <input type="checkbox" style={{ marginTop: '3px', cursor: 'pointer' }} />
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

                        <Link to='/seller-dashboard/seller-address' className="btn box flex" style={{ width: 'fit-content' }}>Add new address</Link>
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