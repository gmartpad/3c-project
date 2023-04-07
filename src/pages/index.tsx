import { Inter } from 'next/font/google'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { selectFavoritesState } from '@store/favoritesSlice'
import { useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

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
          <p data-testid="favoritesState">favoritesState: {JSON.stringify(favoritesState)}</p>
        </div>
        <Routes>
          <Route path="/list" element={<h1>List</h1>} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </div>
    </Router>
  )
}
