import './App.css';
import ChallengeCalendar from './components/ChallengeCalendar/ChallengeCalendar.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import { PageRoutes } from './Routes.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <PageRoutes />
      <ChallengeCalendar />
    </div>
  );
}

export default App;
