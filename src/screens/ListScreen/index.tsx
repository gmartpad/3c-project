import PokemonCard from '@components/PokemonCard'
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Flex, Spinner } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
import PaginationButtons from '@components/PaginationButtons'

function ListScreen() {
  const [searchParams] = useSearchParams()

  const [pokemonPrevious, setPokemonPrevious] = useState<string | null>(null)
  const [pokemonList, setPokemonList] = useState<any[]>([])
  const [pokemonNext, setPokemonNext] = useState<string | null>(null)

  const [isPokemonListLoading, setIsPokemonListLoading] =
    useState<boolean>(true)

  const handleGetPokemon = useCallback(
    async (baseUrl = `${process.env.NEXT_PUBLIC_POKEMON_API_URI}`) => {
      const page = Number(searchParams.get('page') ?? 1)

      const url = `${baseUrl}?offset=${(page - 1) * 10}&limit=10`

      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setPokemonPrevious(data?.previous)
          setPokemonList(data?.results)
          setPokemonNext(data?.next)
        })
        .catch((error) => console.error(error))
    },
    [searchParams, setPokemonPrevious, setPokemonList, setPokemonNext],
  )

  useEffect(() => {
    ;(async () => {
      setIsPokemonListLoading(true)
      await handleGetPokemon()
      setIsPokemonListLoading(false)
    })()
  }, [searchParams])

  return (
    <Container
      paddingTop="32"
      maxWidth="inherit"
      boxSizing="border-box"
      centerContent
    >
      {isPokemonListLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#3c5aa6"
          size="xl"
        />
      ) : (
        <>
          <PaginationButtons
            handleGetPokemon={handleGetPokemon}
            pokemonPrevious={pokemonPrevious}
            pokemonNext={pokemonNext}
          />
          <Flex wrap="wrap" justifyContent="space-around">
            {(pokemonList ?? [])?.map((pokemon, key) => (
              <PokemonCard key={key} pokemon={pokemon} />
            ))}
          </Flex>
          <PaginationButtons
            handleGetPokemon={handleGetPokemon}
            pokemonPrevious={pokemonPrevious}
            pokemonNext={pokemonNext}
          />
        </>
      )}
    </Container>
  )
}

export default ListScreen
