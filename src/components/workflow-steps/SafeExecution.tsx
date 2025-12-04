import { Box, VStack, HStack, Text, Badge, Progress, Divider, Button, Avatar } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiTrash2, FiTool, FiArchive, FiLink, FiAlertTriangle, FiMail, FiHardDrive, FiCheck, FiX, FiUserPlus, FiClock, FiCalendar, FiPlay, FiFileText } from 'react-icons/fi'

interface ExecutionTask {
  id: string
  type: 'delete' | 'refactor' | 'archive' | 'update-ref' | 'deprecate' | 'notify' | 'backup' | 'test'
  title: string
  description: string
  files: string[]
  riskLevel: 'low' | 'medium' | 'high'
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed'
  assignedTo?: string
  dueDate?: string
}

const mockTasks: ExecutionTask[] = [
  {
    id: '1',
    type: 'delete',
    title: 'Delete "AccountCleanupBatch" Apex Class',
    description: 'Remove unused batch class and associated test class',
    files: ['AccountCleanupBatch.cls', 'AccountCleanupBatchTest.cls'],
    riskLevel: 'low',
    status: 'pending',
    dueDate: 'Dec 5, 2024'
  },
  {
    id: '2',
    type: 'refactor',
    title: 'Refactor "LeadService" references',
    description: 'Update all references before removing deprecated methods',
    files: ['LeadService.cls', 'LeadController.cls'],
    riskLevel: 'medium',
    status: 'approved',
    assignedTo: 'Marie D.',
    dueDate: 'Dec 6, 2024'
  },
  {
    id: '3',
    type: 'backup',
    title: 'Backup "Opportunity_Flow" before deletion',
    description: 'Create automated backup of flow definition',
    files: ['Opportunity_AutoClose.flow-meta.xml'],
    riskLevel: 'low',
    status: 'completed',
  },
  {
    id: '4',
    type: 'notify',
    title: 'Notify stakeholders about API changes',
    description: 'Send notification to external team about deprecated endpoints',
    files: [],
    riskLevel: 'medium',
    status: 'pending',
  },
]

const getTaskIcon = (type: string) => {
  switch (type) {
    case 'delete': return <FiTrash2 size={20} />
    case 'refactor': return <FiTool size={20} />
    case 'archive': return <FiArchive size={20} />
    case 'update-ref': return <FiLink size={20} />
    case 'deprecate': return <FiAlertTriangle size={20} />
    case 'notify': return <FiMail size={20} />
    case 'backup': return <FiHardDrive size={20} />
    case 'test': return <FiFileText size={20} />
    default: return <FiFileText size={20} />
  }
}

const getTaskColor = (type: string) => {
  switch (type) {
    case 'delete': return 'red.500'
    case 'refactor': return 'blue.500'
    case 'archive': return 'gray.500'
    case 'update-ref': return 'purple.500'
    case 'deprecate': return 'orange.500'
    case 'notify': return 'green.500'
    case 'backup': return 'cyan.500'
    case 'test': return 'yellow.500'
    default: return 'gray.500'
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending': return <Badge colorScheme="gray">⏳ Pending Review</Badge>
    case 'approved': return <Badge colorScheme="green">✅ Approved</Badge>
    case 'rejected': return <Badge colorScheme="red">❌ Rejected</Badge>
    case 'in-progress': return <Badge colorScheme="orange">🔄 In Progress</Badge>
    case 'completed': return <Badge colorScheme="green">✔️ Completed</Badge>
    default: return <Badge colorScheme="gray">{status}</Badge>
  }
}

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'low': return <Badge colorScheme="green" size="sm">Low Risk 🟢</Badge>
    case 'medium': return <Badge colorScheme="yellow" size="sm">Medium Risk 🟡</Badge>
    case 'high': return <Badge colorScheme="red" size="sm">High Risk 🔴</Badge>
    default: return null
  }
}

const SafeExecution = () => {
  const approvedCount = mockTasks.filter(t => t.status === 'approved' || t.status === 'completed').length
  const totalCount = mockTasks.length

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
                Execution Plan
              </Text>
              <Text color="whiteAlpha.800" fontSize="sm">
                Review and approve each action
              </Text>
            </VStack>
            <HStack spacing={4}>
              <HStack>
                <Progress 
                  value={(approvedCount / totalCount) * 100} 
                  w="120px" 
                  colorScheme="green" 
                  bg="whiteAlpha.300"
                  borderRadius="full"
                />
                <Text color="white" fontSize="sm">{approvedCount}/{totalCount}</Text>
              </HStack>
            </HStack>
          </HStack>
        </Box>

        {/* Filter Tabs */}
        <Box px={6} py={3} bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
          <HStack spacing={4}>
            {['All', 'Pending', 'Approved', 'Rejected'].map((tab, index) => (
              <Box
                key={tab}
                px={4}
                py={1.5}
                borderRadius="full"
                bg={index === 0 ? 'var(--color-primary)' : 'transparent'}
                color={index === 0 ? 'white' : 'gray.600'}
                fontSize="sm"
                fontWeight="medium"
                cursor="pointer"
                _hover={{ bg: index === 0 ? 'var(--color-primary)' : 'gray.200' }}
              >
                {tab}
              </Box>
            ))}
          </HStack>
        </Box>

        {/* Content: Tasks + Impact Panel */}
        <HStack align="stretch" spacing={0}>
          {/* Tasks List */}
          <Box flex={1} maxH="450px" overflowY="auto">
            <VStack spacing={0} divider={<Divider />}>
              {mockTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ width: '100%' }}
                >
                  <Box
                    px={6}
                    py={5}
                    _hover={{ bg: 'gray.50' }}
                    transition="background 0.2s"
                  >
                    <HStack spacing={4} align="start">
                      {/* Task Icon */}
                      <Box
                        w="48px"
                        h="48px"
                        borderRadius="lg"
                        bg={`${getTaskColor(task.type).replace('.500', '.100')}`}
                        color={getTaskColor(task.type)}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        {getTaskIcon(task.type)}
                      </Box>

                      {/* Task Content */}
                      <VStack align="start" spacing={2} flex={1}>
                        <Text fontWeight="bold" fontSize="md">{task.title}</Text>
                        <Text fontSize="sm" color="gray.600">{task.description}</Text>
                        
                        {task.files.length > 0 && (
                          <Box bg="gray.100" p={2} borderRadius="md" w="100%">
                            {task.files.map(file => (
                              <Text key={file} fontSize="xs" color="gray.700">• {file}</Text>
                            ))}
                            {getRiskBadge(task.riskLevel)}
                          </Box>
                        )}

                        <HStack spacing={4} fontSize="sm">
                          {getStatusBadge(task.status)}
                          {task.assignedTo && (
                            <HStack>
                              <Avatar size="xs" name={task.assignedTo} />
                              <Text color="gray.600">Assigned to: {task.assignedTo}</Text>
                            </HStack>
                          )}
                          {task.dueDate && (
                            <HStack color="gray.500">
                              <FiClock size={14} />
                              <Text>Due: {task.dueDate}</Text>
                            </HStack>
                          )}
                        </HStack>

                        {/* Action Buttons */}
                        {task.status === 'pending' && (
                          <HStack spacing={2} pt={2}>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              colorScheme="red"
                              leftIcon={<FiX />}
                            >
                              Reject
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              colorScheme="blue"
                              leftIcon={<FiUserPlus />}
                            >
                              Assign
                            </Button>
                            <Button 
                              size="sm" 
                              colorScheme="green"
                              leftIcon={<FiCheck />}
                            >
                              Approve
                            </Button>
                          </HStack>
                        )}
                      </VStack>
                    </HStack>
                  </Box>
                </motion.div>
              ))}
            </VStack>
          </Box>

          {/* Impact Preview Panel */}
          <Box 
            w="320px" 
            bg="gray.50" 
            borderLeft="1px solid" 
            borderColor="gray.200"
            p={5}
            overflowY="auto"
            maxH="450px"
          >
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" fontSize="lg">
                IMPACT PREVIEW
              </Text>
              <Divider />
              
              {/* Before → After */}
              <VStack align="stretch" spacing={2}>
                <Text fontWeight="medium" fontSize="sm">📊 BEFORE → AFTER</Text>
                <Box bg="white" p={3} borderRadius="md" border="1px solid" borderColor="gray.200">
                  <VStack align="stretch" spacing={1} fontSize="sm">
                    <HStack justify="space-between">
                      <Text color="gray.600">Metadata Count:</Text>
                      <Text>1,247 → <Text as="span" color="green.500">1,245</Text> (-2)</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.600">Code Lines:</Text>
                      <Text>45,892 → <Text as="span" color="green.500">45,045</Text> (-847)</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.600">Test Coverage:</Text>
                      <Text>78% → <Text as="span" color="green.500">79%</Text> (+1%)</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.600">Complexity:</Text>
                      <Text>67 → <Text as="span" color="green.500">52</Text> (-15)</Text>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>

              <Divider />

              {/* Affected Components */}
              <VStack align="stretch" spacing={2}>
                <Text fontWeight="medium" fontSize="sm">📋 AFFECTED COMPONENTS</Text>
                <Box bg="white" p={3} borderRadius="md" border="1px solid" borderColor="gray.200">
                  <VStack align="stretch" spacing={1} fontSize="xs">
                    <HStack><Text color="green.500">✅</Text><Text>AccountCleanupBatch.cls</Text><Text color="gray.400">Will be deleted</Text></HStack>
                    <HStack><Text color="green.500">✅</Text><Text>AccountCleanupBatchTest.cls</Text><Text color="gray.400">Will be deleted</Text></HStack>
                    <HStack><Text color="orange.500">⚠️</Text><Text>ScheduledJobs</Text><Text color="gray.400">Ref removed</Text></HStack>
                    <HStack><Text color="blue.500">ℹ️</Text><Text>AccountService.cls</Text><Text color="gray.400">No impact</Text></HStack>
                  </VStack>
                </Box>
              </VStack>

              <Divider />

              {/* Rollback Info */}
              <VStack align="stretch" spacing={2}>
                <Text fontWeight="medium" fontSize="sm">🔄 ROLLBACK INFO</Text>
                <Box bg="green.50" p={3} borderRadius="md" border="1px solid" borderColor="green.200">
                  <Text fontSize="xs" color="green.700">
                    Automatic backup will be created before deletion. Rollback available for 30 days.
                  </Text>
                </Box>
              </VStack>

              <Divider />

              {/* Warnings */}
              <VStack align="stretch" spacing={2}>
                <Text fontWeight="medium" fontSize="sm">⚠️ WARNINGS</Text>
                <Box bg="orange.50" p={3} borderRadius="md" border="1px solid" borderColor="orange.200">
                  <VStack align="start" spacing={1} fontSize="xs" color="orange.700">
                    <Text>• Scheduled job will be auto-unscheduled</Text>
                    <Text>• No active dependencies detected</Text>
                  </VStack>
                </Box>
              </VStack>
            </VStack>
          </Box>
        </HStack>

        {/* Footer */}
        <Box px={6} py={4} bg="gray.100" borderTop="1px solid" borderColor="gray.200">
          <HStack justify="space-between">
            <HStack spacing={2}>
              <Text fontSize="sm" color="gray.600">Progress:</Text>
              <Progress 
                value={(approvedCount / totalCount) * 100} 
                w="200px" 
                colorScheme="green" 
                size="sm"
                borderRadius="full"
              />
              <Text fontSize="sm" fontWeight="medium">{approvedCount}/{totalCount} approved</Text>
            </HStack>
            <HStack spacing={3}>
              <Button 
                size="md" 
                variant="outline"
                leftIcon={<FiCalendar />}
              >
                Schedule Execution
              </Button>
              <Button 
                size="md" 
                colorScheme="green"
                leftIcon={<FiPlay />}
              >
                Execute Now
              </Button>
              <Button 
                size="md" 
                variant="ghost"
                leftIcon={<FiFileText />}
              >
                Export Plan
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </motion.div>
  )
}

export default SafeExecution
