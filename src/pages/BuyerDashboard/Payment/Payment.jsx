import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBankDetailBuyer, fetchPaymentDetails, deletePaymentMethod, editBankDetailBuyer } from '../../../Redux/paymentMethods';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from 'react-helmet-async';
import { v4 as uuidv4 } from 'uuid';

const Payment = () => {

    const [showPopupBank, setShowPopupBank] = useState(false);
    const [editModeBank, setEditModeBank] = useState(false);
    const [editIndexBank, setEditIndexBank] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bankName, setBankName] = useState('');
    const [accHolderName, setAccHolderName] = useState('');
    const [accNo, setAccNo] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [bankLocation, setBankLocation] = useState('');
    const [swiftBIC, setSwiftBIC] = useState('');
    const [iban, setIban] = useState('');

    const [showPopupUpi, setShowPopupUpi] = useState(false);
    const [editModeUpi, setEditModeUpi] = useState(false);
    const [editIndexUpi, setEditIndexUpi] = useState(null);
    const [isSubmittingUpi, setIsSubmittingUpi] = useState(false);
    const [upi, setUpi] = useState('');

    const [showPopupCard, setShowPopupCard] = useState(false);
    const [editModeCard, setEditModeCard] = useState(false);
    const [editIndexCard, setEditIndexCard] = useState(null);
    const [isSubmittingCard, setIsSubmittingCard] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [fullname, setFullname] = useState('');

    const dispatch = useDispatch();
    const { bankDetails, upiDetails, cardDetails, loading, error } = useSelector((state) => state.paymentMethods);

    useEffect(() => {
        dispatch(fetchPaymentDetails());
    }, [dispatch]);


    //banks popup form
    const handleAddBank = () => {
        setBankName('');
        setAccHolderName('');
        setAccNo('');
        setIfsc('');
        setBankLocation('');
        setSwiftBIC('');
        setIban('');
        setEditModeBank(false);
        setEditIndexBank(null);
        setShowPopupBank(true);
    };
    const handleSubmitBank = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        const newBankDetails = {
            bankName,
            accHolderName,
            accNo,
            ifsc,
            bankLocation,
            swiftBIC,
            iban
        };

        try {
            if (editModeBank) {
                await dispatch(editBankDetailBuyer({ details: { ...newBankDetails, id: bankDetails[editIndexBank].id }, type: 'BANK' })).unwrap();
                alert('Bank details updated successfully!');
            } else {
                await dispatch(addBankDetailBuyer({ details: newBankDetails, type: 'BANK' })).unwrap();
                alert('Bank details added successfully!');
            }
            dispatch(fetchPaymentDetails());
        } catch (err) {
            alert((editModeBank ? 'Failed to update' : 'Failed to add') + ' Bank details: ' + (err.message || 'Unknown error'));
        } finally {
            setIsSubmitting(false);
            handleCloseBank();
        }
    };
    const handleCloseBank = () => {
        setShowPopupBank(false);
        setEditModeBank(false);
        setEditIndexBank(null);
        setBankName('');
        setAccHolderName('');
        setAccNo('');
        setIfsc('');
        setBankLocation('');
        setSwiftBIC('');
        setIban('');
    };
    const handleEditBank = (index) => {
        const bank = bankDetails[index];
        setBankName(bank.bankName);
        setAccHolderName(bank.accHolderName);
        setAccNo(bank.accNo);
        setIfsc(bank.ifsc);
        setBankLocation(bank.bankLocation);
        setSwiftBIC(bank.swiftBIC);
        setIban(bank.iban);
        setEditModeBank(true);
        setEditIndexBank(index);
        setShowPopupBank(true);
    };
    const handleDeleteBank = async (index) => {
        const bankId = bankDetails[index].id;
        await dispatch(deletePaymentMethod(bankId));
        dispatch(fetchPaymentDetails());
    };


    //upis popup form
    const handleAddUpi = () => {
        setUpi('');
        setEditModeUpi(false);
        setEditIndexUpi(null);
        setShowPopupUpi(true);
    };
    const handleSubmitUpi = async (e) => {
        e.preventDefault();
        if (isSubmittingUpi) return;
        setIsSubmittingUpi(true);
        const newUpiDetails = { upi };

        try {
            if (editModeUpi) {
                await dispatch(editBankDetailBuyer({ details: { ...newUpiDetails, id: upiDetails[editIndexUpi].id }, type: 'UPI' })).unwrap();
                alert('UPI details updated successfully!');
            } else {
                await dispatch(addBankDetailBuyer({ details: newUpiDetails, type: 'UPI' })).unwrap();
                alert('UPI details added successfully!');
            }
            dispatch(fetchPaymentDetails());
        } catch (err) {
            alert((editModeUpi ? 'Failed to update' : 'Failed to add') + ' UPI details: ' + (err.message || 'Unknown error'));
        } finally {
            setIsSubmittingUpi(false);
            handleCloseUpi();
        }
    };
    const handleCloseUpi = () => {
        setShowPopupUpi(false);
        setEditModeUpi(false);
        setEditIndexUpi(null);
        setUpi('');
    };
    const handleEditUpi = (index) => {
        const upis = upiDetails[index];
        setUpi(upis.upi);
        setEditModeUpi(true);
        setEditIndexUpi(index);
        setShowPopupUpi(true);
    };
    const handleDeleteUpi = async (index) => {
        const upiId = upiDetails[index].id;
        await dispatch(deletePaymentMethod(upiId));
        dispatch(fetchPaymentDetails());
    };


    // cards popup form
    // cardnumber
    const handlecardnum = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        setCardNumber(value);
    }
    // format card number
    const formatCardNumber = (text) => {
        return text.replace(/(.{4})/g, '$1 ');
    };
    // mmyy
    const handleslash = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        setExpiryDate(value);
    };
    const handleAddCard = () => {
        setCardNumber('');
        setExpiryDate('');
        setFullname('');
        setEditModeCard(false);
        setEditIndexCard(null);
        setShowPopupCard(true);
    };
    const handleSubmitCard = async (e) => {
        e.preventDefault();
        if (isSubmittingCard) return;
        setIsSubmittingCard(true);

        const newCardDetails = {
            cardNumber,
            expiryDate,
            fullname
        };

        try {
            if (editModeCard) {
                await dispatch(editBankDetailBuyer({ details: { ...newCardDetails, id: cardDetails[editIndexCard].id }, type: 'CARD' })).unwrap();
                alert('Card details updated successfully!');
            } else {
                await dispatch(addBankDetailBuyer({ details: newCardDetails, type: 'CARD' })).unwrap();
                alert('Card details added successfully!');
            }
            dispatch(fetchPaymentDetails());
        } catch (err) {
            alert((editModeCard ? 'Failed to update' : 'Failed to add') + ' Card details: ' + (err.message || 'Unknown error'));

        } finally {
            setIsSubmittingCard(false);
            handleCloseCard();
        }
    };
    const handleCloseCard = () => {
        setShowPopupCard(false);
        setEditModeCard(false);
        setEditIndexCard(null);
        setCardNumber('');
        setExpiryDate('');
        setFullname('');
    };
    const handleEditCard = (index) => {
        const card = cardDetails[index];
        setCardNumber(card.cardNumber);
        setExpiryDate(card.expiryDate);
        setFullname(card.fullname);
        setEditModeCard(true);
        setEditIndexCard(index);
        setShowPopupCard(true);
    };
    const handleDeleteCard = async (index) => {
        const cardId = cardDetails[index].id;
        await dispatch(deletePaymentMethod(cardId));
        dispatch(fetchPaymentDetails());
    };


    // page
    const [subCurrentPage, setsubCurrentPage] = useState(1);
    const handleSubPageChange = (subPageNumber) => {
        setsubCurrentPage(subPageNumber);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>Payment Management | Ulinkit - Manage Your Payment Methods</title>
                <meta name="description" content="Manage your payment methods on Ulinkit. View payment history, add new payment methods, update billing information, and ensure your transactions are secure." />
                <link rel="canonical" href="https://www.ulinkit.com/payment" />
            </Helmet>
            <div className="flex wh">
                <h1 className="heading2 wh captext">My Account / Payment Management</h1>
            </div>
            <div className="flex wh">
                <h1 className="heading wh">Payment Management</h1>
            </div>

            <div className="flex wh" style={{ gap: '20px', justifyContent: 'start' }}>
                <button onClick={() => handleSubPageChange(1)} className={subCurrentPage === 1 ? 'toggle-active btn-toggle box2 flex' : 'btn-toggle box2 flex'}><div className="heading2">Cards</div></button>
                <button onClick={() => handleSubPageChange(2)} className={subCurrentPage === 2 ? 'toggle-active btn-toggle box2 flex' : 'btn-toggle box2 flex'}><div className="heading2">Back accounts</div></button>
                <button onClick={() => handleSubPageChange(3)} className={subCurrentPage === 3 ? 'toggle-active btn-toggle box2 flex' : 'btn-toggle box2 flex'}><div className="heading2">UPIs</div></button>
            </div>

            {subCurrentPage === 1 && (
                <div className='flexcol wh' style={{ gap: '20px' }}>
                    <div className="productlist3">
                        <div className="flexcol" style={{ gap: '20px' }}>
                            <div className="heading wh">My Cards ({cardDetails.length})</div>
                            <p className="heading2 wh">Add your cards here. You can select your card by which you want to pay on the checkout page.</p>
                        </div>
                        <div className="flexcol" style={{ gap: '20px' }}>
                            <button onClick={handleAddCard} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Add New Card</div></button>
                        </div>
                    </div>
                    <div className="productlist2">
                        {cardDetails.length === 0 ? (
                            <div className="heading3">You have no cards.</div>
                        ) : (
                            <div className='card-grid'>
                                {cardDetails.map((card, index) => (
                                    <div className="card-grid-item" key={uuidv4()}>
                                        <div className="card">
                                            <div className="card-number">{formatCardNumber(card.cardNumber)}</div>
                                            <div className="card-holder">
                                                <span>Card Holder</span>
                                                <span>{card.fullname}</span>
                                            </div>
                                            <div className="expiry-date">
                                                <span>Expiry</span>
                                                <div className="flex" style={{ gap: '5px' }}>
                                                    <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEditCard(index)} />
                                                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteCard(index)} />
                                                </div>
                                                <span>{card.expiryDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {showPopupCard && (
                        <div className='popup-parent'>
                            <form className='popup-child' onSubmit={handleSubmitCard}>
                                <div className="popupform">
                                    <div className="heading wh">Add New Card</div>
                                    <div className="heading2">Enter card number</div>
                                    <input type="text" placeholder='0000 0000 0000 0000' className="box flex" maxLength={16} value={cardNumber} onChange={handlecardnum} />
                                    <div className="heading2">Enter expiry date</div>
                                    <input type="text" placeholder="MM/YY" className="box flex" maxLength={5} value={expiryDate} onChange={handleslash} />
                                    <div className="heading2">Enter full name (same as on the card)</div>
                                    <input type="text" placeholder='Enter full name' className="box flex" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }} type="submit" disabled={isSubmittingCard}><div className="heading2">{isSubmittingCard ? 'Submitting...' : 'Submit'}</div></button>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" onClick={handleCloseCard}><div className="heading2">Cancel</div></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {subCurrentPage === 2 && (
                <div className='flexcol wh' style={{ gap: '20px' }}>
                    <div className="productlist3">
                        <div className="flexcol" style={{ gap: '20px' }}>
                            <div className="heading wh">Bank Details ({bankDetails.length})</div>
                            <p className="heading2 wh">Add your bank accounts here. You can select your account by which you want to pay on the checkout page.</p>
                        </div>
                        <div className="flexcol" style={{ gap: '20px' }}>
                            <button onClick={handleAddBank} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Add New Account</div></button>
                        </div>
                    </div>
                    <div className="productlist2">
                        {bankDetails.length === 0 ? (
                            <div className="heading3">There are no bank accounts.</div>
                        ) : (
                            <Fragment>
                                {bankDetails.map((bank, index) => (
                                    <div className="productlist4" key={uuidv4()}>
                                        <div className="flexcol-start" style={{ gap: '10px' }}>
                                            <div className="flex" style={{ gap: '10px' }}>
                                                <div className='descrip2' style={{ textTransform: 'uppercase', fontWeight: '600' }}>{bank.bankName}</div>
                                                <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.accHolderName}</div>
                                                <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.accNo}</div>
                                            </div>
                                            <div className="flex" style={{ gap: '10px' }}>
                                                <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.ifsc}</div>
                                                <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.bankLocation}</div>
                                                <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.swiftBIC}</div>
                                                <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.iban}</div>
                                            </div>
                                        </div>
                                        <div className="flexcol" style={{ gap: '10px' }}>
                                            <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEditBank(index)} />
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteBank(index)} />
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        )}
                    </div>
                    {showPopupBank && (
                        <div className='popup-parent'>
                            <form className='popup-child' onSubmit={handleSubmitBank}>
                                <div className="popupform">
                                    <div className="heading wh">Add New Bank Account</div>
                                    <input type="text" placeholder='Enter bank name' className="box flex" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                                    <input type="text" placeholder='Enter account holder name' className="box flex" value={accHolderName} onChange={(e) => setAccHolderName(e.target.value)} />
                                    <input type="text" placeholder='Enter account number' className="box flex" value={accNo} onChange={(e) => setAccNo(e.target.value)} />

                                    <input type="text" placeholder='Enter IFSC code' className="box flex" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
                                    <input type="text" placeholder='Enter branch name' className="box flex" value={bankLocation} onChange={(e) => setBankLocation(e.target.value)} />
                                    <input type="text" placeholder='Enter swift code' className="box flex" value={swiftBIC} onChange={(e) => setSwiftBIC(e.target.value)} />
                                    <input type="text" placeholder='Enter IBAN code' className="box flex" value={iban} onChange={(e) => setIban(e.target.value)} />
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }} type="submit" disabled={isSubmitting}><div className="heading2">{isSubmitting ? 'Submitting...' : 'Submit'}</div></button>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" onClick={handleCloseBank}><div className="heading2">Cancel</div></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {subCurrentPage === 3 && (
                <div className='flexcol wh' style={{ gap: '20px' }}>
                    <div className="productlist3">
                        <div className="flexcol" style={{ gap: '20px' }}>
                            <div className="heading wh">UPIs ({upiDetails.length})</div>
                            <p className="heading2 wh">Add your UPIs here. You can select your upi by which you want to pay on the checkout page.</p>
                        </div>
                        <div className="flexcol" style={{ gap: '20px' }}>
                            <button onClick={handleAddUpi} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Add New UPI</div></button>
                        </div>
                    </div>
                    <div className="productlist2">
                        {upiDetails.length === 0 ? (
                            <div className="heading3">There are no UPIs.</div>
                        ) : (
                            <Fragment>
                                {upiDetails.map((upis, index) => (
                                    <div className="productlist4" key={uuidv4()}>
                                        <div className="flex wh" style={{ gap: '20px', justifyContent: 'space-between' }}>
                                            <div className='descrip2' style={{ textTransform: 'uppercase', fontWeight: '600' }}>{upis.upi}</div>
                                            <div className="flex" style={{ gap: '20px' }}>
                                                <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEditUpi(index)} />
                                                <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteUpi(index)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        )}
                    </div>
                    {showPopupUpi && (
                        <div className='popup-parent'>
                            <form className='popup-child' onSubmit={handleSubmitUpi}>
                                <div className="popupform">
                                    <div className="heading wh">Add New UPI</div>

                                    <input type="text" placeholder='Enter a upi' className="box flex" value={upi} onChange={(e) => setUpi(e.target.value)} />

                                    <div className="flex" style={{ gap: '20px' }}>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }} type="submit" disabled={isSubmittingUpi}><div className="heading2">{isSubmittingUpi ? 'Submitting...' : 'Submit'}</div></button>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" onClick={handleCloseUpi}><div className="heading2">Cancel</div></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Payment