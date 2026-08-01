import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import type { Car, CarData, CarsResponse } from '../types/car';
import { ApiError } from './apiError';

interface GetCarsParams {
  page: number;
  limit: number;
}

function createGarageUrl({ page, limit }: GetCarsParams): string {
  const searchParams = new URLSearchParams({
    _page: String(page),
    _limit: String(limit),
  });

  return `${API_BASE_URL}${API_ENDPOINTS.garage}?${searchParams.toString()}`;
}

export async function getCars(params: GetCarsParams): Promise<CarsResponse> {
  const response = await fetch(createGarageUrl(params));

  if (!response.ok) {
    throw new ApiError('Failed to load cars', response.status);
  }

  const cars: CarsResponse['cars'] = await response.json();
  const totalCount = Number(response.headers.get('X-Total-Count') ?? 0);

  return {
    cars,
    totalCount,
  };
}

export async function createCar(carData: CarData): Promise<Car> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    throw new ApiError('Failed to create car', response.status);
  }

  return response.json() as Promise<Car>;
}

export async function updateCar(id: number, carData: CarData): Promise<Car> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    throw new ApiError('Failed to update car', response.status);
  }

  return response.json() as Promise<Car>;
}

export async function deleteCar(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.garage}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new ApiError('Failed to delete car', response.status);
  }
}