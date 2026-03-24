import { Box, Heading, Text, VStack, HStack, Circle, Badge } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { fadeIn } from '../../utils/animations'

// Import workflow step previews
import { 
  ObsoleteDetectionPreview, 
  ImpactAnalysisPreview, 
  ExternalCodeScanPreview, 
  DeletionQueuePreview, 
  SafeExecutionPreview 
} from '../workflow-steps'

interface Step {
  step: number
  title: string
  subtitle: string
  description: string[]
  preview: ReactNode
}

const MobileWorkflowTimeline = () => {
  const steps: Step[] = [
    {
      step: 1,
      title: "Get your Agentic Readiness Score",
      subtitle: "Instant AI-Oriented Health Diagnostic",
      description: [
        "<strong>Agentic Readiness Score</strong>: know exactly where your org stands before deploying AI",
        "Surface <strong>metadata, automation, security & integration debt</strong>",
        "<strong>Prioritized action backlog</strong> by AI risk, not just usage"
      ],
      preview: <ObsoleteDetectionPreview />
    },
    {
      step: 2,
      title: "Investigate with your AI Assistant",
      subtitle: "Ask Anything. See the Full Graph.",
      description: [
        "<strong>Natural language search</strong> across your entire org",
        "<strong>Interactive dependency map</strong> for flows, apex, and rules",
        "<strong>Cross-system visibility</strong>: GitHub, ERPs, and more"
      ],
      preview: <ImpactAnalysisPreview />
    },
    {
      step: 3,
      title: "Map every external dependency",
      subtitle: "Zero Blind Spot — No Shield License",
      description: [
        "Identify connected apps (SAP, HubSpot, PowerBI)",
        "<strong>Predictive Deep Scan</strong> captures 100% of read queries",
        "<strong>Sentinel Monitoring</strong> maps hidden REST/Bulk write payloads"
      ],
      preview: <ExternalCodeScanPreview />
    },
    {
      step: 4,
      title: "Organize into AI Cleanup Packs",
      subtitle: "Smart Clustering — No One-by-One",
      description: [
        "<strong>AI groups related tools</strong> by project, team, or domain",
        "Example: \"12 components tied to legacy Partner Portal\"",
        "Organize cleanup into named Waves (Q1, Wave 2…)"
      ],
      preview: <DeletionQueuePreview />
    },
    {
      step: 5,
      title: "Safe Execution & Rollback",
      subtitle: "AI Plan with Surgical Restore",
      description: [
        "AI generates a senior-dev plan: PR → Deactivate → Delete",
        "<strong>Total Control</strong>: Accept, Refuse, or Assign each action",
        "<strong>Snapshot before every step</strong> — restore anything, instantly"
      ],
      preview: <SafeExecutionPreview />
    }
  ]

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  }

  const stepVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  return (
    <Box as="section" py={12} width="100%" bg="white">
      <Box px={4} width="100%">
        <VStack spacing={10} width="100%">
          {/* Header */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" fontSize="2xl" color="gray.900" fontWeight="bold">
                From Diagnosis to Safe Execution
              </Heading>
              <Text fontSize="md" color="gray.500">
                Your org's AI readiness journey — from the first scan to a clean, agent-ready Salesforce
              </Text>
            </VStack>
          </motion.div>

          {/* Timeline Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            <Box position="relative" pl={8}>
              {/* Vertical Timeline Line */}
              <Box
                position="absolute"
                left="8px"
                top="24px"
                bottom="24px"
                width="3px"
                bg="purple.100"
                borderRadius="full"
              />

              <VStack spacing={10} align="stretch">
                {steps.map((step) => (
                  <motion.div key={step.step} variants={stepVariant}>
                    <Box position="relative">
                      {/* Step Number Circle */}
                      <Circle
                        size="8"
                        bg="purple.500"
                        color="white"
                        fontSize="sm"
                        fontWeight="bold"
                        position="absolute"
                        left="-34px"
                        top="0"
                        boxShadow="0 2px 10px rgba(168, 85, 247, 0.4)"
                        border="4px solid white"
                        zIndex={2}
                      >
                        {step.step}
                      </Circle>

                      {/* Step Content Card */}
                      <Box
                        bg="white"
                        borderRadius="20px"
                        border="1px solid"
                        borderColor="gray.100"
                        overflow="hidden"
                        boxShadow="sm"
                        w="full"
                      >
                        {/* Text Content */}
                        <Box p={5}>
                          <VStack spacing={4} align="flex-start">
                            <VStack spacing={2} align="flex-start">
                              <Badge 
                                colorScheme="purple" 
                                variant="subtle" 
                                px={2} 
                                py={0.5} 
                                borderRadius="full"
                                fontSize="2xs"
                                fontWeight="bold"
                              >
                                STEP {step.step}
                              </Badge>
                              <Heading as="h3" fontSize="lg" fontWeight="bold" color="gray.800" lineHeight={1.3}>
                                {step.title}
                              </Heading>
                              <Text fontSize="md" fontWeight="bold" bgGradient="linear(to-r, #e768e6, #ff9b26)" bgClip="text">
                                {step.subtitle}
                              </Text>
                            </VStack>

                            <VStack spacing={3} align="flex-start" w="full">
                              {step.description.map((item, idx) => (
                                <HStack key={idx} spacing={4} align="flex-start">
                                  <Box w="6px" h="6px" borderRadius="full" bg="purple.400" mt="6px" flexShrink={0} />
                                  <Text fontSize="md" color="gray.600" lineHeight={1.5} dangerouslySetInnerHTML={{ __html: item }} />
                                </HStack>
                              ))}
                            </VStack>
                          </VStack>
                        </Box>

                        {/* Preview Visual - Scaled to fit */}
                        <Box
                          borderTop="1px solid"
                          borderColor="gray.100"
                          bg="gray.50"
                          overflow="hidden"
                          position="relative"
                          p={2}
                        >
                          <Box
                            transform="scale(0.55)"
                            transformOrigin="top left"
                            width="600px"
                            height="380px"
                            marginBottom="-160px"
                            marginRight="-260px"
                          >
                            {step.preview}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </VStack>
            </Box>
          </motion.div>
        </VStack>
      </Box>
    </Box>
  )
}

export default MobileWorkflowTimeline
