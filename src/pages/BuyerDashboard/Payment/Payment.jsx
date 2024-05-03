import React, { useState, Fragment } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from 'react-helmet-async';

const Payment = () => {

    const [subCurrentPage, setsubCurrentPage] = useState(1);
    const handleSubPageChange = (subPageNumber) => {
        setsubCurrentPage(subPageNumber);
    };


    //cards
    //popup form
    const [showPopupCard, setShowPopupCard] = useState(false);
    const [editModeCard, setEditModeCard] = useState(false);
    const [editIndexCard, setEditIndexCard] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    //cardnumber
    const handlecardnum = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        setCardNumber(value);
    }
    const [expiryDate, setExpiryDate] = useState('');
    //mmyy
    const handleslash = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        setExpiryDate(value);
    };
    const [fullName, setFullName] = useState('');
    const [cardList, setCardList] = useState(JSON.parse(localStorage.getItem('cards')) || []);

    const handleAddCard = () => {
        setShowPopupCard(true);
        setEditModeCard(false);
        setCardNumber('');
        setExpiryDate('');
        setFullName('');
    };
    const handleEditCard = (index) => {
        const cardToEdit = cardList[index];
        setEditIndexCard(index);
        setCardNumber(cardToEdit.cardNumber);
        setExpiryDate(cardToEdit.expiryDate);
        setFullName(cardToEdit.fullName);
        setShowPopupCard(true);
        setEditModeCard(true);
    };
    const handleCloseCard = () => {
        setShowPopupCard(false);
        setEditModeCard(false);
        setCardNumber('');
        setExpiryDate('');
        setFullName('');
    };
    const handleSubmitCard = () => {
        const newCard = { cardNumber, expiryDate, fullName };
        if (editModeCard) {
            const updatedCardList = [...cardList];
            updatedCardList[editIndexCard] = newCard;
            setCardList(updatedCardList);
            localStorage.setItem('cards', JSON.stringify(updatedCardList));
        } else {
            const updatedCardList = [...cardList, newCard];
            setCardList(updatedCardList);
            localStorage.setItem('cards', JSON.stringify(updatedCardList));
        }
        setShowPopupCard(false);
        setEditModeCard(false);
        setCardNumber('');
        setExpiryDate('');
        setFullName('');
    };
    const handleDeleteCard = (index) => {
        const updatedCardList = [...cardList];
        updatedCardList.splice(index, 1);
        setCardList(updatedCardList);
        localStorage.setItem('cards', JSON.stringify(updatedCardList));
    };


    



    //banks
    //popup form
    const [showPopupBank, setShowPopupBank] = useState(false);
    const [editModeBank, setEditModeBank] = useState(false);
    const [editIndexBank, setEditIndexBank] = useState(null);
    const [bankName, setBankName] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [branchName, setBranchName] = useState('');
    const [swiftCode, setSwiftCode] = useState('');
    const [bankList, setBankList] = useState(JSON.parse(localStorage.getItem('banks')) || []);

    const handleAddBank = () => {
        setShowPopupBank(true);
        setEditModeBank(false);
        setBankName('');
        setAccountHolderName('');
        setAccountNumber('');
        setIfscCode('');
        setBranchName('');
        setSwiftCode('');
    };
    const handleEditBank = (index) => {
        const bankToEdit = bankList[index];
        setEditIndexBank(index);
        setBankName(bankToEdit.bankName);
        setAccountHolderName(bankToEdit.accountHolderName);
        setAccountNumber(bankToEdit.accountNumber);
        setIfscCode(bankToEdit.ifscCode);
        setBranchName(bankToEdit.branchName);
        setSwiftCode(bankToEdit.swiftCode);
        setShowPopupBank(true);
        setEditModeBank(true);
    };
    const handleCloseBank = () => {
        setShowPopupBank(false);
        setEditModeBank(false);
        setBankName('');
        setAccountHolderName('');
        setAccountNumber('');
        setIfscCode('');
        setBranchName('');
        setSwiftCode('');
    };
    const handleSubmitBank = () => {
        const newBank = { bankName, accountHolderName, accountNumber, ifscCode, branchName, swiftCode };
        if (editModeBank) {
            const updatedBankList = [...bankList];
            updatedBankList[editIndexBank] = newBank;
            setBankList(updatedBankList);
            localStorage.setItem('banks', JSON.stringify(updatedBankList));
        } else {
            const updatedBankList = [...bankList, newBank];
            setBankList(updatedBankList);
            localStorage.setItem('banks', JSON.stringify(updatedBankList));
        }
        setShowPopupBank(false);
        setEditModeBank(false);
        setBankName('');
        setAccountHolderName('');
        setAccountNumber('');
        setIfscCode('');
        setBranchName('');
        setSwiftCode('');
    };
    const handleDeleteBank = (index) => {
        const updatedBankList = [...bankList];
        updatedBankList.splice(index, 1);
        setBankList(updatedBankList);
        localStorage.setItem('banks', JSON.stringify(updatedBankList));
    };



    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>Payment Management</title>
            </Helmet>
            <div className="flex wh">
                <div className="heading2 wh captext">My Account / Payment Management</div>
            </div>
            <div className="flex wh">
                <div className="heading wh">Payment Management</div>
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
                            <div className="heading wh">My Cards</div>
                            <div className="heading2 wh">Add your cards here. You can select your card by which you want to pay on the checkout page.</div>
                        </div>
                        <div className="flexcol" style={{ gap: '20px' }}>
                            <button onClick={handleAddCard} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Add New Card</div></button>
                        </div>
                    </div>
                    <div className="productlist2">
                        {cardList.length === 0 ? (
                            <div className="heading3">You have no cards.</div>
                        ) : (
                            <Fragment>
                                {cardList.map((card, index) => (
                                    <div className="productlist4" key={index}>
                                        <div className="flexcol-start" style={{ gap: '20px' }}>
                                            <div className="flex" style={{ gap: '10px' }}>
                                                <div className='descrip2'>{card.cardNumber}</div>
                                                <div className='descrip2'>{card.expiryDate}</div>
                                                <div className='descrip2'>{card.fullName}</div>
                                            </div>
                                        </div>
                                        <div className="flexcol" style={{ gap: '20px' }}>
                                            <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEditCard(index)} />
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteCard(index)} />
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        )}
                    </div>
                    {showPopupCard && (
                        <div className='popup-parent'>
                            <form className='popup-child'>
                                <div className="popupform">
                                    <div className="heading wh">Add New Card</div>
                                    <div className="heading2">Enter card number</div>
                                    <input type="text" placeholder='0000 0000 0000 0000' className="box flex" maxLength={16} value={cardNumber} onChange={handlecardnum} />
                                    <div className="heading2">Enter expiry date</div>
                                    <input type="text" placeholder="MM/YY" className="box flex" maxLength={5} value={expiryDate} onChange={handleslash} />
                                    <div className="heading2">Enter full name (same as on the card)</div>
                                    <input type="text" placeholder='Enter full name' className="box flex" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" onClick={handleSubmitCard}><div className="heading2">Save</div></button>
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
                            <div className="heading wh">Bank Details</div>
                            <div className="heading2 wh">Add your bank accounts here. You can select your account by which you want to pay on the checkout page.</div>
                        </div>
                        <div className="flexcol" style={{ gap: '20px' }}>
                            <button onClick={handleAddBank} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Add New Account</div></button>
                        </div>
                    </div>
                    <div className="productlist2">
                        {cardList.length === 0 ? (
                            <div className="heading3">There are no bank accounts.</div>
                        ) : (
                            <Fragment>
                                {bankList.map((bank, index) => (
                                    <div className="productlist4" key={index}>
                                        <div className="flexcol-start" style={{ gap: '20px' }}>
                                            <div className="flex" style={{ gap: '10px' }}>
                                                <div className='descrip2'>{bank.bankName}</div>
                                                <div className='descrip2'>{bank.accountHolderName}</div>
                                                <div className='descrip2'>{bank.accountNumber}</div>
                                            </div>
                                            <div className="flex" style={{ gap: '10px' }}>
                                                <div className='descrip2'>{bank.ifscCode}</div>
                                                <div className='descrip2'>{bank.branchName}</div>
                                                <div className='descrip2'>{bank.swiftCode}</div>
                                            </div>
                                        </div>
                                        <div className="flexcol" style={{ gap: '20px' }}>
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
                            <form className='popup-child'>
                                <div className="popupform">
                                    <div className="heading wh">Add New Bank Account</div>
                                    <input type="text" placeholder='Enter bank name' className="box flex" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                                    <input type="text" placeholder='Enter account holder name' className="box flex" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
                                    <input type="text" placeholder='Enter account number' className="box flex" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />

                                    <input type="text" placeholder='Enter IFSC code' className="box flex" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                                    <input type="text" placeholder='Enter branch name' className="box flex" value={branchName} onChange={(e) => setBranchName(e.target.value)} />
                                    <input type="text" placeholder='Enter swift code' className="box flex" value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} />
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" onClick={handleSubmitBank}><div className="heading2">Save</div></button>
                                        <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" onClick={handleCloseBank}><div className="heading2">Cancel</div></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {subCurrentPage === 3 && (
                <div className="productlist2">
                    <div className="heading">Download imagebla lbaate</div>
                    <div className="descrip2">Click download button to download images upload template</div>
                    <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Download Images</div></button>
                    <div className="heading">Upload image templates</div>
                    <div className="descrip2">When you have your templates filled out, click the button below to upload the products.</div>
                    <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                        <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Upload</div></button>
                        <div className="flex" style={{ gap: '20px' }}>
                            <button className='btn box2 flex' style={{ width: 'fit-content' }}><div className="heading2">Reset</div></button>
                            <button className='btn box2 flex' style={{ width: 'fit-content' }}><div className="heading2">Save</div></button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Payment