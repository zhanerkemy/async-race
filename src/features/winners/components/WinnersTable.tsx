import { CarIcon } from '../../../components/car/CarIcon';
import type {
  SortOrder,
  WinnerSortField,
  WinnerWithCar,
} from '../../../types/winner';
import './WinnersTable.css';

interface WinnersTableProps {
  winners: WinnerWithCar[];
  currentPage: number;
  sortField: WinnerSortField;
  sortOrder: SortOrder;
  onSort: (field: WinnerSortField) => void;
}

const WINNERS_PER_PAGE = 10;

function getSortSymbol(
  field: WinnerSortField,
  currentField: WinnerSortField,
  order: SortOrder,
): string {
  if (field !== currentField) {
    return '';
  }

  return order === 'ASC' ? '↑' : '↓';
}

export function WinnersTable({
  winners,
  currentPage,
  sortField,
  sortOrder,
  onSort,
}: WinnersTableProps) {
  return (
    <div className="winners-table-wrapper">
      <table className="winners-table">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Car</th>
            <th scope="col">Name</th>

            <th scope="col">
              <button
                className="winners-table__sort"
                onClick={() => onSort('wins')}
                type="button"
              >
                Wins {getSortSymbol('wins', sortField, sortOrder)}
              </button>
            </th>

            <th scope="col">
              <button
                className="winners-table__sort"
                onClick={() => onSort('time')}
                type="button"
              >
                Best time {getSortSymbol('time', sortField, sortOrder)}
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {winners.map((winner, index) => (
            <tr key={winner.id}>
              <td>
                {(currentPage - 1) * WINNERS_PER_PAGE + index + 1}
              </td>

              <td>
                <CarIcon
                  className="winners-table__car-icon"
                  color={winner.car.color}
                  title={winner.car.name}
                />
              </td>

              <td>{winner.car.name}</td>
              <td>{winner.wins}</td>
              <td>{winner.time.toFixed(2)} s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}