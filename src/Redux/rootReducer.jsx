
import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthReducer';
import productReducer from './productSlice';
import addProductSlice from './addProductSlice';
import otpReducer from './otpSlice';
import sellerReducer from './sellerSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  products: productReducer,
  otp: otpReducer,
  seller: sellerReducer,
  addproduct: addProductSlice,
});

export default rootReducer;
