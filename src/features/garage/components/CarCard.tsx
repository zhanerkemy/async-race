import { useCallback, useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { Car } from '../../../types/car';
import { setGaragePage, selectCar } from '../garageSlice';
import { removeCar } from '../garageThunks';
import './CarCard.css';
import { useCarAnimation } from '../../race/useCarAnimation';
import {
  driveCarEngine,
  startCarEngine,
  stopCarEngine,
} from '../../race/raceThunks';
import { reportRaceWinner } from '../../race/raceSlice';

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
          dispatch(
            reportRaceWinner({
              car,
              time: animationDuration / 1000,
            }),
          );
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

      <div className="car-card__track" ref={trackRef}>
        <div
          aria-label={`${car.name} car`}
          className="car-card__vehicle"
          ref={carRef}
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
          onClick={() => void handleStart(false)}
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
      <p className="car-card__status">Status: {engineStatus}</p>
      {engineStatus === 'started' && engine && (
          <p>
            Velocity: {engine.velocity}, distance: {engine.distance}
          </p>
        )}
    </article>
  );
}