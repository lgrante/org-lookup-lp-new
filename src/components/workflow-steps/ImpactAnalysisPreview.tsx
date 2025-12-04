import { Box, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiBox, FiZap, FiGitBranch, FiDatabase, FiCode } from 'react-icons/fi'

const ImpactAnalysisPreview = () => {
  const nodes = [
    { id: 1, label: 'AccountCleanupBatch', type: 'Apex', x: 50, y: 15, color: '#ef4444', icon: FiBox },
    { id: 2, label: 'ContactTrigger', type: 'Trigger', x: 20, y: 45, color: '#f97316', icon: FiZap },
    { id: 3, label: 'Old_Lead_Flow', type: 'Flow', x: 80, y: 45, color: '#22c55e', icon: FiGitBranch },
    { id: 4, label: 'Status_Field__c', type: 'Field', x: 35, y: 80, color: '#eab308', icon: FiDatabase },
    { id: 5, label: 'Account_Helper', type: 'Apex', x: 65, y: 80, color: '#8b5cf6', icon: FiCode },
  ]

  const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
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
          Dependency Graph
        </Text>
      </Box>

      {/* Graph Area */}
      <Box position="relative" flex={1} bg="gray.50">
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <marker id="arrow-impact" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
            </marker>
          </defs>
          
          {/* Edges */}
          {edges.map((edge, index) => {
            const from = nodes.find(n => n.id === edge.from)!
            const to = nodes.find(n => n.id === edge.to)!
            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2 - 5
            
            return (
              <motion.path
                key={index}
                d={`M ${from.x}% ${from.y + 8}% Q ${midX}% ${midY}% ${to.x}% ${to.y - 5}%`}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth={2}
                markerEnd="url(#arrow-impact)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const IconComponent = node.icon
          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                position: 'absolute',
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <VStack spacing={1}>
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="full"
                  bg="white"
                  border="3px solid"
                  borderColor={node.color}
                  boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={node.color}
                >
                  <IconComponent size={18} />
                </Box>
                <Text 
                  fontSize="9px" 
                  fontWeight="bold" 
                  color="gray.700"
                  textAlign="center"
                  maxW="80px"
                  lineHeight={1.1}
                >
                  {node.label}
                </Text>
              </VStack>
            </motion.div>
          )
        })}
      </Box>

      {/* Footer */}
      <Box px={5} py={3} bg="gray.50" borderTop="1px solid" borderColor="gray.100">
        <Text fontSize="xs" color="gray.500" textAlign="center">
          5 nodes • 5 connections
        </Text>
      </Box>
    </Box>
  )
}

export default ImpactAnalysisPreview
