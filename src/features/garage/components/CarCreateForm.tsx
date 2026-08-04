import { useState, type FormEvent } from 'react';
import { createCar } from '../../../api/garageApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectIsRaceActive } from '../../race/raceSelectors';
import { fetchCars } from '../garageThunks';
import './CarForm.css';

const DEFAULT_CAR_COLOR = '#ff0000';
const MAX_CAR_NAME_LENGTH = 30;

export function CarCreateForm() {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.garage.currentPage);
  const isRaceActive = useAppSelector(selectIsRaceActive);

  const [name, setName] = useState('');
  const [color, setColor] = useState(DEFAULT_CAR_COLOR);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormDisabled = isSubmitting || isRaceActive;

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
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

      setName('');
      setColor(DEFAULT_CAR_COLOR);

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
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter car name"
          type="text"
          value={name}
        />
      </label>

      <label className="car-form__color-field">
        <span className="car-form__label">Color</span>

        <input
          disabled={isFormDisabled}
          onChange={(event) => setColor(event.target.value)}
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