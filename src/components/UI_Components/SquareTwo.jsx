import React, { useState, useEffect, lazy, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsFour } from '../../Redux/productSlice';
const HomeGridItem = lazy(() => import('./HomeGridItem'));
import Loader from '../Loader/Loader';
import defaulImg from '../../assets/default.jpg';

const SquareTwo = () => {

  const dispatch = useDispatch();
  const { productsFour = [], statusFour, errorFour } = useSelector((state) => state.products);

  //fetch products
  const [category, setCategory] = useState('HomeGardenAndFurniture');
  useEffect(() => {
    if (statusFour === 'idle') {
      dispatch(fetchProductsFour({ category }));
    }
  }, [dispatch, category, statusFour]);


  if (statusFour === 'loading') {
    return <p>Loading...</p>;
  }
  if (statusFour === 'failed') {
    return <p>Error: {errorFour}</p>;
  }


  return (
    <div className="home-grid-flex">

      <div className='home-grid'>
        <Suspense fallback={<Loader />}>
          {Array.isArray(productsFour) && productsFour.slice(0, 4).map((pro) => (
            <HomeGridItem key={uuidv4()}  name={pro.productName} id={pro.productId} img={pro.images && pro.images.length > 0 ? pro.images[0].imageUrl : defaulImg} currencyName={pro.currencyname} salePrice={pro.sellPrice} />
          ))}
        </Suspense>
      </div>

      <div className='home-grid'>
        <Suspense fallback={<Loader />}>
          {Array.isArray(productsFour) && productsFour.slice(4, 8).map((pro) => (
            <HomeGridItem key={uuidv4()}  name={pro.productName} id={pro.productId} img={pro.images && pro.images.length > 0 ? pro.images[0].imageUrl : defaulImg} currencyName={pro.currencyname} salePrice={pro.sellPrice} />
          ))}
        </Suspense>
      </div>

      <div className='home-grid'>
        <Suspense fallback={<Loader />}>
          {Array.isArray(productsFour) && productsFour.slice(8, 12).map((pro) => (
            <HomeGridItem key={uuidv4()}  name={pro.productName} id={pro.productId} img={pro.images && pro.images.length > 0 ? pro.images[0].imageUrl : defaulImg} currencyName={pro.currencyname} salePrice={pro.sellPrice} />
          ))}
        </Suspense>
      </div>

      <div className='home-grid'>
        <Suspense fallback={<Loader />}>
          {Array.isArray(productsFour) && productsFour.slice(12, 16).map((pro) => (
            <HomeGridItem key={uuidv4()}  name={pro.productName} id={pro.productId} img={pro.images && pro.images.length > 0 ? pro.images[0].imageUrl : defaulImg} currencyName={pro.currencyname} salePrice={pro.sellPrice} />
          ))}
        </Suspense>
      </div>

    </div>
  )
}

export default SquareTwo