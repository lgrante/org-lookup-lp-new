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
import LayoutContainer from './LayoutContainer'
import { fadeIn } from '../utils/animations'
import { supabase } from '../lib/supabase'

const ContactForm = () => {
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
      const { error } = await supabase
        .from('lead')
        .insert([
          {
            email: formData.email,
            company_name: formData.companyName,
            challenges: formData.challenge && formData.challenge.trim() !== '' ? formData.challenge : null,
          },
        ])
        .select()

      if (error) {
        console.error('Erreur Supabase:', error)
        throw error
      }

      toast({
        title: "Success!",
        description: "We'll be in touch soon about early access.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      // Reset form
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
    <Box as="section" py={20}>
      <LayoutContainer>
        <VStack spacing={12} maxW="600px" mx="auto">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" size="3xl" color="var(--color-text-primary)">
                Early Access Beta — Help Shape How Salesforce Teams Tackle Technical Debt
              </Heading>
            </VStack>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <Box
            as="form"
            onSubmit={handleSubmit}
            w="full"
            bg="var(--color-gray-100)"
            p={{ base: 6, md: 8 }}
            borderRadius="12px"
            border="1px solid"
            borderColor="var(--color-gray-200)"
          >
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel
                  htmlFor="email"
                  color="var(--color-text-primary)"
                  fontWeight="medium"
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
                    borderColor: 'primary.500',
                    boxShadow: '0 0 0 1px #2563EB'
                  }}
                  size={{ base: "md", md: "lg" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel
                  htmlFor="companyName"
                  color="var(--color-text-primary)"
                  fontWeight="medium"
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
                    borderColor: 'primary.500',
                    boxShadow: '0 0 0 1px #2563EB'
                  }}
                  size={{ base: "md", md: "lg" }}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="challenge"
                  color="var(--color-text-primary)"
                  fontWeight="medium"
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
                    borderColor: 'primary.500',
                    boxShadow: '0 0 0 1px #2563EB'
                  }}
                  size={{ base: "md", md: "lg" }}
                  rows={4}
                  resize="vertical"
                />
              </FormControl>

              <Button
                type="submit"
                size="lg"
                variant="solid"
                bg="accent.primary"
                _hover={{ bg: '#DC2626' }}
                color="white"
                w="full"
                fontSize="lg"
                fontWeight="medium"
                isLoading={isSubmitting}
                loadingText="Submitting..."
              >
                Join Beta
              </Button>

              <Text fontSize="sm" color="var(--color-text-secondary)" textAlign="center">
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

export default ContactForm
