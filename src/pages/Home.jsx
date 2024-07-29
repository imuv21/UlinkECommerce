import React, { Fragment } from 'react';
import { slider } from '../components/Schemas/images';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from '../components/Slider';
import InfSlider from '../components/InfSlider';
import CategorySection from '../components/CategorySection';
import Carousel from '../components/Carousel';
import CarouselTwo from '../components/CarouselTwo';
import CarouselThree from '../components/CarouselThree';
import CarouselFour from '../components/CarouselFour';
import Square from '../components/UI_Components/Square';


const Home = () => {

  const navigate = useNavigate();
  const Banner1 = slider[12];
  const DiscountCoupne = slider[8];
  const Banners = slider[7];
  const summer = slider[11];

  const { totalItems, totalItemsTwo, totalItemsThree, totalItemsFour } = useSelector((state) => state.products);


  const ShowAll = () => {
    navigate('/search-results')
  }

  return (
    <Fragment>
      <Helmet>
        <title>Ulinkit - Home</title>
      </Helmet>
      <Slider />
      <div className="flexcol wh home">
        <div className="heading3 wh">Categories</div>
        <CategorySection />
        <div className='discount-pages'>
          <img className='banner-width' src={summer} />
        </div>

        <div className='best-deals-product'>
          <div className=''>
            <h4>Consumer Electronics ({totalItems} items)</h4>
          </div>
          <div className=''>
            <h4 className='show-all-product' onClick={ShowAll}>Show All</h4>
          </div>
        </div>

        <Carousel />

        <Square />

        <div className="heading3 wh">Food And Beverages ({totalItemsTwo} items)</div>

        <CarouselTwo />

        <div className='discount-pages'>
          <img className='banner-width' src={Banner1} />
        </div>
        <div className="heading3 wh">Fashion And Accessories ({totalItemsThree} items)</div>

        <CarouselThree />

        <div className='discount-pages'>
          <img className='banner-width' src={DiscountCoupne} />
        </div>

        <Square />
        
        <div className="heading3 wh">Home Garden And Furniture ({totalItemsFour} items)</div>

        <CarouselFour />

        <div className='discount-pages'>
          <img className='banner-width' src={Banners} />
        </div>
        <div className="heading3 wh">Top Brands</div>
        <InfSlider />
      </div>

    </Fragment>
  )
}

export default Home