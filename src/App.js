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
