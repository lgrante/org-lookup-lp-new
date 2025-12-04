import { Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const ImpactAnalysisPreview = () => {
  const nodes = [
    { id: 1, label: 'Account', x: 50, y: 20, color: '#ef4444', size: 50 },
    { id: 2, label: 'Trigger', x: 25, y: 50, color: '#f97316', size: 40 },
    { id: 3, label: 'Flow', x: 75, y: 50, color: '#22c55e', size: 40 },
    { id: 4, label: 'Helper', x: 50, y: 80, color: '#eab308', size: 35 },
  ]

  const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
  ]

  return (
    <Box
      bg="white"
      borderRadius="16px"
      boxShadow="0 8px 32px rgba(0,0,0,0.12)"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      maxW="500px"
      mx="auto"
    >
      {/* Header */}
      <Box bg="var(--color-primary)" px={5} py={3}>
        <Text color="white" fontSize="md" fontWeight="bold">
          Dependency Graph
        </Text>
      </Box>

      {/* Graph Area */}
      <Box position="relative" h="280px" bg="gray.50">
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <marker id="arrow-preview" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
            </marker>
          </defs>
          
          {/* Edges */}
          {edges.map((edge, index) => {
            const from = nodes.find(n => n.id === edge.from)!
            const to = nodes.find(n => n.id === edge.to)!
            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2 - 8
            
            return (
              <motion.path
                key={index}
                d={`M ${from.x}% ${from.y}% Q ${midX}% ${midY}% ${to.x}% ${to.y}%`}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth={2}
                markerEnd="url(#arrow-preview)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Box
              w={`${node.size}px`}
              h={`${node.size}px`}
              borderRadius="full"
              bg="white"
              border="3px solid"
              borderColor={node.color}
              boxShadow="0 4px 12px rgba(0,0,0,0.15)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="xs" fontWeight="bold" color="gray.600">
                {node.label.substring(0, 3)}
              </Text>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* Footer */}
      <Box px={5} py={3} bg="gray.50" borderTop="1px solid" borderColor="gray.100">
        <Text fontSize="xs" color="gray.500" textAlign="center">
          4 nodes • 4 connections
        </Text>
      </Box>
    </Box>
  )
}

export default ImpactAnalysisPreview

