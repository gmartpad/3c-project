import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from '@hooks/useLocalStorage'
import { selectFavoritesState, setFavoritesState } from '@store/favoritesSlice'

interface FavoriteContextProps {
  toggleFavoritePokemon: (pokemonDetails: any) => void
}

// create a new context object
const FavoritesContext = createContext<FavoriteContextProps>({
  toggleFavoritePokemon: () => undefined,
})

interface FavoritesProviderProps {
  children: ReactNode
}

// define a provider component for the context object
export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const dispatch = useDispatch()
  const favoritesState = useSelector(selectFavoritesState)
  const { storedValue, setStoredValue } = useLocalStorage(
    'favoritesState',
    favoritesState,
  )

  const addFavorite = useCallback(
    (favoriteToBeAdded: string) => {
      dispatch(setFavoritesState([...favoritesState, favoriteToBeAdded]))
    },
    [dispatch, favoritesState],
  )

  const removeFavorite = useCallback(
    (favoriteToBeRemoved: string) => {
      dispatch(
        setFavoritesState([
          ...favoritesState.filter(
            (favoritePokemon) => favoritePokemon !== favoriteToBeRemoved,
          ),
        ]),
      )
    },
    [dispatch, favoritesState],
  )

  const toggleFavoritePokemon = useCallback(
    (pokemonDetails: any) => {
      const isFavorite = favoritesState.includes(pokemonDetails?.id)

      if (isFavorite) {
        removeFavorite(pokemonDetails?.id)
      } else {
        addFavorite(pokemonDetails?.id)
      }
    },
    [addFavorite, removeFavorite, favoritesState],
  )

  useEffect(() => {
    if (storedValue !== favoritesState) {
      dispatch(setFavoritesState(storedValue))
    }
  }, [])

  useEffect(() => {
    setStoredValue(favoritesState)
  }, [favoritesState, setStoredValue])

  return (
    <FavoritesContext.Provider value={{ toggleFavoritePokemon }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
