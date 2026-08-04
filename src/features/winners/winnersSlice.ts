import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  SortOrder,
  WinnerSortField,
} from '../../types/winner';
import type { WinnersState } from './winnersTypes';
import { fetchWinners } from './winnersThunks';

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  currentPage: 1,
  sortField: 'wins',
  sortOrder: 'DESC',
  status: 'idle',
  error: null,
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinnersPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setWinnerSorting(
      state,
      action: PayloadAction<{
        sortField: WinnerSortField;
        sortOrder: SortOrder;
      }>,
    ) {
      state.sortField = action.payload.sortField;
      state.sortOrder = action.payload.sortOrder;
      state.currentPage = 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.winners = action.payload.winners;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchWinners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load winners';
      });
  },
});

export const {
  setWinnersPage,
  setWinnerSorting,
} = winnersSlice.actions;

export const winnersReducer = winnersSlice.reducer;