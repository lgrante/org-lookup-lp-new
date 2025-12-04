import { Box, VStack, HStack, Text, Circle, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef, ReactNode } from 'react'

interface TimelineStepProps {
  step: number
  title: string
  subtitle?: string
  description: string[]
  imageSrc?: string
  imageAlt?: string
  component?: ReactNode
  isLast?: boolean
  isReversed?: boolean
}

const TimelineStep = ({
  step,
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  component,
  isLast = false,
  isReversed = false
}: TimelineStepProps) => {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up')
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      position="relative"
      width="100%"
      py={20}
      bg="transparent"
    >
        {/* Layout responsive */}
        <Box
          //display={{ base: "block", md: "flex" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap={12}
          maxW="2800px"
          mx="auto"
          flexDirection={isReversed ? "row-reverse" : "row"}
        >
          {/* Step Number - Mobile only */}
          <Circle
            size="60px"
            bg="var(--color-primary)"
            color="white"
            fontSize="2xl"
            fontWeight="bold"
            display={{ base: "flex", md: "none" }}
            alignItems="center"
            justifyContent="center"
            mx="auto"
            mb={4}
            fontFamily="'Vend Sans', sans-serif"
          >
            {step}
          </Circle>

          {/* Visual Section */}
          <Box textAlign="center" minW="200px" bg="transparent" width="45%">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, margin: "-100px" }}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {component ? (
                component
              ) : (
                <Image
                  src={imageSrc}
                  alt={imageAlt || "Step illustration"}
                  w="70%"
                  objectFit="contain"
                />
              )}
            </motion.div>
          </Box>

          {/* Content Section */}
          <Box textAlign={isReversed ? "right" : "left"} width="45%">
            <VStack spacing={6} align={isReversed ? "flex-end" : "flex-start"} width="100%">
              {/* Title with badge */}
              <HStack spacing={3} align={isReversed ? "flex-end" : "flex-start"} width="100%">
                {!isReversed && (
                  <Circle
                    size="50px"
                    bg="var(--color-primary)"
                    color="white"
                    fontSize="lg"
                    fontWeight="bold"
                    flexShrink={0}
                  >
                    {step}
                  </Circle>
                )}
                <VStack spacing={1} align={isReversed ? "flex-end" : "flex-start"} width="100%">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    style={{ width: "100%" }}
                  >
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color="var(--color-text-primary)"
                      lineHeight={1.2}
                      fontFamily="'Vend Sans', sans-serif"
                      width="100%"
                    >
                      {title}
                    </Text>
                  </motion.div>
                  {subtitle && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: false, margin: "-100px" }}
                      style={{ width: "100%" }}
                    >
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        color="var(--color-primary)"
                        lineHeight={1.4}
                        fontStyle="italic"
                      >
                        {subtitle}
                      </Text>
                    </motion.div>
                  )}
                </VStack>
                {isReversed && (
                  <Circle
                    size="50px"
                    bg="var(--color-primary)"
                    color="white"
                    fontSize="lg"
                    fontWeight="bold"
                    flexShrink={0}
                  >
                    {step}
                  </Circle>
                )}
              </HStack>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false, margin: "-100px" }}
                style={{ width: "100%" }}
              >
                <VStack spacing={4} align={isReversed ? "flex-end" : "flex-start"}>
                  {description.map((item, index) => (
                    <Text
                      key={index}
                      fontSize="lg"
                      color="var(--color-text-primary)"
                      lineHeight={1.8}
                      width="100%"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </VStack>
              </motion.div>
            </VStack>
          </Box>
        </Box>

      {/* Timeline Line */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "50%",
            transform: "translateX(-50%)",
            transformOrigin: scrollDirection === 'down' ? "top" : "bottom",
            width: "5px",
            height: "180px",
            background: "var(--color-primary)",
            borderRadius: "9999px",
          }}
        />
      )}
    </Box>
  )
}

export default TimelineStep
