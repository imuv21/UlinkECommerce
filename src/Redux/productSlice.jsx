import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({
    page = 0, size = 15, category = '' }) => {
    const response = await axios.get(`${BASE_URL}/category/getproducts`, {
        params: { size, page, category }
    });
    return response.data;
});

export const fetchProductsTwo = createAsyncThunk('products/fetchProductsTwo', async ({
    page = 0, size = 15, category = '' }) => {
    const response = await axios.get(`${BASE_URL}/category/getproducts`, {
        params: { size, page, category }
    });
    return response.data;
});

export const fetchProductsThree = createAsyncThunk('products/fetchProductsThree', async ({
    page = 0, size = 15, category = '' }) => {
    const response = await axios.get(`${BASE_URL}/category/getproducts`, {
        params: { size, page, category }
    });
    return response.data;
});

export const fetchProductsFour = createAsyncThunk('products/fetchProductsFour', async ({
    page = 0, size = 15, category = '' }) => {
    const response = await axios.get(`${BASE_URL}/category/getproducts`, {
        params: { size, page, category }
    });
    return response.data;
});


const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
        totalItems: 0,

        productsTwo: [],
        statusTwo: 'idle',
        errorTwo: null,
        totalItemsTwo: 0,

        productsThree: [],
        statusThree: 'idle',
        errorThree: null,
        totalItemsThree: 0,

        productsFour: [],
        statusFour: 'idle',
        errorFour: null,
        totalItemsFour: 0,
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
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchProductsTwo.pending, (state) => {
                state.statusTwo = 'loading';
            })
            .addCase(fetchProductsTwo.fulfilled, (state, action) => {
                state.statusTwo = 'success';
                state.productsTwo = action.payload.data;
                state.totalItemsTwo = action.payload.totalItems;
            })
            .addCase(fetchProductsTwo.rejected, (state, action) => {
                state.statusTwo = 'failed';
                state.errorTwo = action.error.message;
            })

            .addCase(fetchProductsThree.pending, (state) => {
                state.statusThree = 'loading';
            })
            .addCase(fetchProductsThree.fulfilled, (state, action) => {
                state.statusThree = 'success';
                state.productsThree = action.payload.data;
                state.totalItemsThree = action.payload.totalItems;
            })
            .addCase(fetchProductsThree.rejected, (state, action) => {
                state.statusThree = 'failed';
                state.errorThree = action.error.message;
            })

            .addCase(fetchProductsFour.pending, (state) => {
                state.statusFour = 'loading';
            })
            .addCase(fetchProductsFour.fulfilled, (state, action) => {
                state.statusFour = 'success';
                state.productsFour = action.payload.data;
                state.totalItemsFour = action.payload.totalItems;
            })
            .addCase(fetchProductsFour.rejected, (state, action) => {
                state.statusFour = 'failed';
                state.errorFour = action.error.message;
            })
    },
});

export default productSlice.reducer;
