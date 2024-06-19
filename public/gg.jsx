import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.ulinkit.com/api';

export const uploadImage = createAsyncThunk(
    'editproducts/uploadImage',
    async ({ productId, file }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${BASE_URL}/product/image/upload-image/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

const editProductsSlice = createSlice({
    name: 'editproducts',
    initialState: {
        fetchedImages: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImage.fulfilled, (state, action) => {
                const { data } = action.payload;
                if (data && data.imageUrl) {
                    state.fetchedImages.push({
                        imageUrl: data.imageUrl,
                        name: data.name,
                        priority: data.priority,
                        imageId: data.imageId,
                    });
                } else {
                    console.error('Invalid payload data:', action.payload);
                }
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default editProductsSlice.reducer;
