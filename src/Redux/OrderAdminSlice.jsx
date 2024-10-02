import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


const initialState = {
    loading: false,
    orders: [],
    error: null,

    allLoading: false,
    allOrders: [],
    allError: null,
    pagination: {
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        pageSize: 10,
        hasNext: false,
        hasPrevious: false,
        isFirst: true,
        isLast: true,
        numberOfElements: 0,
    },
    sort: {
        sorted: false,
        unsorted: true,
        empty: true,
    },

    orderDetailsData: null,
    detaiLoading: false,
    detailError: null,
};

export const allOrders = createAsyncThunk(
    'orderAdmin/allOrders',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(
                `${BASE_URL}/admin/get-overall-orders`,
                { headers }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const allOrdersTwo = createAsyncThunk(
    'orderAdmin/allOrdersTwo',
    async ({ id, page, size }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(
                `${BASE_URL}/admin/get-user-orders?id=${id}&page=${page}&size=${size}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error occurred');
        }
    }
);

export const orderDetailSlice = createAsyncThunk(
    'orderAdmin/orderDetailSlice',
    async (orderId, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(
                `${BASE_URL}/admin/get-order-details?orderId=${orderId}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error occurred');
        }
    }
);

const OrderAdminSlice = createSlice({
    name: 'orderAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.orders = action.payload.data.BUYER;
            })
            .addCase(allOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(allOrdersTwo.pending, (state) => {
                state.allLoading = true;
                state.allError = null;
            })
            .addCase(allOrdersTwo.fulfilled, (state, action) => {
                const responseData = action.payload.data;
                state.allLoading = false;
                state.allError = null;
                state.allOrders = responseData.data;
                state.pagination = {
                    currentPage: responseData.currentPage,
                    totalItems: responseData.totalItems,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.pageSize,
                    hasNext: responseData.hasNext,
                    hasPrevious: responseData.hasPrevious,
                    isFirst: responseData.isFirst,
                    isLast: responseData.isLast,
                    numberOfElements: responseData.numberOfElements,
                };
                state.sort = responseData.sort;
            })
            .addCase(allOrdersTwo.rejected, (state, action) => {
                state.allLoading = false;
                state.allError = action.payload;
            })
            .addCase(orderDetailSlice.pending, (state) => {
                state.detaiLoading = true;
                state.detailError = null;
            })
            .addCase(orderDetailSlice.fulfilled, (state, action) => {
                state.detaiLoading = false;
                state.detailError = null;
                state.orderDetailsData = action.payload.data;
            })
            .addCase(orderDetailSlice.rejected, (state, action) => {
                state.detaiLoading = false;
                state.detailError = action.payload;
            });
    },
});

export default OrderAdminSlice.reducer;