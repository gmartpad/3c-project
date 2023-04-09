import PokemonCard from '@components/PokemonCard'
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Flex, Heading } from '@chakra-ui/react'

function ListScreen() {
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
    <Container
      paddingTop="32"
      maxWidth="inherit"
      boxSizing="border-box"
      centerContent
    >
      <Flex wrap="wrap" justifyContent="space-around">
        {(pokemonList ?? [])?.map((pokemon, key) => (
          <PokemonCard key={key} pokemon={pokemon} />
        ))}
      </Flex>
    </Container>
  )
}

export default ListScreen
