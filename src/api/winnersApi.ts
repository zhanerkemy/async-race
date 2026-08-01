import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import type { Winner, WinnerData } from '../types/winner';
import { ApiError } from './apiError';

export async function getWinner(id: number): Promise<Winner | null> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.winners}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new ApiError('Failed to load winner', response.status);
  }

  return response.json() as Promise<Winner>;
}

export async function createWinner(
  id: number,
  winnerData: WinnerData,
): Promise<Winner> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      ...winnerData,
    }),
  });

  if (!response.ok) {
    throw new ApiError('Failed to create winner', response.status);
  }

  return response.json() as Promise<Winner>;
}

export async function updateWinner(
  id: number,
  winnerData: WinnerData,
): Promise<Winner> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winnerData),
  });

  if (!response.ok) {
    throw new ApiError('Failed to update winner', response.status);
  }

  return response.json() as Promise<Winner>;
}

export async function deleteWinner(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.winners}/${id}`, {
    method: 'DELETE',
  });

  if (response.status === 404) {
    return;
  }

  if (!response.ok) {
    throw new ApiError('Failed to delete winner', response.status);
  }
}