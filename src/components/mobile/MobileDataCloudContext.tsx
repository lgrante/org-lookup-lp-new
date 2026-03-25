import { Box, VStack, Heading, Text, Icon, HStack } from '@chakra-ui/react'
import { Database, Layers } from 'lucide-react'
import MotionSection from '../MotionSection'
import LayoutContainer from '../LayoutContainer'

const MobileDataCloudContext = () => {
  return (
    <MotionSection as="section" py={{ base: "60px", md: "80px" }} backgroundColor="white" position="relative">
      <LayoutContainer>
        <VStack spacing={8} w="full" px={4}>
          
          <VStack spacing={4} textAlign="center">
            <Badge />
            <Heading as="h2" fontSize="2xl" color="var(--color-text-primary)">
              The Two Pillars of Agentforce
            </Heading>
            <Text color="var(--color-text-secondary)" fontSize="md" maxW="800px">
              Data Cloud gives your AI fuel. But without a clean engine, it will crash.
            </Text>
          </VStack>

          <VStack spacing={4} w="full" align="stretch">
            {/* Pillar 1: Data Cloud */}
            <Box
              bg="gray.50"
              p={6}
              borderRadius="20px"
              border="1px solid"
              borderColor="gray.200"
            >
              <VStack align="flex-start" spacing={4}>
                <HStack align="center" spacing={4}>
                  <Box p={3} borderRadius="full" bg="white" boxShadow="sm">
                    <Icon as={Database} w={5} h={5} color="blue.500" />
                  </Box>
                  <VStack align="flex-start" spacing={0}>
                    <Heading as="h3" fontSize="sm" color="gray.800">
                      1. Data Readiness
                    </Heading>
                    <Text fontSize="md" fontWeight="900" color="blue.500">
                      Data Cloud (The Fuel)
                    </Text>
                  </VStack>
                </HStack>
                <Text color="gray.600" fontSize="sm" lineHeight={1.5}>
                  Unifies customer records. Gives Agentforce the exact profile of who it’s talking to.
                </Text>
              </VStack>
            </Box>

            {/* Plus sign */}
            <Box display="flex" alignItems="center" justifyContent="center" py={2}>
              <Text fontSize="3xl" fontWeight="black" color="gray.300">+</Text>
            </Box>

            {/* Pillar 2: OrgLookup */}
            <Box
              bg="gray.900"
              p={6}
              borderRadius="20px"
              border="1px solid"
              borderColor="whiteAlpha.200"
              boxShadow="xl"
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                inset="-20%"
                bg="radial-gradient(circle at top right, rgba(231,104,230,0.15) 0%, transparent 60%)"
                pointerEvents="none"
              />
              
              <VStack align="flex-start" spacing={4} position="relative" zIndex={1}>
                <HStack align="center" spacing={4}>
                  <Box p={3} borderRadius="full" bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200">
                    <Icon as={Layers} w={5} h={5} color="#e768e6" />
                  </Box>
                  <VStack align="flex-start" spacing={0}>
                    <Heading as="h3" fontSize="sm" color="white">
                      2. Metadata Readiness
                    </Heading>
                    <Text fontSize="md" fontWeight="900" bgGradient="linear(to-r, #e768e6, #ff9b26)" bgClip="text">
                      OrgLookup (The Engine)
                    </Text>
                  </VStack>
                </HStack>
                <Text color="gray.400" fontSize="sm" lineHeight={1.5}>
                  Cleans architecture. Removes dead flows and obsolete fields so the AI doesn't hallucinate.
                </Text>
              </VStack>
            </Box>
          </VStack>

        </VStack>
      </LayoutContainer>
    </MotionSection>
  )
}

const Badge = () => (
  <Box
    px={3}
    py={1}
    bg="gray.100"
    borderRadius="full"
    border="1px solid"
    borderColor="gray.200"
  >
    <Text fontSize="xs" fontWeight="bold" color="gray.600" textTransform="uppercase" letterSpacing="wider">
      The Missing Link
    </Text>
  </Box>
)

export default MobileDataCloudContext
