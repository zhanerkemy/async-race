import type { Car } from '../../types/car';

export type CarEngineStatus =
  | 'idle'
  | 'starting'
  | 'started'
  | 'driving'
  | 'finished'
  | 'stopping'
  | 'failed';

export interface CarEngineState {
  status: CarEngineStatus;
  velocity: number;
  distance: number;
}

export interface RaceWinner {
  car: Car;
  time: number;
}

export interface RaceState {
  engines: Record<number, CarEngineState>;
  raceRequestId: number;
  resetRequestId: number;
  isRaceRunning: boolean;
  winner: RaceWinner | null;
}