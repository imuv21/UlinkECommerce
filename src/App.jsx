import './App.css';
import './Responsive.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
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
const OrderDetails = lazy(() => import('./pages/Cart/OrderDetails'));
const ViewDetail = lazy(() => import('./pages/BuyerDashboard/OrderPage/ViewDetail/ViewDetail'));
const CompanyProfile = lazy(() => import('./pages/BuyerDashboard/CompanyProfile/CompanyProfile'));
const PaymentSuccess = lazy(() => import('./pages/Payment/PaymentSuccess'));
const PaymentFailed = lazy(() => import('./pages/Payment/PaymentFailed'));
const Response = lazy(() => import('./pages/Payment/Response'));
const OrderPage = lazy(() => import('./pages/BuyerDashboard/OrderPage/OrderPage'));
const Translator = lazy(() => import('./components/Translator/Translator'));


//seller dashboard
const SellerForm = lazy(() => import('./pages/SellerForm'));
const NewBecomeASeller = lazy(() => import('./pages/NewBecomeASeller'));
const BecomeASeller = lazy(() => import('./pages/BecomeASeller'));
const CommissionStructure = lazy(() => import('./pages/CommissionStructure'));
const Shipping = lazy(() => import('./components/SellerDashboard/SellerAccount/Shipping'));
const EditSingle = lazy(() => import("./components/SellerDashboard/SellerProduct/EditSingle"));
const ProductDetails = lazy(() => import('./pages/Cart/ProductDetails'));
const SellerOrder = lazy(() => import('./components/SellerDashboard/SellerOrder/SellerOrder'));
const MainLayout = lazy(() => import('./components/SellerDashboard/MainLayout'));
const ProductList = lazy(() => import('./components/SellerDashboard/SellerProduct/ProductList'));
const Media = lazy(() => import('./components/SellerDashboard/SellerProduct/Media'));
const SellerHome = lazy(() => import('./components/SellerDashboard/SellerHome'));
const AddSingle = lazy(() => import('./components/SellerDashboard/SellerProduct/AddSingle'));
const AddMulti = lazy(() => import('./components/SellerDashboard/SellerProduct/AddMulti'));
const Payments = lazy(() => import('./components/SellerDashboard/SellerAccount/Payments'));
const PaymentDetails = lazy(() => import('./components/SellerDashboard/SellerAccount/PaymentDetails'));
const EditPaymentDetails = lazy(() => import('./components/SellerDashboard/SellerAccount/EditPaymentDetails'));
const UploadProducts = lazy(() => import('./components/SellerDashboard/SellerProduct/UploadProducts'));
const EditProducts = lazy(() => import('./components/SellerDashboard/SellerProduct/EditProducts'));
const ArchiveUploads = lazy(() => import('./components/SellerDashboard/SellerProduct/ArchiveUploads'));
const SellerComProfile = lazy(() => import('./components/SellerDashboard/SellerAccount/SellerComProfile'));
const AccessManagement = lazy(() => import('./components/SellerDashboard/Access/AccessManagement'));
const Permissions = lazy(() => import('./components/SellerDashboard/Access/Permissions'));
const AllSellerProducts = lazy(() => import('./components/SellerDashboard/ProductListPages/AllSellerProducts'));


//Both seller and buyer
const Profile = lazy(() => import('./pages/BuyerSeller/Profile'));
const SellerAddress = lazy(() => import('./components/SellerDashboard/SellerAccount/SellerAddress'));
const UpdateEmail = lazy(() => import('./pages/BuyerSeller/UpdateEmail'));
const OtpEmail = lazy(() => import('./pages/BuyerSeller/OtpEmail'));
const UpdateNumber = lazy(() => import('./pages/BuyerSeller/UpdateNumber'));
const OtpNumber = lazy(() => import('./pages/BuyerSeller/OtpNumber'));
const OtpPassword = lazy(() => import('./pages/BuyerSeller/OtpPassword'));
const UpdatePassword = lazy(() => import('./pages/BuyerSeller/UpdatePassword'));
const OtpProfile = lazy(() => import('./pages/BuyerSeller/OtpProfile'));
const Rfqmarketplace = lazy(() => import('./pages/BuyerSeller/Rfqmarketplace'));


//public
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Otp = lazy(() => import('./pages/Otp'));
const ResetPassVerify = lazy(() => import('./pages/ResetPassVerify'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Guidelines = lazy(() => import('./pages/Guidelines/Guidelines'));
const Checkout = lazy(() => import('./pages/Cart/Checkout'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const RoughFP = lazy(() => import('./pages/RoughFP'));
const CategoryPages = lazy(() => import('./pages/CategoryPages'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const PolicyComponent = lazy(() => import('./pages/PolicyComponent'));
const FAQPage = lazy(() => import('./pages/FAQ/FAQPage'));
const GoogleCallback = lazy(() => import('./pages/GoogleCallback'));

//Admin
const AdminLayout = lazy(() => import('./admin/adminDashboard/AdminLayout'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const Bla = lazy(() => import('./admin/Bla'));
const AdLayout = lazy(() => import('./admin/adminDashboard/AdLayout'));

//Other
const Protector = lazy(() => import('./components/Protector'));


function App() {

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = user?.role;


  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Layout>
          <Routes>

            {/* public */}
            <Route path='/guidelines' element={<Guidelines />} />
            <Route path='/product-details/:id' element={<ProductDetails />} />
            <Route path='/' element={<Home />} />
            <Route path='/search-results' element={<RoughFP />} />
            <Route path='/category-pages/:category' element={<CategoryPages />} />
            <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/return-policy' element={<PolicyComponent />} />
            <Route path='/become-a-seller' element={<BecomeASeller />} />
            <Route path='/commission-structure' element={<CommissionStructure />} />
            <Route path='/faq' element={<FAQPage />} />
            <Route path="/rfqmarketplace" element={<Rfqmarketplace />} />

            <Route path="/admin-dashboard" element={<AdminLayout />}>
              <Route path="admin-login" element={<AdLayout><AdminLogin /></AdLayout>} />
              <Route path="bla" element={<AdLayout><Bla /></AdLayout>} />
            </Route>

            {/* Without authentication */}
            <Route element={<Protector isAuthenticated={!isAuthenticated} redirect='/' />}>
              <Route path='/login' element={<Login />} />
              <Route path='/verify-email' element={<Otp />} />
              <Route path='/verify-reset-password' element={<ResetPassVerify />} />
              <Route path='/forgot-password' element={<ResetPassword />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/seller-form' element={<SellerForm />} />
              <Route path='/seller-center' element={<NewBecomeASeller />} />
              <Route path='/google-callback' element={<GoogleCallback />} />

              <Route path='/admin/login' element={<AdminLogin />} />
            </Route>

            {/* Admin */}
            {/* <Route element={<Protector isAuthenticated={isAuthenticated} role={userRole} requiredRole="Admin" redirect='/admin/login' />}>
              <Route path="/seller-order" element={<SellerOrder />} />
            </Route> */}

            {/* Manager */}
            {/* <Route element={<Protector isAuthenticated={isAuthenticated} role={userRole} requiredRole="Manager" redirect='/admin/login' />}>
              <Route path="/seller-order" element={<SellerOrder />} />
            </Route> */}

            {/* Seller dashboard */}
            <Route element={<Protector isAuthenticated={isAuthenticated} role={userRole} requiredRole="Seller" redirect='/seller-center' />}>
              <Route path='/editsingle/:productId' element={<EditSingle />} />
              <Route path="/seller-order" element={<SellerOrder />} />
              <Route path="/all-products" element={<AllSellerProducts />} />

              <Route path="/seller-dashboard" element={<MainLayout />}>
                <Route path="add-single-product" element={<AddSingle />} />
                <Route path="add-products-bulk" element={<AddMulti />} />
                <Route path="upload-products-bulk" element={<UploadProducts />} />
                <Route path="edit-products-bulk" element={<EditProducts />} />
                <Route path="archive-products" element={<ArchiveUploads />} />
                <Route path="product-list" element={<ProductList />} />
                <Route path="media" element={<Media />} />
                <Route path="seller-home" element={<SellerHome />} />
                <Route path="access-management" element={<AccessManagement />} />
                <Route path="permissions" element={<Permissions />} />
                <Route path="seller-orders" element={<SellerOrder />} />
                <Route path="shipping-preferences" element={<Shipping />} />
                <Route path="payments" element={<Payments />} />
                <Route path="add-a-bank-account" element={<PaymentDetails />} />
                <Route path="edit-bank-account/:id" element={<EditPaymentDetails />} />
                <Route path="seller-company-profile" element={<SellerComProfile />} />
              </Route>
            </Route>

            {/* Both seller and buyer */}
            <Route element={<Protector isAuthenticated={isAuthenticated} redirect='/' />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-addresses" element={<SellerAddress />} />

              <Route path="/update-email" element={<UpdateEmail />} />
              <Route path="/verify-update-email" element={<OtpEmail />} />
              <Route path="/update-number" element={<UpdateNumber />} />
              <Route path="/verify-update-number" element={<OtpNumber />} />
              <Route path="/verify-update-password" element={<OtpPassword />} />
              <Route path="/verify-update-profile" element={<OtpProfile />} />
              <Route path="/update-password" element={<UpdatePassword />} />
            </Route>

            {/* Buyer dashboard */}
            <Route element={<Protector isAuthenticated={isAuthenticated} role={userRole} requiredRole="Buyer" redirect='/' />}>
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
              <Route path='/view-detail' element={<ViewDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/company-profile' element={<CompanyProfile />} />
              <Route path='/payment-success' element={<PaymentSuccess />} />
              <Route path='/payment-failed' element={<PaymentFailed />} />
              <Route path='/payment-response' element={<Response />} />
              <Route path='/orders' element={<Translator />} />
              <Route path='/order-details/:orderId' element={<OrderDetails />} />
              <Route path='/order-page' element={<OrderPage />} />
            </Route>

            {/* other */}
            <Route path='*' element={<div className="flexcol wh" style={{ height: '100vh' }}>Path does not exist!</div>} />

          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  )
};

export default App

