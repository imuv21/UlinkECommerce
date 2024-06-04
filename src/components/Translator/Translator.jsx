// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchExchangeRates, setSelectedCurrency } from '../../Redux/currencySlice';
// import currencySymbols from '../Schemas/currencySymbols';
// import axios from 'axios';
// import './Translator.css';

// const Translator = () => {
//   const dispatch = useDispatch();
//   const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
//   const exchangeRates = useSelector(state => state.currency.exchangeRates);
//   const [flags, setFlags] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedFlag, setSelectedFlag] = useState(null);
//   const dropdownRef = useRef(null);


//   useEffect(() => {
//     dispatch(fetchExchangeRates());
//   }, [dispatch]);

//   const convertPrice = (price, fromCurrency) => {
//     const rate = exchangeRates[selectedCurrency];
//     if (!rate) return price;
//     const priceInUSD = price / exchangeRates[fromCurrency];
//     return (priceInUSD * rate).toFixed(2);
//   };

//   const products = [
//     { id: 1, name: 'Product 1', price: 1, currencyCode: 'USD' },
//     { id: 2, name: 'Product 2', price: 100, currencyCode: 'EUR' },
//     { id: 3, name: 'Product 3', price: 100, currencyCode: 'INR' },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleToggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleSelectFlag = (flag) => {
//     setSelectedFlag(flag);
//     dispatch(setSelectedCurrency(flag.currencyCode));
//     setIsOpen(false);
//   };

//   // Fetch flags and currency information
//   useEffect(() => {
//     const fetchFlags = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const flagsData = response.data.map(country => {
//           const currencyCode = Object.keys(country.currencies || {})[0];
//           return {
//             name: country.name.common,
//             flagUrl: country.flags?.png || '',
//             currencyCode: currencyCode || '',
//             currencySymbol: currencySymbols[currencyCode] || '',
//           };
//         }).filter(flag => flag.currencyCode);
//         setFlags(flagsData);
//       } catch (error) {
//         console.error('Error fetching flags:', error);
//       }
//     };
//     fetchFlags();
//   }, []);

//   return (
//     <div className='home flexcol wh'>
//       <div className="dropdown-flag" ref={dropdownRef}>
//         <div className="dropdown-flag-header" onClick={handleToggleDropdown}>
//           {selectedFlag ? (
//             <div className="flex" style={{ gap: '10px' }}>
//               <img className='flag' src={selectedFlag.flagUrl} alt={selectedFlag.name} />
//               {selectedFlag.name} ({selectedFlag.currencyCode}) ({selectedFlag.currencySymbol})
//             </div>
//           ) : (
//             <span>Select a country</span>
//           )}
//         </div>
//         {isOpen && (
//           <div className="dropdown-flag-list">
//             {flags.map((flag, index) => (
//               <div className="dropdown-flag-item flex" key={index} onClick={() => handleSelectFlag(flag)}>
//                 <img className='flag' src={flag.flagUrl} alt={flag.name} />
//                 {flag.name} ({flag.currencyCode}) ({flag.currencySymbol})
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             {product.name} | {convertPrice(product.price, product.currencyCode)} | {selectedCurrency} | {currencySymbols[selectedCurrency]}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Translator;
