import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
} from '@chakra-ui/react'
import ContactForm from './ContactForm'
import { MobileContactForm } from './mobile'
import { useIsMobile } from '../hooks/useIsMobile'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const isMobile = useIsMobile()
  const modalSize = useBreakpointValue({ base: 'full', md: 'xl' })

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent 
        borderRadius={isMobile ? "0" : "2xl"} 
        bg="var(--color-bg)"
        overflow="hidden"
      >
        <ModalHeader 
          pt={8} 
          px={8}
          fontSize="2xl" 
          fontWeight="bold" 
          color="var(--color-text-primary)"
          textAlign="center"
        >
          Join the Beta
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8} px={8}>
          {isMobile ? (
            <MobileContactForm isModal={true} onSuccess={onClose} />
          ) : (
            <ContactForm isModal={true} onSuccess={onClose} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ContactModal
