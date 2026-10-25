/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { OnlineServicesPage } from './pages/OnlineServicesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Ruta 1: Inicio */}
          <Route index element={<HomePage />} />

          {/* Ruta 2: Nosotros */}
          <Route path="nosotros" element={<AboutPage />} />

          {/* Ruta 3: Servicios */}
          <Route path="servicios" element={<ServicesPage />} />

          {/* Ruta 4: Portal Clientes (Consultas y Conectividad) */}
          <Route path="portal-clientes" element={<OnlineServicesPage />} />
          <Route path="servicios-en-linea" element={<Navigate to="/portal-clientes" replace />} />

          {/* Ruta 5: Contacto */}
          <Route path="contacto" element={<ContactPage />} />

          {/* Redirección de rutas no encontradas a inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
