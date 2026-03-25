import { Heading, Text, VStack, HStack, Card, CardBody, Icon, Box, Grid, GridItem } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Database, GitBranch, EyeOff, ExternalLink, AlertTriangle, Zap, XCircle, Wrench, Clock, TrendingUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react'
import MotionSection from './MotionSection'
import LayoutContainer from './LayoutContainer'

interface PainPoint {
  title: string
  description: string
  icon: typeof Database
  bgColor: string
  iconColor: string
  borderColor: string
  stat: string
  statLabel: string
}

const PainPoints = () => {
  const painPoints: PainPoint[] = [
    {
      title: "Metadata debt",
      description: "Even with Data Cloud, ambiguous metadata causes Agentforce to fail. 347+ custom fields on a single object means your AI Agent can't classify intent correctly.",
      icon: Database,
      bgColor: "gray.900",
      iconColor: "#e768e6",
      borderColor: "whiteAlpha.200",
      stat: "35%+",
      statLabel: "of custom fields are unused and confuse AI agents"
    },
    {
      title: "Automation debt",
      description: "A single record save triggers 6 concurrent automation paths. Agentforce handling 50 conversations hits the limits — and crashes.",
      icon: GitBranch,
      bgColor: "gray.900",
      iconColor: "#ff9b26",
      borderColor: "whiteAlpha.200",
      stat: "62%",
      statLabel: "run rules & flows simultaneously"
    },
    {
      title: "Security debt",
      description: "Overlapping permission sets expose sensitive financial data to agents.",
      icon: EyeOff,
      bgColor: "gray.900",
      iconColor: "#22c55e",
      borderColor: "whiteAlpha.200",
      stat: "80%",
      statLabel: "permission overlap"
    },
    {
      title: "Integration debt",
      description: "Legacy SOAP API timeouts break agent sessions with live customers.",
      icon: ExternalLink,
      bgColor: "gray.900",
      iconColor: "#3b82f6",
      borderColor: "whiteAlpha.200",
      stat: "4x",
      statLabel: "more payload weight"
    }
  ]

  const conclusionCard = {
    title: "The result?",
    icon: AlertTriangle,
    stat: "45%",
    statLabel: "average Agentic Readiness Score — most orgs aren't ready",
    consequences: [
      { icon: Zap, text: "AI agents hallucinate on ambiguous field names" },
      { icon: XCircle, text: "Apex CPU timeout — agents crash mid-conversation" },
      { icon: Wrench, text: "Over-permissioned agents expose sensitive data" },
      { icon: Clock, text: "Legacy integrations time out, breaking agent sessions" },
      { icon: TrendingUp, text: "Agentforce ROI destroyed before it even starts" }
    ] as { icon: LucideIcon; text: string }[]
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  const conclusionVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.6 } }
  }

  // Bento Box Grid Item Configuration
  const bentoConfig = [
    { colSpan: { base: 4, lg: 2 }, rowSpan: { base: 1, lg: 2 }, minH: { base: 'auto', lg: '400px' } }, // Large Square
    { colSpan: { base: 4, lg: 2 }, rowSpan: 1, minH: 'auto' }, // Wide Rectangle
    { colSpan: { base: 4, md: 2, lg: 1 }, rowSpan: 1, minH: 'auto' }, // Small Square
    { colSpan: { base: 4, md: 2, lg: 1 }, rowSpan: 1, minH: 'auto' }, // Small Square
  ]

  return (
    <MotionSection as="section" py="150px" backgroundColor="white">
      <LayoutContainer>
        <VStack spacing={16} maxW="1200px" mx="auto" w="full" px={{ base: 4, md: 8 }}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="3xl" color="var(--color-text-primary)">
                Why AI Agents Fail in Enterprise
            </Heading>
            <Text color="var(--color-text-secondary)" fontSize="xl" maxW="800px">
                A powerful AI model dropped into a chaotic architecture is a recipe for disaster.
            </Text>
          </VStack>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            style={{ width: '100%' }}
          >
            <Grid
              templateColumns="repeat(4, 1fr)"
              templateRows={{ base: 'auto', lg: 'repeat(2, 1fr)' }}
              gap={6}
              w="full"
            >
              {painPoints.map((point, index) => (
                <GridItem 
                    key={index} 
                    colSpan={bentoConfig[index].colSpan} 
                    rowSpan={bentoConfig[index].rowSpan}
                >
                  <motion.div variants={cardVariant} style={{ height: '100%' }}>
                    <Card
                      bg={point.bgColor}
                      border="1px solid"
                      borderColor={point.borderColor}
                      borderRadius="24px"
                      boxShadow="xl"
                      position="relative"
                      overflow="hidden"
                      _hover={{
                        borderColor: point.iconColor,
                        boxShadow: `0 0 30px ${point.iconColor}20`,
                        transform: 'translateY(-4px)',
                      }}
                      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                      h="full"
                      minH={bentoConfig[index].minH}
                    >
                      {/* Low Opacity Background Decoration for the Large Bento Box */}
                      {index === 0 && (
                        <Box
                          position="absolute"
                          top="-5%"
                          right="-10%"
                          opacity={0.03}
                          transform="rotate(-10deg) scale(1.5)"
                          pointerEvents="none"
                        >
                          <Icon as={Database} w={300} h={300} color="white" />
                        </Box>
                      )}

                      <CardBody p={8} display="flex" flexDirection="column" justifyContent="space-between" h="full" zIndex={1}>
                        <VStack spacing={4} align="flex-start" mb={6}>
                          <Box 
                            p={3} 
                            borderRadius="16px" 
                            bg="whiteAlpha.100" 
                            border="1px solid" 
                            borderColor="whiteAlpha.200"
                          >
                            <Icon as={point.icon} w={6} h={6} color={point.iconColor} />
                          </Box>
                          <Heading as="h3" size={index === 0 ? "xl" : "md"} color="white" fontWeight="bold">
                            {point.title}
                          </Heading>
                          <Text color="gray.400" fontSize={index === 0 ? "lg" : "sm"} lineHeight={1.6}>
                            {point.description}
                          </Text>
                        </VStack>

                        <Box mt="auto" pt={index === 0 ? 8 : 4}>
                          <Text fontSize={index === 0 ? "5xl" : "3xl"} fontWeight="900" color={point.iconColor} lineHeight={1}>
                            {point.stat}
                          </Text>
                          <Text fontSize="sm" color="gray.500" mt={2} fontWeight="medium">
                            {point.statLabel}
                          </Text>
                        </Box>
                      </CardBody>
                    </Card>
                  </motion.div>
                </GridItem>
              ))}
            </Grid>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false, margin: "-50px" }}
          >
            <Box as="svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M12 4 L12 20 M5 13 L12 20 L19 13"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </Box>
          </motion.div>

          {/* Conclusion Card */}
          <motion.div
            variants={conclusionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            style={{ width: '100%', maxWidth: '1000px' }}
          >
            <Card
              bg="white"
              border="1px solid"
              borderColor="blackAlpha.100"
              borderRadius="24px"
              boxShadow="0 15px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)"
              overflow="hidden"
              position="relative"
            >
              <CardBody p={{ base: 8, md: 12 }}>
                <VStack spacing={10} align="stretch">
                  <HStack spacing={4} justify="center">
                    <Icon 
                      as={conclusionCard.icon} 
                      w={10} 
                      h={10} 
                      color="purple.500" 
                      filter="drop-shadow(0 4px 12px rgba(168, 85, 247, 0.4))"
                    />
                    <Heading as="h3" size="lg" color="gray.900" fontWeight="bold">
                      {conclusionCard.title}
                    </Heading>
                  </HStack>

                  <HStack 
                    spacing={{ base: 8, md: 16 }} 
                    align="center" 
                    justify="center" 
                    flexWrap={{ base: "wrap", md: "nowrap" }}
                  >
                    <Box textAlign="center" minW="150px">
                      <Text fontSize="6xl" fontWeight="900" bgGradient="linear(to-r, purple.500, pink.400)" bgClip="text" lineHeight={1}>
                        {conclusionCard.stat}
                      </Text>
                      <Text fontSize="sm" color="gray.500" mt={3} fontWeight="medium" maxW="200px" mx="auto">
                        {conclusionCard.statLabel}
                      </Text>
                    </Box>
                    
                    <Box w="1px" alignSelf="stretch" bg="gray.100" display={{ base: "none", md: "block" }} />
                    
                    <VStack align="flex-start" spacing={4} flex={1}>
                      {conclusionCard.consequences.map((consequence, idx) => (
                        <HStack key={idx} spacing={4} align="flex-start">
                          <Box mt={1}>
                             <Icon as={consequence.icon} w={5} h={5} color="gray.400" />
                          </Box>
                          <Text color="gray.700" fontSize="md" fontWeight="medium">
                            {consequence.text}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </motion.div>
        </VStack>
      </LayoutContainer>
    </MotionSection>
  )
}

export default PainPoints
