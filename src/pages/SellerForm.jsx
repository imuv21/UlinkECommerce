import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const SellerForm = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [number, setNumber] = useState('');
    const [wapnum, setWapnum] = useState('');
    const [companyname, setCompanyname] = useState('');
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const sellerDash = () => {
        navigate('/seller-dash');
    }

    return (
        <Fragment>

            <div className="flex login-cont wh">
                <div className="flex wh">
                  {/* <img src={bg} className='bgdiv' alt="bg" /> */}
                </div>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Create your seller profile</div>
                        <div className="flex" style={{ width: '100%', gap: '30px' }}>
                            <input type='text' className="box flex" placeholder='Enter your first name' value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            <input type='text' className="box flex" placeholder='Enter your last name' value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <div className="flex" style={{ width: '100%', gap: '30px' }}>
                            <select className='box flex width' name="" id="">
                                <option value="">+91</option>
                                <option value="">+1</option>
                                <option value="">+97</option>
                            </select>
                            <input className="box flex" maxLength={10} placeholder='Enter your number' value={number} onChange={(e) => setNumber(e.target.value)} />
                        </div>
                        <div className="flex" style={{ width: '100%', gap: '10px', justifyContent: 'start' }}>
                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /><div className="heading2">My whatsapp number is different</div>
                        </div>
                        {isChecked && (
                            <div className='flex' style={{ width: '100%', gap: '30px' }}>
                                <select className='box flex width' name="" id="">
                                    <option value="">+91</option>
                                    <option value="">+1</option>
                                    <option value="">+97</option>
                                </select>
                                <input className="box flex" maxLength={10} placeholder="Enter your whatsapp number" value={wapnum} onChange={(e) => setWapnum(e.target.value)} />
                            </div>
                        )}
                        <input type='email' className="box flex" placeholder='Enter company name' value={companyname} onChange={(e) => setCompanyname(e.target.value)} />
                        <select className='box flex' name="" id="" placeholder='Country of operation'>
                            <option value="">Country of operation</option>
                            <option value="">USA</option>
                            <option value="">UAE</option>
                        </select>
                        <button className='btn box flex' type='submit' onClick={sellerDash}><div className="heading2">Continue</div></button>
                        <div className="descrip">By registering you agree to the user <Link>Terms & Conditions</Link> and <Link>Privacy Policy</Link></div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default SellerForm