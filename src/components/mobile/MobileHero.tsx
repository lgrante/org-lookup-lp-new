import { useState, useEffect } from 'react'
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { WiStars } from 'react-icons/wi'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import HeroBackground from '../HeroBackground'
import { staggerContainer, staggerItem } from '../../utils/animations'

// Import workflow step previews
import { 
  ObsoleteDetectionPreview, 
  ImpactAnalysisPreview, 
  ExternalCodeScanPreview, 
  DeletionQueuePreview, 
  SafeExecutionPreview 
} from '../workflow-steps'

const STEP_LABELS = [
  'Obsolete Detection',
  'Impact Analysis',
  'External Scan',
  'Deletion Queue',
  'Safe Execution'
]

const MobileHero = () => {
  const [currentStep, setCurrentStep] = useState(0)

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 5)
    }, 4000) // 4 seconds per step

    return () => clearInterval(interval)
  }, [])

  const renderCurrentPreview = () => {
    switch (currentStep) {
      case 0:
        return <ObsoleteDetectionPreview />
      case 1:
        return <ImpactAnalysisPreview />
      case 2:
        return <ExternalCodeScanPreview />
      case 3:
        return <DeletionQueuePreview />
      case 4:
        return <SafeExecutionPreview />
      default:
        return <ObsoleteDetectionPreview />
    }
  }

  return (
    <Box
      as="section"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      position="relative"
      pt="80px"
      pb={8}
      px={4}
      overflow="hidden"
    >
      <HeroBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <VStack 
            spacing={6} 
            align="flex-start" 
            textAlign="left"
          >
            {/* Main Title */}
            <motion.div variants={staggerItem}>
              <Heading
                as="h1"
                fontSize="2xl"
                lineHeight={1.3}
              >
                Turn your{' '}
                <Text
                  as="span"
                  fontWeight="bold"
                  color="var(--color-tertiary)"
                >
                  Salesforce
                </Text>{' '}
                Technical Debt into a{' '}
                <motion.span
                  animate={{
                    backgroundPosition: ["-200% center", "200% center"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #e768e6 0%, #ff9b26 50%, #e768e6 100%)',
                    backgroundSize: '200% 100%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline',
                  }}
                >
                  Clear Cleanup Plan
                  <motion.span
                    animate={{
                      backgroundPosition: ["-200% center", "200% center"],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      background: 'linear-gradient(90deg, #e768e6 0%, #ff9b26 50%, #e768e6 100%)',
                      backgroundSize: '200% 100%',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline',
                    }}
                  >
                    <WiStars
                      size={24}
                      style={{
                        display: 'inline-block',
                        marginLeft: '4px',
                        marginBottom: '-2px'
                      }}
                    />
                  </motion.span>
                </motion.span>
              </Heading>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={staggerItem}>
              <Text
                fontSize="md"
                color="var(--color-text-primary)"
                lineHeight={1.6}
              >
                Most admins inherit orgs burdened with years of technical debt. OrgLookup transforms complex cleanup into guided, actionable workflows.
              </Text>
            </motion.div>

            {/* CTA Button - Full width on mobile */}
            <motion.div variants={staggerItem} style={{ width: '100%' }}>
              <Button
                size="lg"
                variant="solid"
                _hover={{
                  transform: 'scale(1.02)',
                  boxShadow: '0 0 20px rgba(231, 104, 230, 0.4)'
                }}
                _active={{ transform: 'scale(0.98)' }}
                color="white"
                px={6}
                py={6}
                fontSize="md"
                fontWeight="bold"
                w="full"
                transition="all 0.2s"
                borderRadius={50}
                height="56px"
                sx={{
                  background: 'linear-gradient(90deg, #e768e6 0%, #ff9b26 50%, #e768e6 100%)',
                  backgroundSize: '200% 100%',
                }}
                rightIcon={<ArrowForwardIcon />}
              >
                Join Beta
              </Button>
            </motion.div>
          </VStack>
        </motion.div>
      </motion.div>

      {/* Animated Preview Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ marginTop: '24px' }}
      >
        {/* Step Indicators */}
        <Box display="flex" justifyContent="center" gap={2} mb={3}>
          {STEP_LABELS.map((label, index) => (
            <Box
              key={index}
              w={currentStep === index ? "24px" : "8px"}
              h="8px"
              borderRadius="full"
              bg={currentStep === index ? "var(--color-primary)" : "var(--color-gray-300)"}
              transition="all 0.3s ease"
              cursor="pointer"
              onClick={() => setCurrentStep(index)}
            />
          ))}
        </Box>

        {/* Current Step Label */}
        <Text 
          fontSize="xs" 
          color="var(--color-text-secondary)" 
          textAlign="center" 
          mb={2}
          fontWeight="medium"
        >
          Step {currentStep + 1}: {STEP_LABELS[currentStep]}
        </Text>

        {/* Preview Container with scale */}
        <Box
          position="relative"
          overflow="hidden"
          borderRadius="12px"
          boxShadow="0px 8px 24px rgba(0, 0, 0, 0.15)"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{
                transformOrigin: 'top left',
                transform: 'scale(0.58)',
                width: '600px',
                height: '380px',
                marginBottom: '-160px', // Compensate for scale
                marginRight: '-252px', // Compensate for scale
              }}
            >
              {renderCurrentPreview()}
            </motion.div>
          </AnimatePresence>
        </Box>
      </motion.div>
    </Box>
  )
}

export default MobileHero
