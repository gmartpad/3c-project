import { selectFavoritesState } from '@store/favoritesSlice'
import React from 'react'
import { useSelector } from 'react-redux'

function HomeScreen() {
  const favoritesState = useSelector(selectFavoritesState)

  return (
    <div>
      <h1>Home</h1>
      <div>
        <p data-testid="favoritesState">favoritesState: {JSON.stringify(favoritesState)}</p>
      </div>
    </div>
  )
}

export default HomeScreen