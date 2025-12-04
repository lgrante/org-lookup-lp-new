import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Text,
  Heading,
  useToast
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import LayoutContainer from '../LayoutContainer'
import { fadeIn } from '../../utils/animations'

const MobileContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    challenge: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Success!",
        description: "We'll be in touch soon about early access.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      setFormData({
        email: '',
        companyName: '',
        challenge: ''
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box as="section" py="60px" id="contact-form">
      <LayoutContainer>
        <VStack spacing={6} px={4}>
          {/* Header */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
          >
            <VStack spacing={3} textAlign="center">
              <Heading as="h2" fontSize="xl" color="var(--color-text-primary)" lineHeight={1.3}>
                Early Access Beta — Help Shape How Salesforce Teams Tackle Technical Debt
              </Heading>
            </VStack>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            <Box
              as="form"
              onSubmit={handleSubmit}
              w="full"
              bg="var(--color-gray-100)"
              p={5}
              borderRadius="12px"
              border="1px solid"
              borderColor="var(--color-gray-200)"
            >
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel
                    htmlFor="email"
                    color="var(--color-text-primary)"
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="your.email@company.com"
                    bg="white"
                    border="1px solid"
                    borderColor="var(--color-gray-300)"
                    _focus={{
                      borderColor: 'var(--color-primary)',
                      boxShadow: '0 0 0 1px var(--color-primary)'
                    }}
                    size="lg"
                    fontSize="md"
                    h="48px"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel
                    htmlFor="companyName"
                    color="var(--color-text-primary)"
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    Company Name
                  </FormLabel>
                  <Input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleInputChange('companyName')}
                    placeholder="Your Company"
                    bg="white"
                    border="1px solid"
                    borderColor="var(--color-gray-300)"
                    _focus={{
                      borderColor: 'var(--color-primary)',
                      boxShadow: '0 0 0 1px var(--color-primary)'
                    }}
                    size="lg"
                    fontSize="md"
                    h="48px"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel
                    htmlFor="challenge"
                    color="var(--color-text-primary)"
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    What is your biggest challenge with technical debt in Salesforce?
                  </FormLabel>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={handleInputChange('challenge')}
                    placeholder="Tell us about your biggest technical debt challenge..."
                    bg="white"
                    border="1px solid"
                    borderColor="var(--color-gray-300)"
                    _focus={{
                      borderColor: 'var(--color-primary)',
                      boxShadow: '0 0 0 1px var(--color-primary)'
                    }}
                    fontSize="md"
                    rows={3}
                    resize="vertical"
                  />
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  variant="solid"
                  bg="var(--color-primary)"
                  _hover={{ bg: 'var(--color-primary-hover)' }}
                  _active={{ transform: 'scale(0.98)' }}
                  color="white"
                  w="full"
                  fontSize="md"
                  fontWeight="bold"
                  h="52px"
                  borderRadius="full"
                  isLoading={isSubmitting}
                  loadingText="Submitting..."
                >
                  Join Beta
                </Button>

                <Text fontSize="xs" color="var(--color-text-secondary)" textAlign="center">
                  We respect your privacy and will never share your information.
                </Text>
              </VStack>
            </Box>
          </motion.div>
        </VStack>
      </LayoutContainer>
    </Box>
  )
}

export default MobileContactForm

