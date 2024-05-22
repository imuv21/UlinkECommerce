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
const Shipping = lazy(() => import('./components/SellerDashboard/Shipping'));
const EditSingle = lazy(() => import("./components/SellerDashboard/EditSingle"));
const ProductDetails = lazy(() => import('./pages/Cart/ProductDetails'));
const SellerOrder = lazy(() => import('./components/SellerDashboard/SellerOrder/SellerOrder'));
const SellerAddress = lazy(() => import('./components/SellerDashboard/SellerAddress'));
const MainLayout = lazy(() => import('./components/SellerDashboard/MainLayout'));
const ProductList = lazy(() => import( './components/SellerDashboard/ProductList'));
const Media = lazy(() => import('./components/SellerDashboard/Media'));
const SellerHome = lazy(() => import( './components/SellerDashboard/SellerHome'));
const AddSingle = lazy(() => import('./components/SellerDashboard/AddSingle'));
const AddMulti = lazy(() => import('./components/SellerDashboard/AddMulti'));
const Payments = lazy(() => import('./components/SellerDashboard/Payments'));
const UploadProducts = lazy(() => import('./components/SellerDashboard/UploadProducts'));
const EditProducts = lazy(() => import('./components/SellerDashboard/EditProducts'));
const ArchiveUploads = lazy(() => import('./components/SellerDashboard/ArchiveUploads'));

//Both seller and buyer
const Profile = lazy(() => import('./pages/BuyerSeller/Profile'));
const UpdateEmail = lazy(() => import('./pages/BuyerSeller/UpdateEmail'));
const OtpEmail = lazy(() => import('./pages/BuyerSeller/OtpEmail'));
const UpdateNumber = lazy(() => import('./pages/BuyerSeller/UpdateNumber'));
const OtpNumber = lazy(() => import('./pages/BuyerSeller/OtpNumber'));
const OtpPassword = lazy(() => import('./pages/BuyerSeller/OtpPassword'));
const UpdatePassword = lazy(() => import('./pages/BuyerSeller/UpdatePassword'));

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
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const PolicyComponent = lazy(() => import('./pages/PolicyComponent'));

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
            <Route path='/product-details/:id' element={<ProductDetails />} />
            <Route path='/search-results' element={<FilterPage />} />
            <Route path='/category-pages/:category' element={<CategoryPages />} />
            <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/return-policy' element={<PolicyComponent />} />


            {/* Seller dashboard */}
            <Route path='/seller-form' element={<SellerForm />} />
            <Route path='/become-a-seller' element={<BecomeASeller />} />
            <Route path='/commission-structure' element={<CommissionStructure />} />
            <Route path='/editsingle/:index' element={<EditSingle />} />
            <Route path="/seller-order" element={<SellerOrder />} />

            <Route path="/seller-dashboard" element={<MainLayout />}>
              <Route path="add-single-product" element={<AddSingle />} />
              <Route path="add-products-bulk" element={<AddMulti />} />
              <Route path="upload-products-bulk" element={<UploadProducts />} />
              <Route path="edit-products-bulk" element={<EditProducts />} />
              <Route path="archive-products" element={<ArchiveUploads />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="media" element={<Media />} />
              <Route path="seller-home" element={<SellerHome />} />
              <Route path="seller-orders" element={<SellerOrder />} />
              <Route path="shipping-preferences" element={<Shipping />} />
              <Route path="seller-address" element={<SellerAddress />} />
              <Route path="payments" element={<Payments />} />
            </Route>


            {/* Both seller and buyer */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-email" element={<UpdateEmail />} />
            <Route path="/verify-update-email" element={<OtpEmail />} />
            <Route path="/update-number" element={<UpdateNumber />} />
            <Route path="/verify-update-number" element={<OtpNumber />} />
            <Route path="/verify-update-password" element={<OtpPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />


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

