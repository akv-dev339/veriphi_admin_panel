import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EventProvider } from './context/EventContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <EventProvider>
        <App />
    </EventProvider>
    
);


