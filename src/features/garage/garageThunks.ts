import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCar, deleteCar, getCars } from '../../api/garageApi';
import { deleteWinner } from '../../api/winnersApi';
import { GARAGE_PAGE_SIZE } from '../../constants/pagination';
import type { CarData } from '../../types/car';
import type { RootState } from '../../app/store';

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

export const removeCar = createAsyncThunk<
  number,
  number,
  { state: RootState }
>('garage/removeCar', async (carId, { dispatch, getState }) => {
  await deleteCar(carId);
  await deleteWinner(carId);

  const { currentPage, cars } = getState().garage;
  const shouldMoveBack = cars.length === 1 && currentPage > 1;
  const nextPage = shouldMoveBack ? currentPage - 1 : currentPage;

  await dispatch(fetchCars(nextPage)).unwrap();

  return carId;
});