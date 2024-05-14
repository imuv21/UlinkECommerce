import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [category, setCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState('');
  const [backeEndCat, setBackendCat] = useState([]);
  const[inputCat,setInputCat]=useState('');


  const handleCategoryChange = (e) => {
    setCategory(e.target.value.toUpperCase());
  };

  const handleCategoryChange2 = (e) => {
    setInputCat(e.target.value.toUpperCase());
  };
  const handleNewSubCategoryChange = (e) => {
    setNewSubCategory(e.target.value.toUpperCase());
  };

  const handleAddSubCategory = () => {
    if (newSubCategory.trim() !== '') {
      setSubCategories([...subCategories, newSubCategory]);
      setNewSubCategory('');
    }
  };

  const handleAPIRequest = async () => {

const data={
    categoryName: category,
    subCategoryNames:subCategories

}

    try{
        const response=await axios.post('http://ulinkitapplication-test-env.eba-cek38m8c.eu-north-1.elasticbeanstalk.com/api/add-category',data);
       setCategory('');
       setSubCategories([]);
        alert(response.data);


    }catch(e){
        console.log(e);
    }
    // You can make your API call here with the category and subCategories data
    console.log('Category:', category);
    console.log('Subcategories:', subCategories);
  };

  const handleGetCategory = async () => {
    

        try{
            let response;
            if(inputCat!==''){
              //fetch the subcategroy of given input category
                 response=await axios.get(`http://ulinkitapplication-test-env.eba-cek38m8c.eu-north-1.elasticbeanstalk.com/api/get-category?categoryName=${inputCat}`);

            }
            else{
              //fetch all the parent category
                 response=await axios.get(`http://ulinkitapplication-test-env.eba-cek38m8c.eu-north-1.elasticbeanstalk.com/api/get-category`);

            }
          console.log(response);
            if(response.data){
            setBackendCat(response.data);
           }
    
    
        }catch(e){
            console.log(e);
        }
        // You can make your API call here with the category and subCategories data
        console.log('Category:', category);
        console.log('Subcategories:', subCategories);
      };

  return (
    <div style={{display:'flex',marginTop:'100px',boarder:'2px solid black'}}>
      <div style={{display:'flex',position:'relative',padding:'50px',marginRight:'20%'}}>
        <div style={{position:'relative',padding:'50px',border:'2px solid black'}}>
          <h5 className="card-title">Category Component</h5>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <input type="text" className="form-control" id="category" value={category} onChange={handleCategoryChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="newSubCategory" className="form-label">Add Subcategory:</label>
            <div className="input-group">
              <input type="text" className="form-control" id="newSubCategory" value={newSubCategory} onChange={handleNewSubCategoryChange} />
              <button className="btn btn-outline-primary" type="button" onClick={handleAddSubCategory}>Add</button>
            </div>
          </div>
          <div>
            <h5>Subcategories:</h5>
            <ul className="list-group">
              {subCategories.map((subCategory, index) => (
                <li key={index} className="list-group-item">{subCategory}</li>
              ))}
            </ul>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleAPIRequest}>Create category API</button>
          <div className="mb-3">
            <label htmlFor="inputCat" className="form-label">Category:</label>
            <input type="text" className="form-control" id="category" value={inputCat} onChange={handleCategoryChange2} />
            <button className="btn btn-primary mt-3" onClick={handleGetCategory}>Get category API</button>
            <div>
            <h5>category:{inputCat}</h5>  
            <h5>Subcategories:</h5>
            <ul className="list-group">
              {backeEndCat.map((subCategory, index) => (
                <li key={index} className="list-group-item">{subCategory}</li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
