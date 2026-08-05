import { useState, type FormEvent } from 'react';
import { updateCar } from '../../../api/garageApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectIsRaceActive } from '../../race/raceSelectors';
import {
  clearSelectedCar,
  setEditDraft,
} from '../garageSlice';
import { fetchCars } from '../garageThunks';
import './CarForm.css';

const MAX_CAR_NAME_LENGTH = 30;

export function CarEditForm() {
  const dispatch = useAppDispatch();

  const selectedCar = useAppSelector(
    (state) => state.garage.selectedCar,
  );

  const currentPage = useAppSelector(
    (state) => state.garage.currentPage,
  );

  const editDraft = useAppSelector(
    (state) => state.garage.editDraft,
  );

  const isRaceActive = useAppSelector(selectIsRaceActive);

  const [validationError, setValidationError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormDisabled =
    !selectedCar || isSubmitting || isRaceActive;

  function updateName(name: string): void {
    dispatch(
      setEditDraft({
        ...editDraft,
        name,
      }),
    );
  }

  function updateColor(color: string): void {
    dispatch(
      setEditDraft({
        ...editDraft,
        color,
      }),
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!selectedCar || isRaceActive) {
      return;
    }

    const trimmedName = editDraft.name.trim();

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

      await updateCar(selectedCar.id, {
        name: trimmedName,
        color: editDraft.color,
      });

      dispatch(clearSelectedCar());
      await dispatch(fetchCars(currentPage)).unwrap();
    } catch {
      setValidationError('Failed to update car.');
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
        <span className="car-form__label">Edit car name</span>

        <input
          disabled={isFormDisabled}
          maxLength={MAX_CAR_NAME_LENGTH}
          onChange={(event) => updateName(event.target.value)}
          placeholder="Select a car first"
          type="text"
          value={editDraft.name}
        />
      </label>

      <label className="car-form__color-field">
        <span className="car-form__label">Color</span>

        <input
          disabled={isFormDisabled}
          onChange={(event) => updateColor(event.target.value)}
          type="color"
          value={editDraft.color}
        />
      </label>

      <button disabled={isFormDisabled} type="submit">
        {isRaceActive
          ? 'Race in progress'
          : isSubmitting
            ? 'Updating...'
            : 'Update'}
      </button>

      {validationError && (
        <p className="car-form__error">{validationError}</p>
      )}
    </form>
  );
}