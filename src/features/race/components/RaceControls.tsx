import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { beginRace, resetRace } from '../raceSlice';
import './RaceControls.css';

export function RaceControls() {
  const dispatch = useAppDispatch();

  const cars = useAppSelector((state) => state.garage.cars);
  const isRaceRunning = useAppSelector(
    (state) => state.race.isRaceRunning,
  );

  const hasCars = cars.length > 0;

  return (
    <section className="race-controls" aria-label="Race controls">
      <button
        disabled={!hasCars || isRaceRunning}
        onClick={() => dispatch(beginRace())}
        type="button"
      >
        Race
      </button>

      <button
        disabled={!hasCars}
        onClick={() => dispatch(resetRace())}
        type="button"
      >
        Reset
      </button>
    </section>
  );
}