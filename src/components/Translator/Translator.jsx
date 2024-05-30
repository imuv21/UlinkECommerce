

import React, { useState } from 'react';
import './Translator.css'

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleDigit = (digit) => {
    setInput(input + digit);
  };

  const handleOperation = (operation) => {
    setInput(input + ' ' + operation + ' ');
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const handleEqual = () => {
    try {
      setResult(eval(input)); 
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result !== null ? result : ''}</div>
      </div>
      <div className="buttons">
        <div className="digits">
          {['1','2','3','4','5','6','7','8','9','0'].map(digit => (
            <button key={digit} onClick={() => handleDigit(digit)}>{digit}</button>
          ))}
        </div>
        <div className="operations">
          {['+', '-', '*', '/'].map(operation => (
            <button key={operation} onClick={() => handleOperation(operation)}>{operation}</button>
          ))}
        </div>
        <div className="controls">
          <button onClick={handleClear}>C</button>
          <button onClick={handleEqual}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
