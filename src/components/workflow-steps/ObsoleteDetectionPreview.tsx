import { Box, VStack, HStack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const ObsoleteDetectionPreview = () => {
  const items = [
    { name: 'AccountCleanupBatch', type: 'Apex', score: 92, color: '#ef4444' },
    { name: 'Old_Lead_Flow', type: 'Flow', score: 87, color: '#ef4444' },
    { name: 'ContactTrigger', type: 'Trigger', score: 65, color: '#f97316' },
    { name: 'Status_Field__c', type: 'Field', score: 45, color: '#eab308' },
    { name: 'Account_Helper', type: 'Apex', score: 23, color: '#22c55e' },
  ]

  return (
    <Box
      bg="white"
      overflow="hidden"
      w="100%"
      h="380px"
      display="flex"
      flexDirection="column"
    >
      {/* Simplified Header */}
      <Box bg="var(--color-primary)" px={5} py={3}>
        <Text color="white" fontSize="md" fontWeight="bold">
          Obsolete Metadata
        </Text>
      </Box>

      {/* Abstract List */}
      <VStack spacing={0} p={4} flex={1} overflow="hidden">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            style={{ width: '100%' }}
          >
            <HStack 
              py={3} 
              px={3}
              borderBottom={index < items.length - 1 ? "1px solid" : "none"}
              borderColor="gray.100"
              spacing={4}
            >
              {/* Checkbox placeholder */}
              <Box 
                w="18px" 
                h="18px" 
                borderRadius="4px" 
                border="2px solid"
                borderColor={index < 3 ? "var(--color-primary)" : "gray.300"}
                bg={index < 3 ? "var(--color-primary)" : "transparent"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {index < 3 && (
                  <Text color="white" fontSize="xs" fontWeight="bold">✓</Text>
                )}
              </Box>
              
              {/* Item info */}
              <VStack align="start" spacing={0} flex={1}>
                <Text fontSize="sm" fontWeight="medium" color="gray.800">
                  {item.name}
                </Text>
                <Text fontSize="xs" color="gray.500">{item.type}</Text>
              </VStack>
              
              {/* Score bar */}
              <HStack spacing={2}>
                <Box 
                  w="60px" 
                  h="6px" 
                  bg="gray.100" 
                  borderRadius="full"
                  overflow="hidden"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    style={{
                      height: '100%',
                      backgroundColor: item.color,
                      borderRadius: '9999px',
                    }}
                  />
                </Box>
                <Text fontSize="xs" fontWeight="bold" color={item.color} w="28px">
                  {item.score}%
                </Text>
              </HStack>
            </HStack>
          </motion.div>
        ))}
      </VStack>

      {/* Simplified Footer */}
      <Box px={5} py={3} bg="gray.50" borderTop="1px solid" borderColor="gray.100">
        <HStack justify="space-between">
          <Text fontSize="xs" color="gray.500">3 selected</Text>
          <Box 
            px={3} 
            py={1.5} 
            bg="var(--color-primary)" 
            borderRadius="md"
            fontSize="xs"
            color="white"
            fontWeight="medium"
          >
            Add to Queue →
          </Box>
        </HStack>
      </Box>
    </Box>
  )
}

export default ObsoleteDetectionPreview

