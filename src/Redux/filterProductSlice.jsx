import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchFilterProducts = createAsyncThunk('filterProducts/fetchFilterProducts', async ({
    page = 0, size = 15, sort = 'PRICE_HIGH_TO_LOW', category = '', search = '', minPrice = 0, maxPrice = 100000 }) => {
    const response = await axios.get(`${BASE_URL}/category/getproducts`, {
        params: { size, page, sort, category, search, minPrice, maxPrice }
    });
    return response.data;
});

const filterProductSlice = createSlice({
    name: 'filterProducts',
    initialState: {
        filterProducts: [],

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
            .addCase(fetchFilterProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilterProducts.fulfilled, (state, action) => {
                state.status = 'success';
                state.filterProducts = action.payload.data;

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
            .addCase(fetchFilterProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default filterProductSlice.reducer;
