

import React, { useState, useEffect } from 'react';

const Image = () => {

    const [images, setImages] = useState({});
    useEffect(() => {
        const importImages = async () => {
            const importedImages = {};
            const imageContext = import.meta.glob('../assets/*.{png,jpg,jpeg,svg,webp}');
            for (const key in imageContext) {
                const imageName = key.replace('../assets/', '');
                importedImages[imageName] = (await imageContext[key]()).default;
            }
            setImages(importedImages);
        };

        importImages();
    }, []);

    return (
        <div className='flexcol wh' style={{ height: '100vh', gap: '20px' }}>
            {Object.keys(images).map((imageName, index) => (
                <img key={index} src={images[imageName]} alt={imageName} />
            ))}
        </div>
    );
};

export default Image;
