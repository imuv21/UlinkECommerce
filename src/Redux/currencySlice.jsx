import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExchangeRates = createAsyncThunk(
  'currency/fetchExchangeRates',
  async () => {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response.data.rates;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    selectedCurrency: '',
    exchangeRates: {},
  },
  reducers: {
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
      state.exchangeRates = action.payload;
    });
  },
});

export const { setSelectedCurrency } = currencySlice.actions;
export default currencySlice.reducer;
