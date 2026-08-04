import type { RootState } from '../../app/store';

export function selectIsRaceActive(state: RootState): boolean {
  return state.race.isRaceRunning;
}