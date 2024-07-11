let response;
if (editingIndex !== null) {
    const addressToUpdate = addresses.find(address => address.id === editingIndex);
    response = await dispatch(updateAddress({ id: addressToUpdate.id, formData }));
    if (formData.isDefaultChecked) {
        await dispatch(markDefaultAddress(addressToUpdate.id));
    }
    await dispatch(fetchAddresses());
    alert('Address updated successfully');
} else {
    response = await dispatch(addAddress(formData));
    const newAddress = response.payload;  // Retrieve the full address object
    console.log("New Address:", newAddress);  // Debugging line

    if (formData.isDefaultChecked) {
        if (newAddress && newAddress.id) {
            await dispatch(markDefaultAddress(newAddress.id));
        } else {
            console.error('Failed to retrieve new address ID');
        }
    }
    await dispatch(fetchAddresses());
    alert('Address saved successfully');
}