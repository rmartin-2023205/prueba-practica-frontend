
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => token ? {username:'admin'} : null)

  useEffect(()=>{ if(token) localStorage.setItem('token', token); else localStorage.removeItem('token') },[token])

  const login = (username, password) => {
    if(username==='admin' && password==='admin123'){
      const t = 'fake-jwt-token-12345'
      setToken(t)
      setUser({username})
      return { ok:true, token: t }
    }
    return { ok:false, error:'Credenciales inválidas' }
  }

  const logout = ()=>{ setToken(null); setUser(null) }
  const simulate401 = ()=>{ setToken('expired-token') }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, simulate401 }}>
      {children}
    </AuthContext.Provider>
  )
}
