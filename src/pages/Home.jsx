import React, { Fragment, lazy, Suspense } from 'react';
import Loader from '../components/Loader/Loader';
const Slider = lazy(() => import('../components/Slider'));
const InfSlider = lazy(() => import('../components/InfSlider'));
const Carousel = lazy(() => import('../components/Carousel'));
const CategorySection = lazy(() => import('../components/CategorySection'));

const Home = () => {

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        <Slider />
        <div className="flexcol wh home">
          <div className="heading3 wh">Categories</div>
          <CategorySection />
          <div className="heading3 wh">Top picks of the month (29 items)</div>
          <Carousel />
          <div className="heading3 wh">Best deals (23 items)</div>
          <Carousel />
          <div className="heading3 wh">Top Brands</div>
          <InfSlider />
        </div>
      </Suspense>
    </Fragment>
  )
}

export default Home