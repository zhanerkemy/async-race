interface CarManagementControlsProps {
  isDeleting: boolean;
  isRaceActive: boolean;
  onRemove: () => void;
  onSelect: () => void;
}

export function CarManagementControls({
  isDeleting,
  isRaceActive,
  onRemove,
  onSelect,
}: CarManagementControlsProps) {
  return (
    <div className="car-card__controls">
      <button disabled={isRaceActive} onClick={onSelect} type="button">
        Select
      </button>

      <button
        disabled={isDeleting || isRaceActive}
        onClick={onRemove}
        type="button"
      >
        {isDeleting ? 'Removing...' : 'Remove'}
      </button>
    </div>
  );
}