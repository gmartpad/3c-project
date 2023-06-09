import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { store } from './store'
import { HYDRATE } from 'next-redux-wrapper'

// Type for our state
export interface FavoritesState {
  favoritesState: Array<any>
}

// Initial state
const initialState: FavoritesState = {
  favoritesState: [],
}

// Actual Slice
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Action to set the authentication status
    setFavoritesState(
      state: FavoritesState,
      action: PayloadAction<Array<any>>,
    ) {
      state.favoritesState = action.payload
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.favorites,
      }
    },
  },
})

export const { setFavoritesState } = favoritesSlice.actions

export type RootState = ReturnType<typeof store.getState>

export const selectFavoritesState = (state: RootState) =>
  state.favorites.favoritesState

export default favoritesSlice.reducer
