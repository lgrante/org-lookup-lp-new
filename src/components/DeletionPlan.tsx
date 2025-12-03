import {
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  HStack,
  Divider,
  Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { 
  FiClock, 
  FiZap, 
  FiSearch, 
  FiGitBranch, 
  FiLink, 
  FiShield, 
  FiFileText,
  FiList,
  FiEye,
  FiCheckCircle
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import LayoutContainer from './LayoutContainer'
import { fadeIn, centerScale } from '../utils/animations'

interface ProcessStep {
  icon: IconType
  text: string
}

const DeletionPlan = () => {
  const manualProcess: ProcessStep[] = [
    { icon: FiSearch, text: "Manually <strong>hunt for unused fields</strong>, objects, and layouts across Setup, reports, and page layouts" },
    { icon: FiLink, text: "<strong>Check references for each field</strong> across Flows, Apex, and layouts" },
    { icon: FiGitBranch, text: "<strong>Search Git repos and external apps</strong> for legacy references" },
    { icon: FiShield, text: "<strong>Design safe deletion order</strong> to avoid breaking production" },
    { icon: FiFileText, text: "<strong>Document everything manually</strong> in spreadsheets" }
  ]

  const orgLookupProcess: ProcessStep[] = [
    { icon: FiList, text: "<strong>Get prioritized list</strong> of suspicious or low-value metadata" },
    { icon: FiEye, text: "<strong>Visualize dependencies</strong> between Flows, Apex, and layouts" },
    { icon: FiGitBranch, text: "<strong>Auto-detect references</strong> in GitHub/GitLab/Bitbucket" },
    { icon: FiShield, text: "<strong>Build safe deletion queues</strong> (deactivate → archive → clean → delete)" },
    { icon: FiCheckCircle, text: "<strong>Automatically generate</strong> a safe, step-by-step action plan to remove technical debt" }
  ]

  // Animation pour la colonne Manual (apparaît en premier)
  const columnFromLeftDelayed = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2
      }
    }
  }

  // Animation pour la colonne OrgLookup (apparaît après Manual)
  const columnFromRightDelayed = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.6 // Délai plus long pour effet séquentiel
      }
    }
  }

  // Animation stagger pour les items Manual avec strikethrough
  const staggerContainerManual = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  }

  // Animation stagger pour les items OrgLookup
  const staggerContainerOrgLookup = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8 // Apparaît après Manual
      }
    }
  }

  // Item avec strikethrough animé
  const staggerItemWithStrike = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <Box as="section" py={20} bg="#f8f9fa">
      <LayoutContainer>
        <VStack spacing={20} w="full" mx="auto">
          {/* Titre */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <VStack spacing={6} textAlign="center">
              <Heading as="h2" size="3xl" color="var(--color-text-primary)">
                Manual vs Automated Cleanup
              </Heading>
            </VStack>
          </motion.div>

          {/* Grid responsive */}
          <Grid 
            templateColumns={{ base: "1fr", lg: "1fr auto 1fr" }} 
            gap={{ base: 6, lg: 8 }} 
            w="full" 
            mx="auto" 
            alignItems="stretch"
          >
            {/* Colonne gauche - Processus manuel */}
            <GridItem h="full" order={{ base: 1, lg: 1 }}>
              <motion.div
                variants={columnFromLeftDelayed}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                style={{ height: '100%' }}
              >
                <Box
                  bg="var(--color-red-50)"
                  borderRadius="12px"
                  border="2px solid"
                  borderColor="var(--color-red-200)"
                  p={8}
                  h="full"
                >
                  <VStack spacing={4} align="stretch" h="full">
                    {/* Header avec icône et titre */}
                    <VStack spacing={3} align="center">
                      <HStack justify="center">
                        <FiClock size={24} color="#DC2626" />
                      </HStack>
                      <Heading as="h3" size="lg" color="var(--color-red-600)" textAlign="center">
                        Manual Process
                      </Heading>
                      
                      {/* Indicateur visuel de temps */}
                      <Box w="full" mt={2}>
                        <Box 
                          h="10px" 
                          bg="var(--color-red-200)" 
                          borderRadius="full"
                          overflow="hidden"
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            viewport={{ once: false }}
                            style={{
                              height: "100%",
                              background: "var(--color-red-500)",
                              borderRadius: "9999px"
                            }}
                          />
                        </Box>
                        <Text fontSize="sm" mt={2} color="var(--color-red-500)" fontWeight="semibold" textAlign="center">
                          ~40+ hours of work
                        </Text>
                      </Box>
                    </VStack>

                    <Divider borderColor="var(--color-red-200)" />

                    {/* Liste des étapes avec strikethrough animé */}
                    <motion.div
                      variants={staggerContainerManual}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, margin: "-50px" }}
                    >
                      <VStack spacing={3} align="stretch" flex={1}>
                        {manualProcess.map((item, index) => (
                          <motion.div 
                            key={index} 
                            variants={staggerItemWithStrike}
                          >
                            <HStack
                              spacing={3}
                              align="flex-start"
                              p={3}
                              borderRadius="md"
                              transition="all 0.2s"
                              _hover={{ 
                                bg: "var(--color-red-100)",
                                transform: "translateX(4px)"
                              }}
                              cursor="default"
                            >
                              <Icon 
                                as={item.icon} 
                                color="var(--color-red-500)" 
                                boxSize={5} 
                                mt={1}
                                flexShrink={0}
                              />
                              <motion.div
                                initial={{ 
                                  textDecoration: "none",
                                  opacity: 1 
                                }}
                                whileInView={{ 
                                  textDecoration: "line-through",
                                  opacity: 0.6
                                }}
                                transition={{ 
                                  duration: 0.5, 
                                  delay: 1.5 + (index * 0.2) // Strikethrough après apparition
                                }}
                                viewport={{ once: false }}
                                style={{ 
                                  textDecorationColor: "var(--color-red-400)",
                                  textDecorationThickness: "2px"
                                }}
                              >
                                <Text 
                                  fontSize="md" 
                                  color="var(--color-text-primary)" 
                                  lineHeight={1.6}
                                  dangerouslySetInnerHTML={{ __html: item.text }} 
                                />
                              </motion.div>
                            </HStack>
                          </motion.div>
                        ))}
                      </VStack>
                    </motion.div>
                  </VStack>
                </Box>
              </motion.div>
            </GridItem>

            {/* Colonne centrale - Badge Savings (caché sur mobile) */}
            <GridItem 
              alignSelf="center" 
              display={{ base: "none", lg: "flex" }}
              order={{ base: 2, lg: 2 }}
            >
              <motion.div
                variants={centerScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
              >
                <VStack spacing={3}>
                  <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    color="var(--color-text-secondary)"
                    textAlign="center"
                    px={4}
                  >
                    VS
                  </Text>
                  <Box
                    bg="var(--color-success)"
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontWeight="bold"
                    fontSize="sm"
                    textAlign="center"
                    boxShadow="0 4px 12px rgba(34, 197, 94, 0.3)"
                  >
                    Save 39+ hours
                  </Box>
                </VStack>
              </motion.div>
            </GridItem>

            {/* Colonne droite - Processus OrgLookup */}
            <GridItem h="full" order={{ base: 3, lg: 3 }}>
              <motion.div
                variants={columnFromRightDelayed}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                style={{ height: '100%' }}
              >
                <Box
                  bg="var(--color-green-50)"
                  borderRadius="12px"
                  border="2px solid"
                  borderColor="var(--color-green-200)"
                  p={8}
                  h="full"
                >
                  <VStack spacing={4} align="stretch" h="full">
                    {/* Header avec icône et titre */}
                    <VStack spacing={3} align="center">
                      <HStack justify="center">
                        <FiZap size={24} color="#059669" />
                      </HStack>
                      <Heading as="h3" size="lg" color="var(--color-green-600)" textAlign="center">
                        OrgLookup Process
                      </Heading>
                      
                      {/* Indicateur visuel de temps */}
                      <Box w="full" mt={2}>
                        <Box 
                          h="10px" 
                          bg="var(--color-green-200)" 
                          borderRadius="full"
                          overflow="hidden"
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "2%" }} // 30 min / 40h ≈ 1.25%
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            viewport={{ once: false }}
                            style={{
                              height: "100%",
                              background: "var(--color-green-500)",
                              borderRadius: "9999px",
                              minWidth: "10px" // Pour que ce soit visible
                            }}
                          />
                        </Box>
                        <Text fontSize="sm" mt={2} color="var(--color-green-500)" fontWeight="semibold" textAlign="center">
                          ~30 minutes
                        </Text>
                      </Box>
                    </VStack>

                    <Divider borderColor="var(--color-green-200)" />

                    {/* Liste des étapes */}
                    <motion.div
                      variants={staggerContainerOrgLookup}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, margin: "-50px" }}
                    >
                      <VStack spacing={3} align="stretch" flex={1}>
                        {orgLookupProcess.map((item, index) => (
                          <motion.div key={index} variants={staggerItem}>
                            <HStack
                              spacing={3}
                              align="flex-start"
                              p={3}
                              borderRadius="md"
                              transition="all 0.2s"
                              _hover={{ 
                                bg: "var(--color-green-100)",
                                transform: "translateX(4px)"
                              }}
                              cursor="default"
                            >
                              <Icon 
                                as={item.icon} 
                                color="var(--color-green-500)" 
                                boxSize={5} 
                                mt={1}
                                flexShrink={0}
                              />
                              <Text 
                                fontSize="md" 
                                color="var(--color-text-primary)" 
                                lineHeight={1.6}
                                dangerouslySetInnerHTML={{ __html: item.text }} 
                              />
                            </HStack>
                          </motion.div>
                        ))}
                      </VStack>
                    </motion.div>
                  </VStack>
                </Box>
              </motion.div>
            </GridItem>
          </Grid>
        </VStack>
      </LayoutContainer>
    </Box>
  )
}

export default DeletionPlan
