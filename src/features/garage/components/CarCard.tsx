import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { Car } from '../../../types/car';
import { setGaragePage, selectCar } from '../garageSlice';
import { removeCar } from '../garageThunks';
import './CarCard.css';
import {
  startCarEngine,
  stopCarEngine,
} from '../../race/raceThunks';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.garage.currentPage);
  const carsOnPage = useAppSelector((state) => state.garage.cars.length);
  const [isDeleting, setIsDeleting] = useState(false);

  const engine = useAppSelector((state) => state.race.engines[car.id]);

  const engineStatus = engine?.status ?? 'idle';

  const isStarting = engineStatus === 'starting';
  const isStarted = engineStatus === 'started';
  const isStopping = engineStatus === 'stopping';

  const isStartDisabled = isStarting || isStarted || isStopping;
  const isStopDisabled = engineStatus === 'idle' || isStarting || isStopping;

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

  async function handleStart(): Promise<void> {
    try {
      await dispatch(startCarEngine(car.id)).unwrap();
    } catch {
      // The race slice stores the failed state.
    }
  }

  async function handleStop(): Promise<void> {
    try {
      await dispatch(stopCarEngine(car.id)).unwrap();
    } catch {
      // The race slice stores the failed state.
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
        <button
          disabled={isStartDisabled}
          onClick={() => void handleStart()}
          type="button"
        >
          {isStarting ? 'Starting...' : 'Start'}
        </button>

        <button
          disabled={isStopDisabled}
          onClick={() => void handleStop()}
          type="button"
        >
          {isStopping ? 'Stopping...' : 'Stop'}
        </button>
      </div>
      {engineStatus === 'started' && engine && (
          <p>
            Velocity: {engine.velocity}, distance: {engine.distance}
          </p>
        )}
    </article>
  );
}