import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
    sellerProducts: [],
    loading: false,
    error: null,
};

export const fetchSellerProducts = createAsyncThunk(
    'sellerProducts/fetchSellerProducts',
    async ({ page = 0, size = 0 }, { getState , rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/seller/getProducts`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: page,
                    size: size
                }
            });
            return response.data;
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
                state.sellerProducts = action.payload;
            })
            .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default sellerProductSlice.reducer;
