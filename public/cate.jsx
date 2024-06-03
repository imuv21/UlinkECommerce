import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = ({ products }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Your existing filtering logic here...
  }, [products, price, sortBy, selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption, query]);

  const handleClear = () => {
    // Remove the query parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('query');
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <div>
      {query && <div className='heading2 wh captext'>Showing results for: {query}</div>}
      <button onClick={handleClear}>Clear</button>
      {/* Render filtered products here */}
    </div>
  );
};

export default SearchResults;
