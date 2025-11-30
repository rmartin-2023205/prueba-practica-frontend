
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Login from './features/auth/components/Login.jsx'
import PrivateRoute from './features/auth/components/PrivateRoute.jsx'
import FacturaList from './features/facturas/components/FacturaList.jsx'
import FacturaDetail from './features/facturas/components/FacturaDetail.jsx'
import FacturaForm from './features/facturas/components/FacturaForm.jsx'

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute/>}>
        <Route element={<Layout/>}>
          <Route path="/" element={<Navigate to="/dashboard"/>} />
          <Route path="/dashboard" element={<div className='p-3'><h2>Dashboard</h2><p className='text-white'>Bienvenido al panel de gestión.</p></div>} />
          <Route path="/facturas" element={<FacturaList />} />
          <Route path="/facturas/nueva" element={<FacturaForm mode='create' />} />
          <Route path="/facturas/:id" element={<FacturaDetail />} />
          <Route path="/facturas/:id/editar" element={<FacturaForm mode='edit' />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard"/>} />
    </Routes>
  )
}
