import React, { Fragment, useEffect } from 'react'
import './Address.css'
import { useState,  } from 'react'

import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
const Address = () => {
  
 
  const [openAddress, setOpenAddress] = useState(false)
  const [showAddressContainer, setShowAddressContainer]= useState(false)
  const [getCountry, setCountry] = useState([])
  const [selectedState, setSelectedState] = useState([])
  const [getState, setState] = useState([])
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([])

  const [addressForm, setAddressForm]= useState({
        addressname: '',
        country: '',
        state: '',
        city: '',
        number: '',
        street: '',
        nlandmark: '',
        pobox: '',
        building: '',
        billing: '',
        shipping: ''
  })


// Here we do edit option






  // addressContainerShow
 


  // country data show

  useEffect(() => {
    axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
}, [])
const country = [...new Set(data.map(item => item.country))]
country.sort()
console.log(data)

const handleCountry = (e) => {

    let states = data.filter(state => state.country === e.target.value);
    states = [...new Set(states.map(item => item.subcountry))];
    states.sort();
       console.log(states)
    setState(states)
}
const handleState = (e) => {
  const selectedState = e.target.value; // Get the value of the selected state
  setSelectedState(selectedState);
    let city = data.filter(cities => cities.subcountry === e.target.value);
    city.sort()
    setCities(city)
    console.log(city)
}



 
 

  const handleAddress = () => {
    setOpenAddress(true)
  }
  // cancel address
  const handleCancelAddress =()=>{
    setOpenAddress(false)
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
 const handleSubmit =(e)=>{
    e.preventDefault()
   
    setAddressForm(addressForm)
    console.log(addressForm)
    setShowAddressContainer(true)
    setOpenAddress(false)

 }
 const handleEditOption =()=>{
  setOpenAddress(true)
 }
  return (
    <Fragment>
      <div className='mt '>
        <div className='flex-space-beetwen'>
          <div className='message-titles-heading1'>
            <h1 className='user-title  heading-2 '>My Address</h1>
          </div>
          <div className='message-titles-heading1'>
            <button className='create-btn btn-change ' onClick={handleAddress}>Add New Address</button>
          </div>
        </div>
        {showAddressContainer &&  (
        <div className='border-1 bor-1'>
          <div className='address-item'>
           <div className='address-items'>
           <p className='p-1'>Address</p>
            <p className='p-2'>{addressForm.billing}</p>
            <p className='p-3'>{addressForm.shipping}</p>
            
           </div>
           <div className='edit-button'>
            <button className='edit-button-change' onClick={handleEditOption}>Edit</button>
           </div>
          </div>
          <div className='data-display'>
                <div className='name-show  address-show'>
                  <h4 className="orders-title">{addressForm.addressname}</h4>
                  <p className='address-show'>{addressForm.number}{addressForm.street}{addressForm.building}{addressForm.poBox}</p>
                </div>
                <div className='name-show'>
                  <h4 className="orders-title">Phone Number: </h4>
                  <p  className='address-shows'>{addressForm.phoneNumber}</p>
                </div>
          
              </div>
        </div>
        )}
      </div>
      <div>
        {openAddress && (
          <div className='background-Changer'>
            <div className='invite-more scroll-by' style={{ overflowY: 'auto', maxHeight: 'calc(90vh - 100px)' }}>
            <form onSubmit={handleSubmit}>
            <div className='card-infos-bank '>
                            <div className='card-title'>
                                <h3 className=" card-title-tittles">Add New Address</h3>
                            </div>
                            <div className='card-title'>
                                <RxCross2 className='cross-icon'   onClick={handleCancelAddress}/>
                            </div>
                        </div>

                        <div className=' invite-email border-p'>
                <label >Add Address</label><br></br>
                <input type='text' name='addressname' className='card-input-value width-input' placeholder='Add Address' value={addressForm.addressname} onChange={handleChange}  />

              </div>
              <div className='border-p'>
                <input type='radio'  name='shipping' value='Shipping' checked={addressForm.shipping==='Shipping'} onChange={handleChange} /> Shipping
                
                <input type='radio' name='billing' className='ml-left' value='Billing'  checked= {addressForm.billing==='Billing'} onChange={handleChange} /> Billing
              </div>
              <div className='  border-p'>
                        <div className='card-title'>
                            <label>Country</label><br></br>
                            <select onChange={(e) => handleCountry(e)} className='selectCountry' name='country' value={addressForm.country}  >
                                <option value=''>Select Country</option>
                                {country.map(items => <option key={items} value={items} >{items}</option>)}
                            </select>
                        </div>
                        </div>
                        <div className='border-p'>
                        <div className='card-title'>
                            <lable>State</lable><br></br>
                            <select onChange={(e) => handleState(e)} className='selectCountry'  name='state' value={addressForm.state}  >
                                <option value=''>Select State</option>
                                {getState.map(items => <option key={items} value={selectedState} >{items}</option>)}
                            </select>
                        </div>
                        </div>
                        <div className='border-p'>
                        <div className='card-title'>
                            <lable>City</lable>
                            <select onChange={(e) => handleCity(e)} className='selectCountry' name='city' value={addressForm.city}>
                                <option value=''>Select City</option>
                                {cities.map(items => <option key={items.name} value={items.name}>{items.name}</option>)}
                            </select>
                        </div>
                        </div>
                        <div className=''>
                        <div className='card-infos-bank'>
                                <div className='card-title'>
                                    <label >Street Name*</label>
                                    <input type='text' name='street' className='card-input-value width-input' placeholder='street name' value={addressForm.street} onChange={handleChange}  />

                                </div>
                                <div className='card-inputses'>
                                    <label >Building/Warehouse/Office</label>
                                    <input type='number' name='building' className='card-input-value width-input' placeholder='building'  value={addressForm.building} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className=''>
                        <div className='card-infos-bank'>
                                <div className='card-title'>
                                    <label >Mobile Number*</label>
                                    <input type='number' name='number' className='card-input-value width-input' placeholder='***********' value={addressForm.number} onChange={handleChange}   />

                                </div>
                                <div className='card-inputses'>
                                    <label >PO Box</label>
                                    <input type='number' name='pobox' className='card-input-value width-input' placeholder='Po box' value={addressForm.pobox} onChange={handleChange}  />
                                </div>
                            </div>
                        </div>
                        <div className=' invite-email border-p'>
                <label >Nearest Landmark</label><br></br>
                <input type='text' name='nlandmark' className='card-input-value width-input' placeholder='nearest landmark' value={addressForm.nlandmark} onChange={handleChange}  />

              </div>
              <div className='add-card-btn'>
                        <button className='add-bank-btn '  onClick={handleCancelAddress}>Cancel</button>
                        <button type='submit' className='add-bank-btns '  >Add </button>
                    </div>
                        
                  
                    </form>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}
export default Address