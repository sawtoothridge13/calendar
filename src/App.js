/**
 * App Component serves as the entry point for the application.
 * It includes the NavBar and page routing components.
 */

import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import { PageRoutes } from './Routes.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <PageRoutes />
    </div>
  );
}

export default App;
