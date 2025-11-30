
import React, { createContext, useCallback, useEffect, useState } from 'react'
import api from '../../../services/api.js'

export const FacturasContext = createContext(null)

export function FacturasProvider({ children }){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialized, setInitialized] = useState(false)

  const fetchAll = useCallback(async ()=>{
    setLoading(true); setError(null)
    try{
      const { data } = await api.get('/posts')
      const enriched = data.map(p=>({ id:p.id, title:p.title, body:p.body, estado: p.id % 3 === 0 }))
      setItems(enriched)
      setInitialized(true)
    }catch(err){ setError('No se pudo cargar el listado') }
    finally{ setLoading(false) }
  },[])

  useEffect(()=>{ fetchAll() },[fetchAll])

  const getById = useCallback(async (id)=>{
    const numId = Number(id)
    const found = items.find(i=> i.id===numId)
    if(found) return found
    try{
      const { data } = await api.get(`/posts/${numId}`)
      const nuevo = { id:data.id, title:data.title, body:data.body, estado: data.id % 3 === 0 }
      setItems(prev=> {
        const exists = prev.some(i=> i.id===nuevo.id)
        return exists? prev.map(i=> i.id===nuevo.id? nuevo:i): [nuevo, ...prev]
      })
      return nuevo
    }catch(err){ throw new Error('No se pudo cargar la factura') }
  },[items])

  const create = async (payload)=>{
    try{
      const { data } = await api.post('/posts', payload)
      const id = data?.id ?? Math.max(0, ...items.map(i=>i.id))+1
      const nuevo = { id, title: payload.title, body: payload.body, estado: !!payload.estado }
      setItems(prev=> [nuevo, ...prev])
      return { ok:true, data:nuevo }
    }catch(err){ return { ok:false, error:'Error creando factura' } }
  }

  const update = async (id, payload)=>{
    try{
      await api.put(`/posts/${id}`, payload)
      setItems(prev=> prev.map(i=> i.id===id? { ...i, title: payload.title, body: payload.body, estado: !!payload.estado }: i))
      return { ok:true }
    }catch(err){ return { ok:false, error:'Error actualizando factura' } }
  }

  const remove = async (id)=>{
    try{
      await api.delete(`/posts/${id}`)
      setItems(prev=> prev.filter(i=> i.id!==id))
      return { ok:true }
    }catch(err){ return { ok:false, error:'Error eliminando factura' } }
  }

  return (
    <FacturasContext.Provider value={{ items, loading, error, initialized, fetchAll, getById, create, update, remove }}>
      {children}
    </FacturasContext.Provider>
  )
}
