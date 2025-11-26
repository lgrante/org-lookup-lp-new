import {
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  HStack,
  Divider
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiClock, FiZap } from 'react-icons/fi'
import LayoutContainer from './LayoutContainer'
import { fadeIn, columnFromLeft, columnFromRight, centerScale, staggerContainer, staggerItem } from '../utils/animations'

const DeletionPlan = () => {
  const manualProcess = [
    "Manually <strong>hunt for unused fields</strong>, objects, and layouts across Setup, reports, and page layouts",
    "<strong>Check references for each field</strong> across Flows, Apex, and layouts",
    "<strong>Search Git repos and external apps</strong> for legacy references",
    "<strong>Design safe deletion order</strong> to avoid breaking production",
    "<strong>Document everything manually</strong> in spreadsheets"
  ]

  const orgLookupProcess = [
    "<strong>Get prioritized list</strong> of suspicious or low-value metadata",
    "<strong>Visualize dependencies</strong> between Flows, Apex, and layouts",
    "<strong>Auto-detect references</strong> in GitHub/GitLab/Bitbucket",
    "<strong>Build safe deletion queues</strong> (deactivate → archive → clean → delete)",
    "<strong>Export documented action plan</strong>"
  ]

  return (
    <Box as="section" py={20} bg="#f8f9fa">
      <LayoutContainer>
        <VStack spacing={20} w="full" mx="auto">
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

          <Grid templateColumns="1fr auto 1fr" gap={8} w="full" mx="auto" alignItems="stretch">
            {/* Colonne gauche - Processus manuel */}
            <GridItem h="full">
              <motion.div
                variants={columnFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
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
                <VStack spacing={3} align="center">
                  <HStack justify="center">
                    <FiClock size={24} color="#DC2626" />
                  </HStack>
                  <Heading as="h3" size="lg" color="var(--color-red-600)" textAlign="center">
                    Manual Process
                  </Heading>
                  <Text fontSize="sm" color="var(--color-red-500)" fontWeight="semibold">
                    40+ hours
                  </Text>
                </VStack>

                <Divider borderColor="red.200" />

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-50px" }}
                >
                  <Box as="ul" listStyleType="disc" listStylePosition="inside" flex={1} pl={4}>
                    {manualProcess.map((item, index) => (
                      <motion.div key={index} variants={staggerItem}>
                        <Box as="li" fontSize="lg" color="var(--color-text-primary)" lineHeight={1.6} mb={3} dangerouslySetInnerHTML={{ __html: item }} />
                      </motion.div>
                    ))}
                  </Box>
                </motion.div>
                </VStack>
              </Box>
              </motion.div>
            </GridItem>

            {/* Colonne centrale - VS */}
            <GridItem alignSelf="center">
              <motion.div
                variants={centerScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
              >
                <Text
                  fontSize="4xl"
                  fontWeight="bold"
                  color="var(--color-text-secondary)"
                  textAlign="center"
                  px={4}
                >
                  VS
                </Text>
              </motion.div>
            </GridItem>

            {/* Colonne droite - Processus OrgLookup */}
            <GridItem h="full">
              <motion.div
                variants={columnFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
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
                <VStack spacing={3} align="center">
                  <HStack justify="center">
                    <FiZap size={24} color="#059669" />
                  </HStack>
                  <Heading as="h3" size="lg" color="var(--color-green-600)" textAlign="center">
                    OrgLookup Process
                  </Heading>
                  <Text fontSize="sm" color="var(--color-green-500)" fontWeight="semibold">
                    30 minutes
                  </Text>
                </VStack>

                <Divider borderColor="green.200" />

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-50px" }}
                >
                  <Box as="ul" listStyleType="disc" listStylePosition="inside" flex={1} pl={4}>
                    {orgLookupProcess.map((item, index) => (
                      <motion.div key={index} variants={staggerItem}>
                        <Box as="li" fontSize="lg" color="var(--color-text-primary)" lineHeight={1.6} mb={3} dangerouslySetInnerHTML={{ __html: item }} />
                      </motion.div>
                    ))}
                  </Box>
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
