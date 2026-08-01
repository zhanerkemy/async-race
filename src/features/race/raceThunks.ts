import { createAsyncThunk } from '@reduxjs/toolkit';
import { driveCar, startEngine, stopEngine } from '../../api/engineApi';
import type { EngineStartResponse } from '../../types/engine';

export const startCarEngine = createAsyncThunk<
  EngineStartResponse,
  number
>('race/startCarEngine', async (carId) => startEngine(carId));

export const stopCarEngine = createAsyncThunk<void, number>(
  'race/stopCarEngine',
  async (carId) => stopEngine(carId),
);

export const driveCarEngine = createAsyncThunk<void, number>(
  'race/driveCarEngine',
  async (carId) => {
    await driveCar(carId);
  },
);