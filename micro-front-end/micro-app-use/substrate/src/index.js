import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import microApp from '@micro-zoe/micro-app'

microApp.start()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
