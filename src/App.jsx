import './App.css';
import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { DivCountProvider } from './components/context/SuperContext';
import { CartProvider } from './components/context/CartContext';

const Checkout = lazy(() => import('./pages/Cart/Checkout'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const ProductDetails = lazy(() => import('./pages/Cart/ProductDetails'));
const Header = lazy(() => import('./components/Header/Header'));
const Signup = lazy(() => import('./pages/Signup'));
const Otp = lazy(() => import('./pages/Otp'));
const SellerForm = lazy(() => import('./pages/SellerForm'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const BecomeASeller = lazy(() => import('./pages/BecomeASeller'));
const Login = lazy(() => import('./pages/Login'));
const CommissionStructure = lazy(() => import('./pages/CommissionStructure'));
const Image = lazy(() => import('./components/Image'));
const Translator = lazy(() => import('./components/Translator/Translator'));
const SideNav = lazy(() => import('./components/SideNav/SideNav'));
const BuyerDashboard = lazy(() => import('./pages/BuyerDashboard/BuyerDashboard'));
const OrderPage = lazy(() => import('./pages/BuyerDashboard/OrderPage/OrderPage'));
const BuyerMessage = lazy(() => import('./pages/BuyerDashboard/BuyerMassage/BuyerMessage'));
const Rfq = lazy(() => import('./pages/BuyerDashboard/Rfq/Rfq'));
const MyProfile = lazy(() => import('./pages/BuyerDashboard/MyProfile/MyProfile'));
const Guidelines = lazy(() => import('./pages/Guidelines/Guidelines'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Home = lazy(() => import("./pages/Home"));
const Bla = lazy(() => import("./components/Translator/Bla"));
const Blaaa = lazy(() => import("./components/Translator/Blaaa"));
const AddProduct = lazy(() => import("./components/Translator/AddProduct"));
const EditProduct = lazy(() => import("./components/Translator/EditProduct"));
const ProList = lazy(() => import("./components/Translator/ProList"));
const Media = lazy(() => import("./components/Translator/Media"));
const EditSingle = lazy(() => import("./components/SellerDashboard/EditSingle"));


function App() {
  return (
    <Fragment>
      <BrowserRouter>

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Layout><Home /></Layout>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/seller-form' element={<SellerForm />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/become-a-seller' element={<Layout><BecomeASeller /></Layout>} />
            <Route path='/commission-structure' element={<Layout><CommissionStructure /></Layout>} />
            <Route path='/img' element={<Layout><Image /></Layout>} />
            <Route path='/trans' element={<Layout><Translator /></Layout>} />
            <Route path='/seller-dash' element={<Layout><SideNav /></Layout>} />
            <Route path='/guidelines' element={<Layout><Guidelines /></Layout>} />
            <Route path='/editsingle/:index' element={<Layout><EditSingle /></Layout>} />


            <Route path='/addproduct' element={<Layout><DivCountProvider><AddProduct /></DivCountProvider></Layout>} />
            <Route path='/prolist' element={<Layout><DivCountProvider><ProList /></DivCountProvider></Layout>} />
            <Route path='/media' element={<Layout><Media /></Layout>} />
            <Route path='/editproduct/:index' element={<Layout><DivCountProvider><EditProduct /></DivCountProvider></Layout>} />
            <Route path='/bla' element={<Layout><Bla /></Layout>} />
            <Route path='/blaaa' element={<Layout><Blaaa /></Layout>} />


            <Route path='/product-details/:index' element={<Layout><ProductDetails /></Layout>} />
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/checkout' element={<Layout><Checkout /></Layout>} />


            <Route path='/buyerdashboard' element={<Layout><BuyerDashboard /></Layout>} />
            <Route path='/orderpage' element={<Layout><OrderPage /></Layout>} />
            <Route path='/buyermessage' element={<Layout><BuyerMessage /></Layout>} />
            <Route path='/rfq' element={<Layout><Rfq /></Layout>} />
            <Route path='/myprofile' element={<Layout><MyProfile /></Layout>} />

          </Routes>
        </Suspense>

      </BrowserRouter>
    </Fragment>
  )
}

const Layout = ({ children }) => {
  return (
    <div>
      <CartProvider>
        <Header />
      </CartProvider>
      {children}
      <Footer />
    </div>
  );
};

export default App

