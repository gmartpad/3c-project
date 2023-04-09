import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface Props {
  onClose: () => void
  isOpen: boolean
  variant: string | undefined
}

const SidebarContent = ({ onClick }: { onClick: () => void }) => {
  const navigate = useNavigate()

  const routes = [
    {
      pageTitle: 'Home',
      path: '/',
    },
    {
      pageTitle: 'Lista',
      path: '/list',
    },
  ]

  return (
    <VStack>
      {routes.map((i, k) => (
        <Button
          key={k}
          onClick={() => {
            onClick()
            navigate(i?.path)
          }}
          w="100%"
        >
          {i?.pageTitle}
        </Button>
      ))}
    </VStack>
  )
}
const Sidebar = ({ isOpen, variant, onClose }: Props) => {
  return variant === 'sidebar' ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="200px"
      top={0}
      h="100%"
      bg="#dfdfdf"
    >
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Meus Pokémons Favoritos</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default Sidebar
