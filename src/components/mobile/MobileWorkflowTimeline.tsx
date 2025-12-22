import { Box, Heading, Text, VStack, HStack, Circle } from '@chakra-ui/react'
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
      title: "Instant Obsolete Detection",
      subtitle: "Get a Prioritized List of Technical Debt",
      description: [
        "Surface risky or low-value metadata",
        "Score items by usage, recency, dependency depth",
        "Build a realistic cleanup backlog"
      ],
      preview: <ObsoleteDetectionPreview />
    },
    {
      step: 2,
      title: "Visual Impact Analysis",
      subtitle: "See What Might Break Before You Change Anything",
      description: [
        "Interactive dependency map: Flows ⇄ Apex ⇄ Validation Rules",
        "Detect overlapping automation",
        "Generate shareable visuals"
      ],
      preview: <ImpactAnalysisPreview />
    },
    {
      step: 3,
      title: "External Code Scanning",
      subtitle: "Find External Dependencies Automatically",
      description: [
        "Connect GitHub/GitLab/Bitbucket",
        "Detect references in Apex, JS, integrations",
        "Avoid breaking APIs or data pipelines"
      ],
      preview: <ExternalCodeScanPreview />
    },
    {
      step: 4,
      title: "Create Deletion Queue",
      subtitle: "Review and Organize Your Selected Metadata",
      description: [
        "View all metadata items in the deletion queue",
        "Review the consolidated list",
        "Organize before execution"
      ],
      preview: <DeletionQueuePreview />
    },
    {
      step: 5,
      title: "Automated Safe Execution",
      subtitle: "Execute with Confidence",
      description: [
        "Generate a safe, step-by-step action plan",
        "Generate deployment-ready metadata packages",
        "Track every change for future auditors"
      ],
      preview: <SafeExecutionPreview />
    }
  ]

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const stepVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  }

  return (
    <Box 
      as="section" 
      py="60px"
      width="100%"
      bg="var(--color-bg)"
    >
      <Box px={4} width="100%">
        <VStack spacing={8} width="100%">
          {/* Header */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
          >
            <VStack spacing={2} textAlign="center">
              <Heading as="h2" fontSize="xl" color="var(--color-text-primary)">
                How OrgLookup Works
              </Heading>
              <Text fontSize="sm" color="var(--color-text-secondary)">
                Transform months of cleanup into minutes
              </Text>
            </VStack>
          </motion.div>

          {/* Timeline Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            <Box position="relative" pl={10}>
              {/* Vertical Timeline Line */}
              <Box
                position="absolute"
                left="16px"
                top="24px"
                bottom="24px"
                width="3px"
                bg="var(--color-primary)"
                borderRadius="full"
                opacity={0.3}
              />

              <VStack spacing={6} align="stretch">
                {steps.map((step, index) => (
                  <motion.div key={step.step} variants={stepVariant}>
                    <Box position="relative">
                      {/* Step Number Circle */}
                      <Circle
                        size="32px"
                        bg="var(--color-primary)"
                        color="white"
                        fontSize="sm"
                        fontWeight="bold"
                        position="absolute"
                        left="-40px"
                        top="0"
                        boxShadow="0 2px 8px rgba(0, 98, 137, 0.3)"
                      >
                        {step.step}
                      </Circle>

                      {/* Step Content Card */}
                      <Box
                        bg="white"
                        borderRadius="12px"
                        border="1px solid var(--color-gray-200)"
                        overflow="hidden"
                        boxShadow="sm"
                        maxW="312px"
                        w="full"
                      >
                        {/* Text Content */}
                        <Box p={4}>
                          <VStack spacing={3} align="flex-start">
                            {/* Title & Subtitle */}
                            <VStack spacing={1} align="flex-start">
                              <Heading
                                as="h3"
                                fontSize="md"
                                fontWeight="bold"
                                color="var(--color-text-primary)"
                                fontFamily="'Vend Sans', sans-serif"
                              >
                                {step.title}
                              </Heading>
                              <Text
                                fontSize="xs"
                                fontWeight="medium"
                                color="var(--color-primary)"
                                fontStyle="italic"
                              >
                                {step.subtitle}
                              </Text>
                            </VStack>

                            {/* Description Points */}
                            <VStack spacing={2} align="flex-start" w="full">
                              {step.description.map((item, idx) => (
                                <HStack key={idx} spacing={2} align="flex-start">
                                  <Box
                                    w="6px"
                                    h="6px"
                                    borderRadius="full"
                                    bg="var(--color-tertiary)"
                                    mt="6px"
                                    flexShrink={0}
                                  />
                                  <Text
                                    fontSize="sm"
                                    color="var(--color-text-secondary)"
                                    lineHeight={1.5}
                                  >
                                    {item}
                                  </Text>
                                </HStack>
                              ))}
                            </VStack>
                          </VStack>
                        </Box>

                        {/* Preview Visual - Scaled to fit */}
                        <Box
                          borderTop="1px solid var(--color-gray-200)"
                          bg="var(--color-gray-50)"
                          overflow="hidden"
                          position="relative"
                        >
                          <Box
                            transform="scale(0.52)"
                            transformOrigin="top left"
                            width="600px"
                            height="380px"
                            // Compensate for the scaled size
                            marginBottom="-182px"
                            marginRight="-288px"
                          >
                            {step.preview}
                          </Box>
                        </Box>
                      </Box>

                      {/* Connecting Line to next step */}
                      {index < steps.length - 1 && (
                        <Box
                          position="absolute"
                          left="-25px"
                          top="32px"
                          bottom="-24px"
                          width="3px"
                          bg="var(--color-primary)"
                          borderRadius="full"
                        />
                      )}
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
