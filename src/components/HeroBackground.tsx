import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'

const HeroBackground = () => {
  const shouldReduceMotion = useReducedMotion()

  // Couleurs très claires pour rester discret
  const gradientStart = useColorModeValue('primary.50', 'primary.50')
  const gradientEnd = useColorModeValue('primary.100', 'primary.100')
  const shapeColor1 = useColorModeValue('primary.100', 'primary.100')
  const shapeColor2 = useColorModeValue('secondary.100', 'secondary.100')

  // Animation du gradient (très lente, 25 secondes)
  const gradientVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
  }

  const gradientTransition = {
    duration: shouldReduceMotion ? 0 : 25,
    repeat: Infinity,
    ease: 'linear',
  }

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      overflow="hidden"
      zIndex={0}
      pointerEvents="none"
    >
      {/* Gradient animé */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, ${gradientStart} 0%, ${gradientEnd} 50%, ${gradientStart} 100%)`,
          backgroundSize: '200% 200%',
          opacity: 0.03, // Très subtil
        }}
        variants={gradientVariants}
        animate="animate"
        transition={gradientTransition}
      />

      {/* Formes géométriques discrètes animées */}
      {!shouldReduceMotion && (
        <>
          {/* Cercle large - en haut à gauche */}
          <motion.div
            style={{
              position: 'absolute',
              top: '12%',
              left: '8%',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: shapeColor1,
              opacity: 0.06,
            }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0,
            }}
          />

          {/* Carré avec rotation douce - en haut à droite */}
          <motion.div
            style={{
              position: 'absolute',
              top: '20%',
              right: '12%',
              width: '90px',
              height: '90px',
              backgroundColor: shapeColor2,
              opacity: 0.05,
            }}
            animate={{
              rotate: [0, 10, 0],
              x: [0, 8, 0],
              y: [0, -12, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          />

          {/* Triangle - au milieu à gauche */}
          <motion.div
            style={{
              position: 'absolute',
              top: '45%',
              left: '5%',
              width: 0,
              height: 0,
              borderLeft: '50px solid transparent',
              borderRight: '50px solid transparent',
              borderBottom: `80px solid ${shapeColor1}`,
              opacity: 0.04,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 6,
            }}
          />

          {/* Losange - au milieu à droite */}
          <motion.div
            style={{
              position: 'absolute',
              top: '55%',
              right: '8%',
              width: '70px',
              height: '70px',
              backgroundColor: shapeColor2,
              opacity: 0.05,
              transform: 'rotate(45deg)',
            }}
            animate={{
              scale: [1, 1.08, 1],
              rotate: [45, 55, 45],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 9,
            }}
          />

          {/* Cercle moyen - en bas à gauche */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '15%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: shapeColor1,
              opacity: 0.05,
            }}
            animate={{
              x: [0, 12, 0],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 12,
            }}
          />

          {/* Rectangle allongé - en bas à droite */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '25%',
              right: '20%',
              width: '120px',
              height: '40px',
              backgroundColor: shapeColor2,
              opacity: 0.04,
              borderRadius: '20px',
            }}
            animate={{
              scaleX: [1, 1.1, 1],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 21,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 15,
            }}
          />

          {/* Petit cercle - centre gauche */}
          <motion.div
            style={{
              position: 'absolute',
              top: '35%',
              left: '25%',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: shapeColor1,
              opacity: 0.03,
            }}
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 18,
            }}
          />

          {/* Hexagone - centre droit */}
          <motion.div
            style={{
              position: 'absolute',
              top: '65%',
              right: '35%',
              width: '60px',
              height: '60px',
              backgroundColor: shapeColor2,
              opacity: 0.04,
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
            }}
            animate={{
              rotate: [0, -12, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 23,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 21,
            }}
          />

          {/* Cercle très petit - haut centre */}
          <motion.div
            style={{
              position: 'absolute',
              top: '8%',
              left: '45%',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              backgroundColor: shapeColor1,
              opacity: 0.04,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.04, 0.06, 0.04],
            }}
            transition={{
              duration: 17,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 24,
            }}
          />

          {/* Carré arrondi - bas centre */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '35%',
              left: '50%',
              width: '45px',
              height: '45px',
              backgroundColor: shapeColor2,
              opacity: 0.03,
              borderRadius: '8px',
            }}
            animate={{
              rotate: [0, 8, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 27,
            }}
          />
        </>
      )}
    </Box>
  )
}

export default HeroBackground
