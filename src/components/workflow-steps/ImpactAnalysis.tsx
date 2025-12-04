import { Box, VStack, HStack, Text, Badge, IconButton, Tooltip } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiZoomIn, FiZoomOut, FiMaximize2, FiDownload } from 'react-icons/fi'

interface GraphNode {
  id: string
  name: string
  type: 'Apex Class' | 'Apex Trigger' | 'Flow' | 'Custom Field'
  score: number
  x: number
  y: number
}

interface GraphEdge {
  from: string
  to: string
  type: 'uses' | 'references' | 'extends' | 'triggers'
}

const mockNodes: GraphNode[] = [
  { id: '1', name: 'AccountService', type: 'Apex Class', score: 25, x: 50, y: 30 },
  { id: '2', name: 'AccountTrigger', type: 'Apex Trigger', score: 45, x: 25, y: 60 },
  { id: '3', name: 'Account_Flow', type: 'Flow', score: 78, x: 75, y: 60 },
  { id: '4', name: 'AccountHelper', type: 'Apex Class', score: 92, x: 50, y: 80 },
  { id: '5', name: 'Status__c', type: 'Custom Field', score: 65, x: 85, y: 40 },
]

const mockEdges: GraphEdge[] = [
  { from: '1', to: '2', type: 'triggers' },
  { from: '1', to: '3', type: 'uses' },
  { from: '2', to: '4', type: 'uses' },
  { from: '3', to: '5', type: 'references' },
  { from: '4', to: '5', type: 'references' },
]

const getNodeColor = (score: number) => {
  if (score >= 76) return '#ef4444'
  if (score >= 51) return '#f97316'
  if (score >= 26) return '#eab308'
  return '#22c55e'
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Apex Class': return '📦'
    case 'Apex Trigger': return '⚡'
    case 'Flow': return '🔄'
    case 'Custom Field': return '📝'
    default: return '📄'
  }
}

const getEdgeStyle = (type: string) => {
  switch (type) {
    case 'uses': return { stroke: '#6366f1', strokeDasharray: 'none' }
    case 'references': return { stroke: '#9ca3af', strokeDasharray: '5,5' }
    case 'extends': return { stroke: '#8b5cf6', strokeDasharray: 'none', strokeWidth: 3 }
    case 'triggers': return { stroke: '#f59e0b', strokeDasharray: '2,2' }
    default: return { stroke: '#9ca3af', strokeDasharray: 'none' }
  }
}

const ImpactAnalysis = () => {
  const getNodeById = (id: string) => mockNodes.find(n => n.id === id)

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
                Impact Analysis Graph
              </Text>
              <Text color="whiteAlpha.800" fontSize="sm">
                Visualize dependencies before making changes
              </Text>
            </VStack>
            <HStack spacing={2}>
              <Badge colorScheme="blue" variant="subtle" px={3} py={1}>Graph View</Badge>
              <Badge colorScheme="gray" variant="outline" px={3} py={1}>Tree View</Badge>
            </HStack>
          </HStack>
        </Box>

        {/* Toolbar */}
        <Box px={6} py={3} bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
          <HStack spacing={2}>
            <Tooltip label="Zoom In">
              <IconButton aria-label="Zoom in" icon={<FiZoomIn />} size="sm" variant="ghost" />
            </Tooltip>
            <Tooltip label="Zoom Out">
              <IconButton aria-label="Zoom out" icon={<FiZoomOut />} size="sm" variant="ghost" />
            </Tooltip>
            <Tooltip label="Fullscreen">
              <IconButton aria-label="Fullscreen" icon={<FiMaximize2 />} size="sm" variant="ghost" />
            </Tooltip>
            <Tooltip label="Export">
              <IconButton aria-label="Export" icon={<FiDownload />} size="sm" variant="ghost" />
            </Tooltip>
            <Box flex={1} />
            <Text fontSize="xs" color="gray.500">Drag nodes to reorganize • Scroll to zoom</Text>
          </HStack>
        </Box>

        {/* Graph Area */}
        <Box position="relative" h="400px" bg="gray.50" p={4}>
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
              </marker>
            </defs>
            
            {/* Edges */}
            {mockEdges.map((edge, index) => {
              const fromNode = getNodeById(edge.from)
              const toNode = getNodeById(edge.to)
              if (!fromNode || !toNode) return null
              
              const style = getEdgeStyle(edge.type)
              const midX = (fromNode.x + toNode.x) / 2
              const midY = (fromNode.y + toNode.y) / 2 - 10
              
              return (
                <motion.path
                  key={index}
                  d={`M ${fromNode.x}% ${fromNode.y}% Q ${midX}% ${midY}% ${toNode.x}% ${toNode.y}%`}
                  fill="none"
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth || 2}
                  strokeDasharray={style.strokeDasharray}
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {mockNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              style={{
                position: 'absolute',
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
              }}
            >
              <Tooltip label={`${node.name} (Score: ${node.score})`}>
                <Box
                  bg="white"
                  borderRadius="full"
                  w="60px"
                  h="60px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                  border="3px solid"
                  borderColor={getNodeColor(node.score)}
                  position="relative"
                >
                  <Text fontSize="xl">{getTypeIcon(node.type)}</Text>
                  <Badge
                    position="absolute"
                    top="-8px"
                    right="-8px"
                    colorScheme={node.score >= 76 ? 'red' : node.score >= 51 ? 'orange' : 'green'}
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {node.score}
                  </Badge>
                </Box>
              </Tooltip>
              <Text 
                fontSize="xs" 
                textAlign="center" 
                mt={1} 
                color="gray.700"
                fontWeight="medium"
                maxW="80px"
                isTruncated
              >
                {node.name}
              </Text>
            </motion.div>
          ))}

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
            <Text fontWeight="bold" mb={2}>Legend</Text>
            <VStack align="start" spacing={1}>
              <HStack><Box w={3} h={3} borderRadius="full" bg="#22c55e" /> <Text>Low (0-25)</Text></HStack>
              <HStack><Box w={3} h={3} borderRadius="full" bg="#eab308" /> <Text>Medium (26-50)</Text></HStack>
              <HStack><Box w={3} h={3} borderRadius="full" bg="#f97316" /> <Text>High (51-75)</Text></HStack>
              <HStack><Box w={3} h={3} borderRadius="full" bg="#ef4444" /> <Text>Critical (76-100)</Text></HStack>
            </VStack>
          </Box>

          {/* Mini-map placeholder */}
          <Box
            position="absolute"
            bottom={4}
            right={4}
            w="120px"
            h="80px"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xs" color="gray.400">Mini-map</Text>
          </Box>
        </Box>

        {/* Footer */}
        <Box px={6} py={4} bg="gray.50" borderTop="1px solid" borderColor="gray.200">
          <HStack justify="space-between">
            <Text color="gray.600" fontSize="sm">
              {mockNodes.length} nodes • {mockEdges.length} connections
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
              Continue to External Scan →
            </Box>
          </HStack>
        </Box>
      </Box>
    </motion.div>
  )
}

export default ImpactAnalysis
