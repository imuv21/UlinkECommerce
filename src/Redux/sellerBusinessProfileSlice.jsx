
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

export const updateSellerDocData = createAsyncThunk(
  'sellerBusinessProfile/updateSellerDocData',
  async ({ documentType, documentData }, { getState }) => {
    const { auth } = getState();
    const token = auth.token;
    const response = await axios.post(`${BASE_URL}/seller/update-doc-data`, documentData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { documentType, data: response.data };
  }
);

export const uploadDocument = createAsyncThunk(
  'sellerBusinessProfile/uploadDocument',
  async ({ file, docType }, { getState, rejectWithValue }) => {

    const { auth } = getState();
    const token = auth.token;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${BASE_URL}/seller/upload-document?docType=${docType}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'sellerBusinessProfile/uploadProfileImage',
  async (file, { getState }) => {
    const { auth } = getState();
    const token = auth.token;
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${BASE_URL}/seller/upload-profile-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.data;
  }
);

export const deleteSellerDocument = createAsyncThunk(
  'sellerBusinessProfile/deleteSellerDocument',
  async ({ documentPath, filename, filesize, id }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;

    try {
      const response = await axios.delete(`${BASE_URL}/user/delete-document`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: {
          documentPath, filename, filesize, id
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const sellerBusinessProfileSlice = createSlice({
  name: 'sellerBusinessProfile',
  initialState: {
    sellerprofile: null,
    status: 'idle',
    error: null,

    updateStatus: 'idle',
    updateError: null,

    docUpdateStatus: 'idle',
    docUpdateError: null,

    docloading: false,
    docerror: null,
    docsuccess: false,

    imageUploadStatus: 'idle',
    imageUploadError: null,
    imageUrl: null,

    deleteldg: false,
    deleteerr: null,
    deletescs: false,
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
      })
      .addCase(updateSellerDocData.pending, (state) => {
        state.docUpdateStatus = 'loading';
      })
      .addCase(updateSellerDocData.fulfilled, (state, action) => {
        state.docUpdateStatus = 'succeeded';
        const { documentType, data } = action.payload;
        if (state.sellerprofile && state.sellerprofile.documents) {
          state.sellerprofile.documents[documentType] = data;
        }
      })
      .addCase(updateSellerDocData.rejected, (state, action) => {
        state.docUpdateStatus = 'failed';
        state.docUpdateError = action.error.message;
      })
      .addCase(uploadDocument.pending, (state) => {
        state.docloading = true;
        state.docerror = null;
        state.docsuccess = false;
      })
      .addCase(uploadDocument.fulfilled, (state) => {
        state.docloading = false;
        state.docsuccess = true;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.docloading = false;
        state.docerror = action.payload;
        state.docsuccess = false;
      })
      .addCase(uploadProfileImage.pending, (state) => {
        state.imageUploadStatus = 'loading';
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.imageUploadStatus = 'succeeded';
        state.imageUrl = action.payload.data.imageUrl;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.imageUploadStatus = 'failed';
        state.imageUploadError = action.error.message;
      })
      .addCase(deleteSellerDocument.pending, (state) => {
        state.deleteldg = true;
        state.deleteerr = null;
        state.deletescs = false;
      })
      .addCase(deleteSellerDocument.fulfilled, (state) => {
        state.deleteldg = false;
        state.deletescs = true;
      })
      .addCase(deleteSellerDocument.rejected, (state, action) => {
        state.deleteldg = false;
        state.deleteerr = action.payload;
        state.deletescs = false;
      });
  }
});

export default sellerBusinessProfileSlice.reducer;
