import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StatusMessage } from '../../components/feedback/StatusMessage';
import { Pagination } from '../../components/pagination/Pagination';
import { GARAGE_PAGE_SIZE } from '../../constants/pagination';
import { CarList } from './components/CarList';
import { setGaragePage } from './garageSlice';
import { fetchCars } from './garageThunks';
import { CarCreateForm } from './components/CarCreateForm';
import { CarEditForm } from './components/CarEditForm';
import { RandomCarsButton } from './components/RandomCarsButton';
import { RaceControls } from '../race/components/RaceControls';
import { WinnerBanner } from '../race/components/WinnerBanner';
import { selectIsRaceActive } from '../race/raceSelectors';

export function GaragePage() {
  const dispatch = useAppDispatch();
  const isRaceActive = useAppSelector(selectIsRaceActive);
  const { cars, totalCount, currentPage, status, error, mutationError } = useAppSelector(
    (state) => state.garage,
  );

  const totalPages = Math.ceil(totalCount / GARAGE_PAGE_SIZE);

  useEffect(() => {
    void dispatch(fetchCars(currentPage));
  }, [currentPage, dispatch]);

  function handlePageChange(page: number): void {
    if (isRaceActive) {
      return;
    }

    dispatch(setGaragePage(page));
  }

  return (
    <main>
      <h1>Garage ({totalCount})</h1>

      <CarCreateForm />
      <CarEditForm />
      <RandomCarsButton />

      <RaceControls />
      <WinnerBanner />

      {mutationError && (
        <StatusMessage role="alert">{mutationError}</StatusMessage>
      )}

      {status === 'loading' && <StatusMessage>Loading cars...</StatusMessage>}

      {status === 'failed' && (
        <StatusMessage role="alert">{error ?? 'Something went wrong'}</StatusMessage>
      )}

      {status === 'succeeded' && cars.length === 0 && (
        <StatusMessage>No cars in the garage.</StatusMessage>
      )}

      {cars.length > 0 && <CarList cars={cars} />}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          disabled={isRaceActive}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </main>
  );
}