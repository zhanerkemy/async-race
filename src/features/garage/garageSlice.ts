import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GarageState } from './garageTypes';
import { addCar, fetchCars } from './garageThunks';

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  status: 'idle',
  mutationStatus: 'idle',
  error: null,
  mutationError: null,
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setGaragePage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cars = action.payload.cars;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load cars';
      })
      .addCase(addCar.pending, (state) => {
        state.mutationStatus = 'loading';
        state.mutationError = null;
      })
      .addCase(addCar.fulfilled, (state) => {
        state.mutationStatus = 'succeeded';
        state.currentPage = 1;
      })
      .addCase(addCar.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.mutationError = action.error.message ?? 'Failed to create car';
      });
  },
});

export const { setGaragePage } = garageSlice.actions;

export const garageReducer = garageSlice.reducer;