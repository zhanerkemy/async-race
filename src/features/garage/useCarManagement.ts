import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { Car } from '../../types/car';
import { selectIsRaceActive } from '../race/raceSelectors';
import { setGaragePage, selectCar } from './garageSlice';
import { removeCar } from './garageThunks';

interface UseCarManagementResult {
  isDeleting: boolean;
  isRaceActive: boolean;
  removeSelectedCar: () => Promise<void>;
  selectCurrentCar: () => void;
}

export function useCarManagement(car: Car): UseCarManagementResult {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.garage.currentPage);
  const carsOnPage = useAppSelector((state) => state.garage.cars.length);
  const isRaceActive = useAppSelector(selectIsRaceActive);

  const [isDeleting, setIsDeleting] = useState(false);

  function selectCurrentCar(): void {
    if (!isRaceActive) {
      dispatch(selectCar(car));
    }
  }

  async function removeSelectedCar(): Promise<void> {
    if (isRaceActive || isDeleting) {
      return;
    }

    const shouldMoveBack = carsOnPage === 1 && currentPage > 1;

    try {
      setIsDeleting(true);
      await dispatch(removeCar(car.id)).unwrap();

      if (shouldMoveBack) {
        dispatch(setGaragePage(currentPage - 1));
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return {
    isDeleting,
    isRaceActive,
    removeSelectedCar,
    selectCurrentCar,
  };
}