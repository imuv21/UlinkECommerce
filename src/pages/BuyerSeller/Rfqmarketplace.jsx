import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { TiInfoLarge } from "react-icons/ti";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Image from '../../assets/OfficeStationary-remove.png';
import { useNavigate } from 'react-router-dom';


const Rfqmarketplace = () => {

  const [expSelectedOpen, setExpSelectedOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const navigate = useNavigate()

  //  search filter by category 
  const [categorySearch, setCategorySearch] = useState('')
  const [locationSearch, setLocationSearch] = useState('');
  const handleCategoryValue = (e) => {
    setCategorySearch(e.target.value)
  }

  const categories = [
    'Consumer Electronics',
    'Food & Beverages',
    'Fashion & Accessories',
    'Baby Center',
    'Home Garden & Furniture',
    'Personal Care',
    'Pet & Animal Care',
    'Sports & Fitness',
    'Toys'
  ];

  const location = [
    'United Arab Emirates',
    'India', ,
    'United States',
    'United Kingdom',
    'Australia',
    'Netherlands',
    'France',
    'Spain',
    'Japan'
  ]

  //  category Search heare
  const filterCategories = categories.filter(category => category.toLowerCase().includes(categorySearch.toLowerCase()))
  const handleLocationSearch = (e) => {
    setLocationSearch(e.target.value)
  }
  const filterLocation = location.filter(locations => locations.toLowerCase().includes(locationSearch.toLowerCase()));


  return (
    <>
      <div className='padding-mark'>
        <Helmet>
          <title>Rfq Marketplace</title>
        </Helmet>
        <div className='log-box-seller'>
          <div className='hole-item-flex'>
            <div className='mark-flex'>
              <TiInfoLarge className='info-icon' />
              <div className='circle'>
              </div>
              <p className='rql' >Please Login</p>
            </div>
            <div className='some-info'>
              <p className='sli'>Log in as a seller to submit quotes to these RFQs
              </p>
            </div>
          </div>
          <div className='lg-button'>
            <button className='login-btn-button' onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
        <div className='manage-two-btn'>
          <div className=''>
            <h2>RFQ Marketplace</h2>
            <p className='bid-req'>Explore and bid on Requests For Quotations of verified wholesale buyers from around the world.</p>
          </div>
          <div className='button-button'>
            <button className='wth-btn'>MANAGE RFQ</button>
            <button className='wth-btn'>CREATE RFQ</button>
          </div>
        </div>
        {/* rfq Quatation container */}
        <div className='quatation-container'>
          <div className='quote-container-1'>
            <>
              <div onClick={() => setExpSelectedOpen(!expSelectedOpen)} className='e-soon'>
                <p className='show-more-text-size'>Show More</p>
                <MdOutlineArrowDropDown />
              </div>
              {expSelectedOpen && (
                <div className='select-box-item-1'>
                  <input className='checkbox-box-box' type='checkbox' />
                  <h5 className='exp-soon-color '>EXPIRY SOON (21)</h5>
                </div>
              )}
              <div className='border-line-add'></div>
            </>
            <>
              <div onClick={() => setStatusOpen(!statusOpen)} className='e-soon-status'>
                <p className='show-more-text-size'> Status</p>
                <MdOutlineArrowDropDown />
              </div>
              {statusOpen && (
                <>
                  <div className='select-box-item-1'>
                    <input className='checkbox-box-box' type='checkbox' />
                    <h5 className='exp-soon-color '>QUOTE SUBMITTED (21)</h5>
                  </div>
                  <div className='select-box-item-1'>
                    <input className='checkbox-box-box' type='checkbox' />
                    <h5 className='exp-soon-color '>PENDING QUOTE (21)</h5>
                  </div>
                </>
              )}
              <div className='border-line-add'></div>
            </>
            <>
              <div onClick={() => setLocationOpen(!locationOpen)} className='e-soon-status'>
                <p className='show-more-text-size'>Categories</p>
                <MdOutlineArrowDropDown />
              </div>
              {locationOpen && (
                <>
                  <div className='input-search-category'>
                    <input type="text" placeholder='search....' className='input-search-category-width' onChange={handleCategoryValue} />
                  </div>
                  {/*  it will added the checkbox */}
                  {filterCategories.map((locations, index) => (

                    <div key={index} className='select-box-item-1'>
                      <input className='checkbox-box-box' type='checkbox' />
                      <h5 className='exp-soon-color'>{locations}</h5>
                    </div>
                  ))}
                </>
              )}
              <div className='border-line-add'></div>
            </>
            <>
              <div onClick={() => setCategoriesOpen(!categoriesOpen)} className='e-soon-status'>
                <p className='show-more-text-size'>Location</p>
                <MdOutlineArrowDropDown />
              </div>
              {categoriesOpen && (
                <>
                  <div className='input-search-category'>
                    <input type="text" placeholder='search....' className='input-search-category-width' onChange={handleLocationSearch} />
                  </div>
                  {filterLocation.map((category, index) => (
                    <div key={index} className='select-box-item-1'>
                      <input className='checkbox-box-box' type='checkbox' />
                      <h5 className='exp-soon-color'>{category}</h5>
                    </div>
                  ))}
                </>
              )}
              <div className='border-line-add'></div>
            </>
          </div>
          {/*  search -input box */}
          <div className='quotes-list-submit-show'>
            <div className='quote-container-2'>
              <div>
                <h2>RFQs (1)</h2>
              </div>
              <div className='quote-search'>
                <input className='search-input-field-item' type="text" placeholder='search....' />
                <CiSearch className='search-input-icon' />
              </div>
            </div>
            {/* quotes container list item available here */}
            <div className='quote-container-border'>
              <div className='quote-image-container'>
                <img className='quote-image-wdth' src={Image} />
              </div>
              <div className='quote-details-info'>
                <a className='quote-title-product-name'> CORE I5 4590,4570 (4TH Generation) Processor 3.3 GHz Upto 3.7 GHz LGA 1150 Socket 4 Cores 4 Threads 6 MB Smart Cache</a>
                <div className='quote-details-info-gain'>
                  <div className='date-flex-item'>
                    <h4>Created Date:</h4>
                    <p className='date-font-size-inc'>12/01/2024</p>
                  </div>
                  <div className='date-flex-item'>
                    <h4>RFQ ID:</h4>
                    <p className='date-font-size-inc'>ULINK46546465</p>
                  </div>
                </div>
                <div className='quote-details-info-gain'>
                  <div className='date-flex-item'>
                    <h4>RFQ Expiry:</h4>
                    <p className='date-font-size-inc'> 04/01/2024</p>
                  </div>
                  <div className='date-flex-item'>
                    <h4> Ship To:</h4>
                    <p className='date-font-size-inc'>United Arab Emirates</p>
                  </div>
                </div>
              </div>
              <div className='quote-action-performs'>
                <div className='deadline-time'>
                  <p>Deadline:</p>
                  <p> 00:00:45 left</p>
                </div>
                <div className=' deadline-time recieve-quote-value'>
                  <p>Recieve Quote:</p>
                  <p>0</p>
                </div>
                <div className='submit-quote-container'>
                  <button className='quote-submit-value'>SUBMIT QUOTE</button>
                </div>
              </div>
            </div>
            <div className='quote-container-border'>
              <div className='quote-image-container'>
                <img className='quote-image-wdth' src={Image} />
              </div>
              <div className='quote-details-info'>
                <a className='quote-title-product-name'> CORE I5 4590,4570 (4TH Generation) Processor 3.3 GHz Upto 3.7 GHz LGA 1150 Socket 4 Cores 4 Threads 6 MB Smart Cache</a>
                <div className='quote-details-info-gain'>
                  <div className='date-flex-item'>
                    <h4>Created Date:</h4>
                    <p className='date-font-size-inc'>12/01/2024</p>
                  </div>
                  <div className='date-flex-item'>
                    <h4>RFQ ID:</h4>
                    <p className='date-font-size-inc'>ULINK46546465</p>
                  </div>
                </div>
                <div className='quote-details-info-gain'>
                  <div className='date-flex-item'>
                    <h4>RFQ Expiry:</h4>
                    <p className='date-font-size-inc'> 04/01/2024</p>
                  </div>
                  <div className='date-flex-item'>
                    <h4> Ship To:</h4>
                    <p className='date-font-size-inc'>United Arab Emirates</p>
                  </div>
                </div>
              </div>
              <div className='quote-action-performs'>
                <div className='deadline-time'>
                  <p>Deadline:</p>
                  <p> 00:00:45 left</p>
                </div>
                <div className=' deadline-time recieve-quote-value'>
                  <p>Recieve Quote:</p>
                  <p>0</p>
                </div>
                <div className='submit-quote-container'>
                  <button className='quote-submit-value'>SUBMIT QUOTE</button>
                </div>
              </div>
            </div>
            <div className='quote-container-border'>
              <div className='quote-image-container'>
                <img className='quote-image-wdth' src={Image} />
              </div>
              <div className='quote-details-info'>
                <a className='quote-title-product-name'> CORE I5 4590,4570 (4TH Generation) Processor 3.3 GHz Upto 3.7 GHz LGA 1150 Socket 4 Cores 4 Threads 6 MB Smart Cache</a>
                <div className='quote-details-info-gain'>
                  <div className='date-flex-item'>
                    <h4>Created Date:</h4>
                    <p className='date-font-size-inc'>12/01/2024</p>
                  </div>
                  <div className='date-flex-item'>
                    <h4>RFQ ID:</h4>
                    <p className='date-font-size-inc'>ULINK46546465</p>
                  </div>
                </div>
                <div className='quote-details-info-gain'>
                  <div className='date-flex-item'>
                    <h4>RFQ Expiry:</h4>
                    <p className='date-font-size-inc'> 04/01/2024</p>
                  </div>
                  <div className='date-flex-item'>
                    <h4> Ship To:</h4>
                    <p className='date-font-size-inc'>United Arab Emirates</p>
                  </div>
                </div>
              </div>
              <div className='quote-action-performs'>
                <div className='deadline-time'>
                  <p>Deadline:</p>
                  <p> 00:00:45 left</p>
                </div>
                <div className=' deadline-time recieve-quote-value'>
                  <p>Recieve Quote:</p>
                  <p>0</p>
                </div>
                <div className='submit-quote-container'>
                  <button className='quote-submit-value'>SUBMIT QUOTE</button>
                </div>
              </div>
            </div>
            <div className='quote-container-border'>
              <div className='quote-image-container'>
                <img className='quote-image-wdth' src={Image} />
              </div>
              <div className='quote-details-info'>
                <a className='quote-title-product-name'> CORE I5 4590,4570 (4TH Generation) Processor 3.3 GHz Upto 3.7 GHz LGA 1150 Socket 4 Cores 4 Threads 6 MB Smart Cache</a>
                <div className='quote-details-info-gain'>
                  <div className='date-flex-item'>
                    <h4>Created Date:</h4>
                    <p className='date-font-size-inc'>12/01/2024</p>
                  </div>
                  <div className='date-flex-item'>
                    <h4>RFQ ID:</h4>
                    <p className='date-font-size-inc'>ULINK46546465</p>
                  </div>
                </div>
                <div className='quote-details-info-gain'>
                  <div className='date-flex-item'>
                    <h4>RFQ Expiry:</h4>
                    <p className='date-font-size-inc'> 04/01/2024</p>
                  </div>
                  <div className='date-flex-item'>
                    <h4> Ship To:</h4>
                    <p className='date-font-size-inc'>United Arab Emirates</p>
                  </div>
                </div>
              </div>
              <div className='quote-action-performs'>
                <div className='deadline-time'>
                  <p>Deadline:</p>
                  <p> 00:00:45 left</p>
                </div>
                <div className=' deadline-time recieve-quote-value'>
                  <p>Recieve Quote:</p>
                  <p>0</p>
                </div>
                <div className='submit-quote-container'>
                  <button className='quote-submit-value'>SUBMIT QUOTE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Rfqmarketplace 