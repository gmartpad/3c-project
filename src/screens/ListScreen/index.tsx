import PokemonCard from '@components/PokemonCard'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
import PaginationButtons from '@components/PaginationButtons'
import { useSelector } from 'react-redux'
import { selectFavoritesState } from '@store/favoritesSlice'

function ListScreen() {
  const ITEMS_PER_PAGE = 10

  const favoritesState = useSelector(selectFavoritesState)

  const [searchParams, setSearchParams] = useSearchParams()

  const [pokemonPrevious, setPokemonPrevious] = useState<string | null>(null)
  const [pokemonList, setPokemonList] = useState<any[]>([])
  const [pokemonNext, setPokemonNext] = useState<string | null>(null)

  const [favoritePokemonPrevious, setFavoritePokemonPrevious] = useState<
    string | null
  >(null)
  const [favoritePokemonList, setFavoritePokemonList] = useState<any[]>([])
  const [favoritePokemonNext, setFavoritePokemonNext] = useState<string | null>(
    null,
  )

  const [isPokemonListLoading, setIsPokemonListLoading] =
    useState<boolean>(true)

  const [isFavoritePokemonListLoading, setIsFavoritePokemonListLoading] =
    useState<boolean>(true)

  const handleGetPokemon = useCallback(
    async (baseUrl = `${process.env.NEXT_PUBLIC_POKEMON_API_URI}`) => {
      let page = 1

      if (searchParams.get('page')) {
        if (Number(searchParams.get('page')) <= 0) {
          page = 1
          searchParams.set('page', String(page))
          setSearchParams(searchParams)
        } else {
          page = Number(searchParams.get('page'))
        }
      }

      const url = `${baseUrl}?offset=${(page - 1) * 10}&limit=${ITEMS_PER_PAGE}`

      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setPokemonPrevious(data?.previous)
          setPokemonList(data?.results)
          setPokemonNext(data?.next)
        })
        .catch((error) => console.error(error))
    },
    [
      searchParams,
      setSearchParams,
      setPokemonPrevious,
      setPokemonList,
      setPokemonNext,
    ],
  )

  const handleGetFavoritePokemon = useCallback(() => {
    let favoritesPage = 1

    if (searchParams.get('favoritesPage')) {
      if (Number(searchParams.get('favoritesPage')) <= 0) {
        favoritesPage = 1
        searchParams.set('favoritesPage', String(favoritesPage))
        setSearchParams(searchParams)
      } else {
        favoritesPage = Number(searchParams.get('favoritesPage'))
      }
    }

    const startIndex = (favoritesPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE

    const favorites = favoritesState
      .slice(startIndex, endIndex)
      .map((pokemonID) => ({
        url: `${process.env.NEXT_PUBLIC_POKEMON_API_URI}${pokemonID}`,
      }))

    const data = {
      results: favorites,
    }

    setFavoritePokemonPrevious(
      !!startIndex === true ? String(!!startIndex) : null,
    )
    setFavoritePokemonList(data?.results)
    setFavoritePokemonNext(
      endIndex < favoritesState?.length === true
        ? String(endIndex > favoritesState?.length)
        : null,
    )
  }, [searchParams, setSearchParams, favoritesState, setFavoritePokemonList])

  useEffect(() => {
    searchParams.set('page', '1')
    searchParams.set('favoritesPage', '1')
    setSearchParams(searchParams)
  }, [])

  useEffect(() => {
    ;(async () => {
      setIsPokemonListLoading(true)
      await handleGetPokemon()
      setIsPokemonListLoading(false)
    })()
  }, [searchParams, handleGetPokemon])

  useEffect(() => {
    ;(async () => {
      setIsFavoritePokemonListLoading(true)
      await handleGetFavoritePokemon()
      setIsFavoritePokemonListLoading(false)
    })()
  }, [favoritesState, searchParams, handleGetFavoritePokemon])

  return (
    <Container
      paddingTop="32"
      maxWidth="inherit"
      boxSizing="border-box"
      centerContent
    >
      <Tabs width="100%">
        <TabList>
          <Tab>Todos</Tab>
          <Tab>Favoritos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {isPokemonListLoading ? (
              <Box width="100%" display="flex" justifyContent="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#3c5aa6"
                  size="xl"
                />
              </Box>
            ) : (
              <>
                <PaginationButtons
                  handleGetPokemon={handleGetPokemon}
                  pokemonPrevious={pokemonPrevious}
                  pokemonNext={pokemonNext}
                  searchParamName="page"
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
                  searchParamName="page"
                />
              </>
            )}
          </TabPanel>
          <TabPanel>
            {isFavoritePokemonListLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#3c5aa6"
                size="xl"
              />
            ) : (
              <>
                {favoritesState?.length > 10 && (
                  <PaginationButtons
                    handleGetPokemon={handleGetFavoritePokemon}
                    pokemonPrevious={favoritePokemonPrevious}
                    pokemonNext={favoritePokemonNext}
                    searchParamName="favoritesPage"
                  />
                )}
                <Flex wrap="wrap" justifyContent="space-around">
                  {favoritePokemonList?.length ? (
                    (favoritePokemonList ?? [])?.map((pokemon, key) => (
                      <PokemonCard key={key} pokemon={pokemon} />
                    ))
                  ) : (
                    <Text>No favorite pokemon</Text>
                  )}
                </Flex>
                {favoritesState?.length > 10 && (
                  <PaginationButtons
                    handleGetPokemon={handleGetFavoritePokemon}
                    pokemonPrevious={favoritePokemonPrevious}
                    pokemonNext={favoritePokemonNext}
                    searchParamName="favoritesPage"
                  />
                )}
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default ListScreen
