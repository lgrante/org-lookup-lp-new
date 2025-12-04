import { Box, HStack, VStack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiGithub } from 'react-icons/fi'

const GitLabIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
)

const ExternalCodeScanPreview = () => {
  return (
    <Box
      bg="white"
      borderRadius="16px"
      boxShadow="0 8px 32px rgba(0,0,0,0.12)"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      w="400px"
      h="380px"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box bg="var(--color-primary)" px={5} py={3}>
        <Text color="white" fontSize="md" fontWeight="bold">
          External Dependencies
        </Text>
      </Box>

      {/* Visual Area */}
      <Box position="relative" flex={1} bg="gray.50" p={6}>
        <HStack justify="space-between" align="center" h="100%">
          {/* External Sources */}
          <VStack spacing={4}>
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                bg="#24292e"
                color="white"
                p={4}
                borderRadius="12px"
                boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                textAlign="center"
              >
                <FiGithub size={24} />
                <Text fontSize="xs" mt={1} fontWeight="medium">GitHub</Text>
              </Box>
            </motion.div>
            
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box
                bg="#fc6d26"
                color="white"
                p={4}
                borderRadius="12px"
                boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                textAlign="center"
              >
                <GitLabIcon />
                <Text fontSize="xs" mt={1} fontWeight="medium">GitLab</Text>
              </Box>
            </motion.div>
          </VStack>

          {/* Animated Connections */}
          <Box flex={1} position="relative" h="100%">
            <svg width="100%" height="100%" style={{ position: 'absolute' }}>
              <defs>
                <marker id="arrow-ext" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
                </marker>
              </defs>
              <motion.path
                d="M 20 40 Q 80 40 140 80"
                fill="none"
                stroke="#3b82f6"
                strokeWidth={2}
                markerEnd="url(#arrow-ext)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M 20 130 Q 80 130 140 90"
                fill="none"
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="6,3"
                markerEnd="url(#arrow-ext)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </svg>
          </Box>

          {/* Salesforce */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box
              bg="white"
              border="2px solid"
              borderColor="blue.300"
              p={4}
              borderRadius="12px"
              boxShadow="0 4px 12px rgba(0,0,0,0.1)"
              textAlign="center"
            >
              <Text fontSize="2xl">☁️</Text>
              <Text fontSize="xs" mt={1} fontWeight="medium" color="blue.600">Salesforce</Text>
            </Box>
          </motion.div>
        </HStack>
      </Box>

      {/* Footer */}
      <Box px={5} py={3} bg="orange.50" borderTop="1px solid" borderColor="orange.200">
        <HStack spacing={2}>
          <Text color="orange.500">⚠️</Text>
          <Text fontSize="xs" color="orange.700">2 external references found</Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default ExternalCodeScanPreview

