import { Box, Image, Text, HStack, Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

const Header = () => {
  return (
    <Box
      as="header"
      position="fixed"
      top={5}
      left="50%"
      right={0}
      transform="translateX(-50%)"
      borderRadius={100}
      border="1px solid var(--color-gray-400)"
      backgroundColor="var(--color-bg-primary)"
      boxShadow="lg"
      zIndex={1000}
      py={{ base: 3, md: 3 }}
      height="90px"
      width="95%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        height="100%"
        width="100%"
        px={{ base: 5, md: 5 }}
      >
        <HStack
          height="100%"
          margin={0}
          padding={0}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack
            cursor="pointer"
            alignItems="center"
            _hover={{ opacity: 0.8 }}
          >
            <Image
              src="./favicon.ico"
              alt="OrgLookup Logo"
              w={{ base: "60px", md: "60px" }}
              h={{ base: "60px", md: "60px" }}
              margin={0}
            />
            <Text
              margin={0}
              fontSize={{ base: "3xl", md: "3xl" }}
              fontWeight="bold"
              fontFamily="'Vend Sans', sans-serif"
              color="var(--color-text-primary)"
            >
              Orglookup
            </Text>
          </HStack>

          <Button
            zIndex={2000}
            height="90%"
            width="8%"
            rightIcon={<ArrowForwardIcon />}
            variant="ghost"
            backgroundColor="transparent"
            borderRadius={100}
            border="2px solid var(--color-tertiary)"
            color="var(--color-tertiary)"
            fontWeight="bold"
            _hover={{
              transform: "scale(1.08)",
            }}
            transition="all 0.2s ease-in-out"
          >
            Talk to us
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}

export default Header
