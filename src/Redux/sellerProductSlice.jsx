import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
    sellerProducts: [],
    totalItems: 0,
    currentPage: 0,
    loading: false,
    error: null,
    pageSize: 20,
};

export const fetchSellerProducts = createAsyncThunk(
    'sellerProducts/fetchSellerProducts',
    async ({ page }, { getState , rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/seller/getProducts`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: page
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteSellerProduct = createAsyncThunk(
    'sellerProducts/deleteSellerProduct',
    async ({ productId }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/seller/product-delete/${productId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 200 || response.status === 204) {
                return productId;
            } else {
                return rejectWithValue("Failed to delete the product");
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const sellerProductSlice = createSlice({
    name: 'sellerProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerProducts = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;

                state.pageSize = action.payload.pageSize;
                state.isFirst = action.payload.isFirst;
                state.isLast = action.payload.isLast;
                state.hasPrevious = action.payload.hasPrevious;
                state.hasNext = action.payload.hasNext;
            })
            .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteSellerProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSellerProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerProducts = state.sellerProducts.filter(product => product.productId !== action.payload);
            })
            .addCase(deleteSellerProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default sellerProductSlice.reducer;
