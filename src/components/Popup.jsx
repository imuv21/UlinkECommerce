import React from 'react';

const Popup = ({ onClose }) => {
    return (
        <div className='homepopup'>
            <p>Welcome to Ulinkit!</p>
            <button onClick={onClose} className='homepopup-btn'>Close</button>
        </div>
    );
};

export default Popup;
