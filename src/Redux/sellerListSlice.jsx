import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSellerDetail = createAsyncThunk(
    'sellerList/getSellerDetail',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth: { token: authToken } } = getState();
            const response = await axios.get(`${BASE_URL}/admin/get-user`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

const sellerListSlice = createSlice({
    name: 'sellerList',
    initialState: {
        data: null,
        status: 'idle',
        message: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSellerDetail.pending, (state) => {
                state.status = 'loading';
                state.message = 'Seller list loading...';
                state.error = null;
                console.log('Seller list is loading');
            })
            .addCase(getSellerDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('Seller Data fetched:', action.payload.data);
                state.data = action.payload.data;
                state.message = 'Seller list fetched successfully';
                state.error = null;
                console.log('Seller detail fetched successfully');
            })
            .addCase(getSellerDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.message = 'Seller detail fetch failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default sellerListSlice.reducer;
