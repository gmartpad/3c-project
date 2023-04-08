import { useEffect, useState } from "react";

function useLocalStorage(key: string, initialValue: any[] = []) {
  const [storedValue, setStoredValue] = useState<Array<any>>(() => {
    try {
      const localStorageValue = window.localStorage.getItem(key)
      return localStorageValue ? JSON.parse(localStorageValue) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  return { storedValue, setStoredValue }
}

export default useLocalStorage