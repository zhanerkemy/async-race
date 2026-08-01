import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import type {
  DriveResponse,
  EngineStartResponse,
  EngineStatus,
} from '../types/engine';
import { ApiError } from './apiError';

function createEngineUrl(id: number, status: EngineStatus): string {
  const searchParams = new URLSearchParams({
    id: String(id),
    status,
  });

  return `${API_BASE_URL}${API_ENDPOINTS.engine}?${searchParams.toString()}`;
}

async function patchEngine<T>(
  id: number,
  status: EngineStatus,
): Promise<T> {
  const response = await fetch(createEngineUrl(id, status), {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new ApiError(
      `Engine request failed with status ${response.status}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

export function startEngine(id: number): Promise<EngineStartResponse> {
  return patchEngine<EngineStartResponse>(id, 'started');
}

export async function stopEngine(id: number): Promise<void> {
  await patchEngine<EngineStartResponse>(id, 'stopped');
}

export function driveCar(id: number): Promise<DriveResponse> {
  return patchEngine<DriveResponse>(id, 'drive');
}