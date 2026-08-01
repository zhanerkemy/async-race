import { configureStore } from '@reduxjs/toolkit';
import { garageReducer } from '../features/garage/garageSlice';
import { raceReducer } from '../features/race/raceSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    race: raceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;