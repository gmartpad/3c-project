import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { selectFavoritesState } from '@store/favoritesSlice'
import { useSelector } from 'react-redux'
import ListScreen from '../screens/ListScreen'
import HomeScreen from '../screens/HomeScreen'

export default function Home() {
  const favoritesState = useSelector(selectFavoritesState)

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
          <p data-testid="favoritesState">
            favoritesState: {JSON.stringify(favoritesState)}
          </p>
        </div>
        <Routes>
          <Route path="/list" element={<ListScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </div>
    </Router>
  )
}
