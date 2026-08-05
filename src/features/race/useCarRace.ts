import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { Car } from '../../types/car';
import { completeRace, driveCarEngine, startCarEngine, stopCarEngine } from './raceThunks';
import { useCarAnimation } from './useCarAnimation';

interface UseCarRaceResult {
  carRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  engineStatus: string;
  isStartDisabled: boolean;
  isStarting: boolean;
  isStopDisabled: boolean;
  isStopping: boolean;
  startCar: (participatesInRace?: boolean) => Promise<void>;
  stopCar: () => Promise<void>;
}

export function useCarRace(car: Car): UseCarRaceResult {
  const dispatch = useAppDispatch();

  const engine = useAppSelector((state) => state.race.engines[car.id]);
  const raceRequestId = useAppSelector((state) => state.race.raceRequestId);
  const resetRequestId = useAppSelector((state) => state.race.resetRequestId);

  const handledRaceRequestRef = useRef(0);
  const handledResetRequestRef = useRef(0);

  const {
    carRef,
    trackRef,
    startAnimation,
    stopAnimation,
    resetAnimation,
  } = useCarAnimation();

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

  const isStopDisabled =
    engineStatus === 'idle' || isStarting || isStopping;

  const startCar = useCallback(
    async (participatesInRace = false): Promise<void> => {
      try {
        const engineData = await dispatch(startCarEngine(car.id)).unwrap();

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

  const stopCar = useCallback(async (): Promise<void> => {
    try {
      stopAnimation();
      await dispatch(stopCarEngine(car.id)).unwrap();
      resetAnimation();
    } catch {
      // Redux stores the failed engine state.
    }
  }, [car.id, dispatch, resetAnimation, stopAnimation]);

  useEffect(() => {
    if (
      raceRequestId === 0 ||
      handledRaceRequestRef.current === raceRequestId
    ) {
      return;
    }

    handledRaceRequestRef.current = raceRequestId;
    void startCar(true);
  }, [raceRequestId, startCar]);

  useEffect(() => {
    if (
      resetRequestId === 0 ||
      handledResetRequestRef.current === resetRequestId
    ) {
      return;
    }

    handledResetRequestRef.current = resetRequestId;
    void stopCar();
  }, [resetRequestId, stopCar]);

  return {
    carRef,
    trackRef,
    engineStatus,
    isStartDisabled,
    isStarting,
    isStopDisabled,
    isStopping,
    startCar,
    stopCar,
  };
}