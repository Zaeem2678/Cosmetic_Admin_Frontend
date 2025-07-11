// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('React is mounting...'); // This should appear first

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);