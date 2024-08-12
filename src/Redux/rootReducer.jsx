
import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthReducer';
import productReducer from './productSlice';
import filterProductSlice from './filterProductSlice';
import addProductSlice from './addProductSlice';
import otpReducer from './otpSlice';
import sellerReducer from './sellerSlice';
import productDetailSlice from './productDetailSlice';
import cartReducer from './cartSlice';
import sellerProductSlice from './sellerProductSlice';
import currencyReducer from './currencySlice';
import updateProductReducer from './updateProductSlice';
import forgotPasswordReducer from './forgotPasswordSlice';
import addressReducer from './addressSlice';
import creditInfoSlice from './creditInfoSlice';
import businessProfileSlice from './businessProfileSlice';
import sellerBusinessProfileSlice from './sellerBusinessProfileSlice';
import bankDetailsReducer from './bankDetailsSlice';
import selectedAddressReducer from './selectedAddress';
import uploadBuyerDocSlice from './uploadBuyerDocSlice';
import paymentMethodsReducer from './paymentMethods';
import selectedPaymentMethodReducer from './selectedPaymentMethod';
import ordersSlice from './ordersSlice';



const rootReducer = combineReducers({
  auth: AuthReducer,
  products: productReducer,
  filterProducts: filterProductSlice,
  otp: otpReducer,
  seller: sellerReducer,
  addproduct: addProductSlice,
  productDetail: productDetailSlice,
  cart: cartReducer,
  sellerProducts: sellerProductSlice,
  currency: currencyReducer,
  editproducts: updateProductReducer,
  forgotPassword: forgotPasswordReducer,
  address: addressReducer,
  creditInfo: creditInfoSlice,
  businessProfile: businessProfileSlice,
  sellerBusinessProfile: sellerBusinessProfileSlice,
  bankDetails: bankDetailsReducer,
  selectedAddress: selectedAddressReducer,
  uploadBuyerDoc: uploadBuyerDocSlice,
  paymentMethods: paymentMethodsReducer,
  selectedPaymentMethod: selectedPaymentMethodReducer,
  orders: ordersSlice
});

export default rootReducer;
