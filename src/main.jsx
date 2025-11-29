
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './features/auth/context/AuthContext.jsx'
import { FacturasProvider } from './features/facturas/context/FacturasContext.jsx'
import AlertProvider from './components/ui/AlertProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FacturasProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </FacturasProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
