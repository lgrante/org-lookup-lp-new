import { Box } from '@chakra-ui/react'
import Header from './components/Header'
import Hero from './components/Hero'
import DeletionPlan from './components/DeletionPlan'
import PainPoints from './components/PainPoints'
import WorkflowTimeline from './components/WorkflowTimeline'
import WhatYouGet from './components/WhatYouGet'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  return (
    <Box minH="100vh" bg="#faf9f7" display="flex" flexDirection="column">
      <Header />
      <Hero />
      <PainPoints />
      <WorkflowTimeline />
      <DeletionPlan />
      <WhatYouGet />
      <ContactForm />
      <Footer />
    </Box>
  )
}

export default App