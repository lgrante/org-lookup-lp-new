import { Box, Text, VStack, HStack, Image } from '@chakra-ui/react'

const MobileFooter = () => {
  return (
    <Box as="footer" bg="var(--color-gray-100)" py={6} mt={8}>
      <VStack spacing={4} px={4}>
        {/* Logo */}
        <HStack spacing={2}>
          <Image
            src="./favicon.ico"
            alt="OrgLookup Logo"
            w="24px"
            h="24px"
          />
          <Text
            fontSize="sm"
            fontWeight="bold"
            fontFamily="'Vend Sans', sans-serif"
            color="var(--color-text-primary)"
          >
            Orglookup
          </Text>
        </HStack>

        {/* Copyright */}
        <Text textAlign="center" color="var(--color-text-secondary)" fontSize="xs">
          © 2025 OrgLookup. All rights reserved.
        </Text>
      </VStack>
    </Box>
  )
}

export default MobileFooter

