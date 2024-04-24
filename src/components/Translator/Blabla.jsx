import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blabla = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.165:8080/api/getProducts');
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='home flexcol mt'>
      <h1>List of Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.productId}>{item.productName}</li> 
        ))}
      </ul>
    </div>
  );
};

export default Blabla;
