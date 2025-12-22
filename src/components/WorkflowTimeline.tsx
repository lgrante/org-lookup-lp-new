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
      title: "Detect obsolete components of your org",
      subtitle: "Get a Prioritized List of Technical Debt",
      description: [
        "Surface <strong>risky or low-value metadata</strong> (fields, objects, Flows, classes, etc.)",
        "<strong>Score items</strong> by usage, recency, dependency depth",
        "<strong>Build a realistic cleanup backlog</strong> filtered by object, business area, or risk"
      ],
      component: <ObsoleteDetectionPreview />
    },
    {
      step: 2,
      title: "Analyze the impact of deleting these components",
      subtitle: "See What Might Break Before You Change Anything",
      description: [
        "<strong>Interactive dependency map</strong>: Flows ⇄ Apex ⇄ Validation Rules ⇄ Layouts ⇄ Reports",
        "<strong>Detect overlapping or redundant automation</strong>",
        "<strong>Generate shareable visuals</strong> to align admins, devs, and business stakeholders"
      ],
      component: <ImpactAnalysisPreview />
    },
    {
      step: 3,
      title: "Scan beyond Salesforce org for external code dependencies",
      subtitle: "Find External Dependencies Automatically",
      description: [
        "<strong>Connect GitHub/GitLab/Bitbucket</strong>",
        "<strong>Detect references</strong> in Apex, JS, integrations, scheduled scripts",
        "<strong>Avoid breaking APIs or data pipelines</strong> tied to legacy fields"
      ],
      component: <ExternalCodeScanPreview />
    },
    {
      step: 4,
      title: "Add components to deletion queue",
      subtitle: "Review and Organize Your Selected Metadata",
      description: [
        "<strong>View all metadata items</strong> you've added to the deletion queue from steps 1 and 2",
        "<strong>Review the consolidated list</strong> of selected items",
        "<strong>Organize and manage</strong> your deletion queue before execution"
      ],
      component: <DeletionQueuePreview />
    },
    {
      step: 5,
      title: "AI guide you through safe step-by-step deletion plan",
      subtitle: "Interactive Action Plan with AI Agent",
      description: [
        "<strong>AI Agent-Driven Plan</strong>: The agent generates a step-by-step action plan for cleanup",
        "<strong>Interactive Review</strong>: Review actions with a side-by-side diff view",
        "<strong>Full Control</strong>: Accept, refuse, or <strong>manually edit</strong> any action yourself"
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
                How OrgLookup Works
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} color="var(--color-text-secondary)" maxW="600px">
                Transform months of listing, cleaning and refacto into minutes
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
