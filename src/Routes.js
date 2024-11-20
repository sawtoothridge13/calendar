import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChallengeCalendar from './components/ChallengeCalendar/ChallengeCalendar';
import EventDetailsPage from './pages/EventDetailsPage';

export const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChallengeCalendar />} />
        <Route path="/EventDetailsPage" element={<EventDetailsPage />} />
      </Routes>
    </Router>
  );
};
