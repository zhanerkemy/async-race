import { createSlice } from '@reduxjs/toolkit';
import type { RaceState } from './raceTypes';
import { driveCarEngine, startCarEngine, stopCarEngine } from './raceThunks';

const initialState: RaceState = {
  engines: {},
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(startCarEngine.pending, (state, action) => {
        const carId = action.meta.arg;

        state.engines[carId] = {
          status: 'starting',
          velocity: 0,
          distance: 0,
        };
      })
      .addCase(startCarEngine.fulfilled, (state, action) => {
        const carId = action.meta.arg;

        state.engines[carId] = {
          status: 'started',
          velocity: action.payload.velocity,
          distance: action.payload.distance,
        };
      })
      .addCase(startCarEngine.rejected, (state, action) => {
        const carId = action.meta.arg;

        state.engines[carId] = {
          status: 'failed',
          velocity: 0,
          distance: 0,
        };
      })
      .addCase(stopCarEngine.pending, (state, action) => {
        const carId = action.meta.arg;
        const currentEngine = state.engines[carId];

        state.engines[carId] = {
          status: 'stopping',
          velocity: currentEngine?.velocity ?? 0,
          distance: currentEngine?.distance ?? 0,
        };
      })
      .addCase(stopCarEngine.fulfilled, (state, action) => {
        const carId = action.meta.arg;

        state.engines[carId] = {
          status: 'idle',
          velocity: 0,
          distance: 0,
        };
      })
      .addCase(stopCarEngine.rejected, (state, action) => {
        const carId = action.meta.arg;
        const currentEngine = state.engines[carId];

        state.engines[carId] = {
          status: 'failed',
          velocity: currentEngine?.velocity ?? 0,
          distance: currentEngine?.distance ?? 0,
        };
      })
      .addCase(driveCarEngine.pending, (state, action) => {
        const carId = action.meta.arg;
        const currentEngine = state.engines[carId];

        state.engines[carId] = {
            status: 'driving',
            velocity: currentEngine?.velocity ?? 0,
            distance: currentEngine?.distance ?? 0,
        };
        })
        .addCase(driveCarEngine.fulfilled, (state, action) => {
        const carId = action.meta.arg;
        const currentEngine = state.engines[carId];

        state.engines[carId] = {
            status: 'finished',
            velocity: currentEngine?.velocity ?? 0,
            distance: currentEngine?.distance ?? 0,
        };
        })
        .addCase(driveCarEngine.rejected, (state, action) => {
        const carId = action.meta.arg;
        const currentEngine = state.engines[carId];

        state.engines[carId] = {
            status: 'failed',
            velocity: currentEngine?.velocity ?? 0,
            distance: currentEngine?.distance ?? 0,
        };
        })
  },
});

export const raceReducer = raceSlice.reducer;