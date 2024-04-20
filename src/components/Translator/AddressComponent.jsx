import React, { useEffect, useState } from 'react';

const AddressComponent = () => {
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

  return (
    <div className='home flexcol mt'>
      <div>
        <h2>Select a billing address:</h2>
        <select id="billingAddressSelect" value={selectedBillingAddress.address} onChange={handleAddressBillingChange} disabled>
          <option value=''>Select billing address</option>
          {billingAddresses.map((address, index) => (
            <option key={index} value={address.address}>
              {address.address}
            </option>
          ))}
        </select>
        {selectedBillingAddress && (
          <div>
            <h3>Selected Address:</h3>
            <p>{selectedBillingAddress.address}</p>
            <p>{selectedBillingAddress.selectedOrigin}</p>
          </div>
        )}
      </div>


      <div>
        <h2>Select a shipping address:</h2>
        <select value={selectedShippingAddress.address} onChange={handleAddressShippingChange}>
          <option value=''>Select shipping address</option>
          {shippingAddresses.map((address, index) => (
            <option key={index} value={address.address}>
              {address.address}
            </option>
          ))}
        </select>
        {selectedShippingAddress && (
          <div>
            <h3>Selected Address:</h3>
            <p>{selectedShippingAddress.address}</p>
            <p>{selectedShippingAddress.selectedOrigin}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressComponent;
