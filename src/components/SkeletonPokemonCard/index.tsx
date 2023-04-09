import { Skeleton, SkeletonText } from '@chakra-ui/react'
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { AiOutlineStar } from 'react-icons/ai'

function SkeletonPokemonCard() {
  return (
    <Card
      maxW="397px"
      maxH="552px"
      height="552px"
      width="100%"
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
        <Skeleton height="357px" width="100%" />
        <Stack>
          <SkeletonText my="14px" noOfLines={1} width="50%" />
          <SkeletonText my="14px" noOfLines={1} width="20%" />
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            leftIcon={<BsFillInfoCircleFill />}
            backgroundColor="#3c5aa6"
            color="#fff"
          >
            <Skeleton height="20px" width="50px" />
          </Button>
          <Button
            display="flex"
            justifyContent="space-between"
            backgroundColor="#ffcb05"
          >
            <AiOutlineStar />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default SkeletonPokemonCard
