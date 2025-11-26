import { Variants } from 'framer-motion'

// Constantes pour les animations
export const ANIMATION_DURATION = 0.6
export const STAGGER_DELAY = 0.1
export const EASING = 'easeOut'

// Variantes d'animation de base
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION,
      ease: EASING
    }
  }
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: EASING
    }
  }
}

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: EASING
    }
  }
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: EASING
    }
  }
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: EASING
    }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATION,
      ease: EASING
    }
  }
}

// Variantes pour les listes avec stagger
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: EASING
    }
  }
}

// Variantes spéciales pour des composants spécifiques
export const cardHover: Variants = {
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}

// Variantes pour les animations au scroll
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

// Variantes pour les colonnes opposées (comme dans DeletionPlan)
export const columnFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.3
    }
  }
}

export const columnFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.3
    }
  }
}

export const centerScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.5
    }
  }
}
