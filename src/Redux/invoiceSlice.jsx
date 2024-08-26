import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async (orderId, { getState, rejectWithValue }) => {
    try {
        const { auth } = getState();
        const token = auth.token;
        const response = await axios.get(`${BASE_URL}/get-invoice/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: {
        loading: false,
        error: null,

        buyer: null,
        address: null,
        orderDetails: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload.data;

                state.buyer = action.payload.data.buyer;
                state.address = action.payload.data.address;
                state.orderDetails = action.payload.data.orderDetails;
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    },
});

export default invoiceSlice.reducer;