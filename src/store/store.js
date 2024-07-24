import { configureStore } from '@reduxjs/toolkit';
import mealsReducer from './features/mealSlice';
import weeksReducer from './features/weekSlice';

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    weeks:weeksReducer
  },
});