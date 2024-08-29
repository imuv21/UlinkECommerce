import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { allCountries } from '../../components/Schemas/countryCodes';
import { profileSchema } from '../../components/Schemas/validationSchema';
import { updateUserDetails } from '../../Redux/AuthReducer';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';


const schema = yupResolver(profileSchema);

const Profile = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: schema,
    });

    //profile edit functionality
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {

        if (isSubmitting) return;
        setIsSubmitting(true);

        const profile = {
            firstname: data.firstname,
            lastname: data.lastname,
            wpcountrycode: data.wpcountrycode,
            whatsappnumber: data.whatsappnumber,
        };

        try {
            await dispatch(updateUserDetails(profile)).unwrap();
            toast(<div className='toaster'> < VerifiedIcon /> {`Profile updated successfully!`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } catch (error) {

            toast(<div className='toaster'> < NewReleasesIcon /> {`Error updating profile`}</div>,
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitting(false);
            setIsEditing(false);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const cancel = () => {
        setIsEditing(false);
    }

    //redirect
    const getDashboardLink = () => {
        if (user.role === "Seller") {
            return "/seller-dashboard/seller-home";
        } else if (user.role === "Buyer") {
            return "/buyer-dashboard";
        }
        return "/";
    };


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
                <title>Your Profile | Ulinkit - Manage Your Account Information</title>
                <meta name="description" content="View and update your personal information on Ulinkit. Manage your account details, preferences, and settings for a personalized shopping experience." />
                <link rel="canonical" href="https://www.ulinkit.com/profile" />
            </Helmet>
            <article className="flex wh" style={{ justifyContent: 'space-between' }}>
                <h1 className="heading5">My Profile</h1> <Link to={getDashboardLink()} className='heading3'>Back</Link>
            </article>

            {isAuthenticated && (
                <div className="procont">

                    <form className="profile-sel-box" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><AccountCircleIcon /> <div className="heading3">My Profile</div></div>
                        {isEditing ? (
                            <div className="flex profileinput" style={{ gap: '50px', justifyContent: 'start' }}>
                                <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                    <div className="flex wh" style={{ gap: '30px' }}>
                                        <Controller name="firstname" control={control} defaultValue={user.firstname || ''} render={({ field }) => <input autoComplete='off' className="box  flex" placeholder='Enter your first name' {...field} />} />
                                        <Controller name="lastname" control={control} defaultValue={user.lastname || ''} render={({ field }) => <input autoComplete='off' className="box flex" placeholder='Enter your last name' {...field} />} />
                                    </div>


                                    {(errors.firstname || errors.lastname) &&
                                        <div className="flex wh">
                                            <div className="flex wh">
                                                <p className='error'>{errors.firstname?.message}</p>
                                            </div>
                                            <div className="flex wh">
                                                <p className='error'>{errors.lastname?.message}</p>
                                            </div>
                                        </div>
                                    }

                                    <div className='flex wh' style={{ gap: '30px' }}>
                                        <Controller name="wpcountrycode" control={control} defaultValue={user.wpcountrycode || ''} render={({ field }) => (
                                            <select className="box  flex" value={user.wpcountrycode || ''} onChange={handleCountryChange}  {...field}>
                                                <option value="">Country code</option>
                                                {ccode.map(country => (
                                                    <option key={country.iso2} value={country.dialCode}>
                                                        {`${country.name} (+${country.dialCode})`}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                        />
                                        <Controller name="whatsappnumber" control={control} defaultValue={user.whatsappnumber || ''} render={({ field }) => <input className="box  flex" autoComplete='off' placeholder='Enter your whatsapp number' {...field} />} />
                                    </div>

                                    {(errors.whatsappnumber || errors.wpcountrycode) &&
                                        <div className="flex wh">
                                            <div className="flex wh">
                                                <p className='error'>{errors.wpcountrycode?.message}</p>
                                            </div>
                                            <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                                <p className='error'>{errors.whatsappnumber?.message}</p>
                                            </div>
                                        </div>
                                    }
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
                                    <div className='heading2'>+{user.wpcountrycode}-{user.whatsappnumber}</div>
                                </div>
                            </div>
                        )}
                        {isEditing ? (
                            <div className="flex" style={{ gap: '20px' }}>
                                <button className="btn flex box" type='submit' style={{ width: '100px', cursor: 'pointer' }} disabled={isSubmitting}> {isSubmitting ? 'Saving...' : 'Save'}</button>
                                <button className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={cancel}>Cancel</button>
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
                                <div className='heading2 wh flex-start unupublished'>+{user.countryCode}-{user.number} <NewReleasesIcon style={{ color: 'rgb(255, 97, 73)' }} /></div>
                            </div>
                        </div>

                        <div className="flex wh" style={{ justifyContent: 'start', gap: '15px' }}>
                            <Link to={'/update-number'} className="btn flex box" style={{ width: '150px', cursor: 'pointer' }}>Update number</Link>
                            <Link to={'/update-email'} className="btn flex box" style={{ width: '150px', cursor: 'pointer' }}>Update email</Link>
                            <Link to={'/update-password'} className="btn flex box" style={{ width: '150px', cursor: 'pointer' }}>Update password</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
