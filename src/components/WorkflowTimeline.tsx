import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import TimelineStep from './TimelineStep'
import { fadeIn, staggerContainer } from '../utils/animations'
import { 
  ObsoleteDetectionPreview, 
  ImpactAnalysisPreview, 
  ExternalCodeScanPreview, 
  DeletionQueuePreview, 
  SafeExecutionPreview 
} from './workflow-steps'

const WorkflowTimeline = () => {
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
    >
      <Box 
        maxW="2600px" 
        mx="auto" 
        px={{ base: 4, md: 8 }}
        width="100%"
      >
        <VStack spacing={16} width="100%">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" size="3xl" color="var(--color-text-primary)">
                From Diagnosis to Safe Execution
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} color="var(--color-text-secondary)" maxW="600px">
                Your org's AI readiness journey — from the first scan to a clean, agent-ready Salesforce
              </Text>
            </VStack>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            style={{ width: "100%" }}
          >
            <VStack spacing={{ base: 32, md: 40 }} align="stretch">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.step}
                step={step.step}
                title={step.title}
                subtitle={step.subtitle}
                description={step.description}
                component={step.component}
                isLast={index === steps.length - 1}
                isReversed={index % 2 === 1}
              />
            ))}
          </VStack>
          </motion.div>
        </VStack>
      </Box>
    </Box>
  )
}

export default WorkflowTimeline
