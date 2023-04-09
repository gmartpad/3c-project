import { Box, Center, IconButton, Text, Flex } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useLocation } from 'react-router-dom'

interface Props {
  onShowSidebar: () => void
  showSidebarButton?: boolean
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  const location = useLocation()

  const handlePageName = (pathname: string) => {
    switch (pathname) {
      case '/list':
        return 'Lista'
      case '/':
        return 'Home'
      default:
        return 'Page'
    }
  }

  return (
    <Flex
      zIndex={10}
      width="100%"
      position="fixed"
      boxShadow="lg"
      p={4}
      bg="white"
      color="black"
      justifyContent="center"
    >
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            aria-label="show-sidebar-button"
            icon={<GiHamburgerMenu />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Center flex="1" h="40px">
        <Text fontSize="xl">{handlePageName(location.pathname)}</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  )
}

export default Header
