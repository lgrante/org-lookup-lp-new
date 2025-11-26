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
      title: "A clear view of your org's technical debt",
      description: "no more surprises"
    },
    {
      icon: FiZap,
      title: "Faster, safer changes",
      description: "less time on impact analysis and troubleshooting"
    },
    {
      icon: FiEye,
      title: "Shared understanding across teams",
      description: "a single source of truth"
    },
    {
      icon: FiPackage,
      title: "Easy redeployment across environments",
      description: "deploy cleanup changes to all your orgs effortlessly"
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
