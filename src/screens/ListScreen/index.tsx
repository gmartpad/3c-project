import { selectFavoritesState } from '@store/favoritesSlice'
import React from 'react'
import { useSelector } from 'react-redux'

function ListScreen() {
  const favoritesState = useSelector(selectFavoritesState)

  return (
    <div>
      <h1>List</h1>
      <div>
        <p data-testid="favoritesState">favoritesState: {JSON.stringify(favoritesState)}</p>
      </div>
    </div>
  )
}

export default ListScreen