import { Box, Button, Heading, Text, VStack, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { WiStars } from 'react-icons/wi'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import HeroAnimationCarousel from './HeroAnimationCarousel'
import { staggerContainer, staggerItem } from '../utils/animations'


interface HeroProps {
  onContactClick?: () => void
}

const Hero = ({ onContactClick }: HeroProps) => {
  const scale = useBreakpointValue({ base: 0.6, md: 0.8, lg: 0.9, xl: 1.05 }) ?? 1.0

  return (
    <Box
      as="section"
      display="flex"
      alignItems="center"
      pb={{ base: 12, md: 0 }}
      position="relative"
      height="100vh"
      width="100vw"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ height: '100%', width: '100%' }}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          height="100%"
          pl={{ base: 8, md: 16 }}
        >
          {/* Colonne gauche - Texte */}
          <GridItem height="100%">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ height: '100%' }}
            >
              <VStack 
                spacing={{ base: 10, md: 12 }} 
                align="flex-start" 
                textAlign="left" 
                height="100%" 
                justifyContent="center"
              >
                <motion.div variants={staggerItem}>
                  <Heading
                    as="h1"
                    size={{ base: "3xl", md: "4xl" }}
                    lineHeight={1.2}
                    maxW="85%"
                  >
                    Turn your <span style={{fontWeight: "bold", color: "var(--color-tertiary)", position: "relative"}}>
                      Salesforce
                    </span> Technical Debt into a                       <motion.span
                      animate={{
                        backgroundPosition: ["-200% center", "200% center"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        //ease: "linear",
                        ease: "easeInOut",
                      }}
                      style={{
                        background: 'linear-gradient(90deg, #e768e6 0%, #ff9b26 50%, #e768e6 100%)',
                        backgroundSize: '200% 100%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'var(--color-text-primary)',
                        display: 'inline-block',
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
                          color: '#e768e6',
                          display: 'inline-block',
                        }}
                      >
                        <WiStars
                          size={36}
                          style={{
                            display: 'inline-block',
                            marginLeft: '8px',
                            marginBottom: '-4px'
                          }}
                        />
                      </motion.span>
                    </motion.span>
                  </Heading>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color="var(--color-text-primary)"
                    lineHeight={1.6}
                    maxW="500px"
                  >
                    Most admins inherit orgs burdened with years of technical debt. OrgLookup transforms complex cleanup into guided, actionable workflows.
                  </Text>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Button
                    size="lg"
                    variant="solid"
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 20px rgba(231, 104, 230, 0.4)'
                    }}
                    _active={{ transform: 'scale(0.95)' }}
                    color="white"
                    px={{ base: 6, md: 8 }}
                    py={6}
                    fontSize="lg"
                    fontWeight="bold"
                    w={{ base: "full", md: "auto" }}
                    transition="all 0.2s"
                    borderRadius={100}
                    height="81px"
                    sx={{
                      background: 'linear-gradient(90deg, #e768e6 0%, #ff9b26 50%, #e768e6 100%)',
                      backgroundSize: '200% 100%',
                    }}
                    rightIcon={<ArrowForwardIcon />}
                    onClick={onContactClick}
                  >
                    Join Beta
                  </Button>
                </motion.div>
              </VStack>
            </motion.div>
          </GridItem>

          {/* Colonne droite - Animation */}
          <GridItem
            height="100%"
            sx={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent-1) 100%)',
            }}
          >
            <VStack  
              height="100%" 
              justifyContent="center" 
              alignItems="center"
              spacing={10}
            >
              <HeroAnimationCarousel scale={scale} />
            </VStack>
          </GridItem>
        </Grid>
      </motion.div>
    </Box>
  )
}

export default Hero
