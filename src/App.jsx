import './App.css';
import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { DivCountProvider } from './components/context/SuperContext';
import { CartProvider } from './components/context/CartContext';


//buyer dashboard
const BuyerDashboard = lazy(() => import('./pages/BuyerDashboard/BuyerDashboard'));
const BuyerMessage = lazy(() => import('./pages/BuyerDashboard/BuyerMassage/BuyerMessage'));
const Rfq = lazy(() => import('./pages/BuyerDashboard/Rfq/Rfq'));
const MyProfile = lazy(() => import('./pages/BuyerDashboard/MyProfile/MyProfile'));
const AcessManagement = lazy(() => import('./pages/BuyerDashboard/AcessManagement/AcessManagement'));
const Payment = lazy(() => import('./pages/BuyerDashboard/Payment/Payment'));
const Roles = lazy(() => import('./pages/BuyerDashboard/Roles/Roles'));
const CreateRfq = lazy(() => import('./pages/BuyerDashboard/Rfq/CreateRfq/CreateRfq'));
const ReviewConfirm = lazy(() => import('./pages/BuyerDashboard/Rfq/CreateRfq/ReviewConfirm/ReviewConfirm'));
const RfqDetail = lazy(() => import('./pages/BuyerDashboard/Rfq/CreateRfq/RfqDetail/RfqDetail'));
const OrderPage = lazy(() => import('./pages/BuyerDashboard/OrderPage/OrderPage'));
const ViewDetail = lazy(() => import('./pages/BuyerDashboard/OrderPage/ViewDetail/ViewDetail'));


//seller dashboard
const SellerForm = lazy(() => import('./pages/SellerForm'));
const BecomeASeller = lazy(() => import('./pages/BecomeASeller'));
const CommissionStructure = lazy(() => import('./pages/CommissionStructure'));
const SideNav = lazy(() => import('./components/SideNav/SideNav'));
const EditSingle = lazy(() => import("./components/SellerDashboard/EditSingle"));
const ProductDetails = lazy(() => import('./pages/Cart/ProductDetails'));


//public
const Header = lazy(() => import('./components/Header/Header'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Otp = lazy(() => import('./pages/Otp'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Guidelines = lazy(() => import('./pages/Guidelines/Guidelines'));
const Checkout = lazy(() => import('./pages/Cart/Checkout'));
const Cart = lazy(() => import('./pages/Cart/Cart'));


//Other
const AddressComponent = lazy(() => import("./components/Translator/AddressComponent"));
const Image = lazy(() => import('./components/Image'));
const Translator = lazy(() => import('./components/Translator/Translator'));
const AddProduct = lazy(() => import("./components/Translator/AddProduct"));
const EditProduct = lazy(() => import("./components/Translator/EditProduct"));
const ProList = lazy(() => import("./components/Translator/ProList"));
const Media = lazy(() => import("./components/Translator/Media"));
const Blabla = lazy(() => import('./components/Translator/Blabla'));




function App() {
  return (
    <Fragment>
      <BrowserRouter>

        <Suspense fallback={<Loader />}>
          <Routes>

            {/* public */}
            <Route path='/' element={<Layout><Home /></Layout>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/guidelines' element={<Layout><Guidelines /></Layout>} />
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/checkout' element={<Layout><Checkout /></Layout>} />


             {/* Seller dashboard */}
            <Route path='/seller-form' element={<SellerForm />} />
            <Route path='/become-a-seller' element={<Layout><BecomeASeller /></Layout>} />
            <Route path='/commission-structure' element={<Layout><CommissionStructure /></Layout>} />
            <Route path='/seller-dash' element={<Layout><SideNav /></Layout>} />
            <Route path='/editsingle/:index' element={<Layout><EditSingle /></Layout>} />
            <Route path='/product-details/:index' element={<Layout><ProductDetails /></Layout>} />


            {/* other */}
            <Route path='/test-address' element={<Layout><AddressComponent /></Layout>} />
            <Route path='/img' element={<Layout><Image /></Layout>} />
            <Route path='/blabla' element={<Layout><Blabla /></Layout>} />
            <Route path='/trans' element={<Layout><Translator /></Layout>} />
            <Route path='/addproduct' element={<Layout><DivCountProvider><AddProduct /></DivCountProvider></Layout>} />
            <Route path='/editproduct/:index' element={<Layout><DivCountProvider><EditProduct /></DivCountProvider></Layout>} />
            <Route path='/prolist' element={<Layout><DivCountProvider><ProList /></DivCountProvider></Layout>} />
            <Route path='/test-media' element={<Layout><Media /></Layout>} />


             {/* Buyer dashboard */}
            <Route path='/buyer-dashboard' element={<Layout><BuyerDashboard /></Layout>} />
            <Route path='/buyer-message' element={<Layout><BuyerMessage /></Layout>} />
            <Route path='/rfq' element={<Layout><Rfq /></Layout>} />
            <Route path='/myprofile' element={<Layout><MyProfile /></Layout>} />
            <Route path='/access-management' element={<Layout><AcessManagement /></Layout>} />
            <Route path='/payment' element={<Layout><Payment /></Layout>} />
            <Route path='/roles' element={<Layout><Roles /></Layout>} />
            <Route path='/createrfq' element={<Layout><CreateRfq /></Layout>} />
            <Route path='/review-confirm' element={<Layout><ReviewConfirm /></Layout>} />
            <Route path='/rfq-detail' element={<Layout><RfqDetail /></Layout>} />
            <Route path='/order-page' element={<Layout><OrderPage /></Layout>} />
            <Route path='/view-detail' element={<Layout><ViewDetail /></Layout>} />

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

