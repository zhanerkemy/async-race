import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import { ApiError } from './apiError';

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