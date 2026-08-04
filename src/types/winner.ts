import type { Car } from './car';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export type WinnerData = Omit<Winner, 'id'>;

export interface WinnerWithCar extends Winner {
  car: Car;
}

export interface WinnersResponse {
  winners: Winner[];
  totalCount: number;
}

export type WinnerSortField = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';