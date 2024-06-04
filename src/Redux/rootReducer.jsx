
import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthReducer';
import productReducer from './productSlice';
import addProductSlice from './addProductSlice';
import otpReducer from './otpSlice';
import sellerReducer from './sellerSlice';
import productDetailSlice from './productDetailSlice';
import cartReducer from './cartSlice';
import sellerProductSlice from './sellerProductSlice';
import currencyReducer from './currencySlice';
import updateProductSlice from './updateProductSlice';


const rootReducer = combineReducers({
  auth: AuthReducer,
  products: productReducer,
  otp: otpReducer,
  seller: sellerReducer,
  addproduct: addProductSlice,
  productDetail: productDetailSlice,
  cart: cartReducer,
  sellerProducts: sellerProductSlice,
  currency: currencyReducer,
  editproducts: updateProductSlice,
});

export default rootReducer;
