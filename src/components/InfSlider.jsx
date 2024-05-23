import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { infslider } from './Schemas/images';

const InfSlider = () => {

    return (
        <div className="slider-inf">
            <div className="slide_track-inf">
                {infslider.map((imageName) => (
                    <div className="slide-inf" key={uuidv4()}>
                        <img src={imageName} className="smallImage" alt={imageName} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InfSlider