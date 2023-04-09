import { Box, Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function HomeScreen() {
  return (
    <Container
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="2xl">
        My Favorite Pokemon
      </Heading>
      <Box display="flex" flexDirection="column" alignItems="center">
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
