
import React, { useEffect, useMemo, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFacturas from '../hooks/useFacturas.js'
import { AlertContext } from '../../../components/ui/AlertProvider.jsx'

export default function FacturaForm({ mode='create' }){
  const navigate = useNavigate()
  const { id } = useParams()
  const { items, create, update } = useFacturas()
  const { show } = useContext(AlertContext)

  const existing = useMemo(()=> items.find(i=> String(i.id)===String(id)),[items,id])

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [estado, setEstado] = useState('pendiente')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false)

  useEffect(()=>{
    if(mode==='edit' && existing){
      setTitle(existing.title)
      setBody(existing.body)
      setEstado(existing.estado? 'pagada':'pendiente')
    }
  },[existing, mode])

  const validate = ()=>{
    const e = {}
    if(!title || title.trim().length<5) e.title = 'Título mínimo 5 caracteres'
    if(!body || body.trim().length<10) e.body = 'Descripción mínimo 10 caracteres'
    if(!estado) e.estado = 'Selecciona estado'
    setErrors(e)
    return Object.keys(e).length===0
  }

  const onSubmit = async (ev)=>{
    ev.preventDefault()
    if(!validate()) return
    setLoading(true)
    const payload = { title, body, estado: estado==='pagada' }
    setTimeout(async ()=>{
      const res = mode==='create'
        ? await create({ title, body, userId:1, estado: payload.estado })
        : await update(Number(id), { title, body, estado: payload.estado })
      setLoading(false)
      if(res.ok){
        show(mode==='create'? 'Factura creada correctamente' : 'Factura actualizada correctamente', 'success')
        if(mode==='create'){ setTitle(''); setBody(''); setEstado('pendiente') }
        navigate('/facturas')
      }else{
        show(res.error || 'Ocurrió un error', 'danger')
      }
    }, 300)
  }

  return (
    <div className="card fade-in">
      <div className="card-body">
        <h4 className="mb-3">{mode==='create'? 'Crear Factura':'Editar Factura'}</h4>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input className={`form-control ${errors.title? 'is-invalid':''}`} value={title} onChange={e=>setTitle(e.target.value)} />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea className={`form-control ${errors.body? 'is-invalid':''}`} rows={4} value={body} onChange={e=>setBody(e.target.value)} />
            {errors.body && <div className="invalid-feedback">{errors.body}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select className={`form-select ${errors.estado? 'is-invalid':''}`} value={estado} onChange={e=>setEstado(e.target.value)}>
              <option value="pendiente">Pendiente</option>
              <option value="pagada">Pagada</option>
            </select>
            {errors.estado && <div className="invalid-feedback">{errors.estado}</div>}
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={()=>setPreview(p=>!p)}>Preview</button>
            <button className="btn btn-primary" disabled={loading}>
              {loading? (<><span className='spinner-border spinner-border-sm me-2'></span>Guardando...</>) : 'Guardar'}
            </button>
          </div>
        </form>

        {preview && (
          <div className="mt-4">
            <h6>Preview</h6>
            <div className="border rounded p-3">
              <p><strong>Título:</strong> {title}</p>
              <p><strong>Descripción:</strong> {body}</p>
              <p><strong>Estado:</strong> <span className={`badge ${estado==='pagada'? 'badge-success':'badge-danger'}`}>{estado==='pagada'? 'Pagada':'Pendiente'}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
