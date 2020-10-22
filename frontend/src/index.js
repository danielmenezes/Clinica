import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import AppProvider from '../src/main/contexts/Context'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


