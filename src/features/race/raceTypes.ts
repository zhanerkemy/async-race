export type CarEngineStatus =
  | 'idle'
  | 'starting'
  | 'started'
  | 'stopping'
  | 'driving'
  | 'failed';

export interface CarEngineState {
  status: CarEngineStatus;
  velocity: number;
  distance: number;
}

export interface RaceState {
  engines: Record<number, CarEngineState>;
}