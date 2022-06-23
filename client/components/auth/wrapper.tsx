import { FunctionComponent, ReactNode } from 'react';
import { css } from '@emotion/react';
import { Stack } from '@mui/material';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({ children }) => {
  const outerStyle = css`
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `;
  const innerStyle = css`
    width: 80%;
    max-width: 800px;
    padding: 1em;
  `;
  return (
    <Stack css={outerStyle}>
      <Stack css={innerStyle}>{children}</Stack>
    </Stack>
  );
};

export default AuthWrapper;
