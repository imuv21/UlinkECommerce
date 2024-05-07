import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TopDeals from '../assets/fashion&beautydi.png';
import ElecronicsDeals from '../assets/electronicdiscount.png';
import Discount from '../assets/trandingdiscountagain.png';
import Electronic from '../assets/electronicoffer-remove.png';
import Stationary from '../assets/OfficeStationary-remove.png';
import FoodBeverage from '../assets/fmg-removebg-preview.png';
import PersonalCare from '../assets/personalCare3.png';
import HomeKitchen from '../assets/Homeapliance.png';
import BeautyProduct from '../assets/beauty-cosmetic-products-removebg-preview.png';
import Fashion from '../assets/fashion.png';
import { Helmet } from 'react-helmet-async';
const CategoryPages = () => {
  const { category } = useParams()
  const [productShow, setProductShow] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const jsonData = await response.json()
        setProductShow(jsonData)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [category])

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }
  //  conditionaly render the page 
  const renderPage = () => {
    
    switch (category) {
      case 'trending':
        return (
          <div className='discount-pages' >
            <div className='banner-page'>
              <img className='banner-width' src={Discount} ></img>
            </div>
            <div className='best-deals-product'>
              <div className='best-deals'>
                <img className='top-deal-1' src={TopDeals}></img>
              </div>
              <div className='best-deals'>
                <img className='top-deal-1' src={ElecronicsDeals}></img>
              </div>
            </div>
            <div className='all-offers-deals'>
              <div className='offer-1'>
                <img className='offer-img-width' src={Electronic}></img>
                <div className=''>
                  <h4 className='offer-title'>Electronic Acceseries</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={Stationary}></img>
                <div className=''>
                  <h4 className='offer-title'>Office Stationary</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={FoodBeverage}></img>
                <div className=''>
                  <h4 className='offer-title'>Food & Beverages</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={PersonalCare}></img>
                <div className=''>
                  <h4 className='offer-title'>Personal Care</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={HomeKitchen}></img>
                <div className=''>
                  <h4 className='offer-title'>Home & Kitchen</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={BeautyProduct}></img>
                <div className=''>
                  <h4 className='offer-title'>Beauty & Cosmetic</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={Fashion}></img>
                <div className=''>
                  <h4 className='offer-title'>Fashion Acceseries</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={Electronic}></img>
                <div className=''>
                  <h4 className='offer-title'>Electronic Acceseries</h4>
                </div>
              </div>
            </div>
            <div className='best-deals-product'>
              <div className=''>
                <h3>Unbetable Price!</h3>
              </div>
              <div className=''>
                <h4 className='show-all-product'>Show All</h4>
              </div>
            </div>
            <div className='show-all '>
              {productShow && (
                productShow.map((product, id) => {
                  return (
                    <div className='show-product-info' key={id}>
                      <div className='show-img-detail'>
                        <img className='product-img-size' src={product.image} style={{ background: 'none' }} />
                        <div className='product-detail-info'>
                          <p className='product-title'>{truncateText(product.title, 20)} </p>
                          <p className='product-price'>AED {product.price}/ piece incl value</p>
                          <div className='discount'>
                            <p className='product-discount'>AED 7.35</p>
                            <span className='discount-percentage'>50% Off</span>
                          </div>
                          <p className='product-quantity'>Unit per carton: 1</p>
                          <p className='product-quantity'>Min Order: 1 peace</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        );
      case 'electronics':
        return (
          <div className='electronics-page'>
            <h1>Hello this is the electronics page</h1>
          </div>
        );
      case 'stationary':
        return (
          <div className='electronics-page'>
            <h1>Hello this is the Stationary page</h1>
          </div>
        );
      case 'food':
        return (
          <div className='electronics-page'>
            <h1>Hello this is the food page</h1>
          </div>
        );
      case 'personalcare':
        return (
          <div className='electronics-page'>
            <h1>Hello this is the personal care page</h1>
          </div>
        );
      case 'kitchen':
        return (
          <div className='electronics-page'>
            <h1>Hello this is the kitchen page</h1>
          </div>
        )
    }
  }
  return (
    <>
    <Helmet>
      <title>Category</title>
    </Helmet>
      {renderPage()}
    </>
  )
}
export default CategoryPages;