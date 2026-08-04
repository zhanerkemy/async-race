import type {
  SortOrder,
  WinnerSortField,
  WinnerWithCar,
} from '../../types/winner';
import type { RequestStatus } from '../garage/garageTypes';

export interface WinnersState {
  winners: WinnerWithCar[];
  totalCount: number;
  currentPage: number;
  sortField: WinnerSortField;
  sortOrder: SortOrder;
  status: RequestStatus;
  error: string | null;
}