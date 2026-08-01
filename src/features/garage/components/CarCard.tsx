import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { Car } from '../../../types/car';
import { setGaragePage, selectCar } from '../garageSlice';
import { removeCar } from '../garageThunks';
import './CarCard.css';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.garage.currentPage);
  const carsOnPage = useAppSelector((state) => state.garage.cars.length);
  const [isDeleting, setIsDeleting] = useState(false);
  
  async function handleRemove(): Promise<void> {
    try {
      setIsDeleting(true);

      const shouldMoveBack = carsOnPage === 1 && currentPage > 1;

      await dispatch(removeCar(car.id)).unwrap();

      if (shouldMoveBack) {
        dispatch(setGaragePage(currentPage - 1));
      }
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <article className="car-card">
      <div className="car-card__controls">
        <button 
          type="button" 
          onClick={() => dispatch(selectCar(car))}>
            Select
        </button>
        <button
          disabled={isDeleting}
          onClick={() => void handleRemove()}
          type="button"
        >
          {isDeleting ? 'Removing...' : 'Remove'}
        </button>
      </div>

      <h2 className="car-card__name">{car.name}</h2>

      <div className="car-card__track">
        <div
          aria-label={`${car.name} car`}
          className="car-card__vehicle"
          style={{ color: car.color }}
        >
          🚗
        </div>

        <span aria-hidden="true" className="car-card__finish">
          🏁
        </span>
      </div>

      <div className="car-card__engine-controls">
        <button type="button">Start</button>
        <button disabled type="button">
          Stop
        </button>
      </div>
    </article>
  );
}