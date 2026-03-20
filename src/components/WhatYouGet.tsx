import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FiZap,
  FiEye,
  FiPackage
} from 'react-icons/fi'
import LayoutContainer from './LayoutContainer'
import { fadeIn, staggerContainer, staggerItem } from '../utils/animations'

const WhatYouGet = () => {
  const benefits = [
    {
      icon: FiEye,
      title: "Your Agentic Readiness Score",
      description: "know exactly where your org stands — before deploying a single agent"
    },
    {
      icon: FiZap,
      title: "AI agents that actually work",
      description: "no more hallucinations, CPU timeouts, or data leaks from a messy org"
    },
    {
      icon: FiEye,
      title: "Full cross-system visibility",
      description: "a single source of truth across Salesforce, Git repos, and external integrations"
    },
    {
      icon: FiPackage,
      title: "Safe, reversible execution",
      description: "deploy Agentforce-readiness changes with built-in rollback at every step"
    }
  ]

  return (
    <Box as="section" py={20} bg="#f8f9fa">
      <LayoutContainer>
        <VStack spacing={12} maxW="1200px" mx="auto">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" size="2xl" color="var(--color-text-primary)">
                What You Get With OrgLookup
              </Heading>
              <Text color="var(--color-text-secondary)" fontSize="lg" maxW="500px" textAlign="center">
                The first Agentic Governance Platform for Salesforce
              </Text>
            </VStack>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {benefits.map((benefit, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card
                  as={motion.div}
                  bg="white"
                  borderRadius="12px"
                  border="1px solid"
                  borderColor="var(--color-gray-200)"
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  _hover={{
                    borderColor: 'primary.300',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                  h="full"
                >
                <CardBody p={8}>
                  <VStack spacing={4} align="center" textAlign="center">
                    <Icon
                      as={benefit.icon}
                      w={12}
                      h={12}
                      color="var(--color-primary)"
                    />
                    <VStack spacing={3}>
                      <Heading as="h3" size="md" color="var(--color-text-primary)">
                        {benefit.title}
                      </Heading>
                      <Text color="var(--color-text-secondary)" lineHeight={1.6}>
                        {benefit.description}
                      </Text>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
              </motion.div>
            ))}
          </SimpleGrid>
          </motion.div>
        </VStack>
      </LayoutContainer>
    </Box>
  )
}

export default WhatYouGet
