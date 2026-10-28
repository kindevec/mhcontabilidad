/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';

// Code splitting con React.lazy para rutas secundarias
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const OnlineServicesPage = lazy(() => import('./pages/OnlineServicesPage').then(m => ({ default: m.OnlineServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));

const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-white" aria-hidden="true">
    <div className="w-8 h-8 rounded-full border-3 border-[#005BB2]/20 border-t-[#005BB2] animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Panel Administrativo MH Contabilidad */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <AdminPage />
            </Suspense>
          }
        />

        <Route path="/" element={<Layout />}>
          {/* Ruta 1: Inicio (Carga Inmediata para FCP / LCP óptimo) */}
          <Route index element={<HomePage />} />

          {/* Ruta 2: Nosotros (Diferido) */}
          <Route
            path="nosotros"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <AboutPage />
              </Suspense>
            }
          />

          {/* Ruta 3: Servicios (Diferido) */}
          <Route
            path="servicios"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <ServicesPage />
              </Suspense>
            }
          />

          {/* Ruta 4: Portal Clientes (Diferido) */}
          <Route
            path="portal-clientes"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <OnlineServicesPage />
              </Suspense>
            }
          />
          <Route path="servicios-en-linea" element={<Navigate to="/portal-clientes" replace />} />

          {/* Ruta 5: Contacto (Diferido) */}
          <Route
            path="contacto"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <ContactPage />
              </Suspense>
            }
          />

          {/* Redirección de rutas no encontradas a inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
