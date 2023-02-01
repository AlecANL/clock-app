// import { useState, useEffect } from 'react'
// export function useWindowResize() {
//   const [size, setSize] = useState<number>(0)

//   useEffect(() => {
//     const handleResize = () => setSize(window.innerHeight)
//     window.addEventListener('resize', handleResize)
//     handleResize()
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return size
// }

import { useState, useMemo, useEffect } from 'react'

export function useWindowResize() {
  const [windowSize, setWindowSize] = useState<Number>(0)

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(window.innerHeight)
    }

    window.addEventListener('resize', handleWindowResize)
    handleWindowResize()

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return windowSize
}
