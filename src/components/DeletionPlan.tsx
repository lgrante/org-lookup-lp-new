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
import LayoutContainer from './LayoutContainer'
import { fadeIn } from '../utils/animations'

interface ProcessStep {
  icon: LucideIcon
  text: string
}

const DeletionPlan = () => {
  const [isAgentic, setIsAgentic] = useState(false)

  const manualProcess: ProcessStep[] = [
    { icon: Search, text: "Manually hunt for unused or ambiguous metadata that could cause AI agent hallucinations" },
    { icon: Link, text: "Audit automation paths one by one to spot CPU bottlenecks before they crash Agentforce" },
    { icon: Shield, text: "Review permission sets manually to prevent over-privileged AI agents from leaking data" },
    { icon: GitBranch, text: "Search Git repos and external apps for legacy references and undocumented integrations" },
    { icon: FileText, text: "Document everything in spreadsheets — no rollback if something breaks" }
  ]

  const orgLookupProcess: ProcessStep[] = [
    { icon: List, text: "Get your Agentic Readiness Score instantly — know what's blocking Agentforce deployment" },
    { icon: Eye, text: "Visualize the full dependency graph: metadata, automation, security & integration debt in one view" },
    { icon: GitBranch, text: "Auto-detect external references in GitHub/GitLab/Bitbucket and connected systems" },
    { icon: Shield, text: "AI suggests logical cleanup packs — no one-by-one selection, grouped by project or risk" },
    { icon: CheckCircle, text: "Execute with built-in rollback: snapshot before every step, restore anything instantly" }
  ]

  return (
    <Box as="section" py={24} bg={isAgentic ? "gray.900" : "#f8f9fa"} transition="background-color 0.5s ease">
      <LayoutContainer>
        <VStack spacing={16} w="full" mx="auto" maxW="1000px">
          {/* Header & Toggle */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            style={{ width: '100%' }}
          >
            <VStack spacing={10} textAlign="center">
              <Heading 
                as="h2" 
                size="3xl" 
                color={isAgentic ? "white" : "var(--color-text-primary)"}
                transition="color 0.5s ease"
              >
                Governance for the AI Era
              </Heading>
              
              {/* Premium Toggle Switch */}
              <Box 
                p={2} 
                bg={isAgentic ? "whiteAlpha.200" : "gray.200"} 
                borderRadius="full"
                position="relative"
                display="flex"
                boxShadow={isAgentic ? "0 0 40px rgba(231, 104, 230, 0.2)" : "inner"}
                transition="all 0.5s ease"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    position: "absolute",
                    top: "8px",
                    bottom: "8px",
                    left: isAgentic ? "50%" : "8px",
                    width: "calc(50% - 8px)",
                    background: isAgentic ? "linear-gradient(135deg, #e768e6, #ff9b26)" : "white",
                    borderRadius: "999px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    zIndex: 0
                  }}
                />
                
                <Button
                  flex={1}
                  variant="unstyled"
                  px={8}
                  py={4}
                  h="auto"
                  zIndex={1}
                  color={isAgentic ? "whiteAlpha.700" : "gray.800"}
                  fontWeight="bold"
                  fontSize="lg"
                  onClick={() => setIsAgentic(false)}
                  _focus={{ outline: "none" }}
                >
                  The Manual Way
                </Button>
                
                <Button
                  flex={1}
                  variant="unstyled"
                  px={8}
                  py={4}
                  h="auto"
                  zIndex={1}
                  color={isAgentic ? "white" : "gray.500"}
                  fontWeight="bold"
                  fontSize="lg"
                  onClick={() => setIsAgentic(true)}
                  _focus={{ outline: "none" }}
                >
                  The Agentic Way
                </Button>
              </Box>
            </VStack>
          </motion.div>

          {/* Content Area */}
          <Box w="full" position="relative" minH="500px">
            <AnimatePresence mode="wait">
              {!isAgentic ? (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Box
                    bg="white"
                    borderRadius="24px"
                    border="2px solid"
                    borderColor="red.100"
                    p={10}
                    boxShadow="xl"
                  >
                    <VStack spacing={8} align="stretch">
                      <HStack justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.100" pb={6}>
                        <HStack spacing={4}>
                          <Box p={3} bg="red.50" borderRadius="xl">
                            <Clock size={28} color="#DC2626" />
                          </Box>
                          <VStack align="flex-start" spacing={0}>
                            <Heading size="lg" color="gray.800">Legacy Audit</Heading>
                            <Text color="red.500" fontWeight="bold">3-12 months of manual work</Text>
                          </VStack>
                        </HStack>
                      </HStack>

                      <VStack spacing={5} align="stretch" py={4}>
                        {manualProcess.map((item, index) => (
                          <HStack
                            key={index}
                            spacing={5}
                            p={4}
                            borderRadius="lg"
                            bg="gray.50"
                            border="1px solid"
                            borderColor="gray.100"
                            opacity={0.8}
                          >
                            <Icon as={item.icon} color="gray.500" boxSize={6} />
                            <Text fontSize="lg" color="gray.600" lineHeight={1.6} dangerouslySetInnerHTML={{ __html: item.text }} />
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="agentic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Box
                    bg="gray.800"
                    borderRadius="24px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    p={10}
                    boxShadow="0 20px 50px rgba(0,0,0,0.5)"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Glowing effect inside card */}
                    <Box 
                      position="absolute"
                      top="-20%"
                      right="-10%"
                      w="300px"
                      h="300px"
                      bg="#e768e6"
                      filter="blur(150px)"
                      opacity={0.15}
                      borderRadius="full"
                    />

                    <VStack spacing={8} align="stretch" position="relative" zIndex={1}>
                      <HStack justify="space-between" align="center" borderBottom="1px solid" borderColor="whiteAlpha.100" pb={6}>
                        <HStack spacing={4}>
                          <Box p={3} bg="whiteAlpha.100" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
                            <Zap size={28} color="#ff9b26" />
                          </Box>
                          <VStack align="flex-start" spacing={0}>
                            <Heading size="lg" color="white">OrgLookup Platform</Heading>
                            <Text bgGradient="linear(to-r, #e768e6, #ff9b26)" bgClip="text" fontWeight="bold">Ready in ~1 week</Text>
                          </VStack>
                        </HStack>
                      </HStack>

                      <VStack spacing={5} align="stretch" py={4}>
                        {orgLookupProcess.map((item, index) => (
                          <HStack
                            key={index}
                            spacing={5}
                            p={4}
                            borderRadius="lg"
                            bg="whiteAlpha.50"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                            _hover={{ bg: 'whiteAlpha.100', borderColor: 'whiteAlpha.300', transform: 'translateX(5px)' }}
                            transition="all 0.3s ease"
                          >
                            <Icon as={item.icon} color="#e768e6" boxSize={6} />
                            <Text fontSize="lg" color="gray.300" lineHeight={1.6} dangerouslySetInnerHTML={{ __html: item.text }} />
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

export default DeletionPlan
