import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Vend Sans', -apple-system, BlinkMacSystemFont, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
    mono: `'JetBrains Mono', 'Fira Code', monospace`,
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '2.5rem',  // 40px
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  colors: {
    // Couleurs principales selon le Brand Book
    primary: {
      50: '#eef2ff',      // Primary Soft
      100: '#e0e7ff',
      200: '#c7d2fe',     // Primary Border Soft
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',     // Trust Blue - couleur principale
      700: '#4338ca',     // Primary Hover
      800: '#3730a3',
      900: '#312e81',
    },
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',     // Security Green - couleur principale
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    accent: {
      primary: '#fb923c',   // Action Orange
      secondary: '#7C3AED', // Innovation Purple (gardé pour cohérence)
    },
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',     // Danger Red
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    // Couleurs neutres selon le Brand Book
    gray: {
      50: '#f9fafb',   // Background Tertiary
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',  // Text Secondary
      700: '#374151',  // Text Primary
      800: '#1f2937',
      900: '#111827',
    },
    // Couleurs fonctionnelles selon le Brand Book
    success: '#22c55e',   // Security Green
    warning: '#fb923c',   // Action Orange
    error: '#dc2626',     // Danger Red
    info: '#4f46e5',       // Trust Blue
  },
  styles: {
    global: {
      body: {
        bg: '#faf9f7',        // Background Secondary selon Brand Book
        color: '#374151',     // Text Primary selon Brand Book
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
        lineHeight: 1.6,
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: '8px',
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
      },
      variants: {
        solid: {
          bg: 'accent.primary',    // Action Orange
          color: 'white',
          _hover: {
            bg: '#ea580c',         // Action Orange Hover selon Brand Book
            _disabled: {
              bg: 'accent.primary',
            },
          },
        },
        outline: {
          border: '2px solid',
          borderColor: 'primary.600',  // Trust Blue
          color: 'primary.600',
          _hover: {
            bg: 'primary.600',
            color: 'white',
          },
        },
        primary: {
          bg: 'primary.600',      // Trust Blue
          color: 'white',
          _hover: {
            bg: 'primary.700',    // Primary Hover
          },
        },
        secondary: {
          bg: 'secondary.500',    // Security Green
          color: 'white',
          _hover: {
            bg: 'secondary.600',
          },
        },
      },
      sizes: {
        lg: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: `'Vend Sans', -apple-system, BlinkMacSystemFont, sans-serif`,
        fontWeight: 'bold',
        color: '#374151',     // Text Primary selon Brand Book
      },
      sizes: {
        '4xl': {
          fontSize: '2.5rem', // 40px
          lineHeight: 1.2,
        },
        '3xl': {
          fontSize: '2rem',   // 32px
          lineHeight: 1.3,
        },
        '2xl': {
          fontSize: '1.5rem', // 24px
          lineHeight: 1.4,
        },
        xl: {
          fontSize: '1.25rem', // 20px
          lineHeight: 1.4,
        },
      },
    },
    Text: {
      baseStyle: {
        color: '#374151',     // Text Primary selon Brand Book
        lineHeight: 1.6,
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
      },
      variants: {
        secondary: {
          color: '#4b5563',   // Text Secondary selon Brand Book
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: '1200px',
        px: { base: 4, md: 8 },
      },
    },
    Box: {
      baseStyle: {
        bg: '#ffffff',       // Background Primary selon Brand Book
      },
    },
    Card: {
      baseStyle: {
        bg: '#ffffff',       // Background Primary selon Brand Book
        borderRadius: '8px',
        boxShadow: 'sm',
      },
    },
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',
  },
  space: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
})

export default theme
