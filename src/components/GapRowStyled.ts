import styled from 'styled-components';

/**
 * ID [[221115233912]] rev 1 1.0.0 2022-11-15
 */
export const GapRowStyled = styled.div<{ height?: number | string }>`
  margin-top: ${({height}) => height || 16}px;
`;
