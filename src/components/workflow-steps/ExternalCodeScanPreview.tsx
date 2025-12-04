import { Box, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiGithub, FiBox, FiZap, FiDatabase } from 'react-icons/fi'

const GitLabIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
)

const ExternalCodeScanPreview = () => {
  // Coordonnées en pixels sur un viewBox de 600x280
  const nodes = [
    { id: 1, label: 'Lead Web Form', type: 'GitHub', x: 100, y: 90, color: '#24292e', icon: 'github', isExternal: true },
    { id: 2, label: 'Mass Import Script', type: 'GitLab', x: 100, y: 190, color: '#fc6d26', icon: 'gitlab', isExternal: true },
    { id: 3, label: 'LeadAPI', type: 'Apex', x: 320, y: 140, color: '#6366f1', icon: FiBox },
    { id: 4, label: 'LeadTrigger', type: 'Trigger', x: 500, y: 90, color: '#f97316', icon: FiZap },
    { id: 5, label: 'Lead__c', type: 'Object', x: 500, y: 190, color: '#22c55e', icon: FiDatabase },
  ]

  const edges = [
    { from: 1, to: 3, color: '#3b82f6', dashed: false },
    { from: 2, to: 3, color: '#22c55e', dashed: true },
    { from: 3, to: 4, color: '#94a3b8', dashed: false },
    { from: 3, to: 5, color: '#94a3b8', dashed: false },
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
          External Dependencies
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
            <marker id="arrow-ext-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
            <marker id="arrow-ext-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
            <marker id="arrow-ext-gray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>
          
          {/* Edges */}
          {edges.map((edge, index) => {
            const from = nodes.find(n => n.id === edge.from)!
            const to = nodes.find(n => n.id === edge.to)!
            
            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2 - 15
            
            const markerId = edge.color === '#3b82f6' ? 'arrow-ext-blue' : 
                            edge.color === '#22c55e' ? 'arrow-ext-green' : 'arrow-ext-gray'
            
            return (
              <motion.path
                key={index}
                d={`M ${from.x + 30} ${from.y} Q ${midX} ${midY} ${to.x - 25} ${to.y}`}
                fill="none"
                stroke={edge.color}
                strokeWidth={2.5}
                strokeDasharray={edge.dashed ? "8,4" : "none"}
                markerEnd={`url(#${markerId})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              />
            )
          })}

          {/* External node backgrounds (rectangles) */}
          {nodes.filter(n => n.isExternal).map((node, index) => (
            <motion.rect
              key={node.id}
              x={node.x - 28}
              y={node.y - 28}
              width={56}
              height={56}
              rx={12}
              fill={node.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
            />
          ))}

          {/* Internal node circles */}
          {nodes.filter(n => !n.isExternal).map((node, index) => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={24}
              fill="white"
              stroke={node.color}
              strokeWidth={3}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          ))}
        </svg>

        {/* Node icons and labels (HTML overlay) */}
        {nodes.map((node, index) => {
          const isExternal = node.isExternal
          const IconComponent = typeof node.icon === 'function' ? node.icon : null
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
                  w={isExternal ? "56px" : "48px"}
                  h={isExternal ? "56px" : "48px"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={isExternal ? "white" : node.color}
                >
                  {node.icon === 'github' && <FiGithub size={24} />}
                  {node.icon === 'gitlab' && <GitLabIcon size={24} />}
                  {IconComponent && <IconComponent size={20} />}
                </Box>
                <Text 
                  fontSize="8px" 
                  fontWeight="bold" 
                  color="gray.700"
                  textAlign="center"
                  maxW="75px"
                  lineHeight={1.1}
                  mt={isExternal ? 0 : 1}
                >
                  {node.label}
                </Text>
              </VStack>
            </motion.div>
          )
        })}
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
