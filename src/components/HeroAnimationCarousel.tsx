import { useState, useEffect, useRef } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ObsoleteDetectionPreview,
  ImpactAnalysisPreview,
  ExternalCodeScanPreview,
  DeletionQueuePreview,
  SafeExecutionPreview,
} from "./workflow-steps";

const STEP_LABELS = [
  "Detect obsolete components of your org",
  "Analyze the impact of deleting these components",
  "Scan beyond Salesforce org for external code dependencies",
  "Add components to deletion queue",
  "AI guide you through safe step-by-step deletion plan",
];

interface HeroAnimationCarouselProps {
  scale?: number;
}

const HeroAnimationCarousel = ({ scale: _ignoredScale }: HeroAnimationCarouselProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Base dimensions of the content
  const BASE_WIDTH = 600;
  const BASE_HEIGHT = 380;

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 5);
    }, 4000); // 4 seconds per step

    return () => clearInterval(interval);
  }, []);

  // Monitor container width for auto-scaling
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      
      const parentWidth = containerRef.current.offsetWidth;
      // If parent is smaller than base width, scale down.
      // Otherwise scale is 1 (or slightly larger if we want).
      // We'll cap it at 1 for simplicity as per user request to just "reduce" it.
      const newScale = Math.min(parentWidth / BASE_WIDTH, 1);
      
      setScale(newScale > 0 ? newScale : 1);
    };

    updateScale();
    
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
        observer.observe(containerRef.current);
    }
    window.addEventListener('resize', updateScale);

    return () => {
        observer.disconnect();
        window.removeEventListener('resize', updateScale);
    };
  }, []);

  const renderCurrentPreview = () => {
    switch (currentStep) {
      case 0:
        return <ObsoleteDetectionPreview />;
      case 1:
        return <ImpactAnalysisPreview />;
      case 2:
        return <ExternalCodeScanPreview />;
      case 3:
        return <DeletionQueuePreview />;
      case 4:
        return <SafeExecutionPreview />;
      default:
        return <ObsoleteDetectionPreview />;
    }
  };

  return (
    <VStack 
      ref={containerRef}
      width="100%" 
      maxWidth="630px" 
      mx="auto" 
      alignItems="center" 
      justifyContent="center" 
      minH={{ base: "auto", md: "550px" }}
      spacing={{ base: 6, md: 8 }}
    >
      <Heading
        as="h2"
        fontSize={{ base: "2xl", md: "3xl" }}
        color="white"
        textAlign="center"
        mb={{ base: 6, md: 10 }}
        fontWeight="bold"
        px={4}
      >
        Step {currentStep + 1}: {STEP_LABELS[currentStep]}
      </Heading>

      {/* ... (indicators and label remain same) */}
      <Box display="flex" justifyContent="center" gap={2} mb={4}>
        {STEP_LABELS.map((_, index) => (
          <Box
            key={index}
            w={currentStep === index ? "24px" : "8px"}
            h="8px"
            borderRadius="full"
            bg={currentStep === index ? "white" : "rgba(255,255,255,0.4)"}
            transition="all 0.3s ease"
            cursor="pointer"
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </Box>

      {/* Frame Container */}
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="12px"
        boxShadow="0px 20px 40px rgba(0, 0, 0, 0.2)"
        bg="white"
        mx="auto"
        style={{
          width: `${BASE_WIDTH * scale}px`,
          height: `${BASE_HEIGHT * scale}px`,
          transition: "all 0.2s ease-out"
        }}
      >
        {/* Scaled Content Inner */}
        <Box
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${BASE_WIDTH}px`,
            height: `${BASE_HEIGHT}px`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              {renderCurrentPreview()}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </VStack>
  );
};

export default HeroAnimationCarousel;
