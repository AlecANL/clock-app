import { useState, useEffect } from 'react'
export function useWindowResize() {
  const [size, setSize] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => setSize(window.innerHeight)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  })

  return size
}
