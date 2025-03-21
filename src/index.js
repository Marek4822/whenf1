import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import './styles.css';

// Use createRoot instead of ReactDOM.render
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);