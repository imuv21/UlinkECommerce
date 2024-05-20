import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import Banner1  from '../assets/jpeg/water.png';
import DiscountCoupne from '../assets/jpeg/camera.png';
import Banners from '../assets/jpeg/7.png';
import summer from '../assets/jpeg/summer.png';

const Slider = lazy(() => import('../components/Slider'));
const InfSlider = lazy(() => import('../components/InfSlider'));
const Carousel = lazy(() => import('../components/Carousel'));
const CategorySection = lazy(() => import('../components/CategorySection'));

const Home = () => {

  // Data coming from backend
  // const [userData, setUserData] = useState(null);
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/v1/user/loggeduser', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: 'application/json'
  //         }
  //       });
  //       const user = response.data;
  //       setUserData(user);
  //       localStorage.setItem('loggedUser', JSON.stringify(user));

  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);


  

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        <Slider />
        <div className="flexcol wh home">
          <div className="heading3 wh">Categories</div>
          <CategorySection />
          <div className='discount-pages'>
           <img className='banner-width' src={summer}/>
          </div>
          <div className="heading3 wh">Top picks of the month (29 items)</div>
          <Carousel />
          
          <div className="heading3 wh">Best deals (23 items)</div>
          <Carousel />
          <div className='discount-pages'>
           <img className='banner-width' src={Banner1}/>
          </div>
          <div className="heading3 wh">Top deals (25 items)</div>
          <Carousel />
          <div className='discount-pages'>
           <img className='banner-width' src={DiscountCoupne}/>
          </div>
          <div className="heading3 wh">Best deals (7 items)</div>
          <Carousel />
          <div className='discount-pages'>
           <img className='banner-width' src={Banners}/>
          </div>
          <div className="heading3 wh">Top Brands</div>
          <InfSlider />
        </div>
      </Suspense>
    </Fragment>
  )
}

export default Home