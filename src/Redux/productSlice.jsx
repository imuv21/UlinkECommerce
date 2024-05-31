import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page = 0, size = 0 }) => {
    const response = await axios.get(`${BASE_URL}/getproducts?size=${size}&page=${page}`); 
    return response.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        totalItems: 0,
        currentPage: 0,
        totalPages: 0,
        pageSize: 0,
        status: 'idle',
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
                state.pageSize = action.payload.pageSize;
              })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
