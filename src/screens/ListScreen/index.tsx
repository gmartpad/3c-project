import PokemonCard from '@components/PokemonCard'
import { selectFavoritesState } from '@store/favoritesSlice'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Flex, Heading } from '@chakra-ui/react'

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
    <Container minW="1056px" boxSizing="border-box" centerContent>
      <Heading padding="16">Lista</Heading>
      <Flex wrap="wrap" justifyContent="space-around">
        {(pokemonList ?? [])?.map((pokemon, key) => (
          <PokemonCard key={key} pokemon={pokemon} />
        ))}
      </Flex>
    </Container>
  )
}

export default ListScreen
