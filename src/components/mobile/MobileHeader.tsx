import { useState } from 'react'
import {
  Box,
  Image,
  Text,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { ArrowForwardIcon } from '@chakra-ui/icons'

const MobileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const scrollToContact = () => {
    onClose()
    // Scroll to contact form
    const contactSection = document.querySelector('#contact-form')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={3}
        left="50%"
        transform="translateX(-50%)"
        borderRadius={50}
        width="94%"
        border="1px solid var(--color-gray-400)"
        backgroundColor="var(--color-bg-primary)"
        boxShadow="md"
        zIndex={1000}
        py={2}
        px={4}
        height="60px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo */}
        <HStack spacing={2} alignItems="center">
          <Image
            src="./favicon.ico"
            alt="OrgLookup Logo"
            w="40px"
            h="40px"
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontFamily="'Vend Sans', sans-serif"
            color="var(--color-text-primary)"
          >
            Orglookup
          </Text>
        </HStack>

        {/* Hamburger Menu Button */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon boxSize={6} />}
          variant="ghost"
          onClick={onOpen}
          color="var(--color-text-primary)"
          _hover={{ bg: 'var(--color-gray-100)' }}
          size="lg"
          minW="44px"
          minH="44px"
        />
      </Box>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay bg="blackAlpha.600" />
        <DrawerContent bg="var(--color-bg-primary)">
          <DrawerCloseButton size="lg" mt={2} />
          <DrawerHeader borderBottomWidth="1px" borderColor="var(--color-gray-200)">
            <HStack spacing={2}>
              <Image
                src="./favicon.ico"
                alt="OrgLookup Logo"
                w="32px"
                h="32px"
              />
              <Text
                fontSize="lg"
                fontWeight="bold"
                fontFamily="'Vend Sans', sans-serif"
                color="var(--color-text-primary)"
              >
                Menu
              </Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody py={6}>
            <VStack spacing={4} align="stretch">
              {/* Navigation Links */}
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontSize="md"
                fontWeight="medium"
                color="var(--color-text-primary)"
                _hover={{ bg: 'var(--color-gray-100)' }}
                py={6}
                onClick={onClose}
              >
                How it works
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontSize="md"
                fontWeight="medium"
                color="var(--color-text-primary)"
                _hover={{ bg: 'var(--color-gray-100)' }}
                py={6}
                onClick={onClose}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontSize="md"
                fontWeight="medium"
                color="var(--color-text-primary)"
                _hover={{ bg: 'var(--color-gray-100)' }}
                py={6}
                onClick={onClose}
              >
                Pricing
              </Button>

              {/* Divider */}
              <Box h="1px" bg="var(--color-gray-200)" my={2} />

              {/* CTA Button */}
              <Button
                rightIcon={<ArrowForwardIcon />}
                bg="var(--color-tertiary)"
                color="white"
                fontWeight="bold"
                borderRadius={50}
                py={6}
                _hover={{
                  bg: 'var(--color-primary)',
                }}
                onClick={scrollToContact}
              >
                Talk to us
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileHeader

