import { Box, VStack, HStack, Text, Checkbox, Badge, Progress, Table, Thead, Tbody, Tr, Th, Td, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'

interface MetadataItem {
  id: string
  name: string
  type: 'Apex Class' | 'Apex Trigger' | 'Flow' | 'Custom Field' | 'Custom Object' | 'Validation Rule'
  score: number
  lastModified: string
  selected: boolean
}

const mockData: MetadataItem[] = [
  { id: '1', name: 'AccountCleanupBatch', type: 'Apex Class', score: 87, lastModified: '14 months ago', selected: true },
  { id: '2', name: 'ContactAfterTrigger', type: 'Apex Trigger', score: 65, lastModified: '8 months ago', selected: false },
  { id: '3', name: 'Opportunity_AutoClose_Flow', type: 'Flow', score: 92, lastModified: '2 years ago', selected: true },
  { id: '4', name: 'Lead_Status_Old__c', type: 'Custom Field', score: 78, lastModified: '18 months ago', selected: true },
  { id: '5', name: 'Account_Validation_Legacy', type: 'Validation Rule', score: 45, lastModified: '6 months ago', selected: false },
]

const getScoreColor = (score: number) => {
  if (score >= 76) return 'red'
  if (score >= 51) return 'orange'
  if (score >= 26) return 'yellow'
  return 'green'
}

const getScoreLabel = (score: number) => {
  if (score >= 76) return 'Critical'
  if (score >= 51) return 'High'
  if (score >= 26) return 'Medium'
  return 'Low'
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Apex Class': return 'purple'
    case 'Apex Trigger': return 'yellow'
    case 'Flow': return 'cyan'
    case 'Custom Field': return 'blue'
    case 'Custom Object': return 'teal'
    case 'Validation Rule': return 'green'
    default: return 'gray'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Apex Class': return '📦'
    case 'Apex Trigger': return '⚡'
    case 'Flow': return '🔄'
    case 'Custom Field': return '📝'
    case 'Custom Object': return '🗄️'
    case 'Validation Rule': return '✅'
    default: return '📄'
  }
}

const ObsoleteDetection = () => {
  const selectedCount = mockData.filter(item => item.selected).length

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
                Obsolete Metadata Detection
              </Text>
              <Text color="whiteAlpha.800" fontSize="sm">
                AI-powered analysis of your org's metadata health
              </Text>
            </VStack>
            <Badge colorScheme="orange" fontSize="md" px={3} py={1} borderRadius="full">
              {mockData.length} items detected
            </Badge>
          </HStack>
        </Box>

        {/* Filters */}
        <Box px={6} py={4} bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
          <HStack spacing={4}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray" />
              </InputLeftElement>
              <Input placeholder="Search metadata..." bg="white" />
            </InputGroup>
            <Select placeholder="Filter by type" maxW="200px" bg="white">
              <option value="apex">Apex Class</option>
              <option value="trigger">Apex Trigger</option>
              <option value="flow">Flow</option>
              <option value="field">Custom Field</option>
            </Select>
            <Select placeholder="Filter by score" maxW="180px" bg="white">
              <option value="critical">Critical (76-100)</option>
              <option value="high">High (51-75)</option>
              <option value="medium">Medium (26-50)</option>
              <option value="low">Low (0-25)</option>
            </Select>
          </HStack>
        </Box>

        {/* Table */}
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th w="50px">
                  <Checkbox colorScheme="blue" />
                </Th>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Obsolescence Score</Th>
                <Th>Last Modified</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mockData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{ 
                    backgroundColor: item.selected ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                  }}
                >
                  <Td>
                    <Checkbox isChecked={item.selected} colorScheme="blue" />
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Text>{getTypeIcon(item.type)}</Text>
                      <Text fontWeight="medium" color="gray.800">{item.name}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge colorScheme={getTypeColor(item.type)} variant="subtle">
                      {item.type}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={3}>
                      <Box w="100px">
                        <Progress 
                          value={item.score} 
                          colorScheme={getScoreColor(item.score)} 
                          size="sm" 
                          borderRadius="full"
                        />
                      </Box>
                      <Badge colorScheme={getScoreColor(item.score)} variant="solid" fontSize="xs">
                        {item.score}/100 • {getScoreLabel(item.score)}
                      </Badge>
                    </HStack>
                  </Td>
                  <Td>
                    <Text color="gray.500" fontSize="sm">{item.lastModified}</Text>
                  </Td>
                </motion.tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Footer */}
        <Box px={6} py={4} bg="gray.50" borderTop="1px solid" borderColor="gray.200">
          <HStack justify="space-between">
            <Text color="gray.600" fontSize="sm">
              {selectedCount} items selected
            </Text>
            <HStack spacing={3}>
              <Box
                as="button"
                px={4}
                py={2}
                bg="var(--color-primary)"
                color="white"
                borderRadius="md"
                fontWeight="medium"
                fontSize="sm"
                _hover={{ bg: 'var(--color-primary-hover)' }}
              >
                Add Selected to Queue
              </Box>
              <Box
                as="button"
                px={4}
                py={2}
                border="2px solid"
                borderColor="var(--color-primary)"
                color="var(--color-primary)"
                borderRadius="md"
                fontWeight="medium"
                fontSize="sm"
                _hover={{ bg: 'var(--color-primary)', color: 'white' }}
              >
                Analyze Dependencies →
              </Box>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </motion.div>
  )
}

export default ObsoleteDetection
