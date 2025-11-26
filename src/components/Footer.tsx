import { Box, Container, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box as="footer" bg="var(--color-gray-100)" py={8} mt={16}>
      <Container maxW="1200px">
        <Text textAlign="center" color="var(--color-text-secondary)" fontSize="sm">
          © 2025 OrgLookup. All rights reserved.
        </Text>
      </Container>
    </Box>
  )
}

export default Footer
