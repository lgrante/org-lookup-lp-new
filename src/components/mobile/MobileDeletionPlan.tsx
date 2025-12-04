import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { 
  FiClock, 
  FiZap, 
  FiSearch, 
  FiGitBranch, 
  FiLink, 
  FiShield, 
  FiFileText,
  FiList,
  FiEye,
  FiCheckCircle
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import LayoutContainer from '../LayoutContainer'
import { fadeIn } from '../../utils/animations'

interface ProcessStep {
  icon: IconType
  text: string
}

const MobileDeletionPlan = () => {
  const manualProcess: ProcessStep[] = [
    { icon: FiSearch, text: "Manually hunt for unused fields" },
    { icon: FiLink, text: "Check references for each field" },
    { icon: FiGitBranch, text: "Search Git repos manually" },
    { icon: FiShield, text: "Design safe deletion order" },
    { icon: FiFileText, text: "Document in spreadsheets" }
  ]

  const orgLookupProcess: ProcessStep[] = [
    { icon: FiList, text: "Get prioritized list of metadata" },
    { icon: FiEye, text: "Visualize dependencies" },
    { icon: FiGitBranch, text: "Auto-detect external references" },
    { icon: FiShield, text: "Build safe deletion queues" },
    { icon: FiCheckCircle, text: "Generate step-by-step plan" }
  ]

  const columnVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <Box as="section" py="60px" bg="#f8f9fa">
      <LayoutContainer>
        <VStack spacing={6} w="full" px={4}>
          {/* Title */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
          >
            <VStack spacing={2} textAlign="center">
              <Heading as="h2" fontSize="xl" color="var(--color-text-primary)">
                Manual vs Automated Cleanup
              </Heading>
            </VStack>
          </motion.div>

          {/* Manual Process Card */}
          <motion.div
            variants={columnVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            <Box
              bg="var(--color-red-50)"
              borderRadius="12px"
              border="2px solid"
              borderColor="var(--color-red-200)"
              p={5}
            >
              <VStack spacing={4} align="stretch">
                {/* Header */}
                <VStack spacing={2} align="center">
                  <HStack justify="center">
                    <FiClock size={20} color="#DC2626" />
                  </HStack>
                  <Heading as="h3" fontSize="lg" color="var(--color-red-600)" textAlign="center">
                    Manual Process
                  </Heading>
                  
                  {/* Progress bar */}
                  <Box w="full" mt={2}>
                    <Box 
                      h="8px" 
                      bg="var(--color-red-200)" 
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        viewport={{ once: false }}
                        style={{
                          height: "100%",
                          background: "var(--color-red-500)",
                          borderRadius: "9999px"
                        }}
                      />
                    </Box>
                    <Text fontSize="xs" mt={1} color="var(--color-red-500)" fontWeight="semibold" textAlign="center">
                      3-12 months of work
                    </Text>
                  </Box>
                </VStack>

                <Divider borderColor="var(--color-red-200)" />

                {/* Steps */}
                <VStack spacing={2} align="stretch">
                  {manualProcess.map((item, index) => (
                    <HStack
                      key={index}
                      spacing={3}
                      align="center"
                      p={2}
                      borderRadius="md"
                    >
                      <Icon 
                        as={item.icon} 
                        color="var(--color-red-500)" 
                        boxSize={4} 
                        flexShrink={0}
                      />
                      <Text 
                        fontSize="sm" 
                        color="var(--color-text-primary)" 
                        lineHeight={1.4}
                        textDecoration="line-through"
                        opacity={0.6}
                      >
                        {item.text}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Box>
          </motion.div>

          {/* VS Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <VStack spacing={2}>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="var(--color-text-secondary)"
              >
                VS
              </Text>
              <Box
                bg="var(--color-success)"
                color="white"
                px={4}
                py={1.5}
                borderRadius="full"
                fontWeight="bold"
                fontSize="sm"
                boxShadow="0 4px 12px rgba(34, 197, 94, 0.3)"
              >
                Save months
              </Box>
            </VStack>
          </motion.div>

          {/* OrgLookup Process Card */}
          <motion.div
            variants={columnVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            <Box
              bg="var(--color-green-50)"
              borderRadius="12px"
              border="2px solid"
              borderColor="var(--color-green-200)"
              p={5}
            >
              <VStack spacing={4} align="stretch">
                {/* Header */}
                <VStack spacing={2} align="center">
                  <HStack justify="center">
                    <FiZap size={20} color="#059669" />
                  </HStack>
                  <Heading as="h3" fontSize="lg" color="var(--color-green-600)" textAlign="center">
                    OrgLookup Process
                  </Heading>
                  
                  {/* Progress bar */}
                  <Box w="full" mt={2}>
                    <Box 
                      h="8px" 
                      bg="var(--color-green-200)" 
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "2%" }}
                        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                        viewport={{ once: false }}
                        style={{
                          height: "100%",
                          background: "var(--color-green-500)",
                          borderRadius: "9999px",
                          minWidth: "8px"
                        }}
                      />
                    </Box>
                    <Text fontSize="xs" mt={1} color="var(--color-green-500)" fontWeight="semibold" textAlign="center">
                      ~1 week
                    </Text>
                  </Box>
                </VStack>

                <Divider borderColor="var(--color-green-200)" />

                {/* Steps */}
                <VStack spacing={2} align="stretch">
                  {orgLookupProcess.map((item, index) => (
                    <HStack
                      key={index}
                      spacing={3}
                      align="center"
                      p={2}
                      borderRadius="md"
                    >
                      <Icon 
                        as={item.icon} 
                        color="var(--color-green-500)" 
                        boxSize={4} 
                        flexShrink={0}
                      />
                      <Text 
                        fontSize="sm" 
                        color="var(--color-text-primary)" 
                        lineHeight={1.4}
                      >
                        {item.text}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Box>
          </motion.div>
        </VStack>
      </LayoutContainer>
    </Box>
  )
}

export default MobileDeletionPlan

