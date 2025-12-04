import { Box, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiBox, FiZap, FiGitBranch, FiDatabase, FiCode } from 'react-icons/fi'
import { IconType } from 'react-icons'

interface NodeData {
  id: number
  label: string
  type: string
  x: number
  y: number
  color: string
  icon: IconType
}

const ImpactAnalysisPreview = () => {
  const nodes: NodeData[] = [
    { id: 1, label: 'AccountCleanupBatch', type: 'Apex', x: 300, y: 50, color: '#ef4444', icon: FiBox },
    { id: 2, label: 'ContactTrigger', type: 'Trigger', x: 120, y: 140, color: '#f97316', icon: FiZap },
    { id: 3, label: 'Old_Lead_Flow', type: 'Flow', x: 480, y: 140, color: '#22c55e', icon: FiGitBranch },
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

  const nodeRadius = 22

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
        >
          <defs>
            <marker id="arrow-impact" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-primary)" />
            </marker>
            <filter id="shadow-impact" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15"/>
            </filter>
          </defs>
          
          {/* Edges */}
          {edges.map((edge, index) => {
            const from = nodes.find(n => n.id === edge.from)!
            const to = nodes.find(n => n.id === edge.to)!
            
            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2 - 20
            
            return (
              <motion.path
                key={index}
                d={`M ${from.x} ${from.y + nodeRadius} Q ${midX} ${midY + nodeRadius} ${to.x} ${to.y - nodeRadius}`}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth={2}
                markerEnd="url(#arrow-impact)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              />
            )
          })}

          {/* Nodes */}
          {nodes.map((node, index) => {
            const IconComponent = node.icon
            return (
              <motion.g
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                {/* Circle background */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius}
                  fill="white"
                  stroke={node.color}
                  strokeWidth={3}
                  filter="url(#shadow-impact)"
                />
                
                {/* Icon (using foreignObject) */}
                <foreignObject
                  x={node.x - 12}
                  y={node.y - 12}
                  width={24}
                  height={24}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="24px"
                    h="24px"
                    color={node.color}
                  >
                    <IconComponent size={18} />
                  </Box>
                </foreignObject>
                
                {/* Label */}
                <foreignObject
                  x={node.x - 45}
                  y={node.y + nodeRadius + 4}
                  width={90}
                  height={24}
                >
                  <Text 
                    fontSize="8px" 
                    fontWeight="bold" 
                    color="gray.700"
                    textAlign="center"
                    lineHeight={1.2}
                  >
                    {node.label}
                  </Text>
                </foreignObject>
              </motion.g>
            )
          })}
        </svg>
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
