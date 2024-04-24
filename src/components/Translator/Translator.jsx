import React, { useState, useEffect } from 'react';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../Schemas/cate';


const Translator = () => {

  const [selectedSupOption, setSelectedSupOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [selectedMiniSubOption, setSelectedMiniSubOption] = useState('');
  const [selectedMicroSubOption, setSelectedMicroSubOption] = useState('');
  const [isSecondSelectEnabled, setIsSecondSelectEnabled] = useState(false);
  const [isThirdSelectEnabled, setIsThirdSelectEnabled] = useState(false);
  const [isFourthSelectEnabled, setIsFourthSelectEnabled] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsSubmitEnabled(selectedSupOption && selectedSubOption && selectedMiniSubOption && selectedMicroSubOption);
  }, [selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption]);


  const handleSupOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedSupOption(selectedOption);
    setIsSecondSelectEnabled(true);
    setIsThirdSelectEnabled(false);
    setIsFourthSelectEnabled(false);
    setSelectedSubOption('');
    setSelectedMiniSubOption('');
    setSelectedMicroSubOption('');
  };
  const handleSubOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedSubOption(selectedOption);
    setIsThirdSelectEnabled(true);
    setIsFourthSelectEnabled(false);
    setSelectedMiniSubOption('');
    setSelectedMicroSubOption('');
  };
  const handleMiniSubOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedMiniSubOption(selectedOption);
    setIsFourthSelectEnabled(true);
    setSelectedMicroSubOption('');
  };
  const handleMicroSubOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedMicroSubOption(selectedOption);
  };
  const getMarginValue = () => {
    switch (selectedSupOption) {
      case "apple":
        return 0.05;
      case "orange":
        return 0.03;
      case "banana":
        return 0.1;
      default:
        return 0;
    }
  };
  const margin = getMarginValue();
  const path = `${selectedSupOption}/${selectedSubOption}/${selectedMiniSubOption}/${selectedMicroSubOption}`;

  return (
    <div className='home felxcol mt'>

      <select onChange={handleSupOptionChange} disabled={isSecondSelectEnabled}>
        <option value="">Select an option</option>
        {supOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <select onChange={handleSubOptionChange} disabled={!isSecondSelectEnabled || isThirdSelectEnabled}>
        <option value="">Select a sub option</option>
        {subOptions[selectedSupOption] && subOptions[selectedSupOption].map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <select onChange={handleMiniSubOptionChange} disabled={!isThirdSelectEnabled || isFourthSelectEnabled}>
        <option value="">Select minisub option</option>
        {miniSubOptions[selectedSubOption] && miniSubOptions[selectedSubOption].map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <select onChange={handleMicroSubOptionChange} disabled={!isFourthSelectEnabled  || !!selectedMicroSubOption}>
        <option value="">Select micro-sub option</option>
        {microSubOptions[selectedMiniSubOption] && microSubOptions[selectedMiniSubOption].map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      {selectedSupOption === "apple" && (
        <input type="text" placeholder='enter apple...' />
      )}
      {selectedSupOption === "orange" && (
        <input type="text" placeholder='enter orange...' />
      )}
      {selectedSupOption === "banana" && (
        <input type="text" placeholder='enter banana...' />
      )}

      <div>
        {errorMessage ? errorMessage : isSubmitEnabled ? `Selected path: ${path}` : 'Please make all selections'}
        {selectedSupOption && ( <p>Margin value: {margin}</p> )}
      </div>

      <button type="submit" disabled={!isSubmitEnabled}>Submit</button>

    </div>
  );
};

export default Translator;
