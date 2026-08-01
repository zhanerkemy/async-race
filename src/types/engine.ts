export type EngineStatus = 'started' | 'stopped' | 'drive';

export interface EngineStartResponse {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}