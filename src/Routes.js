import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EventDetailsPage } from './pages/EventDetailsPage';

export const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/EventDetailsPage" element={<EventDetailsPage />} />
      </Routes>
    </Router>
  );
};
