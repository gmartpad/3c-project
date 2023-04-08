import { Inter } from 'next/font/google'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { selectFavoritesState, setFavoritesState } from '@store/favoritesSlice'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from '../hooks/useLocalStorage'
import { useEffect } from 'react'
import ListScreen from '../screens/ListScreen'
import HomeScreen from '../screens/HomeScreen'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useDispatch()
  const favoritesState = useSelector(selectFavoritesState)

  const { storedValue, setStoredValue } = useLocalStorage('favoritesState', favoritesState)

  useEffect(() => {
    if (storedValue !== favoritesState) {
      dispatch(setFavoritesState(storedValue))
    }
  }, 
    // [dispatch, favoritesState, storedValue]
    []
  )

  useEffect(() => {
    setStoredValue(favoritesState)
  }, [favoritesState, setStoredValue])

  const addFavorite = (favorite: string) => {
    dispatch(setFavoritesState([...favoritesState, favorite]))
  }

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/list">List</Link>
          </li>
        </ul>
        <div>
          <p data-testid="favoritesState">favoritesState: {JSON.stringify(favoritesState)}</p>
        </div>
        <button type="button" onClick={() => addFavorite(`teste ${Math.random()}`)}>
          <p>adicionar</p>
        </button>
        <Routes>
          <Route path="/list" element={<ListScreen/>} />
          <Route path="/" element={<HomeScreen/>} />
        </Routes>
      </div>
    </Router>
  )
}
