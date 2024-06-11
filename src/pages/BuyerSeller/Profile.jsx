import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Link, useNavigate } from 'react-router-dom';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { allCountries } from '../../components/Schemas/countryCodes';
import { profileSchema } from '../../components/Schemas/validationSchema';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const schema = yupResolver(profileSchema);

const Profile = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const token = useSelector((state) => state.auth.token);

    const updatePassword = async (e) => {
        e.preventDefault();
        const email = user.email;
        try {
            const response = await axios.post(
                `${BASE_URL}/user/update-details?email=${email}`,
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status) {
                alert(response.data.message); 
                navigate('/verify-update-password');
            } else {
                console.error("Failed to send OTP verification mail");
                alert("Failed to send OTP verification mail");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert("An error occurred while updating the password.");
        }
    };

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: schema,
    });

    //profile edit functionality
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = (data) => {
        setIsEditing(false);
        console.log(data);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const cancel = () => {
        setIsEditing(false);
    }


    //select country code from data 
    const [ccode, setCcode] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    useEffect(() => {
        const formattedCountries = allCountries.map(country => ({
            name: country[0],
            iso2: country[1],
            dialCode: country[2]
        }));

        setCcode(formattedCountries);
    }, []);
    const handleCountryChange = (event) => {
        const countryCode = event.target.value;
        const selected = ccode.find(country => country.iso2 === countryCode);
        setSelectedCountry(selected);
    }




    return (
        <div className="flexcol wh product-detail">
            <Helmet>
                <title>My Profile</title>
            </Helmet>
            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading5">My Profile</div> <Link to="/seller-dashboard/seller-home" className='heading3'>Back</Link>
            </div>

            {isAuthenticated && (
                <div className="procont">

                    <form className="profile-sel-box" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><AccountCircleIcon /> <div className="heading3">My Profile</div></div>
                        {isEditing ? (
                            <div className="flex" style={{ gap: '50px', justifyContent: 'start', width: '30%' }}>
                                <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                    <div className="flex wh" style={{ gap: '30px' }}>
                                        <Controller name="firstname" control={control} defaultValue={user.firstname || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your first name' {...field} />} />
                                        <Controller name="lastname" control={control} defaultValue={user.lastname || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your last name' {...field} />} />
                                    </div>

                                    {(errors.firstname || errors.lastname) &&
                                        <div className="flex wh">
                                            <div className="flex wh">
                                                <div className='error'>{errors.firstname?.message}</div>
                                            </div>
                                            <div className="flex wh">
                                                <div className='error'>{errors.lastname?.message}</div>
                                            </div>
                                        </div>
                                    }

                                    <div className='flex wh' style={{ gap: '30px' }}>
                                        {/* <Controller name="wpcountrycode" control={control} defaultValue={userData.wpcountrycode || ''} render={({ field }) => (
                                            <select className="box flex" value={userData.wpcountrycode || ''} onChange={handleChange}  {...field}>
                                                <option value="">Country code</option>
                                                {ccode.map(country => (
                                                    <option key={country.iso2} value={country.dialCode}>
                                                        {`${country.name} (+${country.dialCode})`}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                        /> */}
                                        <Controller name="whatsappnumber" control={control} defaultValue={user.whatsappnumber || ''} render={({ field }) => <input className="box flex" autoComplete='off' placeholder='Enter your whatsapp number' {...field} />} />
                                    </div>

                                    {(errors.whatsappnumber) &&
                                        <div className="flex wh">
                                            <div className="flex wh">
                                                {/* <div className='error'>{errors.wpcountrycode?.message}</div> */}
                                            </div>
                                            <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                                <div className='error'>{errors.whatsappnumber?.message}</div>
                                            </div>
                                        </div>
                                    }

                                    {/* <Controller name="language" control={control} defaultValue="" render={({ field }) => (
                                        <select className="box flex" value={user.language || ''} onChange={handleChange} {...field}>
                                            <option value="">Select your language</option>
                                            <option value="English">English</option>
                                            <option value="Hindi">Hindi</option>
                                        </select>
                                    )}
                                    />
                                    {errors.language && <div className='error'>{errors.language.message}</div>} */}
                                </div>
                            </div>
                        ) : (
                            <div className="flex" style={{ gap: '50px', justifyContent: 'start', width: '30%' }}>
                                <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                    <div className='heading2'>Name</div>
                                    <div className='heading2'>Whatsapp</div>
                                </div>
                                <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                    <div className="heading2">{user.firstname} {user.lastname}</div>
                                    <div className='heading2'>{user.whatsappnumber}</div>
                                </div>
                            </div>
                        )}
                        {isEditing ? (
                            <div className="flex" style={{ gap: '20px' }}>
                                <div className="btn flex box" type='submit' style={{ width: '100px', cursor: 'pointer' }}>Save</div>
                                <div className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={cancel} >Cancel</div>
                            </div>
                        ) : (
                            <div className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={handleEditClick}>Edit</div>
                        )}
                    </form>

                    <div className="profile-sel-box">
                        <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><KeyIcon /> <div className="heading3">Security</div></div>
                        <div className="flex" style={{ gap: '50px', justifyContent: 'start', width: '30%' }}>
                            <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                <div className='heading2' style={{ whiteSpace: 'nowrap' }}>Email address</div>
                                <div className='heading2' style={{ whiteSpace: 'nowrap' }}>Mobile number</div>
                            </div>
                            <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                <div className="heading2 wh flex-start unupublished">{user.email} <VerifiedIcon style={{ color: 'rgb(0, 190, 0)' }} /></div>
                                <div className='heading2 wh flex-start unupublished'>{user.number} <NewReleasesIcon style={{ color: 'rgb(255, 97, 73)' }} /></div>
                            </div>
                        </div>

                        <div className="flex wh" style={{ justifyContent: 'start', gap: '15px' }}>
                            <Link to={'/update-number'} className="btn flex box" style={{ width: '150px', cursor: 'pointer' }}>Update number</Link>
                            <Link to={'/update-email'} className="btn flex box" style={{ width: '150px', cursor: 'pointer' }}>Update email</Link>
                            <div className="btn flex box" onClick={updatePassword} style={{ width: '150px', cursor: 'pointer' }}>Update password</div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Profile
