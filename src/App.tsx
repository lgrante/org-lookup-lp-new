import { Box, useDisclosure } from '@chakra-ui/react'
import { useIsMobile } from './hooks/useIsMobile'

// Desktop components
import Header from './components/Header'
import Hero from './components/Hero'
import DeletionPlan from './components/DeletionPlan'
import PainPoints from './components/PainPoints'
import WorkflowTimeline from './components/WorkflowTimeline'
import WhatYouGet from './components/WhatYouGet'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import DataCloudContext from './components/DataCloudContext'

// Mobile components
import {
  MobileHeader,
  MobileHero,
  MobilePainPoints,
  MobileWorkflowTimeline,
  MobileDeletionPlan,
  MobileWhatYouGet,
  MobileContactForm,
  MobileFooter,
  MobileDataCloudContext
} from './components/mobile'

function App() {
  const isMobile = useIsMobile()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg="#faf9f7" display="flex" flexDirection="column">
      {isMobile ? (
        <>
          <MobileHeader onContactClick={onOpen} />
          <MobileHero onContactClick={onOpen} />
          <MobilePainPoints />
          <MobileDataCloudContext />
          <MobileWorkflowTimeline />
          <MobileDeletionPlan />
          <MobileWhatYouGet />
          <MobileContactForm />
          <MobileFooter />
        </>
      ) : (
        <>
          <Header onContactClick={onOpen} />
          <Hero onContactClick={onOpen} />
          <PainPoints />
          <DataCloudContext />
          <WorkflowTimeline />
          <DeletionPlan />
          <WhatYouGet />
          <ContactForm />
          <Footer />
        </>
      )}
      <ContactModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default App