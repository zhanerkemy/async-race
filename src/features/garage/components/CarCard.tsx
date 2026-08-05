import { useCallback, useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { Car } from '../../../types/car';
import { setGaragePage, selectCar } from '../garageSlice';
import { removeCar } from '../garageThunks';
import './CarCard.css';
import { useCarAnimation } from '../../race/useCarAnimation';
import {
  completeRace,
  driveCarEngine,
  startCarEngine,
  stopCarEngine,
} from '../../race/raceThunks';
import { selectIsRaceActive } from '../../race/raceSelectors';
import { CarIcon } from '../../../components/car/CarIcon';
import { CarManagementControls } from './CarManagementControls';
import { EngineControls } from './EngineControls';

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
  const isDriving = engineStatus === 'driving';
  const isStopping = engineStatus === 'stopping';
  const isActive =
    engineStatus === 'started' ||
    engineStatus === 'driving' ||
    engineStatus === 'finished' ||
    engineStatus === 'failed';

  const isStartDisabled = isStarting || isDriving || isStopping || isActive;
  const isStopDisabled = engineStatus === 'idle' || isStarting || isStopping;

  const isRaceActive = useAppSelector(selectIsRaceActive);

  const {
    carRef,
    trackRef,
    startAnimation,
    stopAnimation,
    resetAnimation,
  } = useCarAnimation();

  const raceRequestId = useAppSelector(
    (state) => state.race.raceRequestId,
  );

  const resetRequestId = useAppSelector(
    (state) => state.race.resetRequestId,
  );

  const handledRaceRequestRef = useRef(0);
  const handledResetRequestRef = useRef(0);

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

  const handleStart = useCallback(
    async (participatesInRace = false): Promise<void> => {
      try {
        const engineData = await dispatch(
          startCarEngine(car.id),
        ).unwrap();

        const animationDuration =
          engineData.distance / engineData.velocity;

        startAnimation(animationDuration);

        await dispatch(driveCarEngine(car.id)).unwrap();

        if (participatesInRace) {
          await dispatch(
            completeRace({
              car,
              time: animationDuration / 1000,
            }),
          ).unwrap();
        }
      } catch {
        stopAnimation();
      }
    },
    [car, dispatch, startAnimation, stopAnimation],
  );

  const handleStop = useCallback(async (): Promise<void> => {
    try {
      stopAnimation();
      await dispatch(stopCarEngine(car.id)).unwrap();
      resetAnimation();
    } catch {
      // The race slice stores the failed state.
    }
  }, [
    car.id,
    dispatch,
    resetAnimation,
    stopAnimation,
  ]);

  useEffect(() => {
    if (
      raceRequestId === 0 ||
      handledRaceRequestRef.current === raceRequestId
    ) {
      return;
    }

    handledRaceRequestRef.current = raceRequestId;
    void handleStart(true);
  }, [handleStart, raceRequestId]);

  useEffect(() => {
    if (
      resetRequestId === 0 ||
      handledResetRequestRef.current === resetRequestId
    ) {
      return;
    }

    handledResetRequestRef.current = resetRequestId;
    void handleStop();
  }, [handleStop, resetRequestId]);

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
        onStart={() => void handleStart(false)}
        onStop={() => void handleStop()}
      />
      <p className="car-card__status">Status: {engineStatus}</p>
      {engineStatus === 'started' && engine && (
          <p>
            Velocity: {engine.velocity}, distance: {engine.distance}
          </p>
        )}
    </article>
  );
}