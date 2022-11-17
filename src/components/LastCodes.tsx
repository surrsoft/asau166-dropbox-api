import { Box, Heading, HStack, Tag } from "@chakra-ui/react";
import { GapRowStyled } from "./GapRowStyled";

export function LastCodes({zintCodes}: { zintCodes: string[] }) {
  return <Box>
    <Heading size={'sm'}>last {zintCodes.length} codes:</Heading>
    <GapRowStyled height={8}/>
    <HStack spacing={2}>
      {zintCodes.map(el => {
        return <Tag>{el}</Tag>
      })}
    </HStack>
  </Box>
}
