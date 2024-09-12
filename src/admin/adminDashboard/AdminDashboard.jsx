import React, { useState, Fragment } from 'react';
import './admin.css';
import { Link } from 'react-router-dom';
import { urls } from '../../components/Schemas/images';

const AdminDashboard = () => {

    //images
    const logo = urls[0];
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <Fragment>
            <div className='flex seller-dash admindashboard'>
                <div className='flexcol sidenav'>

                    <div className='adminLogo'>
                        <img src={logo} alt="logo" />
                    </div>

                    <Link to="admin-login" className={`accordion ${activeIndex === 1 ? 'active' : ''}`} onClick={() => { toggleAccordion(1) }}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.762 2.763a1.749 1.749 0 0 1 2.475 0l6.707 6.707a2.75 2.75 0 0 1 .806 1.944V20a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-4.5a1.75 1.75 0 1 0-3.5 0V20a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75v-8.586c0-.729.29-1.429.806-1.944l6.706-6.707Zm1.415 1.06a.249.249 0 0 0-.353 0L5.116 10.53a1.25 1.25 0 0 0-.366.883v7.836h4V15.5a3.25 3.25 0 1 1 6.5 0v3.75h4v-7.836c0-.33-.132-.649-.366-.883l-6.707-6.707Z" fill="currentColor"></path>
                            </svg>
                            <div className="heading2">Admin Dashboard</div>
                        </div>
                    </Link>

                    <button className={`accordion ${activeIndex === 2 ? 'active' : ''}`} onClick={() => toggleAccordion(2)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.5 3.75c-.69 0-1.25.56-1.25 1.25v5c0 .69.56 1.25 1.25 1.25h5c.69 0 1.25-.56 1.25-1.25V5c0-.69-.56-1.25-1.25-1.25h-5ZM6.75 10c0 .45.108.875.3 1.25H5A2.75 2.75 0 0 0 2.25 14v5A2.75 2.75 0 0 0 5 21.75h5c.788 0 1.499-.331 2-.862.501.53 1.212.862 2 .862h5A2.75 2.75 0 0 0 21.75 19v-5A2.75 2.75 0 0 0 19 11.25h-2.05c.192-.375.3-.8.3-1.25V5a2.75 2.75 0 0 0-2.75-2.75h-5A2.75 2.75 0 0 0 6.75 5v5ZM5 12.75h5c.69 0 1.25.56 1.25 1.25v5c0 .69-.56 1.25-1.25 1.25H5c-.69 0-1.25-.56-1.25-1.25v-5c0-.69.56-1.25 1.25-1.25ZM12.75 14c0-.69.56-1.25 1.25-1.25h5c.69 0 1.25.56 1.25 1.25v5c0 .69-.56 1.25-1.25 1.25h-5c-.69 0-1.25-.56-1.25-1.25v-5ZM6 17.25a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5H6ZM9.25 9a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2A.75.75 0 0 1 9.25 9ZM15 17.25a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5h-2Z" fill="currentColor"></path>
                            </svg>
                            <div className="heading2">Product Catalogue</div>
                        </div>
                    </button>
                    <div className="panel" style={{ maxHeight: activeIndex === 2 ? '300px' : '0' }}>
                        <Link to="" className="option">Add single product</Link>
                        <Link to="" className="option">Add multiple product</Link>
                        <Link to="" className="option">Products list</Link>
                        <Link to="" className="option">Media</Link>
                    </div>

                    <Link to="admin-order" className={`accordion ${activeIndex === 3 ? 'active' : ''}`} onClick={() => { handleOptionClick('Option17'); toggleAccordion(3) }}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M2.62 6.58c-.238.412-.37.886-.37 1.379v8.082c0 .983.524 1.89 1.375 2.383l7 4.04c.851.491 1.9.491 2.75 0l7-4.04a2.749 2.749 0 0 0 1.375-2.382V7.959a2.75 2.75 0 0 0-1.375-2.382l-7-4.04a2.751 2.751 0 0 0-2.75 0L7.148 3.543a.75.75 0 0 0-.047.027L3.625 5.577A2.746 2.746 0 0 0 2.62 6.58Zm1.88.224 3-1.732 7.5 4.33-3 1.732-7.5-4.33ZM9 4.206l7.5 4.33 3-1.732-6.875-3.968a1.252 1.252 0 0 0-1.25 0L9 4.206Zm6.74 8.654v-2.153l-2.99 1.726v8.66l6.875-3.968a1.25 1.25 0 0 0 .625-1.083V8.103l-3.01 1.738v3.019a.75.75 0 0 1-1.5 0ZM3.75 8.103l7.5 4.33v8.66l-6.875-3.968a1.252 1.252 0 0 1-.625-1.084V8.103Zm2.626 6.488a.75.75 0 1 0-.752 1.298l3.04 1.76a.75.75 0 0 0 .752-1.298l-3.04-1.76Z" fill="currentColor"></path></svg>
                            <div className="heading2">Orders</div>
                        </div>
                    </Link>

                    <button className={`accordion ${activeIndex === 4 ? 'active' : ''}`} onClick={() => toggleAccordion(4)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M5.639 3.442c-1.66-.77-3.368.866-2.765 2.553l2.143 6.002-2.143 6.009c-.603 1.686 1.105 3.322 2.765 2.552l14.429-6.699c1.577-.731 1.577-2.989 0-3.72L5.638 3.442ZM4.286 5.49a.54.54 0 0 1 .721-.689L18.9 11.25H6.343L4.286 5.49Zm2.055 7.259-2.054 5.76c-.171.477.31.878.72.688l13.888-6.448H6.341Z" fill="currentColor"></path></svg>
                            <div className="heading2">RFQ Marketplace</div>
                        </div>
                    </button>
                    <div className="panel" style={{ maxHeight: activeIndex === 4 ? '300px' : '0' }}>
                        <div className="option" >RFQ Lists</div>
                        <div className="option" >RFQ Notifications</div>
                        <div className="option" >Manage Quotes</div>
                    </div>

                    <button className={`accordion ${activeIndex === 5 ? 'active' : ''}`} onClick={() => toggleAccordion(5)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" ><path fillRule="evenodd" clipRule="evenodd" d="M2.675 3.221a.75.75 0 1 0-1.5 0v17.708c0 .414.336.75.75.75H21a.75.75 0 0 0 0-1.5H2.675V3.221Zm18.873 3.267A.746.746 0 0 1 21.75 7v2.667a.75.75 0 0 1-1.5 0V8.81l-4.679 4.679a1.75 1.75 0 0 1-2.475 0l-2.141-2.14a.25.25 0 0 0-.354 0l-5.07 5.07a.75.75 0 0 1-1.061-1.06l5.07-5.071a1.749 1.749 0 0 1 2.476 0l2.14 2.14a.249.249 0 0 0 .353.001l4.68-4.679h-.856a.75.75 0 0 1 0-1.5H21a.748.748 0 0 1 .548.238Z" fill="currentColor"></path></svg>
                            <div className="heading2">Performance Analysis</div>
                        </div>
                    </button>
                    <div className="panel" style={{ maxHeight: activeIndex === 5 ? '300px' : '0' }}>
                        <div className="option" >My Insights</div>
                        <div className="option" >Product Insights</div>
                    </div>

                    <button className={`accordion ${activeIndex === 6 ? 'active' : ''}`} onClick={() => toggleAccordion(6)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M16.005 2.082a5.75 5.75 0 0 1 5.745 5.53l.005.22v8.008a5.75 5.75 0 0 1-5.53 5.745l-.22.005H7.997a5.75 5.75 0 0 1-5.746-5.53l-.004-.22V7.832a5.75 5.75 0 0 1 5.53-5.746l.22-.004h8.008Zm.492 13.152c-.134 0-.267.021-.394.063l-.124.05-4.181 1.904a2.753 2.753 0 0 1-2.948-.298l-.14-.119-1.381-1.252c-.08-.071-.168-.13-.261-.179a2.083 2.083 0 0 1-1.553.926l-.183.008-1.556.001a4.251 4.251 0 0 0 4.011 3.746l.21.006h8.008a4.25 4.25 0 0 0 4.22-3.752h-1.554a2.085 2.085 0 0 1-1.84-1.104h-.334ZM8.888 9.16l-1.473.532v4.232c.272.096.527.234.759.412l.157.13 1.386 1.257a1.25 1.25 0 0 0 1.579.082l.105-.087 2.018-1.846a1.25 1.25 0 0 0 .087-1.757l-.092-.093-.42-.382-1.107.516a2.258 2.258 0 0 1-3.074-2.813l.075-.183Zm11.366 5.677V8.334H18.67a.583.583 0 0 0-.576.492l-.007.092v5.336a.583.583 0 0 0 .491.576l.093.007h1.583ZM5.332 8.334H3.747v6.503h1.585a.584.584 0 0 0 .576-.491l.008-.092V8.917a.583.583 0 0 0-.492-.576l-.092-.007Zm7.923-.618-.121.07-2.611 1.691a.757.757 0 0 0 .625 1.36l.106-.04 1.556-.726.052-.022.083-.027.102-.018.102-.004.095.008.097.022.092.035.057.029c.018.009.036.02.054.032l.087.068.79.717a2.752 2.752 0 0 1 .645 3.204l.29-.133c.287-.131.593-.211.906-.238l.235-.01.09-.001V8.918c0-.075.004-.15.012-.224L14.318 7.69a1.25 1.25 0 0 0-1.063.026Zm2.75-4.134H7.997a4.252 4.252 0 0 0-4.132 3.253l1.467-.001A2.084 2.084 0 0 1 7.269 8.15l1.453-.523a2.739 2.739 0 0 1 1.866.02l1.73-1.12a2.75 2.75 0 0 1 2.42-.283l.184.073 2.367 1.042.043-.04c.327-.273.73-.44 1.155-.477l.184-.008h1.466a4.252 4.252 0 0 0-4.132-3.252Z" fill="currentColor"></path></svg>
                            <div className="heading2">Messages</div>
                        </div>
                    </button>

                    <button className={`accordion ${activeIndex === 7 ? 'active' : ''}`} onClick={() => toggleAccordion(7)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M13.728 1.561a2.131 2.131 0 0 1 2.738.776l.081.141.757 1.425a.634.634 0 0 0 .356.303l.093.023 1.59.28a2.131 2.131 0 0 1 1.758 2.243l-.016.154-.226 1.599a.63.63 0 0 0 .11.452l.061.075 1.122 1.16c.758.782.797 2 .12 2.83l-.12.134-1.122 1.16a.632.632 0 0 0-.177.43l.006.097.226 1.599a2.132 2.132 0 0 1-1.59 2.364l-.152.033-1.59.279a.634.634 0 0 0-.398.244l-.051.082-.757 1.426a2.132 2.132 0 0 1-2.67.982l-.149-.066-1.45-.709a.632.632 0 0 0-.446-.041l-.108.041-1.45.709a2.131 2.131 0 0 1-2.737-.775l-.082-.141-.757-1.427a.634.634 0 0 0-.356-.302l-.093-.024-1.59-.28A2.132 2.132 0 0 1 2.9 16.596l.016-.155.226-1.598a.63.63 0 0 0-.11-.453l-.062-.074-1.121-1.16c-.758-.782-.798-2-.12-2.83l.12-.134L2.97 9.03a.632.632 0 0 0 .178-.432l-.006-.096-.225-1.597a2.13 2.13 0 0 1 1.59-2.365l.152-.033 1.589-.278a.634.634 0 0 0 .397-.245l.052-.081.757-1.426a2.132 2.132 0 0 1 2.67-.982l.149.065 1.45.71a.63.63 0 0 0 .446.04l.108-.04 1.45-.71Zm1.494 1.62a.631.631 0 0 0-.742-.309l-.093.037-1.45.71a2.132 2.132 0 0 1-1.709.07l-.163-.071-1.45-.709a.632.632 0 0 0-.781.187l-.054.085-.757 1.426c-.28.527-.767.91-1.34 1.062l-.174.038-1.59.28a.63.63 0 0 0-.522.608l.006.1.225 1.598a2.13 2.13 0 0 1-.46 1.647l-.118.134-1.122 1.16a.632.632 0 0 0-.07.791l.07.087 1.122 1.16c.415.43.63 1.012.596 1.603l-.018.177-.226 1.598a.632.632 0 0 0 .419.685l.097.025 1.59.28a2.134 2.134 0 0 1 1.425.946l.09.154.757 1.427c.144.27.457.395.742.308l.093-.037 1.45-.709a2.132 2.132 0 0 1 1.708-.071l.164.071 1.45.71c.275.134.602.05.781-.188l.054-.085.757-1.426c.28-.527.768-.91 1.34-1.061l.175-.038 1.59-.28a.631.631 0 0 0 .522-.61l-.006-.1-.226-1.597a2.13 2.13 0 0 1 .46-1.648l.118-.133 1.122-1.16a.632.632 0 0 0 .07-.792l-.07-.086-1.122-1.16a2.131 2.131 0 0 1-.596-1.603l.018-.178.226-1.597a.632.632 0 0 0-.419-.686l-.097-.025-1.59-.28a2.134 2.134 0 0 1-1.425-.945l-.09-.154-.757-1.427Zm-.472 10.242a1 1 0 1 1 .001 2 1 1 0 0 1-.001-2Zm.781-5.28a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 0 1-1.06-1.06l6-6a.75.75 0 0 1 1.06 0Zm-6.281-.22a1 1 0 1 1 .001 2 1 1 0 0 1-.001-2Z" fill="currentColor"></path></svg>
                            <div className="heading2">Promotions</div>
                        </div>
                    </button>
                    <div className="panel" style={{ maxHeight: activeIndex === 7 ? '300px' : '0' }}>
                        <div className="option" >Dashboard</div>
                        <div className="option" >Create Promotions</div>
                    </div>

                    <button className={`accordion ${activeIndex === 8 ? 'active' : ''}`} onClick={() => toggleAccordion(8)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M12 3.75a8.25 8.25 0 0 0-6.167 13.73 7.501 7.501 0 0 1 3.383-2.694 4.5 4.5 0 1 1 5.568 0 7.51 7.51 0 0 1 3.383 2.694A8.25 8.25 0 0 0 12 3.75Zm6.54 15.482A9.725 9.725 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12s4.365 9.75 9.75 9.75a9.714 9.714 0 0 0 6.54-2.518Zm-1.483-.713a6.003 6.003 0 0 0-10.114 0A8.214 8.214 0 0 0 12 20.25c1.906 0 3.66-.646 5.057-1.731ZM12 8.25a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" fill="currentColor"></path></svg>
                            <div className="heading2">Account</div>
                        </div>
                    </button>
                    <div className="panel" style={{ maxHeight: activeIndex === 8 ? '300px' : '0' }}>
                        <Link to="" className="option">Company profile</Link>
                        <Link to="" className="option">My account</Link>
                        <Link to="" className="option">Shipping preferences</Link>
                        <Link to="" className="option">Payments</Link>
                    </div>

                    <Link to="" className={`accordion ${activeIndex === 9 ? 'active' : ''}`} onClick={() => toggleAccordion(9)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M20.25 15.404a3.25 3.25 0 0 1 3.25 3.25v1.096a.75.75 0 0 1-1.5 0v-1.096a1.75 1.75 0 0 0-1.75-1.75h-.8a.75.75 0 0 1 0-1.5h.8Zm-16.199 0a.75.75 0 1 1 0 1.5H3.25a1.75 1.75 0 0 0-1.75 1.75v1.096a.75.75 0 0 1-1.5 0v-1.096a3.25 3.25 0 0 1 3.25-3.25h.801Zm9.538-1.505a4.25 4.25 0 0 1 4.25 4.25v1.601a.75.75 0 1 1-1.5 0v-1.601a2.75 2.75 0 0 0-2.75-2.75H9.91a2.75 2.75 0 0 0-2.75 2.75v1.601a.75.75 0 1 1-1.5 0v-1.601a4.25 4.25 0 0 1 4.25-4.25h3.68Zm7.484-4.156a2.773 2.773 0 1 1-3.922 3.922 2.773 2.773 0 0 1 3.922-3.922Zm-14.724 0a2.773 2.773 0 1 1-3.922 3.922A2.773 2.773 0 0 1 6.35 9.743Zm11.966.968-.103.093a1.273 1.273 0 0 0-.093 1.697l.093.103a1.273 1.273 0 1 0 .103-1.893Zm-14.724 0-.103.093a1.273 1.273 0 0 0-.093 1.697l.093.103a1.273 1.273 0 1 0 .103-1.893Zm10.892-4.579a3.865 3.865 0 0 1 .15 5.306l-.15.16-.16.15a3.866 3.866 0 0 1-5.147 0l-.16-.15-.15-.16a3.865 3.865 0 0 1 5.617-5.306Zm-4.405 1.06a2.365 2.365 0 1 0 3.344 3.345 2.365 2.365 0 0 0-3.345-3.344Z" fill="currentColor"></path></svg>
                            <div className="heading2">Access Management</div>
                        </div>
                    </Link>

                    <button className={`accordion ${activeIndex === 10 ? 'active' : ''}`} onClick={() => toggleAccordion(10)}>
                        <div className='flex' style={{ gap: '20px' }}>
                            <svg className='svg' viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M19.756 2.644h-.197v-.108a1.42 1.42 0 0 0-.457-1.058C18.063.538 16.549 0 14.95 0 13.453 0 12.023.478 11 1.301 9.973.478 8.543 0 7.046 0c-1.598 0-3.11.538-4.152 1.477-.29.261-.456.648-.456 1.06v.107h-.196A2.245 2.245 0 0 0 0 4.886v7.13a2.245 2.245 0 0 0 2.243 2.243h7.179c.615 0 1.172-.25 1.578-.652.405.403.963.652 1.578.652h7.18A2.245 2.245 0 0 0 22 12.017v-7.13a2.248 2.248 0 0 0-2.244-2.243Zm-8.092-.155c.79-.728 1.995-1.161 3.287-1.161 1.274 0 2.462.414 3.262 1.136.004.004.018.029.018.072v7.853c0 .03-.005.062-.045.085-.021.014-.078.037-.152-.003-.911-.48-1.978-.736-3.084-.736-1.197 0-2.348.31-3.287.855v-8.1Zm-7.896.047c0-.04.012-.065.018-.072.8-.722 1.989-1.136 3.262-1.136 1.29 0 2.496.433 3.287 1.161v8.1c-.94-.543-2.09-.854-3.287-.854-1.106 0-2.172.255-3.083.736-.075.04-.131.016-.153.003-.039-.023-.045-.055-.045-.085V2.536ZM9.42 12.93H2.243a.915.915 0 0 1-.914-.914v-7.13c0-.505.41-.914.914-.914h.196v6.416c0 .507.257.965.688 1.224.445.268.99.28 1.46.033.72-.38 1.57-.582 2.46-.582 1.273 0 2.46.42 3.252 1.128a.902.902 0 0 1-.878.739Zm11.249-.914c0 .504-.41.914-.913.914h-7.18a.903.903 0 0 1-.878-.739c.792-.708 1.98-1.128 3.252-1.128.89 0 1.741.201 2.462.582a1.476 1.476 0 0 0 1.46-.032c.43-.26.688-.717.688-1.224V3.972h.196c.505 0 .913.41.913.914v7.13Z" fill="currentColor"></path></svg>
                            <div className="heading2">Academy</div>
                        </div>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminDashboard;
