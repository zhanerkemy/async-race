import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import type {
  Winner,
  WinnerData,
  WinnersResponse,
  WinnerSortField,
  SortOrder,
} from '../types/winner';
import { ApiError } from './apiError';

interface GetWinnersParams {
  page: number;
  limit: number;
  sort: WinnerSortField;
  order: SortOrder;
}

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

function createWinnersUrl({
  page,
  limit,
  sort,
  order,
}: GetWinnersParams): string {
  const searchParams = new URLSearchParams({
    _page: String(page),
    _limit: String(limit),
    _sort: sort,
    _order: order,
  });

  return `${API_BASE_URL}${API_ENDPOINTS.winners}?${searchParams.toString()}`;
}

export async function getWinners(
  params: GetWinnersParams,
): Promise<WinnersResponse> {
  const response = await fetch(createWinnersUrl(params));

  if (!response.ok) {
    throw new ApiError('Failed to load winners', response.status);
  }

  const winners = (await response.json()) as Winner[];
  const totalCount = Number(response.headers.get('X-Total-Count') ?? 0);

  return {
    winners,
    totalCount,
  };
}