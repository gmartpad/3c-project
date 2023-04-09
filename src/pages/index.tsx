import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListScreen from '@screens/ListScreen'
import HomeScreen from '@screens/HomeScreen'
import { Container } from '@chakra-ui/react'
import Nav from '@components/Nav'

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Container maxW="1056px" minHeight="100vh">
        <Routes>
          <Route path="/list" element={<ListScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
