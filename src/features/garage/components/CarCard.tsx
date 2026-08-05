import { CarIcon } from '../../../components/car/CarIcon';
import type { Car } from '../../../types/car';
import { useCarRace } from '../../race/useCarRace';
import { useCarManagement } from '../useCarManagement';
import { CarManagementControls } from './CarManagementControls';
import { EngineControls } from './EngineControls';
import './CarCard.css';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const {
    isDeleting,
    isRaceActive,
    removeSelectedCar,
    selectCurrentCar,
  } = useCarManagement(car);

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

  return (
    <article className="car-card">
      <CarManagementControls
        isDeleting={isDeleting}
        isRaceActive={isRaceActive}
        onRemove={() => void removeSelectedCar()}
        onSelect={selectCurrentCar}
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