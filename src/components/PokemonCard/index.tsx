import React, { useCallback, useEffect, useState } from 'react'
import { useFavorites } from '@context/FavoriteContext'
import SkeletonPokemonCard from '@components/SkeletonPokemonCard'
import FilledPokemonCard from '@components/FilledPokemonCard'

function PokemonCard(props: any) {
  const { toggleFavoritePokemon } = useFavorites()

  const { pokemon } = props

  const [pokemonDetails, setPokemonDetails] = useState<any>()

  const handleGetPokemonDetails = useCallback(async () => {
    await fetch(pokemon?.url)
      .then((res) => res.json())
      .then((data) => setPokemonDetails(data))
      .catch((error) => console.error(error))
  }, [pokemon])

  useEffect(() => {
    ;(async () => {
      await handleGetPokemonDetails()
    })()
  }, [handleGetPokemonDetails])

  return (
    <>
      {!!pokemonDetails ? (
        <FilledPokemonCard
          pokemonDetails={pokemonDetails}
          toggleFavoritePokemon={toggleFavoritePokemon}
        />
      ) : (
        <SkeletonPokemonCard />
      )}
    </>
  )
}

export default PokemonCard
