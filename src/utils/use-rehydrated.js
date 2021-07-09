import { useReducer, useEffect } from 'react'

const useRehydrated = () => {
  const [isRehydrated, setIsRehydrated] = useReducer(() => true, false)
  useEffect(setIsRehydrated, [])
  return isRehydrated
}

export default useRehydrated
