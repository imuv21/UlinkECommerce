import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { businessSchema } from '../../Schemas/validationSchema';
const schema = yupResolver(businessSchema);

const SellerComProfile = () => {

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: schema,
    });

    //profile edit functionality
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDoc, setIsEditingDoc] = useState(false);
    const onSubmit = (data) => {
        setIsEditing(false);
        console.log(data);
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleEditClickDoc = () => {
        setIsEditingDoc(true);
    };
    const cancel = () => {
        setIsEditing(false);
    }
    const cancelDoc = () => {
        setIsEditingDoc(false);
    }

    //file upload functionality
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedFormats = ['jpg', 'jpeg', 'png', 'tif', 'pdf'];
            const fileFormat = file.name.split('.').pop().toLowerCase();
            if (file.size <= 10 * 1024 * 1024 && allowedFormats.includes(fileFormat)) {
                setSelectedFile(file);
            } else {
                alert('Invalid file format or size. Please upload a file within 10MB and with a JPG, JPEG, PNG, TIF, or PDF format.');
            }
        }
    };
    const handleDeleteFile = () => {
        setSelectedFile(null);
    };


    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Company Profile</title>
            </Helmet>
            <div className="procont">

                <div className="flexcol" style={{ gap: '20px' }}>
                    <form className="profile-sel-box" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><BusinessIcon /> <div className="heading">Business Profile</div></div>
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
                                        <Controller name="whatsappnumber" control={control} defaultValue={user.whatsappnumber || ''} render={({ field }) => <input className="box flex" autoComplete='off' placeholder='Enter your whatsapp number' {...field} />} />
                                    </div>

                                    {(errors.whatsappnumber) &&
                                        <div className="flex wh">
                                            <div className="flex wh">
                                            </div>
                                            <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                                                <div className='error'>{errors.whatsappnumber?.message}</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="flex" style={{ gap: '50px', justifyContent: 'start', width: '30%' }}>
                                <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                    <div className='heading2'>Company Name</div>
                                    <div className='heading2'>Building Number</div>
                                    <div className='heading2'>Street Name</div>
                                    <div className='heading2'>City</div>
                                    <div className='heading2'>State</div>
                                    <div className='heading2'>Country Of Operation</div>
                                    <div className='heading2'>Post/Zip Code </div>
                                    <div className='heading2'>Company description</div>
                                    <div className='heading2'>Name</div>
                                    <div className='heading2'>Whatsapp</div>
                                </div>
                                <div className="flexcol wh" style={{ alignItems: 'start', gap: '10px' }}>
                                    <div className='heading2'>ulinkit</div>
                                    <div className='heading2'>3534531</div>
                                    <div className='heading2'>Street Name</div>
                                    <div className='heading2'>City</div>
                                    <div className='heading2'>State</div>
                                    <div className='heading2'>Country Of Operation</div>
                                    <div className='heading2'>4355435</div>
                                    <div className='heading2'>Company description</div>
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
                        <div className="flex wh" style={{ gap: '10px', justifyContent: 'start' }}><div className="heading2"> <div className="descrip2">To change your company name please contact Ulinkit at support@ulinkit.com</div> </div></div>
                    </form>

                    <form className="profile-sel-box" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flexcol wh" style={{ gap: '5px' }}>
                            <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                                <div className="flex" style={{ gap: '10px' }}>
                                    <DescriptionIcon /> <div className="heading">Add Your Business Documents</div>
                                </div>
                                {(isEditingDoc === false) && <div className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={handleEditClickDoc}>Edit</div>}
                            </div>
                            {(isEditingDoc === true) && <div className="flex-start" style={{ gap: '5px', justifyContent: 'start', width: '100%' }}>
                                <div className="descrip2">We need the following documents to verify your business and give you access to all Tradeling features. We will get in touch with you when these documents need to be renewed.</div>
                            </div>}
                        </div>

                        {isEditingDoc ? (
                            <Fragment>
                                <div className="flexcol" style={{ gap: '20px', alignItems: 'start', width: '100%' }}>
                                    <div className="flexcol wh" style={{ gap: '5px' }}>
                                        <div className="heading3 wh">Business registration document</div>
                                        <div className="descrip wh">Upload a copy of a relevant business registration document so that we may verify you as an official business. This can be your business license, trade license, commercial register.</div>
                                    </div>
                                    <label className="br-file-upload">
                                        {selectedFile ? (
                                            <div className='afterUpload flex'>
                                                <div className="heading2 wh">{selectedFile.name}</div>
                                                <DeleteForeverIcon onClick={handleDeleteFile} />
                                            </div>
                                        ) : (
                                            <div className='beforeUpload flex'>
                                                <UploadFileIcon />
                                                <div className='flexcol wh'>
                                                    <div className="heading2 wh">Attach File</div>
                                                    <div className="descrip wh">Only JPG, JPEG, PNG, TIF, and PDF formats at 10MB or less</div>
                                                </div>
                                            </div>
                                        )}
                                        <input type="file" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </Fragment>
                        ) : (
                            <div className="flexcol-start" style={{ gap: '5px', justifyContent: 'start', width: '100%' }}>
                                <div className="heading2">Business documents let us verify you as a real business and allow you to interact with features of the site.</div>
                                <div className="heading2">To change your business documents please contact Ulinkit at support@ulinkit.com</div>
                            </div>
                        )}
                        {isEditingDoc &&
                            <div className="flex" style={{ gap: '20px' }}>
                                <div className="btn flex box" type='submit' style={{ width: '100px', cursor: 'pointer' }}>Save</div>
                                <div className="btn flex box" style={{ width: '100px', cursor: 'pointer' }} onClick={cancelDoc} >Cancel</div>
                            </div>
                        }
                    </form>
                </div>

            </div>
        </div>
    )
}

export default SellerComProfile;