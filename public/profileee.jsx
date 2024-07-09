// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAddresses, setSelectedAddress } from './actions'; // Import your actions

// const AddressComponent = () => {

//     const dispatch = useDispatch();
//     const addresses = useSelector(state => state.address.addresses);
//     const selectedAddress = useSelector(state => state.selectedAddress.address);
//     const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
//     const shippingAddresses = addresses.filter(address => address.isLocationChecked);
//     const selectedShippingAddress = selectedAddress && selectedAddress.isLocationChecked ? selectedAddress : shippingAddresses.find(addr => addr.isDefaultChecked) || shippingAddresses[0];

//     useEffect(() => {
//         dispatch(fetchAddresses());
//     }, [dispatch]);

//     useEffect(() => {
//         if (addresses.length > 0 && !selectedAddress) {
//             const defaultAddress = addresses.find(addr => addr.isDefaultChecked);
//             dispatch(setSelectedAddress(defaultAddress || addresses[0]));
//         }
//     }, [addresses, selectedAddress, dispatch]);

//     useEffect(() => {
//         if (selectedShippingAddress && !(selectedShippingAddress.isBillingChecked && selectedShippingAddress.isLocationChecked)) {
//             setSelectedBillingAddress(null);
//         }
//     }, [selectedShippingAddress]);

//     const handleAddressChange = (address) => {
//         dispatch(setSelectedAddress(address));
//     };

//     const handleAddressShippingChange = (event) => {
//         const address = shippingAddresses.find(addr => addr.address === event.target.value);
//         handleAddressChange(address);
//     };

//     const handleAddressBillingChange = (event) => {
//         const address = addresses.find(addr => addr.address === event.target.value);
//         setSelectedBillingAddress(address);
//     };

//     return (
//         <div>
//             <div className="heading3 wh">Shipping address</div>
//             <select className='coupon' value={selectedShippingAddress?.address || ''} onChange={handleAddressShippingChange} disabled={selectedShippingAddress && selectedBillingAddress}>
//                 <option value=''>Select shipping address</option>
//                 {shippingAddresses.map((address, index) => (
//                     <option key={index} value={address.address}>
//                         {address.address}
//                     </option>
//                 ))}
//             </select>
//             {selectedShippingAddress && (
//                 <div className="flexcol-start wh" style={{ gap: '2px' }}>
//                     <div className="flex" style={{ gap: '20px' }}>
//                         <div className="heading3">{selectedShippingAddress.address}</div>
//                         {selectedShippingAddress.isLocationChecked && <div className='descrip warning-btn'>Shipping</div>}
//                         {selectedShippingAddress.isBillingChecked && <div className='descrip warning-btn2'>Billing</div>}
//                     </div>
//                     <div className="flex" style={{ gap: '10px' }}>
//                         <div className='descrip2'>{selectedShippingAddress.selectedOrigin}</div>
//                         <div className='descrip2'>{selectedShippingAddress.city}</div>
//                         <div className='descrip2'>{selectedShippingAddress.area}</div>
//                         <div className='descrip2'>{selectedShippingAddress.street}</div>
//                         <div className='descrip2'>{selectedShippingAddress.office}</div>
//                         <div className='descrip2'>Pobox: {selectedShippingAddress.pobox}</div>
//                         <div className='descrip2'>Post code: {selectedShippingAddress.postCode}</div>
//                     </div>
//                     <div className="flex" style={{ gap: '20px' }}>
//                         <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedShippingAddress.phoneNumber}</div>
//                         <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedShippingAddress.airport}</div>
//                         <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedShippingAddress.seaport}</div>
//                     </div>
//                 </div>
//             )}

//             {selectedShippingAddress?.isBillingChecked && selectedShippingAddress.isLocationChecked && (
//                 <>
//                     <div className="heading3 wh">Billing address</div>
//                     <select className='coupon' id="billingAddressSelect" value={selectedBillingAddress?.address || ''} onChange={handleAddressBillingChange} disabled={!selectedShippingAddress || selectedBillingAddress}>
//                         <option value=''>Select billing address</option>
//                         {addresses.filter(address => address.isBillingChecked).map((address, index) => (
//                             <option key={index} value={address.address}>
//                                 {address.address}
//                             </option>
//                         ))}
//                     </select>
//                 </>
//             )}

//             {selectedBillingAddress && (
//                 <div className="flexcol-start wh" style={{ gap: '2px' }}>
//                     <div className="flex" style={{ gap: '20px' }}>
//                         <div className="heading3">{selectedBillingAddress.address}</div>
//                         {selectedBillingAddress.isBillingChecked && <div className='descrip warning-btn2'>Billing</div>}
//                     </div>
//                     <div className="flex" style={{ gap: '10px' }}>
//                         <div className='descrip2'>{selectedBillingAddress.selectedOrigin}</div>
//                         <div className='descrip2'>{selectedBillingAddress.city}</div>
//                         <div className='descrip2'>{selectedBillingAddress.area}</div>
//                         <div className='descrip2'>{selectedBillingAddress.street}</div>
//                         <div className='descrip2'>{selectedBillingAddress.office}</div>
//                         <div className='descrip2'>Pobox: {selectedBillingAddress.pobox}</div>
//                         <div className='descrip2'>Post code: {selectedBillingAddress.postCode}</div>
//                     </div>
//                     <div className="flex" style={{ gap: '20px' }}>
//                         <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.phoneNumber}</div>
//                         <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.airport}</div>
//                         <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.seaport}</div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddressComponent;
