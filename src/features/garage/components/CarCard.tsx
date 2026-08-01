import type { Car } from '../../../types/car';
import './CarCard.css';
import { useAppDispatch } from '../../../app/hooks';
import { selectCar } from '../garageSlice';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const dispatch = useAppDispatch();
  return (
    <article className="car-card">
      <div className="car-card__controls">
        <button 
          type="button" 
          onClick={() => dispatch(selectCar(car))}>
            Select
        </button>
        <button type="button">Remove</button>
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