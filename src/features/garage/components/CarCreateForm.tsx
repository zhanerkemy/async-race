import { useState, type FormEvent } from 'react';
import { createCar } from '../../../api/garageApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectIsRaceActive } from '../../race/raceSelectors';
import {
  resetCreateDraft,
  setCreateDraft,
} from '../garageSlice';
import { fetchCars } from '../garageThunks';
import './CarForm.css';

const MAX_CAR_NAME_LENGTH = 30;

export function CarCreateForm() {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(
    (state) => state.garage.currentPage,
  );

  const { name, color } = useAppSelector(
    (state) => state.garage.createDraft,
  );

  const isRaceActive = useAppSelector(selectIsRaceActive);

  const [validationError, setValidationError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormDisabled = isSubmitting || isRaceActive;

  function updateName(nextName: string): void {
    dispatch(
      setCreateDraft({
        name: nextName,
        color,
      }),
    );
  }

  function updateColor(nextColor: string): void {
    dispatch(
      setCreateDraft({
        name,
        color: nextColor,
      }),
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (isRaceActive) {
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      setValidationError('Enter a car name.');
      return;
    }

    if (trimmedName.length > MAX_CAR_NAME_LENGTH) {
      setValidationError(
        `Car name must not exceed ${MAX_CAR_NAME_LENGTH} characters.`,
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setValidationError(null);

      await createCar({
        name: trimmedName,
        color,
      });

      dispatch(resetCreateDraft());
      await dispatch(fetchCars(currentPage)).unwrap();
    } catch {
      setValidationError('Failed to create car.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="car-form"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <label className="car-form__field">
        <span className="car-form__label">Car name</span>

        <input
          disabled={isFormDisabled}
          maxLength={MAX_CAR_NAME_LENGTH}
          onChange={(event) => updateName(event.target.value)}
          placeholder="Enter car name"
          type="text"
          value={name}
        />
      </label>

      <label className="car-form__color-field">
        <span className="car-form__label">Color</span>

        <input
          disabled={isFormDisabled}
          onChange={(event) => updateColor(event.target.value)}
          type="color"
          value={color}
        />
      </label>

      <button disabled={isFormDisabled} type="submit">
        {isRaceActive
          ? 'Race in progress'
          : isSubmitting
            ? 'Creating...'
            : 'Create'}
      </button>

      {validationError && (
        <p className="car-form__error">{validationError}</p>
      )}
    </form>
  );
}