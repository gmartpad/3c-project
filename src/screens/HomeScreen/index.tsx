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
        My Favorite Pokemon
      </Heading>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Text fontSize="xl" mb={4} marginInline="8" textAlign="center">
          Welcome to My Awesome App! Check out our list of Pokemons below:
        </Text>
        <Link
          to="/list"
          color="blue.500"
          style={{
            textDecorationLine: 'underline',
          }}
        >
          View Pokemons List
        </Link>
      </Box>
    </Container>
  )
}

export default HomeScreen
