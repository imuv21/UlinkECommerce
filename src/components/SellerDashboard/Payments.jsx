import React from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Payments = ({handleOptionClick}) => {

    const payoneer = () => {
        window.location.href = 'https://payouts.payoneer.com/partners/lp.aspx?token=51ee143a52644084a6f3fafebda9f1162C7B1C1C8E';
    }
    const signinpayoneer = () => {
        window.location.href = 'https://login.payoneer.com/?sessionDataKey=2b2dddd0a8bd427899e3707f9a3ea01c----&state=7ef0827a-c050-4eb1-a7c5-6e8b5931d7d3&provider_id=internal&client_id=b9591619-44ae-46fa-82b4-72f4c39cc897&redirect_uri=https%3A%2F%2Fpayouts.brand.domain%2FWebApps%2FMethodRegistration%2FSwitch.aspx&scope=openid&response_type=code&mode=2&titleResourceParams=%7B%22%7B%7BpartnerAliasName%7D%7D%22%3A%22Tradeling+Account+AED%22%7D&pid=100218490';
    }
    const learn = () => {
        window.location.href = 'https://www1.payoneer.com/in/';
    }
    const Click14 = () => {
        handleOptionClick('Option14');
    };


    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <div className="heading flex">Payment Details</div>

            <div className="productlist3">
                <div className="flexcol" style={{ gap: '20px' }}>
                    <div className="heading3 wh">Payoneer</div>
                    <div className="heading2 wh">Make payments easy – link your payoneer account. <span className="hoverr" onClick={learn}>Learn more</span></div>
                </div>
                <div className="flexcol" style={{ gap: '20px' }}>
                    <button onClick={payoneer} className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Sign Up To Payoneer</div></button>
                    <div className="descrip">Already have an account? <span onClick={signinpayoneer} className='hoverr'>Sign in</span></div>
                </div>
            </div>

            <div className="productlist3">
                <div className="flexcol" style={{ gap: '20px' }}>
                    <div className="flex wh"><AccountBalanceIcon />&nbsp;&nbsp;<div className="heading3 wh">Add a bank account</div></div>
                    
                    <div className="heading2 wh">Providing this bank account information allows us to deposit payments into your account, including payouts from orders</div>
                </div>
                <div className="flexcol" style={{ gap: '20px' }}>
                    <button className='btn box2 flex' onClick={Click14} style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Add New Account</div></button>
                </div>
            </div>
        </div>
    )
}

export default Payments