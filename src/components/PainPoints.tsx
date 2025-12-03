import { Heading, Text, VStack, HStack, SimpleGrid, Card, CardBody, Icon, Badge, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiDatabase, FiGitBranch, FiEyeOff, FiExternalLink, FiAlertTriangle, FiZap, FiXCircle, FiTool, FiClock, FiTrendingUp } from 'react-icons/fi'
import { IconType } from 'react-icons'
import MotionSection from './MotionSection'
import LayoutContainer from './LayoutContainer'

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

const PainPoints = () => {
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

  // Card de conclusion avec conséquences concrètes
  const conclusionCard = {
    title: "The result?",
    icon: FiAlertTriangle,
    stat: "100+",
    statLabel: "hours to manually audit an org",
    consequences: [
      { icon: FiZap, text: "Unpredictable side effects on every change" },
      { icon: FiXCircle, text: "Deployment failures & rollbacks" },
      { icon: FiTool, text: "Harder maintenance over time" },
      { icon: FiClock, text: "Slower feature delivery" },
      { icon: FiTrendingUp, text: "Growing technical debt" }
    ] as { icon: IconType; text: string }[]
  }

  // Animation stagger container
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  // Animation pour chaque card
  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  // Animation pour la card de conclusion
  const conclusionVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.6
      }
    }
  }


  return (
    <MotionSection 
      as="section" 
      py="150px"
      backgroundColor="white"
    >
      <LayoutContainer>
        <VStack spacing={16} maxW="1600px" mx="auto" w="full" px={{ base: 4, md: 8 }}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="3xl" color="var(--color-text-primary)">
              The Reality Salesforce Admins Talk About Every Day
            </Heading>
          </VStack>

          {/* Grid des 4 premiers pain points */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            style={{ width: '100%' }}
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={cardVariant}
                >
                  <Card
                    bg={point.bgColor}
                    border="2px solid"
                    borderColor={point.borderColor}
                    borderRadius="12px"
                    boxShadow="md"
                    position="relative"
                    overflow="visible"
                    _hover={{
                      borderColor: point.iconColor,
                      boxShadow: 'lg',
                      transform: 'translateY(-4px)',
                    }}
                    transition="all 0.3s ease"
                    h="full"
                  >
                    {/* Badge numéroté avec couleur du dégradé */}
                    <Badge
                      position="absolute"
                      top={-3}
                      left={-3}
                      bg={point.iconColor}
                      color="white"
                      borderRadius="full"
                      w={7}
                      h={7}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="sm"
                      fontWeight="bold"
                      boxShadow="0 2px 8px rgba(0, 0, 0, 0.15)"
                    >
                      {index + 1}
                    </Badge>

                    <CardBody p={8}>
                      <VStack spacing={0} align="stretch" h="full" justifyContent="space-between">
                        {/* Partie contenu - hauteur fixe */}
                        <Box minH="100px">
                          {/* Titre avec icône */}
                          <HStack spacing={3} align="center" mb={3}>
                            {/* Icône animée au hover */}
                            <motion.div
                              whileHover={{ 
                                rotate: [0, -10, 10, -5, 5, 0],
                                scale: 1.15,
                                transition: { duration: 0.5 }
                              }}
                            >
                              <Icon
                                as={point.icon}
                                w={7}
                                h={7}
                                color={point.iconColor}
                              />
                            </motion.div>
                            <Heading as="h3" size="md" color="var(--color-text-primary)" fontWeight="bold">
                              {point.title}
                            </Heading>
                          </HStack>

                          {/* Description */}
                          <Text color="var(--color-text-secondary)" fontSize="md" lineHeight={1.6}>
                            {point.description}
                          </Text>
                        </Box>

                        {/* Statistique en bas - toujours alignée */}
                        <Box 
                          textAlign="center" 
                          pt={4}
                          mt={4}
                          borderTop="1px solid"
                          borderColor={point.borderColor}
                          minH="100px"
                        >
                          <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            color={point.iconColor}
                            lineHeight={1}
                          >
                            {point.stat}
                          </Text>
                          <Text
                            fontSize="xs"
                            color="var(--color-text-secondary)"
                            mt={1}
                          >
                            {point.statLabel}
                          </Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>

          {/* Flèche de transition */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false, margin: "-50px" }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '-8px', marginBottom: '-8px' }}
          >
            <Box as="svg" width="60px" height="60px" viewBox="0 0 60 60" fill="none">
              {/* Flèche vers le bas - flat design - couleur unie */}
              <motion.path
                d="M30 10 L30 42 M18 34 L30 46 L42 34"
                stroke="var(--color-pain-5-icon)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: false }}
              />
            </Box>
          </motion.div>

          {/* Card de conclusion mise en avant - Style violet */}
          <motion.div
            variants={conclusionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            style={{ width: '100%', maxWidth: '1000px' }}
          >
            <Card
              bg="var(--color-pain-5-bg)"
              border="3px solid"
              borderColor="var(--color-pain-5-border)"
              borderRadius="16px"
              boxShadow="0 8px 32px rgba(124, 58, 237, 0.15)"
              overflow="visible"
              position="relative"
              _hover={{
                transform: 'translateY(-4px)',
                borderColor: 'var(--color-pain-5-icon)',
                boxShadow: '0 12px 40px rgba(124, 58, 237, 0.25)',
              }}
              transition="all 0.3s ease"
            >

              <CardBody p={10}>
                <VStack spacing={8} align="stretch">
                  {/* Header avec icône et titre */}
                  <HStack spacing={3} justify="center">
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Icon
                        as={conclusionCard.icon}
                        w={8}
                        h={8}
                        color="var(--color-pain-5-icon)"
                      />
                    </motion.div>
                    <Heading as="h3" size="lg" color="var(--color-text-primary)" fontWeight="bold">
                      {conclusionCard.title}
                    </Heading>
                  </HStack>

                  {/* Contenu : Stats + Conséquences */}
                  <HStack 
                    spacing={{ base: 6, md: 10 }} 
                    align="flex-start" 
                    justify="center" 
                    flexWrap={{ base: "wrap", md: "nowrap" }}
                  >
                    {/* Statistique */}
                    <Box textAlign="center" minW="120px">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Text
                          fontSize="5xl"
                          fontWeight="bold"
                          color="var(--color-pain-5-icon)"
                          lineHeight={1}
                        >
                          {conclusionCard.stat}
                        </Text>
                      </motion.div>
                      <Text
                        fontSize="sm"
                        color="var(--color-text-secondary)"
                        mt={1}
                      >
                        {conclusionCard.statLabel}
                      </Text>
                    </Box>
                    
                    {/* Séparateur vertical */}
                    <Box 
                      w="2px" 
                      alignSelf="stretch"
                      bg="var(--color-pain-5-border)" 
                      display={{ base: "none", md: "block" }}
                    />
                    
                    {/* Liste des conséquences */}
                    <VStack align="flex-start" spacing={3} flex={1} maxW="400px">
                      {conclusionCard.consequences.map((consequence, idx) => (
                        <HStack key={idx} spacing={3} align="center">
                          <Icon 
                            as={consequence.icon}
                            w={5}
                            h={5}
                            color="var(--color-pain-5-icon)"
                            flexShrink={0}
                          />
                          <Text 
                            color="var(--color-text-primary)" 
                            fontSize="md" 
                            lineHeight={1.5}
                          >
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
