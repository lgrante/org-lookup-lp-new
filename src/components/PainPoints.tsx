import { Heading, Text, VStack, HStack, SimpleGrid, Card, CardBody, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiDatabase, FiGitBranch, FiEyeOff, FiExternalLink, FiClock } from 'react-icons/fi'
import MotionSection from './MotionSection'
import LayoutContainer from './LayoutContainer'

const PainPoints = () => {
  const painPoints = [
    {
      title: "Hundreds of fields",
      description: "nobody knows what's safe to remove",
      icon: FiDatabase,
      bgColor: "red.50",
      iconColor: "red.500"
    },
    {
      title: "Overlapping automation",
      description: "Workflow Rules, Flows, Apex all conflict",
      icon: FiGitBranch,
      bgColor: "orange.50",
      iconColor: "orange.500"
    },
    {
      title: "Invisible dependencies",
      description: "simple changes break production",
      icon: FiEyeOff,
      bgColor: "yellow.50",
      iconColor: "yellow.600"
    },
    {
      title: "External references",
      description: "Git repos still use 'unused' fields",
      icon: FiExternalLink,
      bgColor: "blue.50",
      iconColor: "blue.500"
    },
    {
      title: "No time to clean",
      description: "impact impossible to quantify",
      icon: FiClock,
      bgColor: "purple.50",
      iconColor: "purple.500"
    }
  ]

  return (
    <MotionSection 
      as="section" 
      py="150px"
      backgroundColor="white"
    >
      <LayoutContainer>
        <VStack spacing={16} maxW="1200px" mx="auto">
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="3xl" color="var(--color-text-primary)">
              The Reality Salesforce Admins Talk About Every Day
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  bg={point.bgColor}
                  border="1px solid"
                  borderColor="var(--color-gray-200)"
                  borderRadius="12px"
                  boxShadow="lg"
                  _hover={{
                    borderColor: 'primary.300',
                    boxShadow: 'lg',
                    transform: 'scale(1.02)',
                    transition: 'all 0.2s',
                    cursor: "pointer"
                  }}
                  transition="all 0.2s"
                  h="full"
                >
                  <CardBody p={6}>
                    <VStack spacing={4} align="stretch" h="full">
                      <HStack spacing={3} align="center">
                        <Icon
                          as={point.icon}
                          w={8}
                          h={8}
                          color={point.iconColor}
                        />
                        <Heading as="h3" size="md" color="var(--color-text-primary)" fontWeight="bold">
                          {point.title}
                        </Heading>
                      </HStack>
                      <Text color="var(--color-text-secondary)" lineHeight={1.5} flex={1}>
                        {point.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </VStack>
      </LayoutContainer>
    </MotionSection>
  )
}

export default PainPoints
