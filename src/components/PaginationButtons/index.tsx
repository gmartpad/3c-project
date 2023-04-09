import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

interface PaginationButtonsProps {
  handleGetPokemon: (baseUrl?: string) => void
  pokemonPrevious?: string | null
  pokemonNext?: string | null
  searchParamName: string
}

function PaginationButtons({
  handleGetPokemon,
  pokemonPrevious,
  pokemonNext,
  searchParamName,
}: PaginationButtonsProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Stack justifyContent="center" marginY={8} direction="row" spacing={4}>
      {!!pokemonPrevious && (
        <Button
          onClick={async () => {
            searchParams.set(
              searchParamName,
              String(Number(searchParams.get(searchParamName) ?? 0) - 1),
            )
            setSearchParams(searchParams)
            await handleGetPokemon(pokemonPrevious)
          }}
          leftIcon={<ArrowBackIcon />}
          colorScheme="black"
          variant="outline"
        >
          Página Anterior
        </Button>
      )}
      {!!pokemonNext && (
        <Button
          onClick={async () => {
            searchParams.set(
              searchParamName,
              String(Number(searchParams.get(searchParamName) ?? 0) + 1),
            )
            setSearchParams(searchParams)
            await handleGetPokemon(pokemonNext)
          }}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="black"
          variant="outline"
        >
          Próxima Página
        </Button>
      )}
    </Stack>
  )
}

export default PaginationButtons
