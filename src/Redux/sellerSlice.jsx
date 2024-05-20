import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const updateSellerDetails = createAsyncThunk(
    'seller/updateSellerDetails',
    async ({ username, password, sellerData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/update-seller-details?username=${username}&password=${password}`,
                sellerData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        message: '',
        success: false,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateSellerDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSellerDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(updateSellerDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message || 'Failed to update seller details';
            });
    },
});

export default sellerSlice.reducer;
