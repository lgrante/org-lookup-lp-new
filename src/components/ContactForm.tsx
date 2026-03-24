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
  useToast,
  Badge
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import LayoutContainer from './LayoutContainer'
import { fadeIn } from '../utils/animations'
import { supabase } from '../lib/supabase'

interface ContactFormProps {
  isModal?: boolean
  onSuccess?: () => void
}

const ContactForm = ({ isModal = false, onSuccess }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    phone: '',
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
            phone_number: formData.phone && formData.phone.trim() !== '' ? formData.phone : null,
            challenges: formData.challenge && formData.challenge.trim() !== '' ? formData.challenge : null,
          },
        ])

      if (error) {
        console.error('Erreur Supabase:', error)
        throw error
      }

      toast({
        title: "Access Requested",
        description: "Your spot in the queue has been reserved. We'll be in touch soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      if (onSuccess) {
        onSuccess()
      }

      // Reset form
      setFormData({
        email: '',
        companyName: '',
        phone: '',
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

  const FormContent = (
    <Box
      as="form"
      onSubmit={handleSubmit}
      w="full"
      bg="whiteAlpha.50"
      backdropFilter="blur(10px)"
      p={{ base: 6, md: 10 }}
      borderRadius="24px"
      border="1px solid"
      borderColor="whiteAlpha.200"
      boxShadow="0 30px 60px rgba(0,0,0,0.6)"
      position="relative"
      overflow="hidden"
    >
      {/* Background glow for the form */}
      <Box
        position="absolute"
        top="-50%"
        left="-50%"
        w="200%"
        h="200%"
        bg="radial-gradient(circle, rgba(231,104,230,0.05) 0%, transparent 40%)"
        pointerEvents="none"
      />

      <VStack spacing={6} position="relative" zIndex={1}>
        <FormControl isRequired>
          <FormLabel htmlFor="email" color="gray.300" fontWeight="medium">
            Work Email
          </FormLabel>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            placeholder="admin@enterprise.com"
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.200"
            color="white"
            _placeholder={{ color: "gray.600" }}
            _focus={{
              borderColor: '#e768e6',
              boxShadow: '0 0 0 1px #e768e6',
              bg: "whiteAlpha.100"
            }}
            size="lg"
            h="56px"
            borderRadius="12px"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="companyName" color="gray.300" fontWeight="medium">
            Company Name
          </FormLabel>
          <Input
            id="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange('companyName')}
            placeholder="Acme Corp"
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.200"
            color="white"
            _placeholder={{ color: "gray.600" }}
            _focus={{
              borderColor: '#e768e6',
              boxShadow: '0 0 0 1px #e768e6',
              bg: "whiteAlpha.100"
            }}
            size="lg"
            h="56px"
            borderRadius="12px"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="phone" color="gray.300" fontWeight="medium">
            Phone Number <Box as="span" color="gray.500" fontSize="sm">(Optional)</Box>
          </FormLabel>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            placeholder="+1 (555) 000-0000"
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.200"
            color="white"
            _placeholder={{ color: "gray.600" }}
            _focus={{
              borderColor: '#e768e6',
              boxShadow: '0 0 0 1px #e768e6',
              bg: "whiteAlpha.100"
            }}
            size="lg"
            h="56px"
            borderRadius="12px"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="challenge" color="gray.300" fontWeight="medium">
            What is your biggest challenge with technical debt?
          </FormLabel>
          <Textarea
            id="challenge"
            value={formData.challenge}
            onChange={handleInputChange('challenge')}
            placeholder="Tell us about the metadata or automation bottlenecks you're facing..."
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.200"
            color="white"
            _placeholder={{ color: "gray.600" }}
            _focus={{
              borderColor: '#e768e6',
              boxShadow: '0 0 0 1px #e768e6',
              bg: "whiteAlpha.100"
            }}
            size="lg"
            rows={4}
            resize="vertical"
            borderRadius="12px"
          />
        </FormControl>

        <Box pt={2} w="full">
          <Button
            type="submit"
            size="lg"
            h="60px"
            borderRadius="full"
            bgGradient="linear(to-r, #e768e6, #ff9b26)"
            _hover={{
              bgGradient: "linear(to-r, #d958d8, #e0871f)",
              boxShadow: "0 0 24px rgba(231,104,230,0.6)",
              transform: "translateY(-2px)"
            }}
            _active={{ transform: "scale(0.98)" }}
            color="white"
            w="full"
            fontSize="lg"
            fontWeight="bold"
            transition="all 0.2s"
            isLoading={isSubmitting}
            loadingText="Securing your spot..."
          >
            Request Private Beta Access
          </Button>
        </Box>

        <Text fontSize="sm" color="gray.500" textAlign="center">
          Enterprise-grade privacy. We never share your data.
        </Text>
      </VStack>
    </Box>
  )

  if (isModal) {
    return FormContent
  }

  return (
    <Box as="section" py={24} bg="gray.900" position="relative" overflow="hidden">
      <LayoutContainer>
        <VStack spacing={12} maxW="700px" mx="auto" position="relative" zIndex={1}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <VStack spacing={6} textAlign="center">

              <Heading as="h2" size="3xl" color="white" lineHeight={1.2}>
                Help Shape How Salesforce Teams Tackle Technical Debt
              </Heading>
              <Text color="gray.400" fontSize="xl">
                Join the exclusive group of enterprise teams preparing their orgs for Agentforce.
              </Text>
            </VStack>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            style={{ width: '100%' }}
          >
            {FormContent}
          </motion.div>
        </VStack>
      </LayoutContainer>
    </Box>
  )
}

export default ContactForm
