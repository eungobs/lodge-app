import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Ensure this path is correct
import { Provider } from 'react-redux';
import { store } from './store';  // Ensure this path is correct
import '@fortawesome/fontawesome-free/css/all.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
