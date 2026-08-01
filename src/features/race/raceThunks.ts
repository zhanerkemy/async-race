import { createAsyncThunk } from '@reduxjs/toolkit';
import { driveCar, startEngine, stopEngine } from '../../api/engineApi';
import type { EngineStartResponse } from '../../types/engine';
import type { RootState } from '../../app/store';
import type { RaceWinner } from './raceTypes';
import { saveWinner } from '../winners/winnerService';
import { reportRaceWinner } from './raceActions';

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

export const completeRace = createAsyncThunk<
  boolean,
  RaceWinner,
  { state: RootState }
>('race/completeRace', async (winner, { dispatch, getState }) => {
  const currentWinner = getState().race.winner;

  if (currentWinner) {
    return false;
  }

  dispatch(reportRaceWinner(winner));

  await saveWinner(winner.car.id, winner.time);

  return true;
});