import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { urls, infslider } from './Schemas/images';
import LazyLoad from 'react-lazyload';

const InfSlider = () => {

    const defaultimg = urls[1];

    return (
        <div className="slider-inf">
            <div className="slide_track-inf">
                {infslider.map((imageName, index) => (
                    <div className="slide-inf" key={uuidv4()}>
                        <LazyLoad height={130} offset={100} placeholder={<img src={defaultimg} alt="Loading..." />}>
                            <img src={imageName} className="smallImage" alt={`image ${index + 1}`} loading="lazy" />
                        </LazyLoad>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InfSlider