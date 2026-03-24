import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Zap, Activity, ExternalLink, ShieldCheck } from 'lucide-react';
import LayoutContainer from './LayoutContainer'
import { fadeIn, staggerContainer, staggerItem } from '../utils/animations'

const WhatYouGet = () => {
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
    <Box as="section" py={24} bg="gray.900" position="relative" overflow="hidden">
      {/* Background Hologram Glows */}
      <Box 
        position="absolute"
        top="-10%"
        left="-10%"
        w="400px"
        h="400px"
        bg="#e768e6"
        filter="blur(150px)"
        opacity={0.15}
        borderRadius="full"
      />
      <Box 
        position="absolute"
        bottom="-10%"
        right="-10%"
        w="500px"
        h="500px"
        bg="#ff9b26"
        filter="blur(150px)"
        opacity={0.1}
        borderRadius="full"
      />

      <LayoutContainer>
        <VStack spacing={16} maxW="1200px" mx="auto" position="relative" zIndex={1}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <VStack spacing={5} textAlign="center">
              <Heading as="h2" size="2xl" color="white" fontWeight="bold">
                Platform Capabilities
              </Heading>
              <Text color="gray.400" fontSize="xl" maxW="600px" textAlign="center">
                The first <Box as="span" color="white" fontWeight="bold">Agentic Governance Engine</Box> built exclusively for Salesforce teams.
              </Text>
            </VStack>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            style={{ width: '100%' }}
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={staggerItem} style={{ height: '100%' }}>
                  <Box
                    as={motion.div}
                    bg="whiteAlpha.50"
                    backdropFilter="blur(10px)"
                    borderRadius="20px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    p={8}
                    h="full"
                    position="relative"
                    overflow="hidden"
                    whileHover="hover"
                    initial="initial"
                    transition={{ duration: 0.3 } as any}
                  >
                    {/* Animated Hover Glow */}
                    <motion.div
                      variants={{
                        initial: { opacity: 0, scale: 0.8 },
                        hover: { opacity: 0.15, scale: 1 }
                      }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: 'absolute',
                        top: '-20%',
                        left: '-20%',
                        width: '140%',
                        height: '140%',
                        background: `radial-gradient(circle, ${benefit.glowColor} 0%, transparent 70%)`,
                        zIndex: 0,
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Organic Corner Ambient Light */}
                    <motion.div
                      variants={{
                        initial: { opacity: 0.1, scale: 0.8 },
                        hover: { opacity: 0.35, scale: 1.2 }
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{
                        position: 'absolute',
                        top: '-30px',
                        right: '-30px',
                        width: '120px',
                        height: '120px',
                        background: benefit.glowColor,
                        filter: 'blur(35px)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 0
                      }}
                    />

                    <VStack spacing={6} align="flex-start" position="relative" zIndex={1} h="full">
                      <Box 
                        p={3} 
                        borderRadius="14px" 
                        bg="whiteAlpha.100" 
                        border="1px solid" 
                        borderColor="whiteAlpha.300"
                        boxShadow={`0 0 20px ${benefit.glowColor}20`}
                      >
                        <Icon
                          as={benefit.icon}
                          w={8}
                          h={8}
                          color={benefit.glowColor}
                        />
                      </Box>
                      
                      <VStack spacing={3} align="flex-start" flex={1}>
                        <Heading as="h3" size="md" color="white" fontWeight="bold">
                          {benefit.title}
                        </Heading>
                        <Text color="gray.400" lineHeight={1.6} fontSize="md">
                          {benefit.description}
                        </Text>
                      </VStack>
                    </VStack>
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

export default WhatYouGet
