import { Navigate, Route, Routes } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import { GaragePage } from './features/garage/GaragePage';
import { WinnersPage } from './features/winners/WinnersPage';

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<GaragePage />} />
        <Route path="winners" element={<WinnersPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
}
