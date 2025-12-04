import { Box, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiBox, FiZap, FiGitBranch, FiDatabase, FiCode } from 'react-icons/fi'

const ImpactAnalysisPreview = () => {
  // Coordonnées en pixels sur un viewBox de 600x280
  const nodes = [
    { id: 1, label: 'AccountCleanupBatch', type: 'Apex', x: 300, y: 45, color: '#ef4444', icon: FiBox },
    { id: 2, label: 'ContactTrigger', type: 'Trigger', x: 120, y: 130, color: '#f97316', icon: FiZap },
    { id: 3, label: 'Old_Lead_Flow', type: 'Flow', x: 480, y: 130, color: '#22c55e', icon: FiGitBranch },
    { id: 4, label: 'Status_Field__c', type: 'Field', x: 200, y: 230, color: '#eab308', icon: FiDatabase },
    { id: 5, label: 'Account_Helper', type: 'Apex', x: 400, y: 230, color: '#8b5cf6', icon: FiCode },
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
      <Box position="relative" flex={1} bg="gray.50" overflow="hidden">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 600 280"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <marker id="arrow-impact" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>
          
          {/* Edges */}
          {edges.map((edge, index) => {
            const from = nodes.find(n => n.id === edge.from)!
            const to = nodes.find(n => n.id === edge.to)!
            
            // Points de contrôle pour courbe de Bézier
            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2 - 20
            
            return (
              <motion.path
                key={index}
                d={`M ${from.x} ${from.y + 25} Q ${midX} ${midY + 25} ${to.x} ${to.y - 25}`}
                fill="none"
                stroke="#94a3b8"
                strokeWidth={2}
                markerEnd="url(#arrow-impact)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              />
            )
          })}

          {/* Node circles (SVG) */}
          {nodes.map((node, index) => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={22}
              fill="white"
              stroke={node.color}
              strokeWidth={3}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          ))}
        </svg>

        {/* Node icons and labels (HTML overlay) */}
        {nodes.map((node, index) => {
          const IconComponent = node.icon
          // Convertir les coordonnées viewBox en pourcentages
          const leftPercent = (node.x / 600) * 100
          const topPercent = (node.y / 280) * 100
          
          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              style={{
                position: 'absolute',
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            >
              <VStack spacing={0}>
                <Box
                  w="44px"
                  h="44px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={node.color}
                >
                  <IconComponent size={20} />
                </Box>
                <Text 
                  fontSize="8px" 
                  fontWeight="bold" 
                  color="gray.700"
                  textAlign="center"
                  maxW="75px"
                  lineHeight={1.1}
                  mt={1}
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
