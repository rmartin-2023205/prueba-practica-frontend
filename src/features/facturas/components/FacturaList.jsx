
import React, { useMemo, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFacturas from '../hooks/useFacturas.js'
import { paginate, sortBy } from '../../../utils/helpers.js'
import { AlertContext } from '../../../components/ui/AlertProvider.jsx'

export default function FacturaList(){
  const { items, loading, error, remove } = useFacturas()
  const [query, setQuery] = useState('')
  const [estado, setEstado] = useState('all')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({ key:'id', dir:'asc'})
  const [toDelete, setToDelete] = useState(null)
  const navigate = useNavigate()
  const { show } = useContext(AlertContext)

  const filtered = useMemo(()=>{
    let data = items
    if(query) data = data.filter(i=> i.title.toLowerCase().includes(query.toLowerCase()))
    if(estado!=='all') data = data.filter(i=> (estado==='true')===!!i.estado)
    return sortBy(data, sort.key, sort.dir)
  },[items, query, estado, sort])

  const perPage = 10
  const pages = Math.max(1, Math.ceil(filtered.length/perPage))
  const pageItems = paginate(filtered, page, perPage)

  const toggleSort = (key)=>{
    setSort(prev=> ({ key, dir: prev.key===key && prev.dir==='asc'? 'desc':'asc' }))
  }

  const confirmDelete = async ()=>{
    if(!toDelete) return
    const res = await remove(toDelete.id)
    if(res.ok){ show(`Factura #${toDelete.id} eliminada`, 'success') }
    else show(res.error || 'Error eliminando', 'danger')
    setToDelete(null)
  }

  return (
    <div className="card fade-in">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Listado de Facturas</h4>
          <div>
            <Link to="/facturas/nueva" className="btn btn-primary">Nueva</Link>
          </div>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-md-6">
            <input className="form-control" placeholder="Buscar por título" value={query} onChange={e=>{setPage(1); setQuery(e.target.value)}}/>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <span>Estado:</span>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="estado" checked={estado==='all'} onChange={()=>{setPage(1); setEstado('all')}} id="estadoAll"/>
                <label className="form-check-label" htmlFor="estadoAll">Todos</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="estado" checked={estado==='true'} onChange={()=>{setPage(1); setEstado('true')}} id="estadoTrue"/>
                <label className="form-check-label" htmlFor="estadoTrue">Pagadas</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="estado" checked={estado==='false'} onChange={()=>{setPage(1); setEstado('false')}} id="estadoFalse"/>
                <label className="form-check-label" htmlFor="estadoFalse">Pendientes</label>
              </div>
              <button className="btn btn-outline-secondary btn-sm" onClick={()=>{setQuery(''); setEstado('all'); setPage(1)}}>Limpiar</button>
            </div>
          </div>
        </div>

        {loading && <div className="text-center py-5"><div className="spinner-border"/></div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th onClick={()=>toggleSort('id')}>ID</th>
                  <th onClick={()=>toggleSort('title')}>Título</th>
                  <th onClick={()=>toggleSort('estado')}>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map(item=> (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>
                      <span className={`badge ${item.estado? 'badge-success':'badge-danger'}`}>{item.estado? 'Pagada':'Pendiente'}</span>
                    </td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-sm btn-secondary" onClick={()=>navigate(`/facturas/${item.id}`)}>Ver</button>
                      <button className="btn btn-sm btn-warning" onClick={()=>navigate(`/facturas/${item.id}/editar`)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>setToDelete(item)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length===0 && !loading && <p className="text-muted">No hay resultados.</p>}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-muted">Página {page} de {pages}</span>
          <div className="btn-group">
            <button className="btn btn-outline-light" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Anterior</button>
            <button className="btn btn-outline-light" disabled={page===pages} onClick={()=>setPage(p=>p+1)}>Siguiente</button>
          </div>
        </div>

        {/* Modal de confirmación */}
        <div className="modal" style={{display: toDelete? 'block':'none', background:'rgba(0,0,0,.6)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Confirmar eliminación</h5></div>
              <div className="modal-body">¿Eliminar la factura #{toDelete?.id}?</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={()=>setToDelete(null)}>Cancelar</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
