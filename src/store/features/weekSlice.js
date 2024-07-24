import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  week1: [],
  week2: [],
  week3: [],
  week4: [],
};

const weeksSlice = createSlice({
  name: 'weeks',
  initialState,
  reducers: {
    addMealToWeek: (state, action) => {
      const { week, meal } = action.payload;
      if (!state[week].some((m) => m.id === meal.id)) {
        state[week].push(meal);
      }
    },
    removeMealFromWeek: (state, action) => {
      const { week, mealId } = action.payload;
      state[week] = state[week].filter((meal) => meal.id !== mealId);
    },
  },
});

export const { addMealToWeek, removeMealFromWeek } = weeksSlice.actions;
export default weeksSlice.reducer;
