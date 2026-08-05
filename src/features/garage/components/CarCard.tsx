import { useState } from 'react';
import { CarIcon } from '../../../components/car/CarIcon';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { Car } from '../../../types/car';
import { selectIsRaceActive } from '../../race/raceSelectors';
import { useCarRace } from '../../race/useCarRace';
import { setGaragePage, selectCar } from '../garageSlice';
import { removeCar } from '../garageThunks';
import { CarManagementControls } from './CarManagementControls';
import { EngineControls } from './EngineControls';
import './CarCard.css';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.garage.currentPage);
  const carsOnPage = useAppSelector((state) => state.garage.cars.length);
  const isRaceActive = useAppSelector(selectIsRaceActive);

  const [isDeleting, setIsDeleting] = useState(false);

  const {
    carRef,
    trackRef,
    engineStatus,
    isStartDisabled,
    isStarting,
    isStopDisabled,
    isStopping,
    startCar,
    stopCar,
  } = useCarRace(car);

  async function handleRemove(): Promise<void> {
    if (isRaceActive) {
      return;
    }

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
      <CarManagementControls
        isDeleting={isDeleting}
        isRaceActive={isRaceActive}
        onRemove={() => void handleRemove()}
        onSelect={() => dispatch(selectCar(car))}
      />

      <h2 className="car-card__name">{car.name}</h2>

      <div className="car-card__track" ref={trackRef}>
        <div className="car-card__vehicle" ref={carRef}>
          <CarIcon
            className="car-card__vehicle-icon"
            color={car.color}
            title={car.name}
          />
        </div>

        <span aria-hidden="true" className="car-card__finish">
          🏁
        </span>
      </div>

      <EngineControls
        isStartDisabled={isStartDisabled}
        isStarting={isStarting}
        isStopDisabled={isStopDisabled}
        isStopping={isStopping}
        onStart={() => void startCar(false)}
        onStop={() => void stopCar()}
      />

      <p className="car-card__status">Status: {engineStatus}</p>
    </article>
  );
}