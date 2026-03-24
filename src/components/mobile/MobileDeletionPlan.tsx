import { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Zap, Search, GitBranch, Link, Shield, FileText, List, Eye, CheckCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react'
import LayoutContainer from '../LayoutContainer'
import { fadeIn } from '../../utils/animations'

interface ProcessStep {
  icon: LucideIcon
  text: string
}

const MobileDeletionPlan = () => {
  const [isAgentic, setIsAgentic] = useState(false)

  const manualProcess: ProcessStep[] = [
    { icon: Search, text: "Manually hunt for AI-hallucination risks" },
    { icon: Link, text: "Check field references one by one" },
    { icon: Shield, text: "Cross-check permissions for AI leak" },
    { icon: GitBranch, text: "Search Git repos for dependencies" },
    { icon: FileText, text: "Document findings in spreadsheets" }
  ]

  const orgLookupProcess: ProcessStep[] = [
    { icon: List, text: "Get your Agentic Readiness Score" },
    { icon: Eye, text: "Visualize the full dependency graph" },
    { icon: GitBranch, text: "Sentinel active monitoring (no Shield)" },
    { icon: Shield, text: "Cluster items into Smart Cleanup Packs" },
    { icon: CheckCircle, text: "Generate surgical deletion plans" }
  ]

  return (
    <Box as="section" py={16} bg={isAgentic ? "gray.900" : "#f8f9fa"} transition="background-color 0.5s ease">
      <LayoutContainer>
        <VStack spacing={8} w="full" px={4} mx="auto">
          {/* Header & Toggle */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            style={{ width: '100%' }}
          >
            <VStack spacing={6} textAlign="center">
              <Heading 
                as="h2" 
                fontSize="2xl" 
                color={isAgentic ? "white" : "var(--color-text-primary)"}
                transition="color 0.5s ease"
              >
                Governance for the AI Era
              </Heading>
              
              {/* Premium Toggle Switch - Mobile Optimized */}
              <Box 
                p={1.5} 
                bg={isAgentic ? "whiteAlpha.200" : "gray.200"} 
                borderRadius="full"
                position="relative"
                display="flex"
                w="full"
                boxShadow={isAgentic ? "0 0 30px rgba(231, 104, 230, 0.2)" : "inner"}
                transition="all 0.5s ease"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    position: "absolute",
                    top: "6px",
                    bottom: "6px",
                    left: isAgentic ? "50%" : "6px",
                    width: "calc(50% - 6px)",
                    background: isAgentic ? "linear-gradient(135deg, #e768e6, #ff9b26)" : "white",
                    borderRadius: "999px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    zIndex: 0
                  }}
                />
                
                <Button
                  flex={1}
                  variant="unstyled"
                  px={2}
                  py={3}
                  h="auto"
                  zIndex={1}
                  color={isAgentic ? "whiteAlpha.700" : "gray.800"}
                  fontWeight="bold"
                  fontSize="sm"
                  onClick={() => setIsAgentic(false)}
                  _focus={{ outline: "none" }}
                >
                  Manual Way
                </Button>
                
                <Button
                  flex={1}
                  variant="unstyled"
                  px={2}
                  py={3}
                  h="auto"
                  zIndex={1}
                  color={isAgentic ? "white" : "gray.500"}
                  fontWeight="bold"
                  fontSize="sm"
                  onClick={() => setIsAgentic(true)}
                  _focus={{ outline: "none" }}
                >
                  Agentic Way
                </Button>
              </Box>
            </VStack>
          </motion.div>

          {/* Content Area */}
          <Box w="full" position="relative" minH="450px">
            <AnimatePresence mode="wait">
              {!isAgentic ? (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    bg="white"
                    borderRadius="20px"
                    border="2px solid"
                    borderColor="red.100"
                    p={6}
                    boxShadow="md"
                  >
                    <VStack spacing={6} align="stretch">
                      <VStack align="center" spacing={2} borderBottom="1px solid" borderColor="gray.100" pb={4}>
                        <Box p={3} bg="red.50" borderRadius="xl">
                          <Clock size={24} color="#DC2626" />
                        </Box>
                        <Heading size="md" color="gray.800">Legacy Audit</Heading>
                        <Text color="red.500" fontWeight="bold" fontSize="sm">3-12 months of manual work</Text>
                      </VStack>

                      <VStack spacing={3} align="stretch" py={2}>
                        {manualProcess.map((item, index) => (
                          <HStack
                            key={index}
                            spacing={4}
                            p={3}
                            borderRadius="lg"
                            bg="gray.50"
                            border="1px solid"
                            borderColor="gray.100"
                          >
                            <Icon as={item.icon} color="gray.500" boxSize={5} />
                            <Text fontSize="sm" color="gray.600" lineHeight={1.4}>
                              {item.text}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="agentic"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    bg="gray.800"
                    borderRadius="20px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    p={6}
                    boxShadow="0 10px 40px rgba(0,0,0,0.5)"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Glowing effect inside card */}
                    <Box 
                      position="absolute"
                      top="-20%"
                      right="-10%"
                      w="200px"
                      h="200px"
                      bg="#e768e6"
                      filter="blur(100px)"
                      opacity={0.15}
                      borderRadius="full"
                    />

                    <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
                      <VStack align="center" spacing={2} borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4}>
                        <Box p={3} bg="whiteAlpha.100" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
                          <Zap size={24} color="#ff9b26" />
                        </Box>
                        <Heading size="md" color="white">OrgLookup Platform</Heading>
                        <Text bgGradient="linear(to-r, #e768e6, #ff9b26)" bgClip="text" fontWeight="bold" fontSize="sm">Ready in ~1 week</Text>
                      </VStack>

                      <VStack spacing={3} align="stretch" py={2}>
                        {orgLookupProcess.map((item, index) => (
                          <HStack
                            key={index}
                            spacing={4}
                            p={3}
                            borderRadius="lg"
                            bg="whiteAlpha.50"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                          >
                            <Icon as={item.icon} color="#e768e6" boxSize={5} />
                            <Text fontSize="sm" color="gray.300" lineHeight={1.4}>
                              {item.text}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </VStack>
      </LayoutContainer>
    </Box>
  )
}

export default MobileDeletionPlan
