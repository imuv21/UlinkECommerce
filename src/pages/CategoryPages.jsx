import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useParams } from 'react-router-dom'
import ImageImport from '../components/Schemas/ImageImport';

const Carousel = lazy(() => import('../components/Carousel'));
const BrandCarousel = lazy(() => import('../components/BrandCarousel'));

const CategoryPages = () => {
  const { category } = useParams()
  const [productShow, setProductShow] = useState([])
  //  Brand Object create

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
  const NextArrow = (props) => {
    const { style, onClick } = props;
    return (
      <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '999', right: '0%' }} onClick={onClick}>
        <ChevronRightIcon />
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { style, onClick } = props;
    return (
      <div style={{ ...style, position: 'absolute', top: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '999' }} onClick={onClick}>
        <ChevronLeftIcon />
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 7,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  //  
  //  conditionaly render the page 
  const renderPage = () => {
    switch (category) {
      case 'trending':
        return (
          <div className='discount-pages' >
            <div className='banner-page'>
              <img className='banner-width' src={ImageImport.Discount} ></img>
            </div>
            <div className='best-deals-product'>
              <div className='best-deals'>
                <img className='top-deal-1' src={ImageImport.TopDeals}></img>
              </div>
              <div className='best-deals'>
                <img className='top-deal-1' src={ImageImport.ElecronicsDeals}></img>
              </div>
            </div>
            <div className='all-offers-deals'>
              <div className='offer-1'>
                <img className='offer-img-width' src={ImageImport.Electronic}></img>
                <div className=''>
                  <h4 className='offer-title'>Electronic Acceseries</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={ImageImport.Stationary}></img>
                <div className=''>
                  <h4 className='offer-title'>Office Stationary</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={ImageImport.FoodBeverage}></img>
                <div className=''>
                  <h4 className='offer-title'>Food & Beverages</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={ImageImport.PersonalCare}></img>
                <div className=''>
                  <h4 className='offer-title'>Personal Care</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={ImageImport.HomeKitchen}></img>
                <div className=''>
                  <h4 className='offer-title'>Home & Kitchen</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={ImageImport.BeautyProduct}></img>
                <div className=''>
                  <h4 className='offer-title'>Beauty & Cosmetic</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={ImageImport.Fashion}></img>
                <div className=''>
                  <h4 className='offer-title'>Fashion Acceseries</h4>
                </div>
              </div>
              <div className='offer-1'>
                <img className='offer-img-width' src={ImageImport.Electronic}></img>
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
            <div className='show-all'>
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
      // Electronics Category page
      case 'electronic':
        return (
          <div className='discount-pages' >
            <div className='banner-page'>
              <img className='banner-width' src={ImageImport.RealmiBanner} ></img>
            </div>
            <div className='best-deals-product'>
              <div className='best-deals'>
                <img className='top-deal-1' src={ImageImport.Boat}></img>
              </div>
              <div className='best-deals'>
                <img className='top-deal-1' src={ImageImport.Sumsung}></img>
              </div>
            </div>
            <div className='best-deals-product'>
              <div className=''>
                <h3>Browse By Category</h3>
              </div>
            </div>
            <div className='category-sections'>
              <div className='category-container'>

                <div className='category-image'>
                  <img className='img-aspect' src={ImageImport.Mobile} alt='Trending Product'></img>
                  <div className='category-img-title'>
                    <p className='category-img-titles category-sizes'>Mobile Phone</p>
                  </div>
                </div>
                <div className='category-image  '>
                  <img className='img-aspect' src={ImageImport.Camera} alt='Consumer Electronic'></img>
                  <div className='category-img-title'>
                    <p className='category-img-titles category-sizes'>Camera </p>
                  </div>
                </div>
                <div className='category-image'>
                  <img className='img-aspect' src={ImageImport.HeadPhone} alt='Office Stationary'></img>
                  <div className='category-img-title'>
                    <p className='category-img-titles category-sizes'>Audio & Studio</p>
                  </div>
                </div>
                <div className='category-image'>
                  <img className='img-aspect' src={ImageImport.Game} alt='Food & Beverages'></img>
                  <div className='category-img-title'>
                    <p className='category-img-titles category-sizes'>Gaming</p>
                  </div>
                </div>
                <div className='category-image'>
                  <img className='img-aspect' src={ImageImport.Laptop} alt='Health & Beauty'></img>
                  <div className='category-img-title'>
                    <p className='category-img-titles category-sizes'>Laptop</p>
                  </div>
                </div>
                <div className='category-image'>
                  <img className='img-aspect' src={ImageImport.Powerbank} alt='Home & Kitchen'></img>
                  <div className='category-img-title'>
                    <p className='category-img-titles category-sizes'>Powerbank</p>
                  </div>
                </div>
                <div className='category-image'>
                  <img className='img-aspect' src={ImageImport.Router} alt='Beauty & Fragrences'></img>
                  <div className='category-img-title'>
                    <p className='category-img-titles category-sizes'>Network</p>
                  </div>
                </div>
                <div className='category-image'>
                  <img className='img-aspect' src={ImageImport.TV} alt='Fashion & Acceseries'></img>
                  <div className='category-img-title'>
                    <p className='category-img-titles category-sizes'>Television</p>
                  </div>
                </div>
              </div>
            </div>

            <img className='banner-width' src={ImageImport.Tclbanner} ></img>

            <div className="product-slider-cont product-width">
              <Carousel />
            </div>

            <img className='banner-width' src={ImageImport.Sumsungbanner} ></img>

            <div className='best-deals-product'>
              <div className=''>
                <h3>Shop By Brand</h3>
              </div>

              <div className=''>
                <h4 className='show-all-product'>Show All</h4>
              </div>
            </div>
            <div className="product-slider-cont product-width">
              <BrandCarousel />
            </div>
            <div className='banner-page'>
              <img className='banner-width' src={ImageImport.MobileBanner} ></img>
            </div>
            <div className='best-deals-product'>
              <div className='flex'>
                <h3>Next Day Delivery</h3>
                <p className='item-count'>({productShow.length} Items)</p>
              </div>

              <div className=''>
                <h4 className='show-all-product'>Show All</h4>
              </div>
            </div>
            <div className="product-slider-cont product-width">
              <Carousel />
            </div>
            <div className='best-deals-product'>
              <div className='flex'>
                <h3>Best Selling Mobile Acceseries</h3>
                <p className='item-count'>({productShow.length} Items)</p>
              </div>

              <div className=''>
                <h4 className='show-all-product'>Show All</h4>
              </div>
            </div>
            <div className="product-slider-cont product-width">
              <Carousel />
            </div>
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
      <Suspense fallback={<Loader />}>
        {renderPage()}
      </Suspense>
    </>
  )
}
export default CategoryPages;