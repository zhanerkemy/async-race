import type { Car } from '../../types/car';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface GarageState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  selectedCar: Car | null;
  createDraft: CarFormDraft;
  editDraft: EditFormDraft;
  status: RequestStatus;
  mutationStatus: RequestStatus;
  error: string | null;
  mutationError: string | null;
}

export interface CarFormDraft {
  name: string;
  color: string;
}

export interface EditFormDraft {
  carId: number | null;
  name: string;
  color: string;
}