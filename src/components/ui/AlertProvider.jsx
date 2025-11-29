
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AlertContext = createContext({ show: ()=>{} })

export default function AlertProvider({ children }){
  const [alerts, setAlerts] = useState([])
  const idRef = useRef(0)
  const navigate = useNavigate()

  const show = useCallback((message, variant='success')=>{
    const id = ++idRef.current
    setAlerts(prev=> [...prev, { id, message, variant }])
    setTimeout(()=>{ setAlerts(prev=> prev.filter(a=> a.id!==id)) }, 3500)
  },[])

  useEffect(()=>{
    const handler = ()=>{
      show('Sesión expirada. Ingresa de nuevo.', 'warning')
      navigate('/login')
    }
    window.addEventListener('session-expired', handler)
    return ()=> window.removeEventListener('session-expired', handler)
  },[show, navigate])

  return (
    <AlertContext.Provider value={{ show }}>
      {children}
      <div className="app-alert-container">
        {alerts.map(a=> (
          <div key={a.id} className={`app-alert app-alert-${a.variant}`}>
            <span>{a.message}</span>
            <button className="app-alert-close" onClick={()=>setAlerts(prev=> prev.filter(x=> x.id!==a.id))}>×</button>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  )
}
