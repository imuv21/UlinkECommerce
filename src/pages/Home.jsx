import React, { Fragment } from 'react';
import { slider } from '../components/Schemas/images';
import { Helmet } from 'react-helmet-async';
import Slider from '../components/Slider';
import InfSlider from '../components/InfSlider';
import CategorySection from '../components/CategorySection';
import Carousel from '../components/Carousel';

const Home = () => {

  const Banner1 = slider[12];
  const DiscountCoupne = slider[8];
  const Banners = slider[7];
  const summer = slider[11];

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
        <div className="heading3 wh">Top picks of the month (29 items)</div>
        <Carousel />
        <div className="heading3 wh">Best deals (23 items)</div>
        <Carousel />
        <div className='discount-pages'>
          <img className='banner-width' src={Banner1} />
        </div>
        <div className="heading3 wh">Top deals (25 items)</div>
        <Carousel />
        <div className='discount-pages'>
          <img className='banner-width' src={DiscountCoupne} />
        </div>
        <div className="heading3 wh">Best deals (7 items)</div>
        <Carousel />
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