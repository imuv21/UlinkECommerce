import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const InfSlider = () => {

    const [images, setImages] = useState({});
    useEffect(() => {
        const importImages = async () => {
            const importedImages = {};
            const imageContext = import.meta.glob('../assets/jpg-slider/*.{png,jpg,jpeg,svg,webp}');
            for (const key in imageContext) {
                const imageName = key.replace('../assets/jpg-slider/', '');
                importedImages[imageName] = (await imageContext[key]()).default;
            }
            setImages(importedImages);
        };
        importImages();
    }, []);


    return (
        <div className="slider-inf">
            <div className="slide_track-inf">
                {Object.keys(images).map((imageName) => (
                    <div className="slide-inf" key={uuidv4()}>
                        <img src={images[imageName]} className="smallImage" alt={imageName} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InfSlider