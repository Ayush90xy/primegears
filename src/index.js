import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthContextProvider } from './context/AuthContext';
import  IdProvider from './context/IdProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <IdProvider>
        <App />
        </IdProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
