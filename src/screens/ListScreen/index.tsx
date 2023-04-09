import PokemonCard from '@components/PokemonCard'
import { selectFavoritesState } from '@store/favoritesSlice'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Flex } from '@chakra-ui/react'

function ListScreen() {
  const favoritesState = useSelector(selectFavoritesState)

  const [pokemonList, setPokemonList] = useState<any[]>([])

  const handleGetPokemon = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_POKEMON_API_URI}`)
      .then((res) => res.json())
      .then((data) => setPokemonList(data?.results))
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    ;(async () => {
      await handleGetPokemon()
    })()
  }, [handleGetPokemon])

  return (
    <Container maxW="1056px" boxSizing="border-box" centerContent>
      <h1>List</h1>
      <div>
        <p data-testid="favoritesState">
          favoritesState: {JSON.stringify(favoritesState)}
        </p>
      </div>
      <Flex wrap="wrap" justifyContent="space-around">
        {(pokemonList ?? [])?.map((pokemon, key) => (
          <PokemonCard key={key} pokemon={pokemon} />
        ))}
      </Flex>
    </Container>
  )
}

export default ListScreen
