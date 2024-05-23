import React, { useState, useEffect, useRef } from 'react';
import { slider } from './Schemas/images';

const Slider = () => {

  const delay = 2000;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const isPaused = useRef(false);

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
      prevIndex === slider.length - 1 ? 0 : prevIndex + 1
    );
  }


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
        {slider.map((imageName, index) => (
          <div className="slide" onMouseEnter={pause} onMouseLeave={play} key={index} style={{ backgroundColor: 'var(--CodeThree)' }} >
            <div className="slideflex">
              <div className="sftwo">
                <img src={imageName} alt={`Slide ${index+1}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshowDots">
         {slider.map((_, idx) => (
                <div key={idx} className={`slideshowDot${index === idx ? " active1" : ""}`} onClick={() => { setIndex(idx); }}></div>
          ))}
      </div>
    </div>
  );
};

export default Slider;