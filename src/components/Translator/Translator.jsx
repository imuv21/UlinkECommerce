import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Translator = () => {

  

  return (
    <div className="flexcol home wh">

      <select value={toCurrency} onChange={handleToCurrencyChange}>
        {Object.keys(rates).map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    
      <span>
        {fixedAmount} {fromCurrency} to {convertedAmount.toFixed(2)} {toCurrency}
      </span>

    </div>
  );
};

export default Translator;
