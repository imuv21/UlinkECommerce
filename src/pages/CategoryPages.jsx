import React, { lazy, Suspense, useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate, useParams } from 'react-router-dom'
import ImageImport from '../components/Schemas/ImageImport';
const BrandCarousel = lazy(() => import('../components/BrandCarousel'));
import Sliders from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import ProductCard from '../components/ProductCard';
import defaulImg from '../assets/default.jpg';

const CategoryPages = () => {

  const navigate = useNavigate()
  const { category } = useParams()
  const [productShow, setProductShow] = useState([]);

  //  Electronic Object Image
  const sliderItems = [
    { image: ImageImport.Mobile, title: 'Mobile Phone' },
    { image: ImageImport.Camera, title: 'Camera' },
    { image: ImageImport.HeadPhone, title: 'Audio & Studio' },
    { image: ImageImport.Game, title: 'Gaming' },
    { image: ImageImport.Laptop, title: 'Laptop' },
    { image: ImageImport.Powerbank, title: 'Powerbank' },
    { image: ImageImport.Router, title: 'Network' },
    { image: ImageImport.TV, title: 'Television' }
  ];

  //  Stationary Object Image
  const stationaryItems = [
    { image: ImageImport.GeneralSuppliers, name: 'General Suppliers' },
    { image: ImageImport.Files, name: 'Files & Folders' },
    { image: ImageImport.Art, name: 'Art & Crafts' },
    { image: ImageImport.Tapes, name: 'Tapes & Adhesives' },
    { image: ImageImport.Writing, name: 'Writing Instruments' },
    { image: ImageImport.Board, name: 'Boards & Easels' },
    { image: ImageImport.Desk, name: 'Desk & Supplies' },
    { image: ImageImport.WritingMaterial, name: 'Writing Material' }
  ];

  //  product show 
  const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.products);
  const {  products = [], status, error } = useSelector((state) => state.products);
  //pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  
  useEffect(() => {
      if (status === 'idle') {
          dispatch(fetchProducts({ page, size }));
      }
    
  }, [dispatch, page, size, status]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  const NextArrow = (props) => {
    const { style, onClick } = props;
    return (
      <div style={{ ...style, position: 'absolute', top: '30%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '999', right: '0%' }} onClick={onClick}>
        <ChevronRightIcon />
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { style, onClick } = props;
    return (
      <div style={{ ...style, position: 'absolute', top: '30%', display: "flex", alignItems: 'center', justifyContent: 'center', background: "white", borderRadius: '50%', cursor: 'pointer', filter: 'drop-shadow(5px 5px 5px gray)', width: '40px', height: '40px', zIndex: '999' }} onClick={onClick}>
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
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 460,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      }
    ],
  };

  //  conditionaly render the page 
  const renderPage = () => {
    const ShowAll = () => {
      navigate('/search-results')
    }
    const handleFilterFashion = () => {
      const filterfashion = products.filter(product => product.selectedSupOption === 'FashionAndAccessories');
      navigate('/search-results', { state: { selectedSupOption: 'FashionAndAccessories', products: filterfashion } }); 
    }
    const handleFilterElectronic = () => {
      const filterElectronic = products.filter(product => product.selectedSupOption === 'ConsumerElectronics');
      navigate('/search-results', { state: { selectedSupOption: 'ConsumerElectronics', products: filterElectronic }});
    }
    switch (category) {
      case 'trending':
        return (
          <div className='discount-pages' >
            <div className='banner-page'>
              <img className='banner-width' src={ImageImport.Discount} ></img>
            </div>
            <div className='best-deals-product'>
              <div className='best-deals ' onClick={handleFilterFashion}>
                <img className='top-deal-1' src={ImageImport.FashionBeauty} alt='fashionaccessories'></img>
              </div>
              <div className='best-deals ' onClick={handleFilterElectronic}>
                <img className='top-deal-1' src={ImageImport.ElecronicsDeals} alt ="ConsumerElectronics"></img>
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
                <h4 className='show-all-product' onClick={ShowAll}>Show All</h4>
              </div>
            </div>
            <div className='show-all'>
              {
                products.map((product, index) => (
                  <a className='show-img-detail' key={index} href={`/product-details/${product.productId}`}>
                    <img className='product-img-size' src={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} alt='img' />
                    <div className='product-detail-info'>
                      <p className='product-title'>{truncateText(product.productName, 20)} </p>
                      <p className='product-price'>{product.currencySymbol}{parseFloat(product.sellPrice).toFixed(2)}/ piece incl value</p>
                      <div className='flex' style={{ gap: '10px' }}>
                        <p className='product-discount'>{product.currencySymbol}{parseFloat(product.unitPrice).toFixed(2)}</p>
                        <span className='discount-percentage'>{(((product.unitPrice - product.sellPrice) / product.unitPrice) * 100).toFixed(2)}% OFF</span>

                      </div>
                      <p className='product-quantity'>Min Order: {product.minOrderQuant} peace</p>
                    </div>
                  </a>
                ))
              }
            </div>
          </div>
        );
      // Electronics Category page
      case 'electronic':
        //  coditionly rend  the electronic category item
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
            <div className='category-section'>
              <Sliders {...settings}>
                {sliderItems.map((category, index) => (
                  <div key={index} className='category-image'>
                    <div className="category-image-sub">
                      <img className='img-aspect' src={category.image} alt={category.name}></img>
                      <div className='cate-title'>
                        <p className='category-img-title'>{category.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Sliders>
            </div>
            <img className='banner-width' src={ImageImport.Tclbanner} ></img>
            <div className="product-slider-cont">
              <Sliders {...settings}>
                {Array.isArray(products) && products.filter((product) => (product.selectedSupOption === 'ConsumerElectronics')).map((product) => (
                  <div className='show-img-detail-sup' key={product.productId}>
                    <Suspense fallback={<Loader />}>
                      <ProductCard name={product.productName} moq={product.minOrderQuant} id={product.productId} img={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} unitPrice={product.unitPrice} currency={product.currencySymbol} salePrice={product.sellPrice} />
                    </Suspense>
                  </div>
                ))}
              </Sliders>
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
            <div className="product-slider-cont">
              <Sliders {...settings}>
                {Array.isArray(products) && products.filter((product) => (product.selectedSupOption === 'ConsumerElectronics')).map((product) => (
                  <div className='show-img-detail-sup' key={product.productId}>
                    <Suspense fallback={<Loader />}>
                      <ProductCard name={product.productName} moq={product.minOrderQuant} id={product.productId} img={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} unitPrice={product.unitPrice} currency={product.currencySymbol} salePrice={product.sellPrice} />
                    </Suspense>
                  </div>
                ))}
              </Sliders>
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
            <div className="product-slider-cont">
              <Sliders {...settings}>
                {Array.isArray(products) && products.filter((product) => (product.selectedSupOption === 'ConsumereElectronics')).map((product) => (
                  <div className='show-img-detail-sup' key={product.productId}>
                    <Suspense fallback={<Loader />}>
                      <ProductCard name={product.productName} moq={product.minOrderQuant} id={product.productId} img={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} unitPrice={product.unitPrice} currency={product.currencySymbol} salePrice={product.sellPrice} />
                    </Suspense>
                  </div>
                ))}
              </Sliders>
            </div>
            <div className='banner-page'>
              <img className='banner-width' src={ImageImport.OldItemBanner} ></img>
            </div>
          </div>
        );
      // Statinary page show here
      case 'stationary':
        return (
          <div className='discount-pages' >
            <div className='banner-page'>
              <img className='banner-width' src={ImageImport.StationaryBanner} ></img>
            </div>
            <div className='all-offers-deals'>
              <div className='offer-1 printer'>
                <img className='offer-img-width' src={ImageImport.Printer}></img>
                <div className=''>
                  <h4 className='offer-title'>Printer, Scanner</h4>
                </div>
              </div>
              <div className='offer-1 tonorlnk'>
                <img className='offer-img-width' src={ImageImport.TonorsLnk}></img>
                <div className=''>
                  <h4 className='offer-title'>Tonors & Lnk</h4>
                </div>
              </div>
              <div className='offer-1 paper '>
                <img className='offer-img-width' src={ImageImport.Paper}></img>
                <div className=''>
                  <h4 className='offer-title'>Printing Paper</h4>
                </div>
              </div>
              <div className='offer-1 office'>
                <img className='offer-img-width' src={ImageImport.OfficeInsrument}></img>
                <div className=''>
                  <h4 className='offer-title'>Office Machine</h4>
                </div>
              </div>
            </div>
            <div className='best-deals-product'>
              <div className=''>
                <h3>Browse By Category</h3>
              </div>
            </div>
            <div className='category-section'>
              <Sliders {...settings}>
                {stationaryItems.map((category, index) => (
                  <div key={index} className='category-image'>
                    <div className="category-image-sub">
                      <img className='img-aspect' src={category.image} alt={category.name}></img>
                      <div className='cate-title'>
                        <p className='category-img-title'>{category.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Sliders>
            </div>
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

            <div className='best-deals-product'>
              <div className='best-deals'>
                <img className='top-deal-1' src={ImageImport.Slider1}></img>
              </div>
              <div className='best-deals'>
                <img className='top-deal-1' src={ImageImport.Sumsung}></img>
              </div>
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
            <div className="product-slider-cont">
              <Sliders {...settings}>
                {Array.isArray(products) && products.filter((product) => (product.selectedSupOption === 'OfficeAndStationery')).map((product) => (
                  <div className='show-img-detail-sup' key={product.productId}>
                    <Suspense fallback={<Loader />}>
                      <ProductCard name={product.productName} moq={product.minOrderQuant} id={product.productId} img={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} unitPrice={product.unitPrice} currency={product.currencySymbol} salePrice={product.sellPrice} />
                    </Suspense>
                  </div>
                ))}
              </Sliders>
            </div>
            <div className="product-slider-cont">
              <Sliders {...settings}>
                {Array.isArray(products) && products.filter((product) => (product.selectedSupOption === 'OfficeAndStationery')).map((product) => (
                  <div className='show-img-detail-sup' key={product.productId}>
                    <Suspense fallback={<Loader />}>
                      <ProductCard name={product.productName} moq={product.minOrderQuant} id={product.productId} img={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} unitPrice={product.unitPrice} currency={product.currencySymbol} salePrice={product.sellPrice} />
                    </Suspense>
                  </div>
                ))}
              </Sliders>
            </div>
          </div>

        );
      case 'food':
        return (
          <div className='discount-pages'>
            <div className='banner-page'>
              <img className='banner-width' src={ImageImport.FoodBanner} ></img>
            </div>
            <div className='best-deals-product'>
              <div className='best-deals'>
                <img className='top-deal-1' src={ImageImport.Cornflakeses}></img>
              </div>
              <div className='best-deals'>
                <img className='top-deal-1' src={ImageImport.Biscuit}></img>
              </div>
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
            <div className="product-slider-cont">
              <Sliders {...settings}>
                {Array.isArray(products) && products.filter((product) => (product.selectedSupOption === 'OfficeAndStationery')).map((product) => (
                  <div className='show-img-detail-sup' key={product.productId}>
                    <Suspense fallback={<Loader />}>
                      <ProductCard name={product.productName} moq={product.minOrderQuant} id={product.productId} img={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} unitPrice={product.unitPrice} currency={product.currencySymbol} salePrice={product.sellPrice} />
                    </Suspense>
                  </div>
                ))}
              </Sliders>
            </div>
            <div className='all-offers-deals'>
              <div className='offer-1 printer'>
                <img className='offer-img-width' src={ImageImport.Chocklates}></img>
                <div className=''>
                  <h4 className='offer-title'>Chocklates</h4>
                </div>
              </div>
              <div className='offer-1 tonorlnk'>
                <img className='offer-img-width' src={ImageImport.Pantry}></img>
                <div className=''>
                  <h4 className='offer-title'>Pantry</h4>
                </div>
              </div>
              <div className='offer-1 paper '>
                <img className='offer-img-width' src={ImageImport.Milk}></img>
                <div className=''>
                  <h4 className='offer-title'>Milk</h4>
                </div>
              </div>
              <div className='offer-1 office'>
                <img className='offer-img-width' src={ImageImport.Beverages}></img>
                <div className=''>
                  <h4 className='offer-title'>Beverages</h4>
                </div>
              </div>

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
            <div className="product-slider-cont">
              <Sliders {...settings}>
                {Array.isArray(products) && products.filter((product) => (product.selectedSupOption === 'OfficeAndStationery')).map((product) => (
                  <div className='show-img-detail-sup' key={product.productId}>
                    <Suspense fallback={<Loader />}>
                      <ProductCard name={product.productName} moq={product.minOrderQuant} id={product.productId} img={product.images && product.images.length > 0 ? product.images[0].imageUrl : defaulImg} unitPrice={product.unitPrice} currency={product.currencySymbol} salePrice={product.sellPrice} />
                    </Suspense>
                  </div>
                ))}
              </Sliders>
            </div>

            <div className='banner-page'>
              <img className='banner-width' src={ImageImport.RealJuice} ></img>
            </div>
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