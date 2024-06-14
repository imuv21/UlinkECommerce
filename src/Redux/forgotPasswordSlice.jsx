import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const forgotPassword = createAsyncThunk(
  'forgotPassword/forgotPassword',
  async ({ password, role, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/forgot-password`, {
        password,
        role,
        username
      });
      return { ...response.data, role, username };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyForgotPassword = createAsyncThunk(
  'forgotPassword/verifyForgotPassword',
  async ({ otp }, { getState, rejectWithValue }) => {
    const { role, username } = getState().forgotPassword;
    try {
      const response = await axios.post(
        `${BASE_URL}/user/forgot-password/verify?otp=${otp}&role=${role}&username=${username}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  role: '',
  username: '',
  status: 'idle',
  error: null,
  message: '',
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.role = action.payload.role;
        state.username = action.payload.username;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(verifyForgotPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyForgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
      })
      .addCase(verifyForgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default forgotPasswordSlice.reducer;
