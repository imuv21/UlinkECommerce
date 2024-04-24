import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';


const ProList = () => {
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


  const renderBulletPoints = (bulletPoints) => {
    const bulletPointArray = bulletPoints.split('.').filter(point => point.trim() !== '');
    return (
      <ul>
        {bulletPointArray.map((point, index) => (
          <li key={index}>{point.trim()}.</li>
        ))}
      </ul>
    );
  };

  return (
    <div className='flexcol wh mt home'>
      {formData.length === 0 ? (
        <p>No products</p>
      ) : (
        formData.map((item, index) => (
          <div key={index}>
            { item.inputone && <p onClick={() => handleAddAddress(index)}>Apple: {item.inputone}</p>}
            { item.inputtwo && <p>Orange: {item.inputtwo}</p>}
            { item.bulletPoints && renderBulletPoints(item.bulletPoints)}
            {item.path.length > 15 ? `${item.path.substring(0, 15)}...` : item.path}
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
