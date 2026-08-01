import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createRandomCars } from '../garageThunks';

export function RandomCarsButton() {
  const dispatch = useAppDispatch();
  const mutationStatus = useAppSelector(
    (state) => state.garage.mutationStatus,
  );

  const isGenerating = mutationStatus === 'loading';

  async function handleGenerate(): Promise<void> {
    try {
      await dispatch(createRandomCars()).unwrap();
    } catch {
      // The Redux slice stores the request error.
    }
  }

  return (
    <button
      disabled={isGenerating}
      onClick={() => void handleGenerate()}
      type="button"
    >
      {isGenerating ? 'Generating...' : 'Generate 100 cars'}
    </button>
  );
}