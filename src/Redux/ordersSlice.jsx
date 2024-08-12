import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;



export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { getState, rejectWithValue }) => {
    try {
        const { auth } = getState();
        const token = auth.token;
        const response = await axios.get('https://api.ulinkit.com/api/get-orders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (orderId, { getState, rejectWithValue }) => {
    try {
        const { auth } = getState();
        const token = auth.token;
        const response = await axios.post(`${BASE_URL}/cancel-order/${orderId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false,
        error: null,
        cancelLoading: false,
        cancelError: null,
        cancelSuccess: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.cancelLoading = true;
                state.cancelError = null;
                state.cancelSuccess = false;
            })
            .addCase(cancelOrder.fulfilled, (state) => {
                state.cancelLoading = false;
                state.cancelSuccess = true;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.cancelLoading = false;
                state.cancelError = action.payload.message;
            });
    },
});

export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
export const selectCancelLoading = (state) => state.orders.cancelLoading;
export const selectCancelError = (state) => state.orders.cancelError;
export const selectCancelSuccess = (state) => state.orders.cancelSuccess;

export default ordersSlice.reducer;
