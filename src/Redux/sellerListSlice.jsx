import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSellerDetail = createAsyncThunk(
    'sellerList/getSellerDetail',
    async ({userType = 'SELLER', page = 0, pageSize = 7}, { getState, rejectWithValue }) => {
        try {
            const { auth: { token: authToken } } = getState();
            const response = await axios.get(`${BASE_URL}/admin/get-user`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    userType, page, pageSize
                }
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
        data: [],
        status: 'idle',
        message: '',
        error: null,
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        pageSize: 10,
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
                const fetchedData = action.payload.data.data;
                console.log('Data fetched:', fetchedData);
                state.data = fetchedData;
                state.currentPage = action.payload.data.currentPage;
                state.totalItems = action.payload.data.totalItems;
                state.totalPages = action.payload.data.totalPages;
                state.pageSize = action.payload.data.pageSize;
                state.message = 'Seller list fetched succesfully';
                state.error = null;
                console.log('Seller list fetched successfully');

            })
            .addCase(getSellerDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.message = 'Seller detail fetch failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default sellerListSlice.reducer;
