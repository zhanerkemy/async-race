import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCar, getCars } from '../../api/garageApi';
import { GARAGE_PAGE_SIZE } from '../../constants/pagination';
import type { CarData } from '../../types/car';

export const fetchCars = createAsyncThunk(
  'garage/fetchCars',
  async (page: number) =>
    getCars({
      page,
      limit: GARAGE_PAGE_SIZE,
    }),
);

export const addCar = createAsyncThunk(
  'garage/addCar',
  async (carData: CarData, { dispatch }) => {
    const createdCar = await createCar(carData);

    await dispatch(fetchCars(1)).unwrap();

    return createdCar;
  },
);