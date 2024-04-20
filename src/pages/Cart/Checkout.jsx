import React, { useState, useEffect, useRef } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SailingIcon from '@mui/icons-material/Sailing';
import PaymentIcon from '@mui/icons-material/Payment';

const Checkout = () => {

  const [addresses, setAddresses] = useState([]);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState({});
  const [selectedShippingAddress, setSelectedShippingAddress] = useState({});

  const retrieveAddresses = () => {
    const storedAddresses = localStorage.getItem('addresses');
    if (storedAddresses) {
      const parsedAddresses = JSON.parse(storedAddresses);
      setAddresses(parsedAddresses);
      const billing = parsedAddresses.filter(address => address.isBillingChecked);
      const shipping = parsedAddresses.filter(address => address.isLocationChecked);
      setBillingAddresses(billing);
      setShippingAddresses(shipping);
    }
  };

  useEffect(() => {
    retrieveAddresses();
  }, []);

  const handleAddressBillingChange = (event) => {
    const selectedAddressData = billingAddresses.find(
      (address) => address.address === event.target.value
    );
    setSelectedBillingAddress(selectedAddressData);
  };

  const handleAddressShippingChange = (event) => {
    const selectedAddressData = shippingAddresses.find(
      (address) => address.address === event.target.value
    );
    setSelectedShippingAddress(selectedAddressData);
    if (selectedAddressData.isBillingChecked && selectedAddressData.isLocationChecked) {
      setSelectedBillingAddress({});
      document.getElementById('billingAddressSelect').disabled = true;
    } else {
      document.getElementById('billingAddressSelect').disabled = false;
    }
  };

  useEffect(() => {
    if (selectedShippingAddress.isBillingChecked && selectedShippingAddress.isLocationChecked) {
      setSelectedBillingAddress({});
      document.getElementById('billingAddressSelect').disabled = true;
    }
  }, [selectedShippingAddress]);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  }, []);

  return (
    <div className="flexcol wh cart_page">
      <div className="flex wh">
        <div className="heading wh">Checkout</div>
      </div>
      <div className="cart_cont wh">
        <div className="cartcol_one" tabIndex={0} ref={scrollRef}>
          <div className="checkout">
            <div className="heading wh">Your addresses</div>
            <div className="heading3 wh">Shipping address</div>
            <select className='coupon' value={selectedShippingAddress.address} onChange={handleAddressShippingChange}>
              <option value=''>Select shipping address</option>
              {shippingAddresses.map((address, index) => (
                <option key={index} value={address.address}>
                  {address.address}
                </option>
              ))}
            </select>
            {selectedShippingAddress.address && (
              <div className="flexcol-start wh" style={{ gap: '2px' }}>
                <div className="flex" style={{ gap: '20px' }}>
                  <div className="heading3">{selectedShippingAddress.address}</div>
                  {selectedShippingAddress.isLocationChecked && selectedShippingAddress.isBillingChecked && <div className='descrip warning-btn'>Shipping</div>}
                  {selectedShippingAddress.isLocationChecked && selectedShippingAddress.isBillingChecked && <div className='descrip warning-btn2'>Billing</div>}
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                  <div className='descrip2'>{selectedShippingAddress.selectedOrigin}</div>
                  <div className='descrip2'>{selectedShippingAddress.city}</div>
                  <div className='descrip2'>{selectedShippingAddress.area}</div>
                  <div className='descrip2'>{selectedShippingAddress.street}</div>
                  <div className='descrip2'>{selectedShippingAddress.office}</div>
                  <div className='descrip2'>Pobox: {selectedShippingAddress.pobox}</div>
                  <div className='descrip2'>Post code: {selectedShippingAddress.postCode}</div>
                </div>
                <div className="flex" style={{ gap: '20px' }}>
                  <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedShippingAddress.phoneNumber}</div>
                  <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedShippingAddress.airport}</div>
                  <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedShippingAddress.seaport}</div>
                </div>
              </div>
            )}
            <div className="heading3 wh">Billing address</div>
            <select className='coupon' id="billingAddressSelect" value={selectedBillingAddress.address} onChange={handleAddressBillingChange} disabled>
              <option value=''>Select billing address</option>
              {billingAddresses.map((address, index) => (
                <option key={index} value={address.address}>
                  {address.address}
                </option>
              ))}
            </select>
            {selectedBillingAddress.address && (
              <div className="flexcol-start wh" style={{ gap: '2px' }}>
                <div className="flex" style={{ gap: '20px' }}>
                  <div className="heading3">{selectedBillingAddress.address}</div>
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                  <div className='descrip2'>{selectedBillingAddress.selectedOrigin}</div>
                  <div className='descrip2'>{selectedBillingAddress.city}</div>
                  <div className='descrip2'>{selectedBillingAddress.area}</div>
                  <div className='descrip2'>{selectedBillingAddress.street}</div>
                  <div className='descrip2'>{selectedBillingAddress.office}</div>
                  <div className='descrip2'>Pobox: {selectedBillingAddress.pobox}</div>
                  <div className='descrip2'>Post code: {selectedBillingAddress.postCode}</div>
                </div>
                <div className="flex" style={{ gap: '20px' }}>
                  <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.phoneNumber}</div>
                  <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.airport}</div>
                  <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.seaport}</div>
                </div>
              </div>
            )}
          </div>

          <div className="checkout">
            <div className="heading wh">Choose a payment method</div>
            <div className="flex-start wh" style={{gap: '20px'}}>
              <button className='payment-btn'>Card</button> <button className='payment-btn'>Net banking</button>
              <button className='payment-btn'>UPI</button> <button className='payment-btn'>Cash on delivery</button>
            </div>
          </div>
        </div>
        <div className="cartcol_two">
          <div className="sel-box" style={{ gap: '10px' }}>
            <div className="flex wh bbottom" style={{ padding: '10px 0px' }}>
              <div className="heading3">Order Summary</div>
            </div>
            <div className="flex wh" style={{ padding: '10px 0px', gap: '10px' }}>
              <input type="text" placeholder='Enter coupon code' className='coupon' /> <button className='btn couponbtn flex'>Apply</button>
            </div>
            <div className="flexcol wh" style={{ gap: '10px' }}>
              <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading2">Subtotal</div>
                <div className="heading2">AED 7,704.60</div>
              </div>
              <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading2">Shipping</div>
                <div className="heading2">FREE</div>
              </div>
              <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading2">VAT</div>
                <div className="heading2">AED 370.08</div>
              </div>
            </div>
            <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
              <div className="heading2"><span>Order total</span></div>
              <div className="heading2"><span>AED 6,361.08</span></div>
            </div>
            <div className="flexcol wh topbottom" style={{ gap: '10px' }}>
              <button className='btn addtocart flex'><PaymentIcon style={{ width: '15px' }} /><div className="heading2">Make payment</div></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout