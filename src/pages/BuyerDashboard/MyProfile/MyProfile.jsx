import React, { useEffect, useRef } from 'react'
import './MyProfile.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CiWarning } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const MyProfile = () => {
  const [openPassword, setOpenPassword] = useState(false)
  const [openNumber, setOpenNumber] = useState(false)
  const [updateNumber, setUpdateNumber] = useState('')
  const [openEmail, setOpenEmail] = useState(false)
  const [updateEmail, setUpdateEmail] = useState()
  const [showData, setShowData] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    number: '',
    countrycode: '+91',
    language: 'English'
  })

  //Email Continue

  const handleContinueEmail = (e)=>{
    e.preventDefault()
  }
  // Number Continue button

  const handleContinueNumber = (e)=>{
    e.preventDefault
  }
  // Password Continue button
  const handleContinuePassword = (e)=>{
    e.preventDefault
  }  // Update Email logic
  const handleUpdateEmail = () => {
    setOpenEmail(true)
  }
  const handleClosedEmail = () => {
    setOpenEmail(false)
  }
  // Update Mobile Number
  const handleUpdateMobile = () => {
    setOpenNumber(true)
  }
  const handleClosedNumber = () => {
    setOpenNumber(false)
  }
  // change Password
  const handleClosedPassword = () => {
    setOpenPassword(false)
  }
  const handleUpdatePassword = () => {
    setOpenPassword(true)
  }
  const inputs = Array.from({ length: 6 }, () => useRef(null));
  const [otp, setOTP] = useState(Array(6).fill(''));

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  };
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (timerRunning) {
      const timerInterval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timerRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimerRunning(false);
    }
  }, [timeLeft]);

  const handleResendClick = () => {
    setTimeLeft(60);
    setTimerRunning(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleSubmit = (e) => {

    if (formData.firstname === '' || formData.lastname === '' || formData.countrycode === '' || formData.number === '' || formData.language === "") {
      alert('please all field are requiered')
    }
    e.preventDefault()
    setSubmitted(true)

    setShowData(submitted)
    //  toast.success("Successfully You Submitted the form")
  }
  const handleEdit = () => {
    setSubmitted(false)
    setShowData(false)
  }
  return (
    <>
      {/* Email Container */}
      <div className='show-container-update-Email'>
        {openEmail && (
          <div className="signupcont update-email">
            <div className='flexcol cover'>
              <div className="heading">Update Email Address</div>
              <p>Enter up to date email address so we can verify email address</p>
              <div className="flexcol gap">
                <input type='email' className="box flex" placeholder='Enter your email' value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} />
                <button className='btn box flex' type='submit'><div className="heading2" onClick={handleContinueEmail}>Continue</div></button>
                <button onClick={handleClosedEmail} className='btn box flex' type='submit'><div className="heading2">Cancel</div></button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Update Container */}
      <div className='show-container-update-Email'>
        {openNumber && (
          <div className="signupcont update-email">
            <div className='flexcol cover'>
             <div className="heading">Update Mobile Number</div>
              <p>Enter an up to date mobile number.</p>
              <div className="flexcol gap">
                <div className="flex" style={{ width: '100%', gap: '30px' }}>
                  <select className='box flex width' name="" id="">
                    <option value="">+91</option>
                    <option value="">+1</option>
                    <option value="">+97</option>
                  </select>
                  <input className="box flex" maxLength={10} placeholder='Enter your number' value={updateNumber} onChange={(e) => setUpdateNumber(e.target.value)} />
                </div>
                <button className='btn box flex' type='submit'><div className="heading2" onClick={handleContinueNumber}>Continue</div></button>
                <button onClick={handleClosedNumber} className='btn box flex' type='submit'><div className="heading2">Cancel</div></button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* change password */}
      <div>
        {openPassword && (
          <div className="signupcont update-email">
            <div className='flexcol cover'>
              <div className="heading tcenter">Verify your email</div>
              <div className="heading2 tcenter">We have sent the OTP to user@gmail.com <br /> Click on the link in the email or enter the OTP to verify your email.</div>
              <div className="flex gap">
                {inputs.map((inputRef, index) => (
                  <input key={uuidv4()} className='box tcenter' ref={inputRef} maxLength={1} value={otp[index]} onChange={(e) => handleInputChange(index, e)} />
                ))}
              </div>
              <button onClick={() => { console.log(otp) }} className='btn box flex' type='submit'><div className="heading2" onClick={handleContinuePassword}>Continue</div></button>
              <button className='resend' disabled={timerRunning} onClick={handleResendClick}>
                {timerRunning ? `Resend OTP in ${timeLeft}` : "Resend OTP"}
              </button>
              <button onClick={handleClosedPassword} className='btn box flex' type='submit'><div className="heading2">Cancel</div></button>
            </div>
          </div>
        )}
      </div>
      <div className='mt  fixed'>
        <div className='flex-space-beetwen'>
          <div className='message-titles-heading1'>
            <h1 className='user-title  heading-2 '>My Profile</h1>
          </div>
          <div className='message-titles-heading1'>
            <Link to="/buyerdashboard">
              <button className='create-btn btn-change '>BACK TO PREVIOUS PAGE</button>
            </Link>
          </div>
        </div>
        <div className='border-1 bor-1'>
         <h1 className='user-filter '> My Profile</h1>
          <div className='form-section' style={{ display: showData ? 'none' : 'block' }}>
            <form onSubmit={handleSubmit}>
              <div className='first-name'>
                <lable htmlFor="firstname">First Name*</lable> <br></br>
                <input type='text' value={formData.firstname} onChange={handleChange} id='firstname' name='firstname' />
              </div>
              <br></br>
              <div className='first-name'>
                <lable htmlFor="lastname">Last Name*</lable><br></br>
                <input type='text' value={formData.lastname} onChange={handleChange} id='lastname' name='lastname' />
              </div>
              <br></br>
              <div className='first-name'>
                <lable htmlFor="number">Watshapp Number</lable><br></br>
                <select name="countrycode" id="number" value={formData.countrycode} onChange={handleChange} defaultValue='+91' >
                  <option value="+91">+91</option>
                  <option value="+91">+86</option>
                  <option value="+91">+76</option>
                  <option value="+91">+63</option>
                  <option value="+91">+14</option>
                </select>
                <input type='number' id='number' name='number' value={formData.number} onChange={handleChange} />
              </div>
              <br></br>
              <div className='first-name'>
                <lable> Language Prefrence</lable><br></br>
                <select name='language' id='language' value={formData.language} onChange={handleChange}>
                  <option value="English">English</option>
                  <option value='Hindi'>Hindi</option>
                  <option value='Urdu'>Urdu</option>
                  <option value="English">Nepal</option>
                  <option value='Hindi'>China</option>
                </select>
              </div>
              <br></br>
              <div className='save-cancel ' >
                <button type='submit' className='clear-filter-btn space-between'>Save</button><br></br>
                <button className='clear-filter-btn  space-between'>Cancel</button>
              </div>
            </form>
          </div>
          {/* displaying the user data hear */}
          <div className='show data' style={{ display: showData ? 'block' : 'none' }}>
            {showData && (
              <div className='data-display'>
                <div className='name-show'>
                  <h4 className="orders-title">Name:</h4>
                  <p>{formData.firstname}{formData.lastname}</p>
                </div>
                <div className='name-show'>
                  <h4 className="orders-title">Watshapp Number: </h4>
                  <p>{formData.countrycode}{formData.number}</p>
                </div>
                <div className='name-show'>
                  <h4 className="orders-title">Language:  </h4>
                  <p>{formData.language}</p>
                </div>
                <div className='name-show'>
                </div>
                <button onClick={handleEdit} className='filter-btn  filter-margin  Edit-button'>Edit</button>
              </div>
            )}
          </div>
        </div>
        <div className='border-1 bor-1'>
          <h1 className='user-filter '> Security</h1>
          <div className='data-display'>
            <div className='name-show'>
              <h4 className="orders-title">Name:</h4>
              <p>ulink@gmail.com</p>
            </div>
            <div className='name-show'>
              <h4 className="orders-title"> Number: </h4>
              <p>7524886032</p>
            </div>
          </div>
          <div className='note'>
            <CiWarning className='warnings' />
            <p>International mobile numbers cannot be used to log in</p>
          </div>
          <div className='button-grp'>
            <button className='clear-filter-btn space-between' onClick={handleUpdateEmail}>Update Email</button>
            <button className='clear-filter-btn space-between' onClick={handleUpdateMobile}>Update Mobile</button>
            <button className='clear-filter-btn space-between' onClick={handleUpdatePassword} >Change Password</button>
          </div>
        </div>
      </div>
      {/* <ToastContainer/> */}
      {/* Security info */}
    </>
  )
}

export default MyProfile