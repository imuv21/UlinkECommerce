import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Thunk to fetch product data for editing
export const fetchEditProduct = createAsyncThunk(
    'editproducts/fetchEditProduct',
    async (productId, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/product/product-to-update/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

// Thunk to update product data
export const updateProduct = createAsyncThunk(
    'editproducts/updateProduct',
    async ({ productId, productData }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.put(`${BASE_URL}/product/update-product/${productId}`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

const updateProductSlice = createSlice({
    name: 'editproducts',
    initialState: {
        productData: null,
        fetchedImages: [],
        loading: false,
        error: null,
        updateStatus: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEditProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEditProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.productData = action.payload;
                state.fetchedImages = Array.isArray(action.payload.images) ? action.payload.images.map(image => ({
                    imageUrl: image.imageUrl,
                    name: image.name,
                    priority: image.priority,
                    imageId: image.imageId,
                })) : [];
            })
            .addCase(fetchEditProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.updateStatus = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.updateStatus = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default updateProductSlice.reducer;
