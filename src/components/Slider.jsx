import React, { useState, useEffect, useRef } from 'react';

const Slider = () => {

  const delay = 2000;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const isPaused = useRef(false);
  const [imagess, setImagess] = useState([]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const pause = () => {
    isPaused.current = true;
    resetTimeout();
  }

  const play = () => {
    isPaused.current = false;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      next();
    }, delay);
  }

  const next = () => {
    setIndex((prevIndex) =>
      prevIndex === Object.keys(imagess).length - 1 ? 0 : prevIndex + 1
    );
  }

  
  

  useEffect(() => {
    const importImages = async () => {
      const importedImages = {};
      const imageContext = import.meta.glob('../assets/jpeg/*.{png,jpg,jpeg,svg,webp}');
      for (const key in imageContext) {
        const imageName = key.replace('../assets/jpeg/', '');
        importedImages[imageName] = (await imageContext[key]()).default;
      }
      setImagess(importedImages);
    };
    importImages();
  }, []);

  useEffect(() => {
    if (!isPaused.current) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        next();
      }, delay);
    }
    return () => {
      resetTimeout();
    };
  }, [index, isPaused]);



  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }} >
        {Object.keys(imagess).map((imageName, index) => (
          <div className="slide" onMouseEnter={pause} onMouseLeave={play} key={index} style={{ backgroundColor: 'var(--CodeThree)' }} >
            <div className="slideflex">
              <div className="sftwo">
                <img src={imagess[imageName]} alt={imageName} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshowDots">
         {Object.keys(imagess).map((_, idx) => (
                <div key={idx} className={`slideshowDot${index === idx ? " active1" : ""}`} onClick={() => { setIndex(idx); }}></div>
          ))}
      </div>
    </div>
  );
};

export default Slider;