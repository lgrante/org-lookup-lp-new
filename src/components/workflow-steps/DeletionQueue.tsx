import { Box, VStack, HStack, Text, Checkbox, Badge, Progress, Input, InputGroup, InputLeftElement, Select, Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiSearch, FiTrash2, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

interface QueueItem {
  id: string
  name: string
  type: string
  icon: string
  source: 'Step 1' | 'Step 2' | 'Step 3'
  score: number
  lastModified: string
  incomingDeps: number
  outgoingDeps: number
  externalWarning?: string
  safeToDelete: boolean
  checked: boolean
}

const mockQueue: QueueItem[] = [
  { 
    id: '1', name: 'AccountCleanupBatch', type: 'Apex Class', icon: '📦',
    source: 'Step 1', score: 87, lastModified: '14 months ago',
    incomingDeps: 0, outgoingDeps: 2, safeToDelete: true, checked: true
  },
  { 
    id: '2', name: 'ContactAfterTrigger', type: 'Apex Trigger', icon: '⚡',
    source: 'Step 2', score: 65, lastModified: '8 months ago',
    incomingDeps: 1, outgoingDeps: 4, 
    externalWarning: 'Used by: Web Lead Form (GitHub)',
    safeToDelete: false, checked: false
  },
  { 
    id: '3', name: 'Opportunity_AutoClose_Flow', type: 'Flow', icon: '🔄',
    source: 'Step 1', score: 92, lastModified: '2 years ago',
    incomingDeps: 0, outgoingDeps: 0, safeToDelete: true, checked: true
  },
  { 
    id: '4', name: 'Lead_Import_Script', type: 'Apex Class', icon: '📦',
    source: 'Step 3', score: 78, lastModified: '10 months ago',
    incomingDeps: 0, outgoingDeps: 1, 
    externalWarning: 'Used by: Mass Import Script (GitLab)',
    safeToDelete: false, checked: true
  },
]

const getScoreColor = (score: number) => {
  if (score >= 76) return 'red'
  if (score >= 51) return 'orange'
  if (score >= 26) return 'yellow'
  return 'green'
}

const DeletionQueue = () => {
  const selectedCount = mockQueue.filter(item => item.checked).length
  const totalCount = mockQueue.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        bg="white"
        borderRadius="16px"
        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.200"
      >
        {/* Header */}
        <Box bg="var(--color-primary)" px={6} py={4}>
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text color="white" fontSize="xl" fontWeight="bold" fontFamily="'Vend Sans', sans-serif">
                Deletion Queue
              </Text>
              <Text color="whiteAlpha.800" fontSize="sm">
                Review and finalize your cleanup plan
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* Summary Cards */}
        <Box px={6} py={4} bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
          <HStack spacing={4} justify="center">
            {[
              { step: 'Step 1', label: 'Obsolete Items', count: 23, icon: '📊' },
              { step: 'Step 2', label: 'Impact Analysis', count: 8, icon: '🔗' },
              { step: 'Step 3', label: 'External Scan', count: 3, icon: '🌐' },
            ].map((card, index) => (
              <motion.div
                key={card.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  boxShadow="sm"
                  textAlign="center"
                  minW="140px"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Text fontSize="xl" mb={1}>{card.icon}</Text>
                  <Text fontSize="xs" color="gray.500">{card.step}</Text>
                  <Text fontSize="sm" fontWeight="medium">{card.label}</Text>
                  <Text fontSize="lg" fontWeight="bold" color="var(--color-primary)">{card.count} items</Text>
                </Box>
              </motion.div>
            ))}
          </HStack>
        </Box>

        {/* Filters */}
        <Box px={6} py={3} borderBottom="1px solid" borderColor="gray.200">
          <HStack spacing={4}>
            <InputGroup maxW="250px">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray" />
              </InputLeftElement>
              <Input placeholder="Filter by name..." size="sm" />
            </InputGroup>
            <Select placeholder="Group by..." maxW="150px" size="sm">
              <option value="type">Type</option>
              <option value="source">Source Step</option>
              <option value="risk">Risk Level</option>
            </Select>
            <Box flex={1} />
            <Text fontSize="sm" color="gray.500">
              <Checkbox size="sm" mr={2} /> Select All
            </Text>
          </HStack>
        </Box>

        {/* Content: List + Summary Panel */}
        <HStack align="stretch" spacing={0}>
          {/* Queue List */}
          <Box flex={1} maxH="400px" overflowY="auto">
            <VStack spacing={0} divider={<Divider />}>
              {mockQueue.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ width: '100%' }}
                >
                  <Box
                    px={6}
                    py={4}
                    bg={item.checked ? 'blue.50' : 'white'}
                    _hover={{ bg: item.checked ? 'blue.100' : 'gray.50' }}
                    transition="background 0.2s"
                  >
                    <HStack spacing={4}>
                      <Checkbox 
                        isChecked={item.checked} 
                        colorScheme="blue"
                        size="lg"
                      />
                      <Text fontSize="2xl">{item.icon}</Text>
                      <VStack align="start" spacing={1} flex={1}>
                        <HStack>
                          <Text fontWeight="bold">{item.name}</Text>
                          <Badge colorScheme="gray" size="sm">{item.type}</Badge>
                        </HStack>
                        <Text fontSize="xs" color="gray.500">
                          Added from {item.source}
                        </Text>
                        <HStack spacing={4} fontSize="xs" color="gray.600">
                          <HStack>
                            <Badge colorScheme={getScoreColor(item.score)} size="sm">
                              Score: {item.score}/100
                            </Badge>
                          </HStack>
                          <Text>Modified: {item.lastModified}</Text>
                          <Text>Deps: {item.incomingDeps}↓ {item.outgoingDeps}↑</Text>
                        </HStack>
                        {item.externalWarning && (
                          <HStack color="orange.500" fontSize="xs">
                            <FiAlertTriangle />
                            <Text>{item.externalWarning}</Text>
                          </HStack>
                        )}
                        {item.safeToDelete && !item.externalWarning && (
                          <HStack color="green.500" fontSize="xs">
                            <FiCheckCircle />
                            <Text>Safe to delete</Text>
                          </HStack>
                        )}
                      </VStack>
                      <VStack spacing={1}>
                        <Text 
                          fontSize="xs" 
                          color="blue.500" 
                          cursor="pointer"
                          _hover={{ textDecoration: 'underline' }}
                        >
                          View Details
                        </Text>
                        <Text 
                          fontSize="xs" 
                          color="red.500" 
                          cursor="pointer"
                          _hover={{ textDecoration: 'underline' }}
                        >
                          Remove
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </motion.div>
              ))}
            </VStack>
          </Box>

          {/* Summary Panel */}
          <Box 
            w="280px" 
            bg="gray.50" 
            borderLeft="1px solid" 
            borderColor="gray.200"
            p={5}
          >
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" fontSize="lg" textAlign="center">
                QUEUE SUMMARY
              </Text>
              <Divider />
              
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                  <Text>Total Items:</Text>
                  <Text fontWeight="bold">{totalCount}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Selected:</Text>
                  <Text fontWeight="bold" color="green.500">{selectedCount}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Excluded:</Text>
                  <Text fontWeight="bold" color="gray.500">{totalCount - selectedCount}</Text>
                </HStack>
              </VStack>

              <Divider />

              <VStack align="stretch" spacing={1}>
                <Text fontWeight="medium" fontSize="sm">BY TYPE</Text>
                <HStack justify="space-between" fontSize="sm">
                  <Text color="gray.600">├─ Apex Class</Text>
                  <Text>2</Text>
                </HStack>
                <HStack justify="space-between" fontSize="sm">
                  <Text color="gray.600">├─ Apex Trigger</Text>
                  <Text>1</Text>
                </HStack>
                <HStack justify="space-between" fontSize="sm">
                  <Text color="gray.600">└─ Flow</Text>
                  <Text>1</Text>
                </HStack>
              </VStack>

              <Divider />

              <VStack align="stretch" spacing={2}>
                <Text fontWeight="medium" fontSize="sm">RISK ASSESSMENT</Text>
                <VStack spacing={1}>
                  <HStack w="100%">
                    <Text fontSize="xs" w="60px">Low</Text>
                    <Progress value={60} colorScheme="green" size="sm" flex={1} borderRadius="full" />
                  </HStack>
                  <HStack w="100%">
                    <Text fontSize="xs" w="60px">Medium</Text>
                    <Progress value={25} colorScheme="yellow" size="sm" flex={1} borderRadius="full" />
                  </HStack>
                  <HStack w="100%">
                    <Text fontSize="xs" w="60px">High</Text>
                    <Progress value={15} colorScheme="red" size="sm" flex={1} borderRadius="full" />
                  </HStack>
                </VStack>
              </VStack>

              <Divider />

              <VStack align="stretch" spacing={1}>
                <Text fontWeight="medium" fontSize="sm">ESTIMATED IMPACT</Text>
                <Text fontSize="xs" color="gray.600">• -2.4 MB metadata size</Text>
                <Text fontSize="xs" color="gray.600">• -847 lines of code</Text>
                <Text fontSize="xs" color="gray.600">• Complexity: -15%</Text>
              </VStack>

              <Box pt={2}>
                <Box
                  as="button"
                  w="100%"
                  px={4}
                  py={3}
                  bg="var(--color-primary)"
                  color="white"
                  borderRadius="md"
                  fontWeight="medium"
                  fontSize="sm"
                  _hover={{ bg: 'var(--color-primary-hover)' }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <FiTrash2 />
                  Generate Execution Plan
                </Box>
              </Box>
            </VStack>
          </Box>
        </HStack>

        {/* Footer */}
        <Box px={6} py={3} bg="gray.50" borderTop="1px solid" borderColor="gray.200">
          <HStack justify="space-between">
            <Text fontSize="sm" color="blue.500" cursor="pointer">← Back to Impact Analysis</Text>
            <HStack spacing={3}>
              <Text fontSize="sm" color="gray.500" cursor="pointer">Save Queue</Text>
              <Text fontSize="sm" color="gray.500" cursor="pointer">Export CSV</Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </motion.div>
  )
}

export default DeletionQueue
