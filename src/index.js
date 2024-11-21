/**
 * Index.js is the main entry point of the React application.
 * It renders the App component within a strict mode context.
 */

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Render the root application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
