import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectIsRaceActive } from '../../race/raceSelectors';
import { createRandomCars } from '../garageThunks';

export function RandomCarsButton() {
  const dispatch = useAppDispatch();

  const mutationStatus = useAppSelector(
    (state) => state.garage.mutationStatus,
  );

  const isRaceActive = useAppSelector(selectIsRaceActive);

  const isGenerating = mutationStatus === 'loading';
  const isDisabled = isGenerating || isRaceActive;

  async function handleGenerate(): Promise<void> {
    if (isRaceActive) {
      return;
    }

    try {
      await dispatch(createRandomCars()).unwrap();
    } catch {
      // Redux stores the request error.
    }
  }

  return (
    <button
      disabled={isDisabled}
      onClick={() => void handleGenerate()}
      type="button"
    >
      {isRaceActive
        ? 'Race in progress'
        : isGenerating
          ? 'Generating...'
          : 'Generate 100 cars'}
    </button>
  );
}