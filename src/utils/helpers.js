
export const paginate = (items, page, perPage) => {
  const start = (page-1)*perPage
  return items.slice(start, start+perPage)
}

export const sortBy = (items, key, dir='asc') => {
  return [...items].sort((a,b)=>{
    const va = a[key]; const vb = b[key]
    if(va<vb) return dir==='asc'? -1:1
    if(va>vb) return dir==='asc'? 1:-1
    return 0
  })
}
