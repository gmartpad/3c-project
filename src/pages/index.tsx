import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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

        <Routes>
          <Route path="/list" element={<h1>List</h1>} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </div>
    </Router>
  )
}
