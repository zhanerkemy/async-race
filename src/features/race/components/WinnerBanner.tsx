import { useAppSelector } from '../../../app/hooks';
import './WinnerBanner.css';

export function WinnerBanner() {
  const winner = useAppSelector((state) => state.race.winner);

  if (!winner) {
    return null;
  }

  return (
    <div className="winner-banner" role="status">
      🏆 {winner.car.name} wins in {winner.time.toFixed(2)} seconds!
    </div>
  );
}