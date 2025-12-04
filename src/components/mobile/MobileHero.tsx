import { Box, Button, Heading, Text, VStack, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { WiStars } from 'react-icons/wi'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import HeroBackground from '../HeroBackground'
import { staggerContainer, staggerItem } from '../../utils/animations'

const MobileHero = () => {
  return (
    <Box
      as="section"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      position="relative"
      pt="80px" // Account for fixed header
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

      {/* Simplified Static Preview - replaces heavy animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ marginTop: '32px' }}
      >
        <Box
          borderRadius="16px"
          overflow="hidden"
          boxShadow="0px 8px 24px rgba(0, 0, 0, 0.15)"
          bg="white"
          border="1px solid var(--color-gray-200)"
        >
          {/* Static preview card */}
          <Box p={4}>
            <VStack spacing={3} align="stretch">
              {/* Header */}
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  w="28px"
                  h="28px"
                  borderRadius="full"
                  bg="var(--color-primary)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  ✓
                </Box>
                <Text fontSize="sm" fontWeight="semibold" color="var(--color-text-primary)">
                  Org Metadata Scanner
                </Text>
                <Box
                  ml="auto"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  bg="var(--color-success)"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  128 items
                </Box>
              </Box>

              {/* Sample rows */}
              <Box
                borderRadius="8px"
                border="1px solid var(--color-gray-200)"
                overflow="hidden"
                fontSize="xs"
              >
                <Box
                  display="grid"
                  gridTemplateColumns="2fr 1fr 1fr"
                  bg="var(--color-gray-50)"
                  p={2}
                  borderBottom="1px solid var(--color-gray-200)"
                  fontWeight="medium"
                  color="var(--color-text-secondary)"
                >
                  <Text>Field</Text>
                  <Text>Usage</Text>
                  <Text>Risk</Text>
                </Box>
                <Box
                  display="grid"
                  gridTemplateColumns="2fr 1fr 1fr"
                  p={2}
                  borderBottom="1px solid var(--color-gray-100)"
                  bg="var(--color-primary-soft)"
                  opacity={0.3}
                >
                  <Text fontWeight="medium">Legacy score</Text>
                  <Text color="var(--color-text-secondary)">0.4%</Text>
                  <Box
                    px={2}
                    py={0.5}
                    borderRadius="full"
                    bg="var(--color-error)"
                    color="white"
                    fontSize="10px"
                    fontWeight="bold"
                    w="fit-content"
                  >
                    High
                  </Box>
                </Box>
                <Box
                  display="grid"
                  gridTemplateColumns="2fr 1fr 1fr"
                  p={2}
                >
                  <Text fontWeight="medium">Onboarding flag</Text>
                  <Text color="var(--color-text-secondary)">1.2%</Text>
                  <Box
                    px={2}
                    py={0.5}
                    borderRadius="full"
                    bg="var(--color-warning)"
                    color="white"
                    fontSize="10px"
                    fontWeight="bold"
                    w="fit-content"
                  >
                    Medium
                  </Box>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
}

export default MobileHero

