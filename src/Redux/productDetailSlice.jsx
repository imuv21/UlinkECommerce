
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchProductDetail = createAsyncThunk('productDetail/fetchProductDetail', async (productId) => {
    const response = await axios.get(`${BASE_URL}/api/product/${productId}`);
    return response.data;
});

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        product: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productDetailSlice.reducer;
