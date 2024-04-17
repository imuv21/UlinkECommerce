import React from 'react';

const Blaaa = () => {
  // Retrieve jsonData from local storage
  const jsonData = JSON.parse(localStorage.getItem('jsonData'));

  return (
    <div className="flexcol wh home">
      {jsonData.map((item, index) => (
        <div key={index}>
          <h3>Product {index + 1}</h3>
          <img src={item.ImgUrl} alt="Product Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          <p>Name: {item.productName}</p>
          <p>Category: {item.category}</p>
          <p>Available quantity: {item.availableQuantity}</p>
          <p>Min order quantity: {item.minOrderQuant}</p>
          <p>Unit price: {item.unitPrice}</p>
          <p>Sale price: {item.salePrice}</p>
        </div>
      ))}
    </div>
  );
};

export default Blaaa;
