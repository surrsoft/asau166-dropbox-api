import React, { PropsWithChildren } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export interface PropsType {
  path: string,
  onClick?: () => void
}

/**
 * ID [221126152258]
 */
export function NavWrap({children, path, onClick}: PropsType & PropsWithChildren) {
  const navigate = useNavigate()
  const isMatch = useMatch(path)

  const handleClick = () => {
    onClick?.()
    navigate(path);
  }

  return <Box
    onClick={handleClick}
    padding='2px 8px'
    cursor={'pointer'}
    wordBreak={'normal'}
    borderRadius='4px'
    borderWidth='1px'
    borderColor={isMatch ? 'red' : "#4fdbdb"}
    bg={'#efdddd'}
    fontWeight={isMatch ? 'bold' : 'normal'}
  >
    {children}
  </Box>
}
