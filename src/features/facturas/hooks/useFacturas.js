
import { useContext } from 'react'
import { FacturasContext } from '../context/FacturasContext.jsx'
export default function useFacturas(){
  return useContext(FacturasContext)
}
