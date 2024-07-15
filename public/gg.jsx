import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBankDetailBuyer, getBankDetails, resetBankState } from './path/to/bankSlice';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

const BankDetailsComponent = () => {
    const dispatch = useDispatch();
    const { loading, success, error, bankDetails } = useSelector((state) => state.paymentMethods);

    const [showPopupBank, setShowPopupBank] = useState(false);
    const [editModeBank, setEditModeBank] = useState(false);
    const [editIndexBank, setEditIndexBank] = useState(null);
    const [bankName, setBankName] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [branchName, setBranchName] = useState('');
    const [swiftCode, setSwiftCode] = useState('');

    useEffect(() => {
        dispatch(getBankDetails());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            dispatch(resetBankState());
            setShowPopupBank(false);
        }
    }, [success, dispatch]);

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

    const handleSubmitBank = () => {
        const bankDetails = {
            bankName,
            accHolderName: accountHolderName,
            accNo: accountNumber,
            ifsc: ifscCode,
            bankLocation: branchName,
            swiftBIC: swiftCode,
            iban: 'N/A', 
            type: 'BANK',
        };
        dispatch(addBankDetailBuyer(bankDetails));
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

    const handleEditBank = (index) => {
        const bank = bankDetails[index];
        setEditIndexBank(index);
        setEditModeBank(true);
        setShowPopupBank(true);
        setBankName(bank.bankName);
        setAccountHolderName(bank.accHolderName);
        setAccountNumber(bank.accNo);
        setIfscCode(bank.ifsc);
        setBranchName(bank.bankLocation);
        setSwiftCode(bank.swiftBIC);
    };

    const handleDeleteBank = (index) => {
        // Implement delete functionality here
    };

    return (
        <div className='flexcol wh' style={{ gap: '20px' }}>
            <div className="productlist3">
                <div className="flexcol" style={{ gap: '20px' }}>
                    <div className="heading wh">Bank Details</div>
                    <div className="heading2 wh">Add your bank accounts here. You can select your account by which you want to pay on the checkout page.</div>
                </div>
                <div className="flexcol" style={{ gap: '20px' }}>
                    <button onClick={handleAddBank} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}>
                        <div className="heading2">Add New Account</div>
                    </button>
                </div>
            </div>
            <div className="productlist2">
                {bankDetails.length === 0 ? (
                    <div className="heading3">There are no bank accounts.</div>
                ) : (
                    <Fragment>
                        {bankDetails.map((bank, index) => (
                            <div className="productlist4" key={index}>
                                <div className="flexcol-start" style={{ gap: '20px' }}>
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <div className='descrip2' style={{ textTransform: 'uppercase', fontWeight: '600' }}>{bank.bankName}</div>
                                        <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.accHolderName}</div>
                                        <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.accNo}</div>
                                    </div>
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.ifsc}</div>
                                        <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.bankLocation}</div>
                                        <div className='descrip2' style={{ textTransform: 'uppercase' }}>{bank.swiftBIC}</div>
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
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default BankDetailsComponent;
