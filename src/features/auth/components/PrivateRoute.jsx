
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function PrivateRoute(){
  const { token } = useAuth()
  const location = useLocation()
  if(!token) return <Navigate to="/login" state={{ from: location }} replace />
  return <Outlet/>
}
