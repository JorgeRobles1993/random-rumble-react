// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';  // Importa estilos globales si los tienes

const container = document.getElementById('root');
const root = createRoot(container); // Crear un root utilizando createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
