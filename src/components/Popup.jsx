import React from 'react';
import gif from '../assets/json/gifpopup.gif';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Popup = ({ onClose }) => {
    return (
        <div className='homepopup'>
            <div className="popupoverlay">
            <img src={gif} alt="offer" />
            <div className='homepopup-btn' onClick={onClose}><HighlightOffIcon /></div> 
            </div>
        </div>
    );
};

export default Popup;
