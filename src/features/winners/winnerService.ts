import {
  createWinner,
  getWinner,
  updateWinner,
} from '../../api/winnersApi';
import type { Winner } from '../../types/winner';

export async function saveWinner(
  carId: number,
  raceTime: number,
): Promise<Winner> {
  const existingWinner = await getWinner(carId);

  if (!existingWinner) {
    return createWinner(carId, {
      wins: 1,
      time: raceTime,
    });
  }

  return updateWinner(carId, {
    wins: existingWinner.wins + 1,
    time: Math.min(existingWinner.time, raceTime),
  });
}