
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFacturas from '../hooks/useFacturas.js'

export default function FacturaDetail(){
  const { id } = useParams()
  const { getById } = useFacturas()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true); setError(null)
      try{
        const factura = await getById(id)
        setItem(factura)
      }catch(err){ setError(err.message) }
      finally{ setLoading(false) }
    }
    load()
  },[id, getById])

  if(loading) return <div className="text-center py-5"><div className="spinner-border"/></div>
  if(error) return <div className="alert alert-danger">{error}</div>
  if(!item) return null

  return (
    <div className="card fade-in">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Factura #{item.id}</h4>
          <div className="d-flex gap-2">
            <button className="btn btn-secondary" onClick={()=>navigate('/facturas')}>Volver</button>
            <Link to={`/facturas/${item.id}/editar`} className="btn btn-warning">Editar</Link>
          </div>
        </div>
        <p><strong>Título (Cliente):</strong> {item.title}</p>
        <p><strong>Descripción:</strong> {item.body}</p>
        <p><strong>Estado:</strong> <span className={`badge ${item.estado? 'badge-success':'badge-danger'}`}>{item.estado? 'Pagada':'Pendiente'}</span></p>
      </div>
    </div>
  )
}
