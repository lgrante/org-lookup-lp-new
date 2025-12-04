import { Box, VStack, HStack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const DeletionQueuePreview = () => {
  const items = [
    { name: 'AccountCleanupBatch', type: 'Apex Class', checked: true, safe: true },
    { name: 'Old_Lead_Flow', type: 'Flow', checked: true, safe: true },
    { name: 'ContactTrigger', type: 'Trigger', checked: false, safe: false, warning: true },
    { name: 'Status_Field__c', type: 'Field', checked: true, safe: true },
  ]

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
        <Text color="white" fontSize="md" fontWeight="bold">
          Deletion Queue
        </Text>
      </Box>

      {/* Summary */}
      <HStack spacing={3} p={4} bg="gray.50" borderBottom="1px solid" borderColor="gray.100">
        {[
          { label: 'Step 1', count: 12, icon: '📊' },
          { label: 'Step 2', count: 5, icon: '🔗' },
          { label: 'Step 3', count: 2, icon: '🌐' },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ flex: 1 }}
          >
            <Box bg="white" p={2} borderRadius="md" textAlign="center" boxShadow="sm">
              <Text fontSize="sm">{item.icon}</Text>
              <Text fontSize="lg" fontWeight="bold" color="var(--color-primary)">{item.count}</Text>
            </Box>
          </motion.div>
        ))}
      </HStack>

      {/* List */}
      <VStack spacing={0} p={3} flex={1} overflow="hidden">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            style={{ width: '100%' }}
          >
            <HStack
              py={2.5}
              px={2}
              bg={item.checked ? 'blue.50' : 'white'}
              borderRadius="md"
              mb={1}
              spacing={3}
            >
              {/* Checkbox */}
              <Box 
                w="16px" 
                h="16px" 
                borderRadius="3px" 
                border="2px solid"
                borderColor={item.checked ? "blue.500" : "gray.300"}
                bg={item.checked ? "blue.500" : "transparent"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {item.checked && (
                  <Text color="white" fontSize="10px" fontWeight="bold">✓</Text>
                )}
              </Box>

              {/* Info */}
              <VStack align="start" spacing={0} flex={1}>
                <Text fontSize="sm" fontWeight="medium">{item.name}</Text>
                <Text fontSize="xs" color="gray.500">{item.type}</Text>
              </VStack>

              {/* Status */}
              {item.safe && (
                <Text fontSize="xs" color="green.500">✓ Safe</Text>
              )}
              {item.warning && (
                <Text fontSize="xs" color="orange.500">⚠️</Text>
              )}
            </HStack>
          </motion.div>
        ))}
      </VStack>

      {/* Footer */}
      <Box px={5} py={3} bg="gray.50" borderTop="1px solid" borderColor="gray.100">
        <HStack justify="space-between">
          <Text fontSize="xs" color="gray.500">3 of 4 selected</Text>
          <Box 
            px={3} 
            py={1.5} 
            bg="var(--color-primary)" 
            borderRadius="md"
            fontSize="xs"
            color="white"
            fontWeight="medium"
          >
            Generate Plan
          </Box>
        </HStack>
      </Box>
    </Box>
  )
}

export default DeletionQueuePreview

