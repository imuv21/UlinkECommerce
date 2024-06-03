
import React, { useState, useEffect } from 'react';
import currencySymbols from '../Schemas/currencySymbols';
import axios from 'axios';

const Translator = () => {

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [flags, setFlags] = useState([]);

  // Mapping into select
  useEffect(() => {
    const fetchCurrencyOptions = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const data = response.data;
        const currencies = Object.keys(data.rates);
        setCurrencyOptions(currencies);
      } catch (error) {
        console.error('Error fetching currency options:', error);
      }
    };
    fetchCurrencyOptions();
  }, []);

  // Function to convert currency
  const convertCurrency = async () => {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = response.data;
      const rate = data.rates[toCurrency];
      const converted = (amount * rate).toFixed(2);
      setConvertedAmount(converted);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to fetch flags
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const flagsData = response.data.map(country => ({
          name: country.name.common,
          flagUrl: country.flags.png,
        }));
        setFlags(flagsData);
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };

    fetchFlags();
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    convertCurrency();
  };

  return (
    <div className='home wh flexcol'>
      <h2>Currency Converter</h2>

      <form onSubmit={handleSubmit}>
        <input type="number" value={amount} onChange={handleAmountChange} placeholder="Enter amount" />

        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencyOptions.map((currency) => (
            (currencySymbols[currency]) &&
            <option key={currency} value={currency}>
              {currency} ({currencySymbols[currency]})
            </option>
          ))}
        </select>

        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencyOptions.map((currency) => (
            (currencySymbols[currency]) &&
            <option key={currency} value={currency}>
              {currency} ({currencySymbols[currency]})
            </option>
          ))}
        </select>

        <button type="submit">Convert</button>
      </form>

      {convertedAmount && (
        <p>
          {currencySymbols[fromCurrency]}{amount} {fromCurrency} equals to {currencySymbols[toCurrency]}{convertedAmount} {toCurrency}
        </p>
      )}

      {flags.map((flag, index) => (
        <div className="flex" key={index}>
          <img style={{ width: '200px', height: '200px' }} src={flag.flagUrl} alt={flag.name} />
          <div>{flag.name}</div>
        </div>
      ))}

    </div>
  );
};

export default Translator;
