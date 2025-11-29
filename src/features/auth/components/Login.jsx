
import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { AlertContext } from '../../../components/ui/AlertProvider.jsx'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { show } = useContext(AlertContext)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError(null)
    if(!username || !password){ setError('Completa usuario y contraseña'); return }
    if(username.length<3){ setError('Usuario mínimo 3 caracteres'); return }
    setLoading(true)
    setTimeout(()=>{
      const res = login(username, password)
      setLoading(false)
      if(res.ok){
        show('Ingreso exitoso', 'success')
        navigate(state?.from?.pathname || '/dashboard')
      } else {
        show(res.error, 'danger')
        setError(res.error)
      }
    }, 500)
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <div className="card shadow fade-in" style={{minWidth:360}}>
        <div className="card-body">
          <h4 className="card-title mb-3">Ingreso</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input className="form-control" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary w-100" disabled={loading}>
              {loading? (<><span className='spinner-border spinner-border-sm me-2'></span>Ingresando...</>) : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
