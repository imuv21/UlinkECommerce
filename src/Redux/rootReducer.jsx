
import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthReducer';
import productReducer from './productSlice';
import addProductSlice from './addProductSlice';
import otpReducer from './otpSlice';
import sellerReducer from './sellerSlice';
import productDetailSlice from './productDetailSlice';
import cartReducer from './cartSlice';


const rootReducer = combineReducers({
  auth: AuthReducer,
  products: productReducer,
  otp: otpReducer,
  seller: sellerReducer,
  addproduct: addProductSlice,
  productDetail: productDetailSlice,
  cart: cartReducer,
});

export default rootReducer;
