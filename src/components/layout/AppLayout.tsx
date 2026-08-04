import { NavLink, Outlet } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { selectIsRaceActive } from '../../features/race/raceSelectors';
import './AppLayout.css';

export function AppLayout() {
  const isRaceActive = useAppSelector(selectIsRaceActive);

  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="app-logo">Async Race</span>

        <nav className="app-navigation" aria-label="Main navigation">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'navigation-link navigation-link-active'
                : 'navigation-link'
            }
            to="/"
          >
            Garage
          </NavLink>

          <NavLink
            aria-disabled={isRaceActive}
            className={({ isActive }) => {
              const classes = [
                'navigation-link',
                isActive ? 'navigation-link-active' : '',
                isRaceActive ? 'navigation-link-disabled' : '',
              ];

              return classes.filter(Boolean).join(' ');
            }}
            onClick={(event) => {
              if (isRaceActive) {
                event.preventDefault();
              }
            }}
            tabIndex={isRaceActive ? -1 : 0}
            to="/winners"
          >
            Winners
          </NavLink>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}