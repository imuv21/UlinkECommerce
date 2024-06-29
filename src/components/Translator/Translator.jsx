import React, { useState, useEffect } from 'react';
import './Translator.css';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../Schemas/cate';

const Translator = () => {

  const [selectedSupOption, setSelectedSupOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [selectedMiniSubOption, setSelectedMiniSubOption] = useState('');
  const [selectedMicroSubOption, setSelectedMicroSubOption] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setIsSubmitEnabled(selectedSupOption && selectedSubOption && selectedMiniSubOption && selectedMicroSubOption);
  }, [selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption]);

  const handleSupOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedSupOption(selectedOption);
    setSelectedSubOption('');
    setSelectedMiniSubOption('');
    setSelectedMicroSubOption('');
  };
  const handleSubOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedSubOption(selectedOption);
    setSelectedMiniSubOption('');
    setSelectedMicroSubOption('');
  };
  const handleMiniSubOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedMiniSubOption(selectedOption);
    setSelectedMicroSubOption('');
  };
  const handleMicroSubOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedMicroSubOption(selectedOption);
  };
  const getMarginValue = () => {
    switch (selectedSupOption) {

      case "ConsumerElectronics":
        return 2.5;
      case "FashionAndAccessories":
        return 10;
      case "Automotive":
        return 5;
      case "FoodAndBeverages":
        return 2;
      case "BabyCenter":
        return 5;
      case "BeautyAndFragrances":
        return 2.5;
      case "HomeGardenAndFurniture":
        return 5;
      case "MachineryAndEquipment":
        return 5;
      case "OfficeAndStationery":
        return 3;
      case "PersonalCare":
        return 3;
      case "PetAndAnimalCare":
        return 5;
      case "SportsAndFitness":
        return 5;
      case "Toys":
        return 5;
      case "ToolsAndHomeImprovement":
        return 5;

      default:
        return 0;
    }
  };
  const commission = getMarginValue();
  const categoryPath = `${selectedSupOption}/${selectedSubOption}/${selectedMiniSubOption}/${selectedMicroSubOption}`;

  //convert pascal to readable
  const convertPascalToReadable = (text) => {
    return text.replace(/([A-Z])/g, ' $1').trim();
  };

  //search
  const handleSearchChange = (event) => {
    const query = event.target.value;
    const sanitizedQuery = query.replace(/\s+/g, '');
    setSearchQuery(query);
    setSearchValue(sanitizedQuery);

    if (sanitizedQuery.length > 0) {
      const filteredSuggestions = [];
      supOptions.forEach((sup) => {
        const subCategories = subOptions[sup] || [];
        subCategories.forEach((sub) => {
          const miniSubCategories = miniSubOptions[sub] || [];
          miniSubCategories.forEach((miniSub) => {
            const microSubCategories = microSubOptions[miniSub] || [];
            microSubCategories.forEach((microSub) => {
              const fullPath = `${sup}/${sub}/${miniSub}/${microSub}`;
              if (fullPath.toLowerCase().includes(sanitizedQuery.toLowerCase())) {
                filteredSuggestions.push(fullPath);
              }
            });
          });
        });
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const [sup, sub, miniSub, microSub] = suggestion.split('/');
    setSelectedSupOption(sup);
    setSelectedSubOption(sub);
    setSelectedMiniSubOption(miniSub);
    setSelectedMicroSubOption(microSub);
    setSearchQuery('');
    setSearchValue('');
    setSuggestions([]);
  };


  return (
    <div className="flexcol home wh">

      <input type="text" className='box flex' placeholder="Search category here..."  value={searchQuery} onChange={handleSearchChange} />

      {suggestions.length > 0 && (
        <div className="flexcol wh">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex-start wh" style={{ cursor: 'pointer' }} onClick={() => handleSuggestionClick(suggestion)}>
              {convertPascalToReadable(suggestion)}
            </div>
          ))}
        </div>
      )}

      <div className="flex-start wh" style={{ gap: '10px' }}>
        <select onChange={handleSupOptionChange} className="box flex">
          <option value="">Select category</option>
          {supOptions.map((option, index) => (
            <option key={index} value={option}>{option.length > 25 ? `${convertPascalToReadable(option.substring(0, 25))}...` : convertPascalToReadable(option)}</option>
          ))}
        </select>
        <select onChange={handleSubOptionChange} className="box flex">
          <option value="">Select sub category</option>
          {subOptions[selectedSupOption] && subOptions[selectedSupOption].map((option, index) => (
            <option key={index} value={option}>{option.length > 25 ? `${convertPascalToReadable(option.substring(0, 25))}...` : convertPascalToReadable(option)}</option>
          ))}
        </select>
        <select onChange={handleMiniSubOptionChange} className="box flex">
          <option value="">Select an option</option>
          {miniSubOptions[selectedSubOption] && miniSubOptions[selectedSubOption].map((option, index) => (
            <option key={index} value={option}>{option.length > 25 ? `${convertPascalToReadable(option.substring(0, 25))}...` : convertPascalToReadable(option)}</option>
          ))}
        </select>
        <select onChange={handleMicroSubOptionChange} className="box flex">
          <option value="">Select sub option</option>
          {microSubOptions[selectedMiniSubOption] && microSubOptions[selectedMiniSubOption].map((option, index) => (
            <option key={index} value={option}>{option.length > 25 ? `${convertPascalToReadable(option.substring(0, 25))}...` : convertPascalToReadable(option)}</option>
          ))}
        </select>
      </div>

      <div className="flex-start wh" style={{ gap: '10px' }}>
        <div className="greenerror">{errorMessage ? errorMessage : isSubmitEnabled ? `Selected path: ${categoryPath}` : 'Please make all selections'}</div>
        {selectedSupOption && (<div className='greenerror'>Margin value: {commission}%</div>)}
      </div>

    </div>
  );
};

export default Translator;
