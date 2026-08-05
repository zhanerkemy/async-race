const DEFAULT_API_BASE_URL = 'http://localhost:3000';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export const API_ENDPOINTS = {
  garage: '/garage',
  winners: '/winners',
  engine: '/engine',
} as const;