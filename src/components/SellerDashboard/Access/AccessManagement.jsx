import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import InfoIcon from '@mui/icons-material/Info';
import ClearIcon from '@mui/icons-material/Clear';


const AccessManagement = () => {


    const [showAccessPopup, setShowAccessPopup] = useState(false);
    const inviteUsers = () => {
        setShowAccessPopup(true);
    };
    const closeAccessPopup = () => {
        setShowAccessPopup(false);
    };


    //form popup
    const [inputValue, setInputValue] = useState('');
    const [emails, setEmails] = useState([]);
    const [role, setRole] = useState('');
    const [inviteData, setInviteData] = useState({});
    const handleRole = (e) => {
        setRole(e.target.value);
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const sendInvite = (e) => {
        e.preventDefault();
        const newValues = inputValue.split(',').map(val => val.trim()).filter(val => val);
        if (newValues.length === 0 || !role) {
            toast(<div className='toaster'> < NewReleasesIcon /> {`Please enter valid emails and select a role.`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }
        setEmails(newValues);
        setInviteData(prevInviteData => ({ ...prevInviteData, emails: newValues, role }));

        setInputValue('');
        setRole('');
        setShowAccessPopup(false);
    };

    useEffect(() => {
        console.log(inviteData);
    }, [inviteData]);

    let title = "UttamVermagrghdrhdrfhdrfhdfhsggrhrherhrehrehreheherhre";

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Access Management | Ulinkit - Control User Permissions and Access</title>
                <meta name="description" content="Manage user permissions and access levels on Ulinkit. Configure roles and control access to various features to ensure secure and efficient operation of your account." />
                <link rel="canonical" href="https://www.ulinkit.com/seller-dashboard/access-management" />
            </Helmet>
            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading5">Access Management</div> <button onClick={inviteUsers} className='btn box flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}>Invite Users</button>
            </div>
            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="flex" style={{ gap: '10px' }}>
                    <InfoIcon style={{ color: 'gray' }} />
                    <p className="descrip">Ulinkit values your security. Please only add users to your account that you trust with your business information. <br /> Roles allow you to customize the experience and permissions of accounts invited to your business.</p>
                </div>
                <Link to='/seller-dashboard/permissions' className='hoverr'>Learn more about roles</Link>
            </div>
            <div className="access">
                <div className='access-col'>
                    <div className="heading-ac">Name</div>
                    <div className="ac-item"> {title.length > 30 ? `${title.substring(0, 30)}...` : title}</div>
                    <div className="ac-item">example</div>
                </div>
                <div className='access-col'>
                    <div className="heading-ac">Email</div>
                    <div className="ac-item">{title.length > 30 ? `${title.substring(0, 30)}...` : title}</div>
                    <div className="ac-item">example@gmail.com</div>
                </div>
                <div className='access-col'>
                    <div className="heading-ac">Role</div>
                    <div className="ac-item">Admin</div>
                    <div className="ac-item">Supervisor</div>
                </div>
                <div className='access-col'>
                    <div className="heading-ac">Status</div>
                    <div className="ac-item">Active</div>
                    <div className="ac-item">Inactive</div>
                </div>
                <div className='access-col'>
                    <div className="heading-ac">Actions</div>
                    <div className="ac-item">Edit</div>
                    <div className="ac-item">Delete</div>
                </div>
            </div>

            {showAccessPopup && (
                <div className='popup-parent'>
                    <form className='popup-child' onSubmit={sendInvite}>
                        <div className="popupform">
                            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                                <p className="heading wh">Invite Users</p>  <ClearIcon style={{ cursor: 'pointer' }} onClick={closeAccessPopup} />
                            </div>
                            <input type="text" className="box flex" value={inputValue} onChange={handleInputChange} placeholder="Enter emails (separated by commas)" required />
                            <select className='box flex' value={role} onChange={handleRole} style={{ zIndex: '999' }} name="role" id="role" required>
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="supervisor">Supervisor</option>
                            </select>
                            <div className="flex" style={{ gap: '20px' }}>
                                <button className='btn box2 flex' style={{ width: 'fit-content' }} type="submit"><div className="heading2">Send Invite</div></button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AccessManagement