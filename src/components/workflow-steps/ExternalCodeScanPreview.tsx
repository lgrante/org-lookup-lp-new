import { Box, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiGithub, FiBox, FiZap, FiDatabase } from 'react-icons/fi'

const GitLabIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
)

const ExternalCodeScanPreview = () => {
  const nodes = [
    { id: 1, label: 'Lead Web Form', type: 'GitHub', x: 20, y: 30, color: '#24292e', icon: 'github', isExternal: true },
    { id: 2, label: 'Mass Import Script', type: 'GitLab', x: 20, y: 70, color: '#fc6d26', icon: 'gitlab', isExternal: true },
    { id: 3, label: 'LeadAPI', type: 'Apex', x: 55, y: 50, color: '#6366f1', icon: FiBox },
    { id: 4, label: 'LeadTrigger', type: 'Trigger', x: 80, y: 30, color: '#f97316', icon: FiZap },
    { id: 5, label: 'Lead__c', type: 'Object', x: 80, y: 70, color: '#22c55e', icon: FiDatabase },
  ]

  const edges = [
    { from: 1, to: 3, color: '#3b82f6', dashed: false },
    { from: 2, to: 3, color: '#22c55e', dashed: true },
    { from: 3, to: 4, color: '#cbd5e1', dashed: false },
    { from: 3, to: 5, color: '#cbd5e1', dashed: false },
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
      <Box position="relative" flex={1} bg="gray.50">
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <marker id="arrow-ext-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
            </marker>
            <marker id="arrow-ext-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
            </marker>
            <marker id="arrow-ext-gray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
            </marker>
          </defs>
          
          {/* Edges */}
          {edges.map((edge, index) => {
            const from = nodes.find(n => n.id === edge.from)!
            const to = nodes.find(n => n.id === edge.to)!
            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2 - 5
            const markerId = edge.color === '#3b82f6' ? 'arrow-ext-blue' : 
                            edge.color === '#22c55e' ? 'arrow-ext-green' : 'arrow-ext-gray'
            
            return (
              <motion.path
                key={index}
                d={`M ${from.x + 8}% ${from.y}% Q ${midX}% ${midY}% ${to.x - 5}% ${to.y}%`}
                fill="none"
                stroke={edge.color}
                strokeWidth={2}
                strokeDasharray={edge.dashed ? "6,3" : "none"}
                markerEnd={`url(#${markerId})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const isExternal = node.isExternal
          const IconComponent = typeof node.icon === 'function' ? node.icon : null
          
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
                  w={isExternal ? "48px" : "44px"}
                  h={isExternal ? "48px" : "44px"}
                  borderRadius={isExternal ? "12px" : "full"}
                  bg={isExternal ? node.color : "white"}
                  border={isExternal ? "none" : "3px solid"}
                  borderColor={node.color}
                  boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={isExternal ? "white" : node.color}
                >
                  {node.icon === 'github' && <FiGithub size={20} />}
                  {node.icon === 'gitlab' && <GitLabIcon size={20} />}
                  {IconComponent && <IconComponent size={18} />}
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
      <Box px={5} py={3} bg="orange.50" borderTop="1px solid" borderColor="orange.200">
        <Text fontSize="xs" color="orange.700" textAlign="center">
          ⚠️ 2 external systems • 4 connections detected
        </Text>
      </Box>
    </Box>
  )
}

export default ExternalCodeScanPreview
