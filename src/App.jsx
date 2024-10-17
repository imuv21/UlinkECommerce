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
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Source = lazy(() => import('./pages/Source'));
const PaymentMethod = lazy(() => import('./pages/PaymentMethod'));
const Enterprise = lazy(() => import('./pages/Enterprise'));
const AllCat = lazy(() => import('./pages/AllCat'));


//Admin
const AdminLayout = lazy(() => import('./admin/adminDashboard/AdminLayout'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminOrder = lazy(() => import('./admin/Orders/AdminOrder'));
const Orders = lazy(() => import('./admin/Orders/Orders'));
const AdLayout = lazy(() => import('./admin/adminDashboard/AdLayout'));
const BuyerList = lazy(() => import('./admin/BuyerList'));
const SellerList = lazy(() => import('./admin/SellerList'));
const AdminWarehouse = lazy(() => import('./admin/AdminWarehouse'));
const BuyerDetail = lazy(() => import('./admin/BuyerDetail'));
const AdminOrderDetails = lazy(() => import('./admin/Orders/AdminOrderDetails'));


//Other
const Protector = lazy(() => import('./components/Protector'));
const AdminProtector = lazy(() => import('./components/AdminProtector'));


function App() {

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = user?.role;


  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Routes>

          {/* public */}
          <Route path='/' element={<Layout><Home /></Layout>} />
          <Route path='/guidelines' element={<Layout><Guidelines /></Layout>} />
          <Route path='/product-details/:id' element={<Layout><ProductDetails /></Layout>} />
          <Route path='/search-results' element={<Layout><RoughFP /></Layout>} />
          <Route path='/category-pages/:category' element={<Layout><CategoryPages /></Layout>} />
          <Route path='/terms-and-conditions' element={<Layout><TermsAndConditions /></Layout>} />
          <Route path='/privacy-policy' element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path='/return-policy' element={<Layout><PolicyComponent /></Layout>} />
          <Route path='/become-a-seller' element={<Layout><BecomeASeller /></Layout>} />
          <Route path='/commission-structure' element={<Layout><CommissionStructure /></Layout>} />
          <Route path='/faq' element={<Layout><FAQPage /></Layout>} />
          <Route path="/rfqmarketplace" element={<Layout><Rfqmarketplace /></Layout>} />
          <Route path='/contact-us' element={<Layout><ContactUs /></Layout>} />
          <Route path='/source-on-ulinkit' element={<Layout><Source /></Layout>} />
          <Route path='/payment-method' element={<Layout><PaymentMethod /></Layout>} />
          <Route path='/enterprise' element={<Layout><Enterprise /></Layout>} />
          <Route path='/all-categories' element={<Layout><AllCat /></Layout>} />


          {/*Without authentication */}
          <Route element={<Protector isAuthenticated={!isAuthenticated} redirect='/' />}>
            <Route path='/login' element={<Login />} />
            <Route path='/verify-email' element={<Otp />} />
            <Route path='/verify-reset-password' element={<ResetPassVerify />} />
            <Route path='/forgot-password' element={<ResetPassword />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/seller-form' element={<SellerForm />} />
            <Route path='/seller-center' element={<Layout><NewBecomeASeller /></Layout>} />
            <Route path='/google-callback' element={<GoogleCallback />} />
          </Route>

          {/*Admin without authentication */}
          <Route element={<AdminProtector isAuthenticated={!isAuthenticated} />}>
            <Route path="/admin-login" element={<AdminLogin />} />
          </Route>

          {/* Both admin and manager */}
          <Route element={<AdminProtector isAuthenticated={isAuthenticated} role={userRole} requiredRoles={['Admin', 'Manager']} />}>
            <Route path="/admin-dashboard" element={<AdminLayout />}>
              <Route path="admin-order" element={<AdLayout><AdminOrder /></AdLayout>} />
              <Route path="all-orders/:id" element={<AdLayout><Orders /></AdLayout>} />
              <Route path="admin-order-details/:orderId" element={<AdLayout><AdminOrderDetails /></AdLayout>} />
              <Route path="buyer-list" element={<AdLayout><BuyerList /></AdLayout>} />
              <Route path="seller-list" element={<AdLayout><SellerList /></AdLayout>} />
              <Route path="warehouse" element={<AdLayout><AdminWarehouse /></AdLayout>} />
              <Route path='buyer-detail/:id' element={<AdLayout><BuyerDetail /></AdLayout>} />
            </Route>
          </Route>

          {/* Seller dashboard */}
          <Route element={<Protector isAuthenticated={isAuthenticated} role={userRole} requiredRoles={['Seller']} redirect='/seller-center' />}>
            <Route path='/editsingle/:productId' element={<Layout><EditSingle /></Layout>} />
            <Route path="/seller-order" element={<Layout><SellerOrder /></Layout>} />
            <Route path="/all-products" element={<Layout><AllSellerProducts /></Layout>} />

            <Route path="/seller-dashboard" element={<Layout><MainLayout /></Layout>}>
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
          <Route element={<Protector isAuthenticated={isAuthenticated} role={userRole} requiredRoles={['Seller', 'Buyer']} redirect='/' />}>
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/my-addresses" element={<Layout><SellerAddress /></Layout>} />

            <Route path="/update-email" element={<UpdateEmail />} />
            <Route path="/verify-update-email" element={<OtpEmail />} />
            <Route path="/update-number" element={<UpdateNumber />} />
            <Route path="/verify-update-number" element={<OtpNumber />} />
            <Route path="/verify-update-password" element={<OtpPassword />} />
            <Route path="/verify-update-profile" element={<OtpProfile />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Route>

          {/* Buyer dashboard */}
          <Route element={<Protector isAuthenticated={isAuthenticated} role={userRole} requiredRoles={['Buyer']} redirect='/' />}>
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
            <Route path='/view-detail' element={<Layout><ViewDetail /></Layout>} />
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/checkout' element={<Layout><Checkout /></Layout>} />
            <Route path='/company-profile' element={<Layout><CompanyProfile /></Layout>} />
            <Route path='/payment-success' element={<Layout><PaymentSuccess /></Layout>} />
            <Route path='/payment-failed' element={<Layout><PaymentFailed /></Layout>} />
            <Route path='/payment-response' element={<Layout><Response /></Layout>} />
            <Route path='/orders' element={<Layout><Translator /></Layout>} />
            <Route path='/order-details/:orderId' element={<Layout><OrderDetails /></Layout>} />
            <Route path='/order-page' element={<Layout><OrderPage /></Layout>} />
          </Route>

          {/* other */}
          <Route path='*' element={<div className="flexcol wh" style={{ height: '100vh' }}>Path does not exist!</div>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
};

export default App

