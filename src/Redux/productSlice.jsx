import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({
    page = 0, size = 10, sort = 'PRICE_HIGH_TO_LOW', category = '', minPrice = 0, maxPrice = 100000 }) => {
    const response = await axios.get(`${BASE_URL}/category/getproducts`, {
        params: { size, page, sort, category, minPrice, maxPrice }
    });
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
        numberOfElements: 0,

        lastPage: null,
        isLast: null,
        hasNext: null,
        hasPrevious: null,
        isFirst: null,
        firstPage: null,

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
                state.status = 'success';
                state.products = action.payload.data;

                state.totalItems = action.payload.totalItems;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
                state.pageSize = action.payload.pageSize;
                state.numberOfElements = action.payload.numberOfElements;

                state.lastPage = action.payload.lastPage;
                state.isLast = action.payload.isLast;
                state.hasNext = action.payload.hasNext;
                state.hasPrevious = action.payload.hasPrevious;
                state.isFirst = action.payload.isFirst;
                state.firstPage = action.payload.firstPage;
              })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
