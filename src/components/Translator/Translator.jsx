import React, { useState } from 'react';
import './Translator.css';

const Translator = () => {
  const imageSrc = "https://img.freepik.com/free-photo/fantasy-style-galaxy-background_23-2151114372.jpg";
  const [isHovered, setIsHovered] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div className="flexcol home wh">
      <div 
        className="arrow-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="image-wrapper">
          <img src={imageSrc} alt="arrow" className="arrow-image" />
        </div>
      </div>
      {isHovered && (
        <div className="popupzooming" style={{ backgroundImage: `url(${imageSrc})`, backgroundPosition: backgroundPosition }}>
        </div>
      )}
    </div>
  );
};

export default Translator;
