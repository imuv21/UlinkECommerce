import React, { useState } from 'react';

const MultiValueInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [values, setValues] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleValues = () => {
    const newValues = inputValue.split(',').map(val => val.trim()).filter(val => val);
    setValues(newValues);
    setInputValue('');
    console.log(values);
  };

  return (
    <div className='home flexcol wh'>
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter values separated by commas" />
      <button onClick={handleValues}>Get values</button>
      <div>
        <h4>Values:</h4>
        <ul>
          {values.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiValueInput;
