import { useState } from 'react'
import { Box, Heading, Text, VStack, HStack, Badge, Flex } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn } from '../utils/animations'
import { 
  ObsoleteDetectionPreview, 
  ImpactAnalysisPreview, 
  ExternalCodeScanPreview, 
  DeletionQueuePreview, 
  SafeExecutionPreview 
} from './workflow-steps'

const WorkflowTimeline = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      step: 1,
      title: "Get your Agentic Readiness Score",
      subtitle: "Instant AI-Oriented Health Diagnostic",
      description: [
        "<strong>Agentic Readiness Score</strong>: know exactly where your org stands before deploying AI agents",
        "Surface <strong>metadata, automation, security & integration debt</strong> — ranked by AI risk, not just usage",
        "<strong>Prioritized action backlog</strong> filtered by object, business area, and blast radius"
      ],
      component: <ObsoleteDetectionPreview />
    },
    {
      step: 2,
      title: "Investigate with your AI-powered org assistant",
      subtitle: "Ask Anything. See the Full Dependency Graph.",
      description: [
        "<strong>Natural language search</strong> across your entire org — \"Which Permission Set can trigger this Apex class?\"",
        "<strong>Interactive dependency map</strong>",
        "<strong>Cross-system visibility</strong>: GitHub/GitLab repos, ERPs, middlewares — all connected"
      ],
      component: <ImpactAnalysisPreview />
    },
    {
      step: 3,
      title: "Map every external dependency & integration",
      subtitle: "Zero Blind Spot — No Shield License Required",
      description: [
        "<strong>Identify all connected apps</strong>: ERPs (SAP, Oracle), Marketing (HubSpot), and BI (PowerBI, Tableau)",
        "<strong>Predictive Deep Scan</strong>: AI-guided polling of debug logs to capture 100% of read queries",
        "<strong>Sentinel Monitoring</strong>: Auto-injected triggers to map hidden REST/Bulk API write payloads"
      ],
      component: <ExternalCodeScanPreview />
    },
    {
      step: 4,
      title: "Organize your cleanup into AI-suggested packs",
      subtitle: "Smart Clustering — No More One-by-One Selection",
      description: [
        "<strong>AI groups related components</strong> into logical Cleanup Packs by project, team, or domain",
        "Example: \"12 components tied to your legacy Partner Portal 2019 — archive the whole pack?\"",
        "<strong>Drag packs into named queues</strong>: Sprint Cleanup Q1, AI Readiness Wave 1…"
      ],
      component: <DeletionQueuePreview />
    },
    {
      step: 5,
      title: "Execute with AI — stay in control at every step",
      subtitle: "Accept, Refuse, Review — with Instant Rollback",
      description: [
        "<strong>AI generates a step-by-step plan</strong> like a senior dev would: PR on GitLab → deactivate Flows → remove permissions → delete fields",
        "<strong>Full control</strong>: Accept, Refuse, Review or Assign each action to a teammate",
        "<strong>Built-in rollback</strong>: snapshot before every step — restore anything, instantly, without restoring the full org"
      ],
      component: <SafeExecutionPreview />
    }
  ]

  return (
    <Box 
      as="section" 
      py={20} 
      width="100%"
      bg="white"
      position="relative"
    >
      <Box 
        maxW="1400px" 
        mx="auto" 
        px={{ base: 4, md: 8 }}
        width="100%"
      >
        <VStack spacing={8} width="100%" mb={20}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" size="3xl" color="gray.900">
                From Diagnosis to Safe Execution
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} color="gray.500" maxW="600px">
                Your org's AI readiness journey — from the first scan to a clean, agent-ready Salesforce
              </Text>
            </VStack>
          </motion.div>
        </VStack>

        <Flex 
          position="relative" 
          align="flex-start" 
          w="full"
          display={{ base: "none", lg: "flex" }} 
        >
          {/* Left Column: Scrollable Text (Sticky triggers) */}
          <Box w="45%" pr={12} pb="30vh">
            {steps.map((step, index) => (
              <Box 
                key={index}
                h="60vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <motion.div
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  onViewportEnter={() => setActiveStep(index)}
                  viewport={{ margin: "-45% 0px -45% 0px", once: false }}
                  transition={{ duration: 0.5 }}
                >
                  <VStack align="flex-start" spacing={5} maxW="500px">
                    <Badge 
                      colorScheme="purple" 
                      variant="subtle" 
                      px={3} 
                      py={1} 
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      Step {step.step} / 5
                    </Badge>
                    <Heading as="h3" size="xl" color="gray.800" lineHeight={1.2}>
                      {step.title}
                    </Heading>
                    <Text fontSize="lg" fontWeight="bold" bgGradient="linear(to-r, #e768e6, #ff9b26)" bgClip="text">
                      {step.subtitle}
                    </Text>
                    
                    <VStack align="flex-start" spacing={3} mt={2}>
                      {step.description.map((desc, idx) => (
                        <HStack key={idx} align="flex-start" spacing={3}>
                          <Box 
                            w="6px" 
                            h="6px" 
                            borderRadius="full" 
                            bg="purple.500" 
                            mt="10px"
                            flexShrink={0}
                          />
                          <Text 
                            color="gray.600" 
                            fontSize="md" 
                            lineHeight={1.6}
                            dangerouslySetInnerHTML={{ __html: desc }}
                          />
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </motion.div>
              </Box>
            ))}
          </Box>

          {/* Right Column: Sticky Visual Container */}
          <Box 
            w="55%" 
            position="sticky" 
            top="20vh" 
            h="auto" 
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Box
                  bg="white"
                  borderRadius="24px"
                  boxShadow="0 20px 60px rgba(0,0,0,0.1)"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.200"
                  w="100%"
                  maxW="650px"
                  h="450px"
                >
                  {steps[activeStep].component}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Flex>

        {/* Fallback for smaller screens (handled by MobileWorkflowTimeline usually, but safe to hide this) */}
      </Box>
    </Box>
  )
}

export default WorkflowTimeline
