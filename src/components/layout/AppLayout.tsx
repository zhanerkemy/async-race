import { NavLink, Outlet } from 'react-router';
import './AppLayout.css';

export function AppLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="app-logo">Async Race</span>

        <nav className="app-navigation" aria-label="Main navigation">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'navigation-link navigation-link-active' : 'navigation-link'
            }
            to="/"
          >
            Garage
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'navigation-link navigation-link-active' : 'navigation-link'
            }
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
