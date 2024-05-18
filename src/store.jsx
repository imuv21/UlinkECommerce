
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './Redux/AuthReducer';
import productReducer from './Redux/productSlice';
import otpReducer from './Redux/otpSlice';
import sellerReducer from './Redux/sellerSlice';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        products: productReducer,
        otp: otpReducer,
        seller: sellerReducer,
    },
});

export default store;