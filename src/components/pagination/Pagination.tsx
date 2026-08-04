import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <nav aria-label="Pagination" className="pagination">
      <button
        disabled={disabled || !hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {Math.max(totalPages, 1)}
      </span>

      <button
        disabled={disabled || !hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        Next
      </button>
    </nav>
  );
}