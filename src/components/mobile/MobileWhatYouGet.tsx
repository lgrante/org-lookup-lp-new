import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
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
import LayoutContainer from '../LayoutContainer'
import { fadeIn } from '../../utils/animations'

const MobileWhatYouGet = () => {
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
      description: "deploy cleanup changes effortlessly"
    }
  ]

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  }

  return (
    <Box as="section" py="60px" bg="#f8f9fa">
      <LayoutContainer>
        <VStack spacing={6} px={4}>
          {/* Header */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
          >
            <VStack spacing={2} textAlign="center">
              <Heading as="h2" fontSize="xl" color="var(--color-text-primary)">
                What You Get With OrgLookup
              </Heading>
            </VStack>
          </motion.div>

          {/* Benefits Cards - Stacked */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            <VStack spacing={3} w="full">
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={cardVariant} style={{ width: '100%' }}>
                  <Card
                    bg="white"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="var(--color-gray-200)"
                    boxShadow="sm"
                    w="full"
                    _hover={{
                      borderColor: 'var(--color-primary)',
                      boxShadow: 'md',
                    }}
                    transition="all 0.2s"
                  >
                    <CardBody p={4}>
                      <HStack spacing={4} align="flex-start">
                        {/* Icon */}
                        <Box
                          bg="var(--color-primary)"
                          borderRadius="full"
                          boxSize="40px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                        >
                          <Icon
                            as={benefit.icon}
                            boxSize={5}
                            color="white"
                          />
                        </Box>

                        {/* Content */}
                        <VStack spacing={1} align="flex-start" flex={1}>
                          <Heading as="h3" fontSize="sm" color="var(--color-text-primary)" fontWeight="semibold">
                            {benefit.title}
                          </Heading>
                          <Text color="var(--color-text-secondary)" fontSize="xs" lineHeight={1.4}>
                            {benefit.description}
                          </Text>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </VStack>
          </motion.div>
        </VStack>
      </LayoutContainer>
    </Box>
  )
}

export default MobileWhatYouGet

