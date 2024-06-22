import React, { useState } from 'react';
import './Translator.css';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Translator = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg');
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUploadClick = () => {
        document.getElementById('avatar').click();
    };

    return (
        <div className="flex wh home">
            <div className="scp-profile-image-uploader">
                <div className="scp-image-container">
                    <img src={imageUrl} alt="Profile" className="scp-profile-image" />
                    <div className="scp-edit-icon" onClick={handleUploadClick}>
                        <AddPhotoAlternateIcon />
                    </div>
                </div>
                <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default Translator;
