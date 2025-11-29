
import React, { useContext } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth.js'
import { AlertContext } from '../ui/AlertProvider.jsx'

export default function Layout(){
  const { logout, simulate401 } = useAuth()
  const navigate = useNavigate()
  const { show } = useContext(AlertContext)

  const handleLogout = () => { logout(); show('Sesión cerrada', 'info'); navigate('/login') }
  const handleSimulate401 = () => { simulate401(); window.dispatchEvent(new CustomEvent('session-expired')) }

  return (
    <div className="d-flex" style={{minHeight:'100vh'}}>
      <aside className="bg-dark text-light p-3" style={{width:280}}>
        <h4 className="mb-4">Facturas</h4>
        <nav className="nav flex-column">
          <NavLink className="nav-link text-light" to="/dashboard">Dashboard</NavLink>
          <NavLink className="nav-link text-light" to="/facturas">Listado</NavLink>
          <NavLink className="nav-link text-light" to="/facturas/nueva">Nueva</NavLink>
        </nav>
        <hr/>
        <div className='d-grid gap-2'>
          <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
          <button className="btn btn-outline-warning" onClick={handleSimulate401}>Simular 401</button>
        </div>
      </aside>
      <main className="flex-grow-1 p-3">
        <Outlet/>
      </main>
    </div>
  )
}
