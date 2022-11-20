import { Box, Heading, HStack, Tag } from "@chakra-ui/react";
import { GapRowStyled } from "../../../components/common/GapRowStyled";

export function LastCodes({zintCodes}: { zintCodes: string[] }) {
  if (zintCodes.length < 1) return null;

  return <Box bg={'#c3c4f3'} p={'8px'} borderRadius={'8px'}>
    <Heading size={'sm'}>last {zintCodes.length} codes:</Heading>
    <GapRowStyled height={12}/>
    <Box display={'flex'} flexWrap={'wrap'} rowGap={'8px'} columnGap={'8px'}>
      {zintCodes.map(el => {
        return <Tag>{el}</Tag>
      })}
    </Box>
  </Box>
}
