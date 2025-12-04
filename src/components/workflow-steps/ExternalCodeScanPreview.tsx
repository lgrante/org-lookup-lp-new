import { Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiGithub, FiBox, FiZap, FiDatabase } from 'react-icons/fi'
import { IconType } from 'react-icons'

const GitLabIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
)

interface NodeData {
  id: number
  label: string
  type: string
  x: number
  y: number
  color: string
  icon: 'github' | 'gitlab' | IconType
  isExternal?: boolean
}

const ExternalCodeScanPreview = () => {
  const nodes: NodeData[] = [
    { id: 1, label: 'Lead Web Form', type: 'GitHub', x: 100, y: 90, color: '#24292e', icon: 'github', isExternal: true },
    { id: 2, label: 'Mass Import Script', type: 'GitLab', x: 100, y: 190, color: '#fc6d26', icon: 'gitlab', isExternal: true },
    { id: 3, label: 'LeadAPI', type: 'Apex', x: 320, y: 140, color: '#6366f1', icon: FiBox },
    { id: 4, label: 'LeadTrigger', type: 'Trigger', x: 500, y: 90, color: '#f97316', icon: FiZap },
    { id: 5, label: 'Lead__c', type: 'Object', x: 500, y: 190, color: '#22c55e', icon: FiDatabase },
  ]

  const edges = [
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
  ]

  const nodeRadius = 24
  const extSize = 50

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
            <marker id="arrow-ext-primary" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-primary)" />
            </marker>
            <filter id="shadow-ext" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.2"/>
            </filter>
          </defs>
          
          {/* Edges */}
          {edges.map((edge, index) => {
            const from = nodes.find(n => n.id === edge.from)!
            const to = nodes.find(n => n.id === edge.to)!
            
            const fromOffset = from.isExternal ? extSize / 2 + 5 : nodeRadius + 5
            const toOffset = to.isExternal ? extSize / 2 + 5 : nodeRadius + 5
            
            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2 - 15
            
            return (
              <motion.path
                key={index}
                d={`M ${from.x + fromOffset} ${from.y} Q ${midX} ${midY} ${to.x - toOffset} ${to.y}`}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                markerEnd="url(#arrow-ext-primary)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              />
            )
          })}

          {/* External Nodes (rectangles) */}
          {nodes.filter(n => n.isExternal).map((node, index) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <rect
                x={node.x - extSize / 2}
                y={node.y - extSize / 2}
                width={extSize}
                height={extSize}
                rx={12}
                fill={node.color}
                filter="url(#shadow-ext)"
              />
              
              {/* Icon */}
              <foreignObject
                x={node.x - 14}
                y={node.y - 14}
                width={28}
                height={28}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  w="28px"
                  h="28px"
                  color="white"
                >
                  {node.icon === 'github' && <FiGithub size={22} />}
                  {node.icon === 'gitlab' && <GitLabIcon size={22} />}
                </Box>
              </foreignObject>
              
              {/* Label */}
              <foreignObject
                x={node.x - 50}
                y={node.y + extSize / 2 + 4}
                width={100}
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
          ))}

          {/* Internal Nodes (circles) */}
          {nodes.filter(n => !n.isExternal).map((node, index) => {
            const IconComponent = node.icon as IconType
            return (
              <motion.g
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius}
                  fill="white"
                  stroke={node.color}
                  strokeWidth={3}
                  filter="url(#shadow-ext)"
                />
                
                {/* Icon */}
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
      <Box px={5} py={3} bg="orange.50" borderTop="1px solid" borderColor="orange.200">
        <Text fontSize="xs" color="orange.700" textAlign="center">
          ⚠️ 2 external systems • 4 connections detected
        </Text>
      </Box>
    </Box>
  )
}

export default ExternalCodeScanPreview
