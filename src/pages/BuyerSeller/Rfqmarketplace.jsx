import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { TiInfoLarge } from "react-icons/ti";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Image from '../../assets/OfficeStationary-remove.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";


const Rfqmarketplace = () => {
  const [expSelectedOpen, setExpSelectedOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [rfqDetailOpen, setRfqDetailOpen] = useState(false)
  const [userRole, setUserRole] = useState(null);
  //   redirect one page to another page   
  const navigate = useNavigate()
  //  search filter by category 
  const [categorySearch, setCategorySearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const user = useSelector((state) => state.auth.user)
  const isBuyer = user && user.role === 'Buyer';
  const isSeller = user && user.role === 'Seller';
  const isNotLoggedIn = !user;

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
    'India',
    'United States',
    'United Kingdom',
    'Australia',
    'Netherlands',
    'France',
    'Spain',
    'Japan'
  ];

  const handleCategoryValue = (e) => {
    setCategorySearch(e.target.value)
  }
  const filterCategories = categories.filter(category => category.toLowerCase().includes(categorySearch.toLowerCase()))
  const handleLocationSearch = (e) => {
    setLocationSearch(e.target.value)
  }
  const filterLocation = location.filter(locations => locations.toLowerCase().includes(locationSearch.toLowerCase()));
  const handleOpenRfqDetail = () => {
    console.log('handlerfqDetailOpen')
    setRfqDetailOpen(!rfqDetailOpen)
  }
  //  to show the time based on the expiry date
  const targetDate = '2024-12-31T23:59:59';
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', second: '2-digit' };
    return new Date(date).toLocaleDateString('en-Us', options);
  }

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = new Date(targetDate) - now;
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000)
    return () => clearInterval(timer);
  }, [targetDate])
  return (
    <>
      <>
        {rfqDetailOpen && (
          <div className='box-container-shadow-show'>
            <div className={`left-container-box ${rfqDetailOpen ? 'open' : ''}`} >
              <div className='close-box-cross-icon'>
                <RxCross2 onClick={() => setRfqDetailOpen(!rfqDetailOpen)} />
              </div>
              <div className='rfq-details-titles-heading'>
                <h3>RFQ Details</h3>
              </div>
              <div className='rfq-details-box-container-1'>
                <div className='status-creted-expiry'>
                  <div>Status</div>
                  <div>Created On</div>
                  <div>RFQ expiry on</div>
                </div>
                <div className='status-creted-expiry'>
                  <div className='blue-quote-bg'>QUOTE SUBMITTED</div>
                  <div className='created-date-quote'>29/07/2024</div>
                  <div className='created-date-quote'>03/07/2024</div>
                </div>
                <div className='status-creted-expiry'>
                  <div>Number of quotes</div>
                  <div>RFQ ID</div>
                  <div>Location</div>
                </div>
                <div className='status-creted-expiry'>
                  <div className='no-of-quote'>2</div>
                  <div className='created-date-quote'>ULINK545446465</div>
                  <div className='created-date-quote'>United Arab Emirates</div>
                </div>
              </div>
              <div className='rfq-details-titles-heading product-detail-info-box'>
                <h3>Product Details</h3>
              </div>
              <div className='rfq-details-box-container-1'>
                <div className='rfq-details-box-heading'>
                  <div className='flex-rfq-item'>
                    <h5>#</h5>
                    <h5>Product</h5>
                  </div>
                  <div className='flex-rfq-item'>
                    <h5>Quantity</h5>
                    <h>Unit Target Price</h>
                    <h5>Total Target Price</h5>
                  </div>
                </div>
                <div className='rfq-details-box-heading-1'>
                  <div className='flex-rfq-item'>
                    <h5>1</h5>
                    <div className='img-containers-box-rfq'></div>
                    <div><a>CORE I5 4590,4570 (4TH Generation) Processor 3.3 GHz Upto 3.7 GHz LGA 1150 Socket 4 Cores 4 Threads 6 MB Smart Cache</a></div>
                  </div>
                  <div className='flex-rfq-item gap-flex-rfq-item'>
                    <h5>100</h5>
                    <h5>Negotiable</h5>
                    <h5>-</h5>
                  </div>
                </div>
              </div>
              <div className='rfq-details-titles-heading product-detail-info-box'>
                <h3>Shipping Details</h3>
              </div>
              <div className='rfq-details-box-container-1'>
                <div className='status-creted-expiry'>
                  <div>Shipping Country</div>
                  <div>Shipping City</div>
                  <div>Shipping Terms</div>
                </div>
                <div className='status-creted-expiry'>
                  <div className='no-of-quote'>United Arab Emirates</div>
                  <div className='created-date-quote'>Dubai</div>
                  <div className='created-date-quote'>DoorToDoor</div>
                </div>
              </div>
              <div className='rfq-details-titles-heading product-detail-info-box'>
                <h3>Additional Details</h3>
              </div>
              <div className='rfq-details-box-container-1 '>
                <p className='addition-detain-info-box'>Design Style Europe Other attributes Pans Type Frying Pans & Skillets Material Metal Metal Type Aluminum Alloy Applicable Stove General Use for Gas an</p>
              </div>
              <div className='button-button button-button-2'>
                <button className='wth-btn'>SUBMIT RFQ</button>
              </div>
            </div>
          </div>

        )}
      </>
      <div className='padding-mark'>
        <Helmet>
          <title>RFQ Marketplace | Request for Quotation Platform for B2B Procurement</title>
          <meta
            name="description"
            content="Explore our RFQ Marketplace to connect with verified suppliers. Submit your Request for Quotation (RFQ) and get competitive quotes from multiple vendors. Simplify your procurement process today." />
          <link rel='canonical' href="https://www.ulinkit.com/rfqmarketplace" />
        </Helmet>
        {isBuyer || isNotLoggedIn && (
          <div className='log-box-seller'>
            <div className='hole-item-flex'>
              <div className='mark-flex'>
                <TiInfoLarge className='info-icon' />
                <div className='circle'>
                </div>
                <p className='rql' >Please Login</p>
              </div>
              <div className='some-info'>
                <p className='sli'>Log in as a seller to submit quotes to these RFQs.</p>
              </div>
            </div>
            <div className='lg-button'>
              <button className='login-btn-button' onClick={() => navigate('/login')}>Login</button>
            </div>
          </div>
        )}
        <div className='manage-two-btn'>
          <div className=''>
            <h1 className='heading-css'>RFQ Marketplace</h1>
            <p className='bid-req'>Explore and bid on Requests For Quotations of verified wholesale buyers from around the world.</p>
          </div>
          {isBuyer || isNotLoggedIn && (
            <div className='button-button'>
              <button className='wth-btn' onClick={() => navigate('/rfq')}>MANAGE RFQ</button>
              {/*  product id create the value  */}
              <button className='wth-btn' onClick={() => navigate('/createrfq')}>CREATE RFQ</button>
            </div>
          )}
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
                <a className='quote-title-product-name' onClick={handleOpenRfqDetail} > CORE I5 4590,4570 (4TH Generation) Processor 3.3 GHz Upto 3.7 GHz LGA 1150 Socket 4 Cores 4 Threads 6 MB Smart Cache</a>
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
                  {timeLeft.hours !== undefined ? (
                    <p>
                      {String(timeLeft.days).padStart(2, '0')}d:{String(timeLeft.hours).padStart(2, '0')}h:
                      {String(timeLeft.minutes).padStart(2, '0')}m: left
                    </p>
                  ) : (
                    <p>Time's up!</p>
                  )}
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
                  {timeLeft.hours !== undefined ? (
                    <p>
                      {String(timeLeft.days).padStart(2, '0')}d:{String(timeLeft.hours).padStart(2, '0')}h:
                      {String(timeLeft.minutes).padStart(2, '0')}m: left
                    </p>
                  ) : (
                    <p>Time's up!</p>
                  )}
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
                  {timeLeft.hours !== undefined ? (
                    <p>
                      {String(timeLeft.days).padStart(2, '0')}d:{String(timeLeft.hours).padStart(2, '0')}h:
                      {String(timeLeft.minutes).padStart(2, '0')}m: left
                    </p>
                  ) : (
                    <p>Time's up!</p>
                  )}
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
                <img className='quote-image-wdth' src={Image}  alt='productImg'/>
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
                  {timeLeft.hours !== undefined ? (
                    <p>
                      {String(timeLeft.days).padStart(2, '0')}d:{String(timeLeft.hours).padStart(2, '0')}h:
                      {String(timeLeft.minutes).padStart(2, '0')}m: left
                    </p>
                  ) : (
                    <p>Time's up!</p>
                  )}
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