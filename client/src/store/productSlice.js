import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://directory-listing-backend-lf4o.onrender.com';

export const fetchData = createAsyncThunk('products/fetch', async () => {
  const [products, materials, grades, combinations] = await Promise.all([
    axios.get(`${API_URL}/products`),
    axios.get(`${API_URL}/materials`),
    axios.get(`${API_URL}/grades`),
    axios.get(`${API_URL}/product-combinations`),
  ]);
  return {
    products: products.data,
    materials: materials.data,
    grades: grades.data,
    combinations: combinations.data,
  };
});

export const addCombination = createAsyncThunk('products/add', async (data) => {
  const response = await axios.post(`${API_URL}/combinations`, data);
  return response.data;
});

export const updateCombination = createAsyncThunk('products/update', async ({ id, updates }) => {
  const response = await axios.put(`${API_URL}/combinations/${id}`, updates);
  return response.data;
});

export const bulkUpdate = createAsyncThunk('products/bulkUpdate', async ({ ids, updates }) => {
  const response = await axios.put(`${API_URL}/combinations/bulk`, { ids, updates });
  return { ids, updates };
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    materials: [],
    grades: [],
    combinations: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.materials = action.payload.materials;
        state.grades = action.payload.grades;
        state.combinations = action.payload.combinations;
      })
      .addCase(addCombination.fulfilled, (state, action) => {
        state.combinations.push(...action.payload);
      })
      .addCase(updateCombination.fulfilled, (state, action) => {
        const index = state.combinations.findIndex((c) => c._id === action.payload._id);
        state.combinations[index] = action.payload;
      })
      .addCase(bulkUpdate.fulfilled, (state, action) => {
        state.combinations = state.combinations.map((c) =>
          action.payload.ids.includes(c._id) ? { ...c, ...action.payload.updates } : c
        );
      });
  },
});

export default productSlice.reducer;
