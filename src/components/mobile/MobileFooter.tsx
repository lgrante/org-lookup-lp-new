import { Box, Container, Text, VStack, HStack, Link, Icon, SimpleGrid, Flex } from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const MobileFooter = () => {
  return (
    <Box as="footer" bg="gray.900" pt={16} pb={10} borderTop="1px solid" borderColor="whiteAlpha.100">
      <Container maxW="1200px">
        <VStack spacing={12} align="center" textAlign="center">
          {/* Brand */}
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="black" color="white" fontFamily="'Clash Display', sans-serif" letterSpacing="tight">
              OrgLookup
            </Text>
            <Text color="gray.400" fontSize="sm" maxW="280px" lineHeight={1.6}>
              The first Agentic Governance Engine. Clean, secure, and prepare your Salesforce org for the AI revolution. 
            </Text>
            <HStack spacing={4} pt={2}>
              <SocialLink icon={FaTwitter} href="#" />
              <SocialLink icon={FaGithub} href="#" />
              <SocialLink icon={FaLinkedin} href="https://www.linkedin.com/company/orglookup" />
            </HStack>
          </VStack>

          {/* Simple Links Grid */}
          <SimpleGrid columns={2} spacing={8} w="full">
            <VStack align="center" spacing={4}>
              <Text color="white" fontWeight="bold" fontSize="md">Product</Text>
              <Link color="gray.400" fontSize="sm">Scanner</Link>
              <Link color="gray.400" fontSize="sm">Audit</Link>
              <Link color="gray.400" fontSize="sm">Changelog</Link>
            </VStack>
            <VStack align="center" spacing={4}>
              <Text color="white" fontWeight="bold" fontSize="md">Legal</Text>
              <Link color="gray.400" fontSize="sm">Privacy</Link>
              <Link color="gray.400" fontSize="sm">Terms</Link>
              <Link color="gray.400" fontSize="sm">Security</Link>
            </VStack>
          </SimpleGrid>

          {/* Bottom Bar */}
          <Flex 
            direction="column" 
            align="center" 
            pt={8} 
            borderTop="1px solid" 
            borderColor="whiteAlpha.100"
            w="full"
            gap={4}
          >
            <Text color="gray.500" fontSize="xs">
              © {new Date().getFullYear()} OrgLookup. All rights reserved.
            </Text>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

const SocialLink = ({ icon, href }: { icon: any, href: string }) => (
  <Link href={href} isExternal>
    <Box 
      p={2.5} 
      borderRadius="md" 
      bg="whiteAlpha.50" 
      color="gray.400"
      _active={{ bg: 'whiteAlpha.100', color: 'white' }}
    >
      <Icon as={icon} w={5} h={5} />
    </Box>
  </Link>
)

export default MobileFooter

