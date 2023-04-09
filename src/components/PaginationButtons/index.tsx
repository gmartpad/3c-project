import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

interface PaginationButtonsProps {
  handleGetPokemon: (baseUrl?: string) => void
  pokemonPrevious: string | null
  pokemonNext: string | null
}

function PaginationButtons({
  handleGetPokemon,
  pokemonPrevious,
  pokemonNext,
}: PaginationButtonsProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Stack marginY={8} direction="row" spacing={4}>
      {!!pokemonPrevious && (
        <Button
          onClick={async () => {
            searchParams.set(
              'page',
              String(Number(searchParams.get('page') ?? 0) - 1),
            )
            setSearchParams(searchParams)
            await handleGetPokemon(pokemonPrevious)
          }}
          leftIcon={<ArrowBackIcon />}
          colorScheme="black"
          variant="outline"
        >
          Previous Page
        </Button>
      )}
      {!!pokemonNext && (
        <Button
          onClick={async () => {
            searchParams.set(
              'page',
              String(Number(searchParams.get('page') ?? 0) + 1),
            )
            setSearchParams(searchParams)
            await handleGetPokemon(pokemonNext)
          }}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="black"
          variant="outline"
        >
          Next Page
        </Button>
      )}
    </Stack>
  )
}

export default PaginationButtons
