import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


const initialState = {
  loading: false,
  products: [],
  error: null,
};


export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;
      console.log("Token:", token);

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      for (const [key, value] of formData.entries()) {
        console.log(`Sending data : ${key}: ${value}`);
      }

      const response = await axios.post(
        `${BASE_URL}/AddProduct`,
        formData,
        { headers }
      );
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error response:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const addProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addProductSlice.reducer;
