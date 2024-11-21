import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChallengeCalendar from './components/ChallengeCalendar/ChallengeCalendar';
import AddEventPage from './pages/AddEventPage';

export const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChallengeCalendar />} />
        <Route path="/AddEventPage" element={<AddEventPage />} />
      </Routes>
    </Router>
  );
};
