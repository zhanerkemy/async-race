import { useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addCar } from '../garageThunks';
import './CarForm.css';

const DEFAULT_CAR_COLOR = '#ff0000';
const MAX_CAR_NAME_LENGTH = 30;

export function CarCreateForm() {
  const dispatch = useAppDispatch();
  const mutationStatus = useAppSelector((state) => state.garage.mutationStatus);

  const [name, setName] = useState('');
  const [color, setColor] = useState(DEFAULT_CAR_COLOR);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isSubmitting = mutationStatus === 'loading';

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setValidationError('Enter a car name.');
      return;
    }

    if (trimmedName.length > MAX_CAR_NAME_LENGTH) {
      setValidationError(`Car name must not exceed ${MAX_CAR_NAME_LENGTH} characters.`);
      return;
    }

    try {
      await dispatch(
        addCar({
          name: trimmedName,
          color,
        }),
      ).unwrap();

      setName('');
      setValidationError(null);
    } catch {
      // The Redux slice stores the request error.
    }
  }

  return (
    <form className="car-form" onSubmit={(event) => void handleSubmit(event)}>
      <label className="car-form__field">
        <span className="car-form__label">Car name</span>

        <input
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          onChange={(event) => setColor(event.target.value)}
          type="color"
          value={color}
        />
      </label>

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Creating...' : 'Create'}
      </button>

      {validationError && <p className="car-form__error">{validationError}</p>}
    </form>
  );
}