import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StatusMessage } from '../../components/feedback/StatusMessage';
import { Pagination } from '../../components/pagination/Pagination';
import { WINNERS_PAGE_SIZE } from '../../constants/pagination';
import type { WinnerSortField } from '../../types/winner';
import { WinnersTable } from './components/WinnersTable';
import {
  setWinnerSorting,
  setWinnersPage,
} from './winnersSlice';
import { fetchWinners } from './winnersThunks';

export function WinnersPage() {
  const dispatch = useAppDispatch();

  const {
    winners,
    totalCount,
    currentPage,
    sortField,
    sortOrder,
    status,
    error,
  } = useAppSelector((state) => state.winners);

  const totalPages = Math.ceil(totalCount / WINNERS_PAGE_SIZE);

  useEffect(() => {
    void dispatch(
      fetchWinners({
        currentPage,
        sortField,
        sortOrder,
      }),
    );
  }, [currentPage, dispatch, sortField, sortOrder]);

  function handlePageChange(page: number): void {
    dispatch(setWinnersPage(page));
  }

  function handleSort(field: WinnerSortField): void {
    const nextOrder =
      sortField === field && sortOrder === 'DESC'
        ? 'ASC'
        : 'DESC';

    dispatch(
      setWinnerSorting({
        sortField: field,
        sortOrder: nextOrder,
      }),
    );
  }

  return (
    <main>
      <h1>Winners ({totalCount})</h1>

      {status === 'loading' && (
        <StatusMessage>Loading winners...</StatusMessage>
      )}

      {status === 'failed' && (
        <StatusMessage role="alert">
          {error ?? 'Failed to load winners'}
        </StatusMessage>
      )}

      {status === 'succeeded' && winners.length === 0 && (
        <StatusMessage>No winners yet.</StatusMessage>
      )}

      {winners.length > 0 && (
        <WinnersTable
          currentPage={currentPage}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
          winners={winners}
        />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </main>
  );
}