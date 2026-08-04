import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCar } from '../../api/garageApi';
import { getWinners } from '../../api/winnersApi';
import { WINNERS_PAGE_SIZE } from '../../constants/pagination';
import type {
  SortOrder,
  WinnerSortField,
  WinnerWithCar,
} from '../../types/winner';

interface FetchWinnersParams {
  currentPage: number;
  sortField: WinnerSortField;
  sortOrder: SortOrder;
}

interface FetchWinnersResult {
  winners: WinnerWithCar[];
  totalCount: number;
}

export const fetchWinners = createAsyncThunk<
  FetchWinnersResult,
  FetchWinnersParams
>(
  'winners/fetchWinners',
  async ({ currentPage, sortField, sortOrder }) => {
    const response = await getWinners({
      page: currentPage,
      limit: WINNERS_PAGE_SIZE,
      sort: sortField,
      order: sortOrder,
    });

    const winners = await Promise.all(
      response.winners.map(async (winner) => {
        const car = await getCar(winner.id);

        return {
          ...winner,
          car,
        };
      }),
    );

    return {
      winners,
      totalCount: response.totalCount,
    };
  },
);