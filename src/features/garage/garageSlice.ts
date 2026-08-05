import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';
import type {
  CarFormDraft,
  EditFormDraft,
  GarageState,
} from './garageTypes';
import {
  createRandomCars,
  fetchCars,
  removeCar,
} from './garageThunks';

const DEFAULT_CAR_COLOR = '#ff0000';

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  selectedCar: null,

  createDraft: {
    name: '',
    color: DEFAULT_CAR_COLOR,
  },

  status: 'idle',
  mutationStatus: 'idle',

  error: null,
  mutationError: null,

  editDraft: {
    carId: null,
    name: '',
    color: '#000000',
  },
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,

  reducers: {
    setGaragePage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    selectCar(state, action: PayloadAction<Car>) {
      state.selectedCar = action.payload;
      state.editDraft = {
        carId: action.payload.id,
        name: action.payload.name,
        color: action.payload.color,
      };
    },

    clearSelectedCar(state) {
      state.selectedCar = null;
      state.editDraft = {
        carId: null,
        name: '',
        color: '#000000',
      };
    },

    setCreateDraft(state, action: PayloadAction<CarFormDraft>) {
      state.createDraft = action.payload;
    },

    setEditDraft(state, action: PayloadAction<EditFormDraft>) {
      state.editDraft = action.payload;
    },

    resetCreateDraft(state) {
      state.createDraft = {
        name: '',
        color: DEFAULT_CAR_COLOR,
      };
    },

    clearGarageMutationError(state) {
      state.mutationError = null;
    },
  },

  extraReducers(builder) {
    builder
      // Load cars
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
        state.error =
          action.error.message ?? 'Failed to load cars';
      })

      // Delete car
      .addCase(removeCar.pending, (state) => {
        state.mutationStatus = 'loading';
        state.mutationError = null;
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';

        if (state.selectedCar?.id === action.payload) {
          state.selectedCar = null;
        }
      })
      .addCase(removeCar.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.mutationError =
          action.error.message ?? 'Failed to delete car';
      })

      // Generate 100 random cars
      .addCase(createRandomCars.pending, (state) => {
        state.mutationStatus = 'loading';
        state.mutationError = null;
      })
      .addCase(createRandomCars.fulfilled, (state) => {
        state.mutationStatus = 'succeeded';
      })
      .addCase(createRandomCars.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.mutationError =
          action.error.message ??
          'Failed to create random cars';
      });
  },
});

export const {
  setGaragePage,
  selectCar,
  clearSelectedCar,
  setCreateDraft,
  resetCreateDraft,
  setEditDraft,
  clearGarageMutationError,
} = garageSlice.actions;

export const garageReducer = garageSlice.reducer;