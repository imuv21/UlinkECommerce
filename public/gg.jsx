const handleDoc = async (event) => {
  event.preventDefault();
  const newErrors = {};

  if (!selectedFile) newErrors.selectedFile = 'Business registration document is required.';
  if (!selectedDate) newErrors.selectedDate = 'Expiry date is required.';
  if (!regDocNumber.trim()) newErrors.regDocNumber = 'Registration document number is required.';
  if (!selectedFileTwo) newErrors.selectedFileTwo = 'Identity document is required.';
  if (!selectedDateTwo) newErrors.selectedDateTwo = 'Expiry date is required.';
  if (!idDocNumber.trim()) newErrors.idDocNumber = 'Identity document number is required.';
  setDocErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    const formDataTradeLicense = new FormData();
    formDataTradeLicense.append('file', selectedFile);
    const tradeLicenseData = {
      documentNumber: regDocNumber,
      isBusinessOwner,
      expiryDate: selectedDate,
      documentType: 'TRADE_LICENSE'
    };

    const formDataIdentityDoc = new FormData();
    formDataIdentityDoc.append('file', selectedFileTwo);
    if (selectedFileThree) {
      formDataIdentityDoc.append('file', selectedFileThree);
    }
    const identityDocData = {
      documentNumber: idDocNumber,
      isBusinessOwner,
      expiryDate: selectedDateTwo,
      documentType: 'IDENTITY_DOCUMENT'
    };

    try {
      await dispatch(uploadDocument({ file: formDataTradeLicense, docType: 'TRADE_LICENSE' }));
      await dispatch(uploadDocument({ file: formDataIdentityDoc, docType: 'IDENTITY_DOCUMENT' }));
      await dispatch(updateSellerDocData({ documentType: 'TRADE_LICENSE', documentData: tradeLicenseData }));
      await dispatch(updateSellerDocData({ documentType: 'IDENTITY_DOCUMENT', documentData: identityDocData }));

      alert("Form submitted successfully!");
      setIsEditingDoc(false);
      setDocErrors({});
    } catch (error) {
      alert("Form submission failed. Please try again.");
    }
  } else {
    alert("Form submission failed. Please fix the errors.");
  }
};
