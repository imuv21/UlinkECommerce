
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
    items: [],
    totalSellPrice: 0,
    currency: '',
    currencySymbol: '',
    status: 'idle',
    error: null
};

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            console.log('Auth Token:', token);
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.post(
                `${BASE_URL}/add-to-cart?productId=${productId}&quantity=${quantity}`,
                {}, 
                { headers } 
            );
            return response.data;
        } catch (err) {
            console.error('Error response:', err.response);
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(
                `${BASE_URL}/get-cart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (productId, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(
                `${BASE_URL}/cart/remove-item/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, quantity }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(
                `${BASE_URL}/cart/adjust-item?productId=${productId}&quantity=${quantity}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log('API response:', response.data);
            return response.data;
        } catch (err) {
            console.error('Error response:', err.response);
            return rejectWithValue(err.response.data);
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.cartItems;
                state.totalSellPrice = action.payload.totalSellPrice;
                state.currency = action.payload.currency;
                state.currencySymbol = action.payload.currencySymbol;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(item => item.productId !== action.meta.arg);
                state.totalSellPrice = action.payload.totalSellPrice;
                state.currency = action.payload.currency;
                state.currencySymbol = action.payload.currencySymbol;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedCartItem = action.payload.cartItems.find(item => item.productId === action.meta.arg.productId);
                const index = state.items.findIndex(item => item.productId === action.meta.arg.productId);
                if (index !== -1) {
                    state.items[index] = updatedCartItem;
                } else {
                    state.items.push(updatedCartItem); 
                }
                state.totalSellPrice = action.payload.totalSellPrice;
                state.currency = action.payload.currency;
                state.currencySymbol = action.payload.currencySymbol;
                console.log('Cart item updated:', state.items[index]);
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer;


