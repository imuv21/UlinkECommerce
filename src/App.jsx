import './App.css';
import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout';
import { UserTypeProvider } from './components/context/CartContext';


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
const SellerOrder = lazy(() => import('./components/SellerDashboard/SellerOrder/SellerOrder'));




//public
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Otp = lazy(() => import('./pages/Otp'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Guidelines = lazy(() => import('./pages/Guidelines/Guidelines'));
const Checkout = lazy(() => import('./pages/Cart/Checkout'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const FilterPage = lazy(() => import('./pages/FilterPage'));
const CategoryPages = lazy(() => import('./pages/CategoryPages'));

//Other
const Image = lazy(() => import('./components/Image'));
const Translator = lazy(() => import('./components/Translator/Translator'));





function App() {
  return (
    <Fragment>
      <BrowserRouter>

        <Suspense fallback={<Loader />}>
          <Routes>

            {/* public */}
            <Route path='/' element={<Layout><Home /></Layout>} />

            <Route path='/signup' element={<UserTypeProvider><Signup /></UserTypeProvider>} />
            <Route path='/login' element={<UserTypeProvider><Login /></UserTypeProvider>} />
            <Route path='/verify-email' element={<UserTypeProvider><Otp /></UserTypeProvider>} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/guidelines' element={<Layout><Guidelines /></Layout>} />
            <Route path='/product-details/:index' element={<Layout><ProductDetails /></Layout>} />
            <Route path='/search-results' element={<Layout><FilterPage /></Layout>} />
            <Route path= '/category-pages/:category' element={<Layout><CategoryPages /></Layout>} />



            {/* Seller dashboard */}
            <Route path='/seller-form' element={<UserTypeProvider><SellerForm /></UserTypeProvider>} />
            <Route path='/become-a-seller' element={<Layout><BecomeASeller /></Layout>} />
            <Route path='/commission-structure' element={<Layout><CommissionStructure /></Layout>} />
            <Route path="/seller-dashboard" element={<Layout><SideNav /></Layout>} />
            <Route path='/editsingle/:index' element={<Layout><EditSingle /></Layout>} />
            <Route path="/seller-order" element={<Layout><SellerOrder /></Layout>} />
           



            {/* other */}
            <Route path='/img' element={<Layout><Image /></Layout>} />
            <Route path='/trans' element={<Translator />} />




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
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/checkout' element={<Layout><Checkout /></Layout>} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  )
};

export default App

