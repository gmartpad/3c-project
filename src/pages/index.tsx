import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { selectFavoritesState } from '@store/favoritesSlice'
import { useSelector } from 'react-redux'
import ListScreen from '../screens/ListScreen'
import HomeScreen from '../screens/HomeScreen'
import { Container } from '@chakra-ui/react'

export default function Home() {
  const favoritesState = useSelector(selectFavoritesState)

  return (
    <Router>
      <Container minW="1056px" minHeight="100vh">
        <Routes>
          <Route path="/list" element={<ListScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Container>
    </Router>
  )
}
