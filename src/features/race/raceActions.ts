import { createAction } from '@reduxjs/toolkit';
import type { RaceWinner } from './raceTypes';

export const reportRaceWinner = createAction<RaceWinner>(
  'race/reportRaceWinner',
);