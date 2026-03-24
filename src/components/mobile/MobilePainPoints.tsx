import { Heading, Text, VStack, HStack, Card, CardBody, Icon, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Database, GitBranch, EyeOff, ExternalLink, AlertTriangle, Zap, XCircle, Wrench, Clock, TrendingUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react'
import MotionSection from '../MotionSection'
import LayoutContainer from '../LayoutContainer'

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

const MobilePainPoints = () => {
  const painPoints: PainPoint[] = [
    {
      title: "Metadata debt",
      description: "Ambiguous field names cause AI agent hallucinations",
      icon: Database,
      bgColor: "gray.900",
      iconColor: "#e768e6",
      borderColor: "whiteAlpha.200",
      stat: "347+",
      statLabel: "fields on a single object"
    },
    {
      title: "Automation debt",
      description: "Agents trigger legacy flows with unpredictable results",
      icon: GitBranch,
      bgColor: "gray.900",
      iconColor: "#ff9b26",
      borderColor: "whiteAlpha.200",
      stat: "80%",
      statLabel: "of automations are redundant"
    },
    {
      title: "Security debt",
      description: "Over-permissive profiles lead to AI data leaks",
      icon: EyeOff,
      bgColor: "gray.900",
      iconColor: "#22c55e",
      borderColor: "whiteAlpha.200",
      stat: "62%",
      statLabel: "of fields shouldn't be visible to AI"
    },
    {
      title: "Integration debt",
      description: "Hidden code dependencies break during cleanup",
      icon: ExternalLink,
      bgColor: "gray.900",
      iconColor: "#3b82f6",
      borderColor: "whiteAlpha.200",
      stat: "5x",
      statLabel: "more integrations than documented"
    }
  ]

  const conclusionCard = {
    title: "The result?",
    icon: AlertTriangle,
    stat: "45%",
    statLabel: "average Agentic Readiness Score",
    consequences: [
      { icon: Zap, text: "Unpredictable agent behavior" },
      { icon: XCircle, text: "Apex CPU timeouts" },
      { icon: Wrench, text: "Sensitive data exposed" },
      { icon: Clock, text: "Legacy API timeouts" },
      { icon: TrendingUp, text: "Agentforce ROI destroyed" }
    ] as { icon: LucideIcon; text: string }[]
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  return (
    <MotionSection as="section" py="80px" backgroundColor="white">
      <LayoutContainer>
        <VStack spacing={10} w="full" px={4}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" fontSize="2xl" color="var(--color-text-primary)" lineHeight={1.3} fontWeight="bold">
              Why AI Agents Fail in Enterprise
            </Heading>
            <Text color="var(--color-text-secondary)" fontSize="md" px={2}>
                A powerful AI model dropped into a chaotic architecture is a recipe for disaster.
            </Text>
          </VStack>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            <VStack spacing={4} w="full">
              {painPoints.map((point, index) => (
                <motion.div key={index} variants={cardVariant} style={{ width: '100%' }}>
                  <Card
                    bg={point.bgColor}
                    border="1px solid"
                    borderColor={point.borderColor}
                    borderRadius="20px"
                    boxShadow="lg"
                    position="relative"
                    overflow="visible"
                    w="full"
                  >
                    <CardBody p={5}>
                      <HStack spacing={4} align="flex-start">
                        {/* Icon Container */}
                        <Box 
                          p={2} 
                          borderRadius="12px" 
                          bg="whiteAlpha.100" 
                          border="1px solid" 
                          borderColor="whiteAlpha.200"
                          flexShrink={0}
                        >
                          <Icon as={point.icon} w={5} h={5} color={point.iconColor} />
                        </Box>
                        
                        {/* Content */}
                        <VStack spacing={1} align="flex-start" flex={1}>
                          <Heading as="h3" fontSize="md" color="white" fontWeight="bold">
                            {point.title}
                          </Heading>
                          <Text color="gray.400" fontSize="sm" lineHeight={1.5}>
                            {point.description}
                          </Text>
                        </VStack>

                        {/* Stat Block */}
                        <VStack spacing={0} align="center" flexShrink={0} pt={1}>
                          <Text fontSize="xl" fontWeight="900" color={point.iconColor} lineHeight={1}>
                            {point.stat}
                          </Text>
                          <Text fontSize="9px" color="gray.500" textAlign="center" maxW="60px" fontWeight="medium" mt={1}>
                            {point.statLabel}
                          </Text>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </VStack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <Box as="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4 L12 20 M5 13 L12 20 L19 13"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Box>
          </motion.div>

          {/* Conclusion Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false }}
            style={{ width: '100%' }}
          >
            <Card
              bg="white"
              border="1px solid"
              borderColor="blackAlpha.100"
              borderRadius="20px"
              boxShadow="0 10px 30px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)"
              w="full"
              overflow="hidden"
            >
              <CardBody p={6}>
                <VStack spacing={6} align="stretch">
                  <HStack spacing={3} justify="center">
                    <Icon 
                      as={conclusionCard.icon} 
                      w={8} 
                      h={8} 
                      color="purple.500" 
                      filter="drop-shadow(0 4px 12px rgba(168, 85, 247, 0.3))"
                    />
                    <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="bold">
                      {conclusionCard.title}
                    </Heading>
                  </HStack>

                  <Box textAlign="center">
                    <Text fontSize="4xl" fontWeight="900" bgGradient="linear(to-r, purple.500, pink.400)" bgClip="text" lineHeight={1}>
                      {conclusionCard.stat}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mt={2} fontWeight="medium">
                      {conclusionCard.statLabel}
                    </Text>
                  </Box>

                  <Box display="flex" flexDirection="column" gap={3}>
                    {conclusionCard.consequences.map((consequence, idx) => (
                      <HStack key={idx} spacing={3} align="flex-start">
                        <Box mt={0.5}>
                            <Icon as={consequence.icon} w={4} h={4} color="gray.400" flexShrink={0} />
                        </Box>
                        <Text color="gray.700" fontSize="sm" lineHeight={1.4} fontWeight="medium">
                          {consequence.text}
                        </Text>
                      </HStack>
                    ))}
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </motion.div>
        </VStack>
      </LayoutContainer>
    </MotionSection>
  )
}

export default MobilePainPoints
