import React, { useState, useEffect, lazy, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsTwo } from '../../Redux/productSlice';
const HomeGridItem = lazy(() => import('./HomeGridItem'));
import Loader from '../Loader/Loader';
import defaulImg from '../../assets/default.jpg';

const Square = () => {

  const dispatch = useDispatch();
  const { productsTwo = [], statusTwo, errorTwo } = useSelector((state) => state.products);

  //fetch products
  const [category, setCategory] = useState('FoodAndBeverages');
  useEffect(() => {
    if (statusTwo === 'idle') {
      dispatch(fetchProductsTwo({ category }));
    }
  }, [dispatch, category, statusTwo]);


  if (statusTwo === 'loading') {
    return <div>Loading...</div>;
  }
  if (statusTwo === 'failed') {
    return <div>Error: {errorTwo}</div>;
  }


  return (
    <div className="home-grid-flex">

      <div className='home-grid'>
        <Suspense fallback={<Loader />}>
          {Array.isArray(productsTwo) && productsTwo.slice(0, 4).map((pro) => (
            <HomeGridItem key={uuidv4()}  name={pro.productName} id={pro.productId} img={pro.images && pro.images.length > 0 ? pro.images[0].imageUrl : defaulImg} currencyName={pro.currencyname} salePrice={pro.sellPrice} />
          ))}
        </Suspense>
      </div>

      <div className='home-grid'>
        <Suspense fallback={<Loader />}>
          {Array.isArray(productsTwo) && productsTwo.slice(0, 4).map((pro) => (
            <HomeGridItem key={uuidv4()}  name={pro.productName} id={pro.productId} img={pro.images && pro.images.length > 0 ? pro.images[0].imageUrl : defaulImg} currencyName={pro.currencyname} salePrice={pro.sellPrice} />
          ))}
        </Suspense>
      </div>

      <div className='home-grid'>
        <Suspense fallback={<Loader />}>
          {Array.isArray(productsTwo) && productsTwo.slice(0, 4).map((pro) => (
            <HomeGridItem key={uuidv4()}  name={pro.productName} id={pro.productId} img={pro.images && pro.images.length > 0 ? pro.images[0].imageUrl : defaulImg} currencyName={pro.currencyname} salePrice={pro.sellPrice} />
          ))}
        </Suspense>
      </div>

      <div className='home-grid'>
        <Suspense fallback={<Loader />}>
          {Array.isArray(productsTwo) && productsTwo.slice(0, 4).map((pro) => (
            <HomeGridItem key={uuidv4()}  name={pro.productName} id={pro.productId} img={pro.images && pro.images.length > 0 ? pro.images[0].imageUrl : defaulImg} currencyName={pro.currencyname} salePrice={pro.sellPrice} />
          ))}
        </Suspense>
      </div>

    </div>
  )
}

export default Square