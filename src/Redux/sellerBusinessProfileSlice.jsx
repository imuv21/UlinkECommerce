
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const fetchSellerBusinessProfile = createAsyncThunk(
  'sellerBusinessProfile/fetchSellerBusinessProfile',
  async (_, { getState }) => {
    const { auth } = getState();
    const token = auth.token;
    const response = await axios.get(`${BASE_URL}/seller/get-business-profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

export const updateSellerBusinessProfile = createAsyncThunk(
  'sellerBusinessProfile/updateSellerBusinessProfile',
  async (profileData, { getState }) => {
    const { auth } = getState();
    const token = auth.token;
    const response = await axios.post(`${BASE_URL}/seller/update-business-profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

const sellerBusinessProfileSlice = createSlice({
  name: 'sellerBusinessProfile',
  initialState: {
    sellerprofile: null,
    status: 'idle',
    error: null,
    updateStatus: 'idle',
    updateError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerBusinessProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSellerBusinessProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellerprofile = action.payload;
      })
      .addCase(fetchSellerBusinessProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSellerBusinessProfile.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateSellerBusinessProfile.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        const { buildingNumber, city, companyDescription, companyname, countryOfOperation, postCode, state: newState, streetName } = action.meta.arg;
        if (state.sellerprofile) {
          state.sellerprofile.buildingNumber = buildingNumber;
          state.sellerprofile.city = city;
          state.sellerprofile.companyDescription = companyDescription;
          state.sellerprofile.companyname = companyname;
          state.sellerprofile.countryOfoperation = countryOfOperation;
          state.sellerprofile.postCode = postCode;
          state.sellerprofile.state = newState;
          state.sellerprofile.streetName = streetName;
        }
      })
      .addCase(updateSellerBusinessProfile.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.updateError = action.error.message;
      });
  }
});

export default sellerBusinessProfileSlice.reducer;
