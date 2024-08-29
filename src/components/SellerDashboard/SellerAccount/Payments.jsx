import React, { useEffect, Fragment } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { fetchBankDetails, deleteBankDetails } from '../../../Redux/bankDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Payments = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bankDetails, loading, error } = useSelector((state) => state.bankDetails);


    useEffect(() => {
        dispatch(fetchBankDetails());
    }, [dispatch]);

    const payoneer = () => {
        window.location.href = 'https://payouts.payoneer.com/partners/lp.aspx?token=51ee143a52644084a6f3fafebda9f1162C7B1C1C8E';
    }
    const signinpayoneer = () => {
        window.location.href = 'https://login.payoneer.com/?sessionDataKey=2b2dddd0a8bd427899e3707f9a3ea01c----&state=7ef0827a-c050-4eb1-a7c5-6e8b5931d7d3&provider_id=internal&client_id=b9591619-44ae-46fa-82b4-72f4c39cc897&redirect_uri=https%3A%2F%2Fpayouts.brand.domain%2FWebApps%2FMethodRegistration%2FSwitch.aspx&scope=openid&response_type=code&mode=2&titleResourceParams=%7B%22%7B%7BpartnerAliasName%7D%7D%22%3A%22Tradeling+Account+AED%22%7D&pid=100218490';
    }
    const learn = () => {
        window.location.href = 'https://www1.payoneer.com/in/';
    }



    const addbank = () => {
        navigate('/seller-dashboard/add-a-bank-account');
    };

    const handleEditbank = (id) => {
        navigate(`/seller-dashboard/edit-bank-account/${id}`);
    };

    const handleDeletebank = (id) => {
        dispatch(deleteBankDetails(id)).then(() => {
            dispatch(fetchBankDetails());
        });
    };


    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Payment Details</title>
            </Helmet>
            <h1 className="heading flex">Payment Details</h1>

            <article className="productlist3">
                <div className="flexcol" style={{ gap: '20px' }}>
                    <h2 className="heading3 wh">Payoneer</h2>
                    <h3 className="heading2 wh">Make payments easy – link your payoneer account. <span className="hoverr" onClick={learn}>Learn more</span></h3>
                </div>
                <div className="flexcol" style={{ gap: '20px' }}>
                    <button onClick={payoneer} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Sign Up To Payoneer</div></button>
                    <div className="descrip">Already have an account? <span onClick={signinpayoneer} className='hoverr'>Sign in</span></div>
                </div>
            </article>

            <article className="productlist3">
                <div className="flexcol" style={{ gap: '20px' }}>
                    <h1 className="flex wh"><AccountBalanceIcon />&nbsp;&nbsp;<div className="heading3 wh">Add a bank account</div></h1>

                    <h2 className="heading2 wh">Providing this bank account information allows us to deposit payments into your account, including payouts from orders</h2>
                </div>
                <div className="flexcol" style={{ gap: '20px' }}>
                    <button className='btn box2 flex' onClick={addbank} style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Add New Account</div></button>
                </div>
            </article>

            <div className="productlist2">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (Array.isArray(bankDetails) ? (
                    <Fragment>
                        {bankDetails.map((bank, index) => (
                            <div className="productlist4" key={index}>
                                <div className="flexcol-start" style={{ gap: '10px' }}>
                                    <div className="flex" style={{ gap: '20px' }}>
                                        <div className="heading3">{bank.bankName}</div>
                                        {bank.defaultValue && <div className='warning-btn4' style={{ padding: '2px 10px'}}>Default</div>}
                                    </div>
                                    <div className="flex" style={{ gap: '10px' }}>
                                        <div className='descrip2'>Location: {bank.bankLocation}</div>
                                        <div className='descrip2'>IBAN: {bank.iban}</div>
                                        <div className='descrip2'>Name: {bank.accHolderName}</div>
                                    </div>
                                    <div className="flex" style={{ gap: '10px' }}>
                                        <div className='descrip2'>Account Number: {bank.accNo}</div>
                                        <div className='descrip2'>Swift/BIC: {bank.swiftbic}</div>
                                        <div className='descrip2'>IFSC code: {bank.ifsc}</div>
                                    </div>
                                </div>
                                {!bank.defaultValue && (
                                    <div className="flexcol" style={{ gap: '20px' }}>
                                        <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEditbank(bank.id)} />
                                        <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeletebank(bank.id)} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </Fragment>
                ) : (
                    <p className="heading3">Bank account list is empty</p>
                ))}
            </div>

        </div>
    )
}

export default Payments