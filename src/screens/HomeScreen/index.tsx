import {
  Box,
  Container,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function HomeScreen() {
  const isBelowMD = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
  })

  return (
    <Container
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={isBelowMD ? 'column' : 'row'}
    >
      <Heading textAlign={isBelowMD ? 'center' : 'inherit'} as="h1" size="2xl">
        Meus Pokémons Favoritos
      </Heading>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Text fontSize="xl" mb={4} marginInline="8" textAlign="center">
          Bem-vindo ao Pokémons Favoritos! Confira a lista de Pokémons abaixo:
        </Text>
        <Link
          to="/list"
          color="blue.500"
          style={{
            textDecorationLine: 'underline',
          }}
        >
          Ver a lista de Pokémons
        </Link>
      </Box>
    </Container>
  )
}

export default HomeScreen
