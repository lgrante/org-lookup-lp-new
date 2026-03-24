import { Box, Container, Text, SimpleGrid, VStack, HStack, Link, Icon, Flex } from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <Box as="footer" bg="gray.900" pt={20} pb={10} borderTop="1px solid" borderColor="whiteAlpha.100">
      <Container maxW="1200px">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={12} mb={16}>
          {/* Brand & Slogan */}
          <GridCol colSpan={{ base: 1, lg: 2 }}>
            <VStack spacing={6} align="flex-start">
              <Text fontSize="2xl" fontWeight="black" color="white" fontFamily="'Clash Display', sans-serif" letterSpacing="tight">
                OrgLookup
              </Text>
              <Text color="gray.400" fontSize="md" maxW="300px" lineHeight={1.6}>
                The first Agentic Governance Engine. Clean, secure, and prepare your Salesforce org for the AI revolution. 
              </Text>
              <HStack spacing={4} pt={4}>
                <SocialLink icon={FaTwitter} href="#" />
                <SocialLink icon={FaGithub} href="#" />
                <SocialLink icon={FaLinkedin} href="https://www.linkedin.com/company/orglookup" />
              </HStack>
              <Text fontSize="sm" color="gray.600" pt={4} fontStyle="italic">
                Backed by <strong>PyratzLabs</strong>
              </Text>
            </VStack>
          </GridCol>

          {/* Links Columns */}
          <GridCol>
            <FooterList 
              title="Product" 
              links={['Metadata Scanner', 'Dependency Graph', 'Agentforce Audit', 'Safe Execution', 'Changelog']} 
            />
          </GridCol>

          <GridCol>
            <FooterList 
              title="Resources" 
              links={['Documentation', 'API Reference', 'Community', 'Salesforce Guides']} 
            />
          </GridCol>

          <GridCol>
            <FooterList 
              title="Legal" 
              links={['Privacy Policy', 'Terms of Service', 'Security', 'Trust Center']} 
            />
          </GridCol>
        </SimpleGrid>

        {/* Bottom Bar */}
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          justify="space-between" 
          align="center" 
          pt={8} 
          borderTop="1px solid" 
          borderColor="whiteAlpha.100"
          gap={4}
        >
          <Text color="gray.500" fontSize="sm">
            © {new Date().getFullYear()} OrgLookup. All rights reserved.
          </Text>
          

        </Flex>
      </Container>
    </Box>
  )
}

const GridCol = ({ children, colSpan = 1 }: { children: React.ReactNode, colSpan?: any }) => (
  <Box gridColumn={{ base: 'auto', lg: `span ${colSpan}` }}>
    {children}
  </Box>
)

const FooterList = ({ title, links }: { title: string, links: string[] }) => (
  <VStack align="flex-start" spacing={4}>
    <Text color="white" fontWeight="bold" fontSize="md">
      {title}
    </Text>
    <VStack align="flex-start" spacing={3}>
      {links.map((link, idx) => (
        <Link 
          key={idx} 
          href="#" 
          color="gray.400" 
          fontSize="sm" 
          _hover={{ color: '#e768e6', textDecoration: 'none' }}
          transition="color 0.2s"
        >
          {link}
        </Link>
      ))}
    </VStack>
  </VStack>
)

const SocialLink = ({ icon, href }: { icon: any, href: string }) => (
  <Link href={href} isExternal>
    <Box 
      p={2} 
      borderRadius="md" 
      bg="whiteAlpha.50" 
      color="gray.400"
      transition="all 0.2s"
      _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
    >
      <Icon as={icon} w={5} h={5} />
    </Box>
  </Link>
)

export default Footer
