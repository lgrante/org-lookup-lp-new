import { Box, VStack, Heading, Text, Icon, Flex } from '@chakra-ui/react'
import { Database, Layers } from 'lucide-react'
import MotionSection from './MotionSection'
import LayoutContainer from './LayoutContainer'

const DataCloudContext = () => {
  return (
    <MotionSection as="section" py={{ base: "60px", md: "100px" }} backgroundColor="white" position="relative">
      <LayoutContainer>
        <VStack spacing={12} maxW="1200px" mx="auto" w="full" px={{ base: 4, md: 8 }}>
          
          <VStack spacing={4} textAlign="center">
            <Badge />
            <Heading as="h2" size="2xl" color="var(--color-text-primary)">
              The Two Pillars of Agentforce
            </Heading>
            <Text color="var(--color-text-secondary)" fontSize="xl" maxW="800px">
              Data Cloud gives your AI fuel. But without a clean engine, it will crash.
            </Text>
          </VStack>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            w="full"
            gap={8}
            justify="center"
          >
            {/* Pillar 1: Data Cloud */}
            <Box
              flex={1}
              bg="gray.50"
              p={10}
              borderRadius="24px"
              border="1px solid"
              borderColor="gray.200"
              position="relative"
            >
              <VStack align="flex-start" spacing={5}>
                <Box p={4} borderRadius="full" bg="white" boxShadow="sm">
                  <Icon as={Database} w={6} h={6} color="blue.500" />
                </Box>
                <VStack align="flex-start" spacing={2}>
                  <Heading as="h3" size="lg" color="gray.800">
                    Pillar 1: Data Readiness
                  </Heading>
                  <Text fontSize="xl" fontWeight="900" color="blue.500">
                    Data Cloud (The Fuel)
                  </Text>
                </VStack>
                <Text color="gray.600" fontSize="lg" lineHeight={1.6}>
                  Unifies your customer records across CRM, ERP, and Marketing. Gives Agentforce the exact profile of who it’s talking to.
                </Text>
              </VStack>
            </Box>

            {/* Plus sign */}
            <Box display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="4xl" fontWeight="black" color="gray.300">+</Text>
            </Box>

            {/* Pillar 2: OrgLookup */}
            <Box
              flex={1}
              bg="gray.900"
              p={10}
              borderRadius="24px"
              border="1px solid"
              borderColor="whiteAlpha.200"
              boxShadow="xl"
              position="relative"
              overflow="hidden"
            >
              {/* Subtle glow */}
              <Box
                position="absolute"
                inset="-20%"
                bg="radial-gradient(circle at top right, rgba(231,104,230,0.1) 0%, transparent 60%)"
                pointerEvents="none"
              />
              
              <VStack align="flex-start" spacing={5} position="relative" zIndex={1}>
                <Box p={4} borderRadius="full" bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200">
                  <Icon as={Layers} w={6} h={6} color="#e768e6" />
                </Box>
                <VStack align="flex-start" spacing={2}>
                  <Heading as="h3" size="lg" color="white">
                    Pillar 2: Metadata Readiness
                  </Heading>
                  <Text fontSize="xl" fontWeight="900" bgGradient="linear(to-r, #e768e6, #ff9b26)" bgClip="text">
                    OrgLookup (The Engine)
                  </Text>
                </VStack>
                <Text color="gray.400" fontSize="lg" lineHeight={1.6}>
                  Cleans your underlying architecture. Removes dead flows, overlapping permissions, and obsolete fields so the AI doesn't hallucinate.
                </Text>
              </VStack>
            </Box>
          </Flex>

        </VStack>
      </LayoutContainer>
    </MotionSection>
  )
}

const Badge = () => (
  <Box
    px={4}
    py={1.5}
    bg="gray.100"
    borderRadius="full"
    border="1px solid"
    borderColor="gray.200"
    mb={2}
  >
    <Text fontSize="sm" fontWeight="bold" color="gray.600" textTransform="uppercase" letterSpacing="wider">
      The Missing Link
    </Text>
  </Box>
)

export default DataCloudContext
