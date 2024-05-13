import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout';


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
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Layout>
          <Routes>

            {/* public */}
            <Route path='/' element={<Home />} />

            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/verify-email' element={<Otp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/guidelines' element={<Guidelines />} />
            <Route path='/product-details/:index' element={<ProductDetails />} />
            <Route path='/search-results' element={<FilterPage />} />
            <Route path='/category-pages/:category' element={<CategoryPages />} />



            {/* Seller dashboard */}
            <Route path='/seller-form' element={<SellerForm />} />
            <Route path='/become-a-seller' element={<BecomeASeller />} />
            <Route path='/commission-structure' element={<CommissionStructure />} />
            <Route path="/seller-dashboard" element={<SideNav />} />
            <Route path='/editsingle/:index' element={<EditSingle />} />
            <Route path="/seller-order" element={<SellerOrder />} />




            {/* other */}
            <Route path='/img' element={<Image />} />
            <Route path='/trans' element={<Translator />} />




            {/* Buyer dashboard */}
            <Route path='/buyer-dashboard' element={<BuyerDashboard />} />
            <Route path='/buyer-message' element={<BuyerMessage />} />
            <Route path='/rfq' element={<Rfq />} />
            <Route path='/myprofile' element={<MyProfile />} />
            <Route path='/access-management' element={<AcessManagement />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/roles' element={<Roles />} />
            <Route path='/createrfq' element={<CreateRfq />} />
            <Route path='/review-confirm' element={<ReviewConfirm />} />
            <Route path='/rfq-detail' element={<RfqDetail />} />
            <Route path='/order-page' element={<OrderPage />} />
            <Route path='/view-detail' element={<ViewDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />

          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  )
};

export default App

