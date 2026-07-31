import type { Car } from '../../types/car';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface GarageState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  status: RequestStatus;
  error: string | null;
}