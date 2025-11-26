import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react'

const LayoutContainer = (props: ContainerProps) => {
  return (
    <ChakraContainer
      maxW="1200px"
      px={{ base: 4, md: 8 }}
      {...props}
    />
  )
}

export default LayoutContainer
