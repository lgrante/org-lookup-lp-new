import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Zap, Activity, ExternalLink, ShieldCheck } from 'lucide-react';
import LayoutContainer from '../LayoutContainer'
import { fadeIn, staggerContainer, staggerItem } from '../../utils/animations'

const MobileWhatYouGet = () => {
  const benefits = [
    {
      icon: Activity,
      title: "Your Agentic Readiness Score",
      description: "Know exactly where your org stands — before deploying a single AI agent.",
      glowColor: "#e768e6"
    },
    {
      icon: Zap,
      title: "Agents That Actually Work",
      description: "No more hallucinations, CPU timeouts, or data leaks from a messy org architecture.",
      glowColor: "#ff9b26"
    },
    {
      icon: ExternalLink,
      title: "Full Cross-System Visibility",
      description: "A single source of truth spanning Salesforce, Git repositories, and middlewares.",
      glowColor: "#22c55e"
    },
    {
      icon: ShieldCheck,
      title: "Safe, Reversible Execution",
      description: "Deploy Agentforce-readiness changes with built-in instant rollback at every step.",
      glowColor: "#3b82f6"
    }
  ]

  return (
    <Box as="section" py="80px" bg="gray.900" position="relative" overflow="hidden">
      {/* Background Hologram Glows */}
      <Box 
        position="absolute"
        top="-5%"
        left="-10%"
        w="250px"
        h="250px"
        bg="#e768e6"
        filter="blur(100px)"
        opacity={0.15}
        borderRadius="full"
      />
      <Box 
        position="absolute"
        bottom="-5%"
        right="-10%"
        w="300px"
        h="300px"
        bg="#ff9b26"
        filter="blur(100px)"
        opacity={0.1}
        borderRadius="full"
      />

      <LayoutContainer>
        <VStack spacing={12} px={4} position="relative" zIndex={1}>
          {/* Header */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <VStack spacing={3} textAlign="center">
              <Heading as="h2" fontSize="2xl" color="white" fontWeight="bold">
                Platform Capabilities
              </Heading>
              <Text color="gray.400" fontSize="md" textAlign="center" maxW="300px">
                Built exclusively for Salesforce teams.
              </Text>
            </VStack>
          </motion.div>

          {/* Benefits Cards - Dynamic Grid/Stack */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            <SimpleGrid columns={1} spacing={4} w="full">
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={staggerItem} style={{ width: '100%' }}>
                  <Box
                    bg="whiteAlpha.50"
                    backdropFilter="blur(10px)"
                    borderRadius="20px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    p={5}
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Ambient Glow */}
                    <Box
                      position="absolute"
                      top="-20px"
                      right="-20px"
                      width="80px"
                      height="80px"
                      background={benefit.glowColor}
                      filter="blur(30px)"
                      opacity={0.2}
                      borderRadius="full"
                    />

                    <HStack spacing={5} align="flex-start" position="relative" zIndex={1}>
                      {/* Icon */}
                      <Box
                        p={2.5}
                        borderRadius="12px"
                        bg="whiteAlpha.100"
                        border="1px solid"
                        borderColor="whiteAlpha.300"
                        boxShadow={`0 0 15px ${benefit.glowColor}15`}
                        flexShrink={0}
                      >
                        <Icon
                          as={benefit.icon}
                          boxSize={6}
                          color={benefit.glowColor}
                        />
                      </Box>

                      {/* Content */}
                      <VStack spacing={1.5} align="flex-start" flex={1}>
                        <Heading as="h3" fontSize="md" color="white" fontWeight="bold">
                          {benefit.title}
                        </Heading>
                        <Text color="gray.400" fontSize="sm" lineHeight={1.5}>
                          {benefit.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>
        </VStack>
      </LayoutContainer>
    </Box>
  )
}

export default MobileWhatYouGet

