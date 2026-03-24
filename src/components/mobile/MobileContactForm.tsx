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
import LayoutContainer from '../LayoutContainer'
import { fadeIn } from '../../utils/animations'
import { supabase } from '../../lib/supabase'

interface MobileContactFormProps {
  isModal?: boolean
  onSuccess?: () => void
}

const MobileContactForm = ({ isModal = false, onSuccess }: MobileContactFormProps) => {
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
        .select()

      if (error) {
        console.error('Erreur Supabase:', error)
        throw error
      }

      toast({
        title: "Access Requested",
        description: "Your spot has been reserved. We'll be in touch soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      if (onSuccess) {
        onSuccess()
      }

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
      p={6}
      borderRadius="20px"
      border="1px solid"
      borderColor="whiteAlpha.200"
      boxShadow="0 20px 40px rgba(0,0,0,0.6)"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-30%"
        left="-30%"
        w="160%"
        h="160%"
        bg="radial-gradient(circle, rgba(231,104,230,0.06) 0%, transparent 40%)"
        pointerEvents="none"
      />

      <VStack spacing={5} position="relative" zIndex={1}>
        <FormControl isRequired>
          <FormLabel htmlFor="email" color="gray.300" fontWeight="medium" fontSize="sm">
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
            h="52px"
            fontSize="md"
            borderRadius="10px"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="companyName" color="gray.300" fontWeight="medium" fontSize="sm">
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
            h="52px"
            fontSize="md"
            borderRadius="10px"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="phone" color="gray.300" fontWeight="medium" fontSize="sm">
            Phone Number <Box as="span" color="gray.500">(Optional)</Box>
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
            h="52px"
            fontSize="md"
            borderRadius="10px"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="challenge" color="gray.300" fontWeight="medium" fontSize="sm">
            Biggest challenge with tech debt?
          </FormLabel>
          <Textarea
            id="challenge"
            value={formData.challenge}
            onChange={handleInputChange('challenge')}
            placeholder="Tell us about your bottlenecks..."
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
            fontSize="md"
            rows={3}
            resize="vertical"
            borderRadius="10px"
          />
        </FormControl>

        <Box w="full" pt={2}>
          <Button
            type="submit"
            size="lg"
            variant="solid"
            bgGradient="linear(to-r, #e768e6, #ff9b26)"
            _hover={{ 
              bgGradient: "linear(to-r, #d958d8, #e0871f)",
              boxShadow: "0 0 20px rgba(231,104,230,0.5)"
            }}
            _active={{ transform: 'scale(0.98)' }}
            color="white"
            w="full"
            fontSize="md"
            fontWeight="bold"
            h="56px"
            borderRadius="full"
            isLoading={isSubmitting}
            loadingText="Securing spot..."
          >
            Request Private Beta
          </Button>
        </Box>

        <Text fontSize="xs" color="gray.500" textAlign="center">
          Enterprise-grade privacy. Data never shared.
        </Text>
      </VStack>
    </Box>
  )

  if (isModal) {
    return FormContent
  }

  return (
    <Box as="section" py={16} bg="gray.900" id="contact-form">
      <LayoutContainer>
        <VStack spacing={8} px={4}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <VStack spacing={5} textAlign="center">

              <Heading as="h2" fontSize="2xl" color="white" lineHeight={1.3}>
                Help Shape How Salesforce Teams Tackle Technical Debt
              </Heading>
              <Text color="gray.400" fontSize="md">
                Join the exclusive group of teams preparing for Agentforce.
              </Text>
            </VStack>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            style={{ width: '100%' }}
          >
            {FormContent}
          </motion.div>
        </VStack>
      </LayoutContainer>
    </Box>
  )
}

export default MobileContactForm
