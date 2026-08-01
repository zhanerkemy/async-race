import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCar, deleteCar, getCars } from '../../api/garageApi';
import { deleteWinner } from '../../api/winnersApi';
import { GARAGE_PAGE_SIZE } from '../../constants/pagination';
import type { CarData } from '../../types/car';
import type { RootState } from '../../app/store';
import {
  RANDOM_CARS_BATCH_SIZE,
  RANDOM_CARS_COUNT,
} from '../../constants/cars';
import { generateRandomCar } from '../../utils/randomCars';

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

export const createRandomCars = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('garage/createRandomCars', async (_, { dispatch, getState }) => {
  const randomCars = Array.from(
    { length: RANDOM_CARS_COUNT },
    generateRandomCar,
  );

  for (
    let index = 0;
    index < randomCars.length;
    index += RANDOM_CARS_BATCH_SIZE
  ) {
    const batch = randomCars.slice(
      index,
      index + RANDOM_CARS_BATCH_SIZE,
    );

    await Promise.all(batch.map((car) => createCar(car)));
  }

  const { currentPage } = getState().garage;
  await dispatch(fetchCars(currentPage)).unwrap();
});