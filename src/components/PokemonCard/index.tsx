import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  useBreakpointValue,
  CardFooter,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { capitalizeString } from '@utils/capitalizeString'
import { capitalizeEveryWordOfString } from '@utils/capitalizeEveryWordOfString'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { selectFavoritesState } from '@store/favoritesSlice'
import { useFavorites } from '@context/FavoriteContext'

function PokemonCard(props: any) {
  const favoritesState = useSelector(selectFavoritesState)

  const { toggleFavoritePokemon } = useFavorites()

  const { pokemon } = props

  const isBelowL = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  })

  const [pokemonDetails, setPokemonDetails] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isFavorite = useMemo(
    () => favoritesState.includes(pokemonDetails?.id),
    [favoritesState, pokemonDetails],
  )

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
      <Card
        maxW="sm"
        marginBottom="16"
        marginInline="4"
        bg="#fff"
        _hover={{
          background: '#ddd',
        }}
        transition="ease-in-out"
        transitionDuration="0.3s"
      >
        <CardBody>
          <Image
            alt={pokemonDetails?.name}
            src={pokemonDetails?.sprites?.other?.home?.front_default}
          />
          <Stack>
            <Heading>{capitalizeString(pokemon?.name)}</Heading>
            <Text>
              Types:{' '}
              {pokemonDetails?.types
                .map((type: any) => capitalizeString(type?.type?.name))
                ?.join(', ')}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              onClick={() => setIsModalOpen(true)}
              leftIcon={<BsFillInfoCircleFill />}
              backgroundColor="#3c5aa6"
              color="#fff"
            >
              See More
            </Button>
            <Button
              onClick={() => toggleFavoritePokemon(pokemonDetails)}
              display="flex"
              justifyContent="space-between"
              backgroundColor="#ffcb05"
            >
              {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent margin="8" maxWidth="fit-content">
          <ModalHeader display="flex" alignItems="center">
            <Text marginRight="4">{capitalizeString(pokemon?.name)}</Text>
            <Button
              onClick={() => toggleFavoritePokemon(pokemonDetails)}
              backgroundColor="#ffcb05"
              display="flex"
              justifyContent="space-between"
              iconSpacing={0}
            >
              {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
            </Button>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            flexWrap="wrap"
            display={isBelowL ? 'initial' : 'flex'}
            flexDirection="row"
            p="4"
          >
            <Image
              alt={pokemonDetails?.name}
              src={pokemonDetails?.sprites?.other?.home?.front_default}
            />
            <Box
              paddingTop={isBelowL ? 'initial' : '16'}
              paddingRight={isBelowL ? 'initial' : '16'}
              paddingBottom={isBelowL ? 'initial' : '16'}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <p>
                Base XP: {JSON.stringify(pokemonDetails?.base_experience)}xp
              </p>
              <p>
                Types:{' '}
                {pokemonDetails?.types
                  .map((type: any) => capitalizeString(type?.type?.name))
                  ?.join(', ')}
              </p>
              <b>Stats</b>
              {(pokemonDetails?.stats ?? [])?.map((stat: any, k: React.Key) => (
                <p key={k}>
                  {capitalizeEveryWordOfString(stat?.stat?.name)}:{' '}
                  {stat?.base_stat}
                </p>
              ))}
              <b>Height</b>
              <p>In decimeters: {JSON.stringify(pokemonDetails?.height)}dm </p>
              <p>
                In centimeters: {JSON.stringify(pokemonDetails?.height * 10)}cm{' '}
              </p>
              <p>In meters: {JSON.stringify(pokemonDetails?.height / 10)}m</p>
              <b>Weight</b>
              <p>In Hectograms: {JSON.stringify(pokemonDetails?.weight)}hg</p>
              <p>In Grams: {JSON.stringify(pokemonDetails?.weight * 100)}g</p>
              <p>
                In Kilograms: {JSON.stringify(pokemonDetails?.weight / 10)}kg
              </p>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PokemonCard
