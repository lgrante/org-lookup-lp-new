import { Box } from '@chakra-ui/react'
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

// Mobile components
import {
  MobileHeader,
  MobileHero,
  MobilePainPoints,
  MobileWorkflowTimeline,
  MobileDeletionPlan,
  MobileWhatYouGet,
  MobileContactForm,
  MobileFooter
} from './components/mobile'

function App() {
  const isMobile = useIsMobile()

  return (
    <Box minH="100vh" bg="#faf9f7" display="flex" flexDirection="column" overflowX="hidden">
      {isMobile ? (
        <>
          <MobileHeader />
          <MobileHero />
          <MobilePainPoints />
          <MobileWorkflowTimeline />
          <MobileDeletionPlan />
          <MobileWhatYouGet />
          <MobileContactForm />
          <MobileFooter />
        </>
      ) : (
        <>
          <Header />
          <Hero />
          <PainPoints />
          <WorkflowTimeline />
          <DeletionPlan />
          <WhatYouGet />
          <ContactForm />
          <Footer />
        </>
      )}
    </Box>
  )
}

export default App