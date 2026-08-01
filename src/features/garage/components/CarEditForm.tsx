import { useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateCar } from '../../../api/garageApi';
import type { Car } from '../../../types/car';
import { clearSelectedCar } from '../garageSlice';
import { fetchCars } from '../garageThunks';
import './CarForm.css';

const DEFAULT_CAR_COLOR = '#000000';
const MAX_CAR_NAME_LENGTH = 30;

interface EditableCarFormProps {
  car: Car;
  currentPage: number;
}

function EditableCarForm({ car, currentPage }: EditableCarFormProps) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(car.name);
  const [color, setColor] = useState(car.color);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      setValidationError(null);

      await updateCar(car.id, {
        name: trimmedName,
        color,
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
    <form className="car-form" onSubmit={(event) => void handleSubmit(event)}>
      <label className="car-form__field">
        <span className="car-form__label">Edit car name</span>

        <input
          disabled={isSubmitting}
          maxLength={MAX_CAR_NAME_LENGTH}
          onChange={(event) => setName(event.target.value)}
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
        {isSubmitting ? 'Updating...' : 'Update'}
      </button>

      {validationError && <p className="car-form__error">{validationError}</p>}
    </form>
  );
}

function DisabledCarEditForm() {
  return (
    <form className="car-form">
      <label className="car-form__field">
        <span className="car-form__label">Edit car name</span>

        <input disabled placeholder="Select a car first" type="text" />
      </label>

      <label className="car-form__color-field">
        <span className="car-form__label">Color</span>

        <input disabled type="color" value={DEFAULT_CAR_COLOR} readOnly />
      </label>

      <button disabled type="button">
        Update
      </button>
    </form>
  );
}

export function CarEditForm() {
  const selectedCar = useAppSelector((state) => state.garage.selectedCar);
  const currentPage = useAppSelector((state) => state.garage.currentPage);

  if (!selectedCar) {
    return <DisabledCarEditForm />;
  }

  return (
    <EditableCarForm
      car={selectedCar}
      currentPage={currentPage}
      key={selectedCar.id}
    />
  );
}