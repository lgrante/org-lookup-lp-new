import { motion, Variants } from 'framer-motion'
import { Box, BoxProps } from '@chakra-ui/react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer } from '../utils/animations'

interface MotionSectionProps extends BoxProps {
  children: React.ReactNode
  delay?: number
  variant?: 'slideUp' | 'fadeIn' | 'scaleIn'
  staggerChildren?: boolean
}

const MotionSection = ({
  children,
  delay = 0,
  variant = 'slideUp',
  staggerChildren = false,
  ...props
}: MotionSectionProps) => {
  const { ref, isVisible } = useScrollAnimation()

  const getVariants = (): Variants => {
    switch (variant) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.6, delay, ease: 'easeOut' }
          }
        }
      case 'scaleIn':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, delay, ease: 'easeOut' }
          }
        }
      case 'slideUp':
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay, ease: 'easeOut' }
          }
        }
    }
  }

  if (staggerChildren) {
    return (
      <Box ref={ref} {...props}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {children}
        </motion.div>
      </Box>
    )
  }

  return (
    <Box ref={ref} {...props}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </Box>
  )
}

export default MotionSection
