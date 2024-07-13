
import React, { Fragment, useEffect, useState } from "react";
import "./BuyerDashboard.css";
import { BsBox } from "react-icons/bs";
import { RiMessage2Line } from "react-icons/ri";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { CiWallet } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FcDocument } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { AiOutlineProfile } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoIosRadioButtonOff } from "react-icons/io";
import { GiTimeTrap } from "react-icons/gi";



const BuyerDashboard = () => {
  const [inviteMore, setInviteMore] = useState(false);
  const [userRole, setUserRole] = useState('')
  const [sendEmail, setSendEmail] = useState('')
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.profile);
  const doc = useSelector((state) => state.auth.doc)
  useEffect(() => {
    if (!!user) {
      setCurrentStep(1);
    }
  }, [user]);
  const navigateToProfile = useNavigate();

  useEffect(() => {
    if (!profile) {
       setCurrentStep(2)
    }
  }, [profile])

  useEffect(() => {
    if(!doc){
      setCurrentStep(3)
    }
  })

  const BussinessProfile = () => {
    console.log("Updating currentSteps to ", stepId)
    navigateToProfile("/company-profile")
  }
  const steps = [
    { id: 1, text: 'Register your account' },
    { id: 2, text: 'Complete your business profile' },
    { id: 3, text: 'Upload your bussiness documents' },
    { id: 4, text: 'Your business documents are verified' },
  ];
  const [currentStep, setCurrentStep] = useState();

  const navigate = useNavigate()
  const uploadDocument = () => {
    navigate("/company-profile")
  }
  const CloseInviteUser = () => {
    setInviteMore(false)
  }
  const inviteMoreUser = () => {
    setInviteMore(true)
  }
  const handleUserRole = (e) => {
    setUserRole(e.target.value)
  }
  //   Steps wise varification
  return (
    <Fragment>
      <Helmet>
        <title>Buyer Dashboard</title>
      </Helmet>
      {/* invite usre */}
      <div>
        {inviteMore && (
          <div className='background-Changer'>
            <div className=" invite-more ">
              <div className='card-info-bank invite-user '>
                <div className='card-title invite-title'>
                  <h3 className=" card-title-tittles">Invite User</h3>
                </div>
                <div className='card-title'>
                  <RxCross2 className='cross-icon' onClick={CloseInviteUser} />
                </div>
              </div>
              <div className=''> <p className='info-details invite-quote'>Use this section to invite members to your organisation. You can also set user permissions.</p></div>
              <div className=' invite-email'>
                <label >Enter Email</label><br></br>
                <input type='email' name='cardemail' className='card-input-value width-input' placeholder='Enter email' value={sendEmail} onChange={(e) => setSendEmail(e.target.value)} />
              </div>
              <div className=' invite-email'>
                <label >User Role*</label><br></br>
                <div className='user-role-choose '>
                  <input type='radio' name={userRole} onChange={handleUserRole} />
                  <p className='paragraph-4'> Admin</p>
                </div>
                <p className='info-details invite-quotes'>Manage orders + buy items + manage roles and permissions</p>
              </div>
              <div className=' invite-email'>
                <div className='user-role-choose '>
                  <input type='radio' name={userRole} onChange={handleUserRole} />
                  <p className='paragraph-4'> Superviser</p>
                </div>
                <p className='info-details invite-quotes'>Manage orders + buy items + manage roles and permissions</p>
              </div>
              <div className=' invite-email'>
                <div className='user-role-choose '>
                  <input type='radio' name={userRole} onChange={handleUserRole} />
                  <p className='paragraph-4'>User</p>
                </div>
                <p className='info-details invite-quotes'>Manage orders + buy items + manage roles and permissions</p>
                <button type='submit' className='clear-filter-btn space-between  send-email'>Send Email</button><br></br>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="userDashboard">
        <h1 className="user-title">Hi, {user.firstname}{user.lastname}</h1>
        <p className="user-subtitle">{user.firstname}{user.lastname} </p>
      </div>
      {/* Upload Document */}
      <div className="upload-document">
        <h1 className="upload-document-title">Complete these steps to verify your business</h1>
        <div className="document-container">
          <div className="document-container-1">
            <h1 className="upload-document-title">Upload business documents</h1>
            <div className="upload-document-info">
              <FcDocument className="doc-icons" />
              <p>Provide your Personal Identification Document, Business Registration Document, and VAT Certificate</p>
            </div>
            <button className="uploadbtns" onClick={uploadDocument}>UPLOAD DOCUMENTS</button>
          </div>
          <div className="document-container-1">
            <h1 className="upload-document-title">Invite members from your company</h1>
            <div className="upload-document-info">
              <PiUsersThreeLight className="doc-icons" />
              <p>Provide your Personal Identification Document, Business Registration Document, and VAT Certificate</p>
            </div>
            <button className="uploadbtns" onClick={inviteMoreUser}>INVITE USER</button>
          </div>
        </div>
      </div>
      {/* Steps Varification */}
      <div className="upload-document step-varification-process">
        <div className="document-container">
          <div className="document-container-1">
            <h4>Complete your business profile</h4>
            <div className="steps">
              <p>{`${currentStep}/${steps.length} steps completed`}</p>
              <div className='fill-values'>
                <div className="fill-value" style={{ width: `${(currentStep / steps.length) * 100}%` }}></div>
              </div>
            </div>
            <div className="select-value">
              {steps.map((step, index) => (
                <div key={step.id} className="radio-flex">
                {/*  i want fill  radio button */}
                 <IoIosRadioButtonOff className={`radio-size ${index < currentStep ? "active" : ""}`}   />
                  <p className="varify-p">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
          { currentStep === 1 && (
          <div className="document-container-1 document-container-2">
            <AiOutlineProfile className="profile-icons-1" />
            <div className="">
            <p className="bussiness-profile">Complete Your Bussiness Profile</p>
            <button className="edit-detail-button bussines-profile-button" onClick={BussinessProfile}>Bussiness Profile</button>
            </div>
          </div>
          )}
          { currentStep === 2 && (
          <div className="document-container-1 document-container-2">
            <FcDocument className="profile-icons-1" />
            <div className="">
            <p className="bussiness-profile">Upload Your Bussiness Documents</p>
            <button className="edit-detail-button bussines-profile-button" onClick={uploadDocument}>Upload Documents</button>
            </div>
          </div>
          )}
          { currentStep === 3 && (
          <div className="document-container-1 document-container-2">
            <GiTimeTrap className="profile-icons-1" />
            <div className="">
            <p className="bussiness-profile">Please wait, our team is reviewing and verifying your documents.</p>
            <button className="edit-detail-button bussines-profile-button" onClick={BussinessProfile}>Bussiness Profile</button>
            </div>
          </div>
        )}
        
        </div>
      </div>
      <div className="dashboard-containers">
        <Link to="/order-page">
          <div className="dashboards">
            <div className="order-contant">
              <BsBox className="order-icon" />
            </div>
            <div className="containt-title">
              <h4 className="orders-title">Order</h4>
              <div className="order-info">
                <p className="order-infos">
                  View your order details, manage and track current orders,
                  explore international shipping & logistics.
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/buyer-message">
          <div className="dashboards">
            <div className="order-contant">
              <RiMessage2Line className="order-icon" />
            </div>
            <div className="containt-title">
              <h4 className="orders-title">Message</h4>
              <div className="order-info">
                <p className="order-infos">You have 0 new messages</p>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/rfq'>
          <div className="dashboards">
            <div className="order-contant">
              <CiLocationArrow1 className="order-icon" />
            </div>
            <div className="containt-title">
              <h4 className="orders-title">Requests for Quotations</h4>
              <div className="order-info">
                <p className="order-infos">
                  Easily source any product! Simply submit your RFQ and receive
                  multiple quotations from our registered sellers.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="company-detail">
        <h2 className="user-title">Company Settings</h2>
      </div>
      <div className="dashboard-containers">
        <Link to='/myprofile'>
          <div className="dashboards">
            <div className="order-contant">
              <FaRegUserCircle className="order-icon" />
            </div>
            <div className="containt-title">
              <h4 className="orders-title">My Profile</h4>
              <div className="order-info">
                <p className="order-infos">
                  View your personal details and account security
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/company-profile'>
          <div className="dashboards">
            <div className="order-contant">
              <HiOutlineBuildingLibrary className="order-icon" />
            </div>
            <div className="containt-title">
              <h4 className="orders-title">Company Profile</h4>
              <div className="order-info">
                <p className="order-infos">
                  View company information and submitted documentation
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/my-addresses'>
          <div className="dashboards">
            <div className="order-contant">
              <IoLocationOutline className="order-icon" />
            </div>
            <div className="containt-title">
              <h4 className="orders-title">Address</h4>
              <div className="order-info">
                <p className="order-infos">
                  Manage your shipping and billing addresses.
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/access-management'>
          <div className="dashboards">
            <div className="order-contant">
              <PiUsersThreeLight className="order-icon" />
            </div>
            <div className="containt-title">
              <h4 className="orders-title">Access Management</h4>
              <div className="order-info">
                <p className="order-infos">
                  Add or remove users to your company account and manage their
                  permissions.
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/payment'>
          <div className="dashboards">
            <div className="order-contant">
              <CiWallet className="order-icon" />
            </div>
            <div className="containt-title">
              <h4 className="orders-title">Payment Mangement</h4>
              <div className="order-info">
                <p className="order-infos">
                  Manage your shipping and billing addresses.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};
export default BuyerDashboard;

