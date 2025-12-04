import { Heading, Text, VStack, HStack, Card, CardBody, Icon, Badge, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiDatabase, FiGitBranch, FiEyeOff, FiExternalLink, FiAlertTriangle, FiZap, FiXCircle, FiTool, FiClock, FiTrendingUp } from 'react-icons/fi'
import { IconType } from 'react-icons'
import MotionSection from '../MotionSection'
import LayoutContainer from '../LayoutContainer'

interface PainPoint {
  title: string
  description: string
  icon: typeof FiDatabase
  bgColor: string
  iconColor: string
  borderColor: string
  stat: string
  statLabel: string
}

const MobilePainPoints = () => {
  const painPoints: PainPoint[] = [
    {
      title: "Hundreds of fields",
      description: "Nobody knows what's safe to remove",
      icon: FiDatabase,
      bgColor: "var(--color-pain-1-bg)",
      iconColor: "var(--color-pain-1-icon)",
      borderColor: "var(--color-pain-1-border)",
      stat: "35%+",
      statLabel: "of custom fields are unused"
    },
    {
      title: "Overlapping automation",
      description: "Workflow Rules, Flows, Apex all conflict",
      icon: FiGitBranch,
      bgColor: "var(--color-pain-2-bg)",
      iconColor: "var(--color-pain-2-icon)",
      borderColor: "var(--color-pain-2-border)",
      stat: "62%",
      statLabel: "of orgs use Workflow Rules & Flow simultaneously"
    },
    {
      title: "Invisible dependencies",
      description: "Missing dependencies or metadata conflicts",
      icon: FiEyeOff,
      bgColor: "var(--color-pain-3-bg)",
      iconColor: "var(--color-pain-3-icon)",
      borderColor: "var(--color-pain-3-border)",
      stat: "78%",
      statLabel: "of teams experience deployment bugs"
    },
    {
      title: "Metadata in connected apps",
      description: "Undocumented integrations using your fields",
      icon: FiExternalLink,
      bgColor: "var(--color-pain-4-bg)",
      iconColor: "var(--color-pain-4-icon)",
      borderColor: "var(--color-pain-4-border)",
      stat: "28%",
      statLabel: "of enterprise apps are integrated/documented"
    }
  ]

  const conclusionCard = {
    title: "The result?",
    icon: FiAlertTriangle,
    stat: "100+",
    statLabel: "hours to manually audit an org",
    consequences: [
      { icon: FiZap, text: "Unpredictable side effects" },
      { icon: FiXCircle, text: "Deployment failures" },
      { icon: FiTool, text: "Harder maintenance" },
      { icon: FiClock, text: "Slower delivery" },
      { icon: FiTrendingUp, text: "Growing debt" }
    ] as { icon: IconType; text: string }[]
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  }

  return (
    <MotionSection 
      as="section" 
      py="60px"
      backgroundColor="white"
    >
      <LayoutContainer>
        <VStack spacing={8} w="full" px={4}>
          {/* Header */}
          <VStack spacing={3} textAlign="center">
            <Heading as="h2" fontSize="xl" color="var(--color-text-primary)" lineHeight={1.3}>
              The Reality Salesforce Admins Talk About Every Day
            </Heading>
          </VStack>

          {/* Pain Points Cards - Stacked */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            <VStack spacing={4} w="full">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={cardVariant}
                  style={{ width: '100%' }}
                >
                  <Card
                    bg={point.bgColor}
                    border="2px solid"
                    borderColor={point.borderColor}
                    borderRadius="12px"
                    boxShadow="sm"
                    position="relative"
                    overflow="visible"
                    w="full"
                  >
                    {/* Badge */}
                    <Badge
                      position="absolute"
                      top={-2}
                      left={-2}
                      bg={point.iconColor}
                      color="white"
                      borderRadius="full"
                      w={6}
                      h={6}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="xs"
                      fontWeight="bold"
                    >
                      {index + 1}
                    </Badge>

                    <CardBody p={4}>
                      <HStack spacing={4} align="flex-start">
                        {/* Icon */}
                        <Icon
                          as={point.icon}
                          w={6}
                          h={6}
                          color={point.iconColor}
                          flexShrink={0}
                          mt={0.5}
                        />
                        
                        {/* Content */}
                        <VStack spacing={1} align="flex-start" flex={1}>
                          <Heading as="h3" fontSize="md" color="var(--color-text-primary)" fontWeight="bold">
                            {point.title}
                          </Heading>
                          <Text color="var(--color-text-secondary)" fontSize="sm" lineHeight={1.5}>
                            {point.description}
                          </Text>
                        </VStack>

                        {/* Stat */}
                        <VStack spacing={0} align="center" flexShrink={0}>
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color={point.iconColor}
                            lineHeight={1}
                          >
                            {point.stat}
                          </Text>
                          <Text
                            fontSize="9px"
                            color="var(--color-text-secondary)"
                            textAlign="center"
                            maxW="60px"
                          >
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

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <Box as="svg" width="40px" height="40px" viewBox="0 0 60 60" fill="none">
              <path
                d="M30 10 L30 42 M18 34 L30 46 L42 34"
                stroke="var(--color-pain-5-icon)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Box>
          </motion.div>

          {/* Conclusion Card - Simplified for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false }}
            style={{ width: '100%' }}
          >
            <Card
              bg="var(--color-pain-5-bg)"
              border="2px solid"
              borderColor="var(--color-pain-5-border)"
              borderRadius="12px"
              boxShadow="0 4px 16px rgba(124, 58, 237, 0.1)"
              w="full"
            >
              <CardBody p={5}>
                <VStack spacing={4} align="stretch">
                  {/* Header */}
                  <HStack spacing={2} justify="center">
                    <Icon
                      as={conclusionCard.icon}
                      w={6}
                      h={6}
                      color="var(--color-pain-5-icon)"
                    />
                    <Heading as="h3" fontSize="lg" color="var(--color-text-primary)" fontWeight="bold">
                      {conclusionCard.title}
                    </Heading>
                  </HStack>

                  {/* Stat */}
                  <Box textAlign="center">
                    <Text
                      fontSize="3xl"
                      fontWeight="bold"
                      color="var(--color-pain-5-icon)"
                      lineHeight={1}
                    >
                      {conclusionCard.stat}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="var(--color-text-secondary)"
                      mt={1}
                    >
                      {conclusionCard.statLabel}
                    </Text>
                  </Box>

                  {/* Consequences - Compact grid */}
                  <Box
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gap={2}
                  >
                    {conclusionCard.consequences.map((consequence, idx) => (
                      <HStack key={idx} spacing={2} align="center">
                        <Icon 
                          as={consequence.icon}
                          w={4}
                          h={4}
                          color="var(--color-pain-5-icon)"
                          flexShrink={0}
                        />
                        <Text 
                          color="var(--color-text-primary)" 
                          fontSize="xs" 
                          lineHeight={1.3}
                        >
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

