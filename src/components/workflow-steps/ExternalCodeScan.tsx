import { Box, VStack, HStack, Text, Badge, Alert, AlertIcon, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiGithub, FiRefreshCw } from 'react-icons/fi'

interface ExternalNode {
  id: string
  name: string
  source: 'github' | 'gitlab'
  repoName: string
  x: number
  y: number
}

interface SalesforceNode {
  id: string
  name: string
  type: string
  x: number
  y: number
}

const externalNodes: ExternalNode[] = [
  { id: 'ext1', name: 'Web Lead Form', source: 'github', repoName: 'frontend-leads', x: 15, y: 35 },
  { id: 'ext2', name: 'Mass Import Script', source: 'gitlab', repoName: 'data-sync', x: 15, y: 65 },
]

const salesforceNodes: SalesforceNode[] = [
  { id: 'sf1', name: 'Lead Object', type: 'Custom Object', x: 70, y: 25 },
  { id: 'sf2', name: 'LeadAPI Class', type: 'Apex Class', x: 70, y: 50 },
  { id: 'sf3', name: 'LeadTrigger', type: 'Apex Trigger', x: 70, y: 75 },
]

const connections = [
  { from: 'ext1', to: 'sf1', type: 'REST API', label: 'API Call' },
  { from: 'ext1', to: 'sf2', type: 'REST API', label: 'API Call' },
  { from: 'ext2', to: 'sf2', type: 'Bulk API', label: 'Bulk Insert' },
  { from: 'ext2', to: 'sf3', type: 'Bulk API', label: 'Triggers' },
]

const GitLabIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
)

const ExternalCodeScan = () => {
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
                External Code Dependencies
              </Text>
              <Text color="whiteAlpha.800" fontSize="sm">
                Scan your Git repositories for Salesforce integrations
              </Text>
            </VStack>
            <HStack spacing={3}>
              <HStack bg="whiteAlpha.200" px={3} py={1} borderRadius="full">
                <FiGithub color="white" />
                <Text color="white" fontSize="sm">Connected</Text>
                <Box w={2} h={2} bg="green.400" borderRadius="full" />
              </HStack>
              <HStack bg="whiteAlpha.200" px={3} py={1} borderRadius="full">
                <Box color="white"><GitLabIcon /></Box>
                <Text color="white" fontSize="sm">Connected</Text>
                <Box w={2} h={2} bg="green.400" borderRadius="full" />
              </HStack>
            </HStack>
          </HStack>
        </Box>

        {/* Connected Repos Bar */}
        <Box px={6} py={3} bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
          <HStack justify="space-between">
            <HStack spacing={4}>
              <HStack spacing={2}>
                <FiGithub />
                <Text fontSize="sm" fontWeight="medium">frontend-leads</Text>
                <Badge colorScheme="green" size="sm">main</Badge>
              </HStack>
              <HStack spacing={2}>
                <Box color="orange.500"><GitLabIcon /></Box>
                <Text fontSize="sm" fontWeight="medium">data-sync</Text>
                <Badge colorScheme="green" size="sm">master</Badge>
              </HStack>
            </HStack>
            <HStack spacing={2}>
              <Text fontSize="xs" color="gray.500">Last scan: 2 hours ago</Text>
              <Button size="xs" leftIcon={<FiRefreshCw />} variant="ghost">
                Refresh
              </Button>
            </HStack>
          </HStack>
        </Box>

        {/* Graph Area */}
        <Box position="relative" h="350px" bg="gray.50" p={4}>
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <defs>
              <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
              <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
              </marker>
            </defs>
            
            {/* Connection lines */}
            {connections.map((conn, index) => {
              const fromNode = externalNodes.find(n => n.id === conn.from)
              const toNode = salesforceNodes.find(n => n.id === conn.to)
              if (!fromNode || !toNode) return null
              
              const isRest = conn.type === 'REST API'
              
              return (
                <g key={index}>
                  <motion.path
                    d={`M ${fromNode.x + 12}% ${fromNode.y}% C ${40}% ${fromNode.y}% ${50}% ${toNode.y}% ${toNode.x - 8}% ${toNode.y}%`}
                    fill="none"
                    stroke={isRest ? '#3b82f6' : '#22c55e'}
                    strokeWidth={2}
                    strokeDasharray={isRest ? 'none' : '8,4'}
                    markerEnd={isRest ? 'url(#arrow-blue)' : 'url(#arrow-green)'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                  />
                  <motion.text
                    x="45%"
                    y={`${(fromNode.y + toNode.y) / 2 - 5}%`}
                    fontSize="10"
                    fill="#6b7280"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.3 }}
                  >
                    {conn.label}
                  </motion.text>
                </g>
              )
            })}
          </svg>

          {/* External Nodes (Left side) */}
          {externalNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              style={{
                position: 'absolute',
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Box
                bg={node.source === 'github' ? '#24292e' : '#fc6d26'}
                color="white"
                p={4}
                borderRadius="12px"
                boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                textAlign="center"
                minW="120px"
              >
                <Box mb={2}>
                  {node.source === 'github' ? <FiGithub size={28} /> : <GitLabIcon />}
                </Box>
                <Text fontSize="sm" fontWeight="bold">{node.name}</Text>
                <Text fontSize="xs" opacity={0.8}>{node.repoName}</Text>
              </Box>
            </motion.div>
          ))}

          {/* Salesforce Nodes (Right side) */}
          <Box
            position="absolute"
            right="10%"
            top="50%"
            transform="translateY(-50%)"
            bg="white"
            border="2px solid"
            borderColor="blue.200"
            borderRadius="16px"
            p={4}
            minW="180px"
          >
            <Text fontSize="sm" fontWeight="bold" color="blue.600" mb={3} textAlign="center">
              ☁️ Salesforce Metadata
            </Text>
            <VStack spacing={2}>
              {salesforceNodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  style={{ width: '100%' }}
                >
                  <HStack
                    bg="gray.50"
                    p={2}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Text fontSize="md">
                      {node.type === 'Custom Object' ? '🗄️' : node.type === 'Apex Class' ? '📦' : '⚡'}
                    </Text>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="xs" fontWeight="medium">{node.name}</Text>
                      <Text fontSize="xs" color="gray.500">{node.type}</Text>
                    </VStack>
                  </HStack>
                </motion.div>
              ))}
            </VStack>
          </Box>

          {/* Legend */}
          <Box
            position="absolute"
            bottom={4}
            left={4}
            bg="white"
            p={3}
            borderRadius="md"
            boxShadow="sm"
            fontSize="xs"
          >
            <Text fontWeight="bold" mb={2}>API Types</Text>
            <VStack align="start" spacing={1}>
              <HStack><Box w={4} h={0.5} bg="blue.500" /> <Text>REST API</Text></HStack>
              <HStack><Box w={4} h={0.5} bg="green.500" borderStyle="dashed" borderWidth="1px" borderColor="green.500" /> <Text>Bulk API</Text></HStack>
            </VStack>
          </Box>
        </Box>

        {/* Warning Alert */}
        <Alert status="warning" variant="left-accent">
          <AlertIcon />
          <Box>
            <Text fontWeight="medium">Warning: LeadAPI class is referenced by 2 external repositories</Text>
            <Text fontSize="sm" color="gray.600">Deletion may break external integrations.</Text>
          </Box>
          <Button size="sm" ml="auto" variant="ghost">View Details</Button>
        </Alert>

        {/* Footer */}
        <Box px={6} py={4} bg="gray.50" borderTop="1px solid" borderColor="gray.200">
          <HStack justify="space-between">
            <Text color="gray.600" fontSize="sm">
              2 external systems connected • 4 external references found
            </Text>
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
              Continue to Deletion Queue →
            </Box>
          </HStack>
        </Box>
      </Box>
    </motion.div>
  )
}

export default ExternalCodeScan
