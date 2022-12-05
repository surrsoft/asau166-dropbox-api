import { Box, Heading } from '@chakra-ui/react';

export interface ParamsType {
    some?: string;
}

export function AppEventLoggerPage ({some}: ParamsType) {
    return <Box>
      <Heading size={'mb'}>Event Logging App</Heading>

    </Box>
}
