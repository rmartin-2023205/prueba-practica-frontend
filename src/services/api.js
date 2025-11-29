
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000
})

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token')
  if(token && token !== 'expired-token'){
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res)=>res,
  (error)=>{
    if(error.response && error.response.status===401){
      localStorage.removeItem('token')
      window.dispatchEvent(new CustomEvent('session-expired'))
    }
    return Promise.reject(error)
  }
)

export default api
