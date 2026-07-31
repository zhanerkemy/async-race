import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCars } from '../../api/garageApi';
import { GARAGE_PAGE_SIZE } from '../../constants/pagination';

export const fetchCars = createAsyncThunk(
  'garage/fetchCars',
  async (page: number) =>
    getCars({
      page,
      limit: GARAGE_PAGE_SIZE,
    }),
);