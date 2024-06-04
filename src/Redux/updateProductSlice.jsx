import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

const updateProductSlice = createSlice({
    name: 'editproducts',
    initialState: {
        productData: null,
        loading: false,
        error: null,
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
            })
            .addCase(fetchEditProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default updateProductSlice.reducer;
