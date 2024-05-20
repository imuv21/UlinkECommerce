
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './Redux/AuthReducer';
import productReducer from './Redux/productSlice';
import addProductSlice from './Redux/addProductSlice';
import otpReducer from './Redux/otpSlice';
import sellerReducer from './Redux/sellerSlice';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        products: productReducer,
        otp: otpReducer,
        seller: sellerReducer,
        addproduct: addProductSlice,
    },
});

export default store;