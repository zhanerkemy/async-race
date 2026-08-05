interface EngineControlsProps {
  isStartDisabled: boolean;
  isStarting: boolean;
  isStopDisabled: boolean;
  isStopping: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function EngineControls({
  isStartDisabled,
  isStarting,
  isStopDisabled,
  isStopping,
  onStart,
  onStop,
}: EngineControlsProps) {
  return (
    <div className="car-card__engine-controls">
      <button
        disabled={isStartDisabled}
        onClick={onStart}
        type="button"
      >
        {isStarting ? 'Starting...' : 'Start'}
      </button>

      <button
        disabled={isStopDisabled}
        onClick={onStop}
        type="button"
      >
        {isStopping ? 'Stopping...' : 'Stop'}
      </button>
    </div>
  );
}