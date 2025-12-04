import { Box, VStack, HStack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const SafeExecutionPreview = () => {
  const tasks = [
    { icon: '🗑️', label: 'Delete AccountCleanupBatch', status: 'approved', color: 'green' },
    { icon: '🔧', label: 'Refactor LeadService refs', status: 'pending', color: 'gray' },
    { icon: '💾', label: 'Backup Opportunity_Flow', status: 'completed', color: 'green' },
    { icon: '📧', label: 'Notify stakeholders', status: 'pending', color: 'gray' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '✅'
      case 'completed': return '✔️'
      case 'pending': return '⏳'
      default: return '○'
    }
  }

  return (
    <Box
      bg="white"
      borderRadius="16px"
      boxShadow="0 8px 32px rgba(0,0,0,0.12)"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      w="600px"
      h="380px"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box bg="var(--color-primary)" px={5} py={3}>
        <HStack justify="space-between">
          <Text color="white" fontSize="md" fontWeight="bold">
            Execution Plan
          </Text>
          <HStack spacing={1}>
            <Box w="60px" h="6px" bg="whiteAlpha.300" borderRadius="full" overflow="hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ height: '100%', backgroundColor: '#22c55e', borderRadius: '9999px' }}
              />
            </Box>
            <Text color="white" fontSize="xs">2/4</Text>
          </HStack>
        </HStack>
      </Box>

      {/* Tasks List */}
      <VStack spacing={0} p={3} flex={1} overflow="hidden">
        {tasks.map((task, index) => (
          <motion.div
            key={task.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            style={{ width: '100%' }}
          >
            <HStack
              py={3}
              px={3}
              borderBottom={index < tasks.length - 1 ? "1px solid" : "none"}
              borderColor="gray.100"
              spacing={3}
            >
              {/* Task Icon */}
              <Box
                w="36px"
                h="36px"
                borderRadius="lg"
                bg={task.status === 'completed' ? 'green.50' : task.status === 'approved' ? 'blue.50' : 'gray.50'}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="md"
              >
                {task.icon}
              </Box>

              {/* Task Info */}
              <VStack align="start" spacing={0} flex={1}>
                <Text fontSize="sm" fontWeight="medium" color="gray.800">
                  {task.label}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {getStatusIcon(task.status)} {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </Text>
              </VStack>

              {/* Action Buttons (only for pending) */}
              {task.status === 'pending' && (
                <HStack spacing={1}>
                  <Box px={2} py={1} bg="green.500" borderRadius="md" fontSize="10px" color="white">
                    ✓
                  </Box>
                  <Box px={2} py={1} bg="gray.200" borderRadius="md" fontSize="10px" color="gray.600">
                    ✕
                  </Box>
                </HStack>
              )}
            </HStack>
          </motion.div>
        ))}
      </VStack>

      {/* Footer */}
      <Box px={5} py={3} bg="gray.50" borderTop="1px solid" borderColor="gray.100">
        <HStack justify="flex-end" spacing={2}>
          <Box 
            px={3} 
            py={1.5} 
            bg="gray.200" 
            borderRadius="md"
            fontSize="xs"
            color="gray.600"
            fontWeight="medium"
          >
            Schedule
          </Box>
          <Box 
            px={3} 
            py={1.5} 
            bg="green.500" 
            borderRadius="md"
            fontSize="xs"
            color="white"
            fontWeight="medium"
          >
            Execute Now ▶
          </Box>
        </HStack>
      </Box>
    </Box>
  )
}

export default SafeExecutionPreview

