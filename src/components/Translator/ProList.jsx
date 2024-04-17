import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDivCount } from '../context/SuperContext';

const ProList = () => {
  const { divCount } = useDivCount();
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const [clickedIndex, setClickedIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormData(savedFormData.map(item => ({ ...item, images: item.images || [] })));
  }, []);

  const handleEdit = (index) => {
    navigate(`/editproduct/${index}`);
  };

  const handleDelete = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    setFormData(updatedFormData);
  };



  //popup
  const [showPopup, setShowPopup] = useState(false);
  const handleAddAddress = (index) => {
    setClickedIndex(index);
    setSelectedItem(formData[index]); 
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='flexcol wh mt home'>
      {formData.length === 0 ? (
        <p>No products</p>
      ) : (
        formData.map((item, index) => (
          <div key={index}>
            <p onClick={() => handleAddAddress(index)}>Name: {item.inputone}</p>
            <p>Input two: {item.inputtwo}</p>
            {[...Array(divCount)].map((_, index) => (
              <Fragment key={index}>
                <p>q: {item[`quantity_${index}`]}</p>
                <p>p: {item[`price_${index}`]}</p>
                <p>sp: {item[`salePrice_${index}`]}</p>
              </Fragment>
            ))}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))
      )}

      {showPopup && (
        <div className='popup-parent'>
          <form className='popup-child'>
            <div style={{ height: '500px', overflow: 'auto' }}>
              <div className="popupform">
                <div className="heading wh">Add New Address</div>
                <div className="flex" style={{ gap: '20px' }}>
                <p>Name: {selectedItem.inputone}</p>
                <p>Input two: {selectedItem.inputtwo}</p>
                  <button className='btn box2 flex' style={{ width: 'fit-content' }} type="button" ><div className="heading2">Save Address</div></button>
                  <button onClick={handleClosePopup} className='btn box2 flex' style={{ width: 'fit-content' }} type="button" ><div className="heading2">Cancel</div></button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProList;
