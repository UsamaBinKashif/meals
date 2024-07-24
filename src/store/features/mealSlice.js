import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
  const response = await axios.get('https://dummyjson.com/recipes');
  return response.data.recipes;
});

const mealSlice = createSlice({
  name: 'meals',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMeals.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default mealSlice.reducer;
