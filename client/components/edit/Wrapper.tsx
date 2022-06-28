import { Box, css } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';

interface EditWrapperProps {
  children: ReactNode;
}

const EditWrapper: FunctionComponent<EditWrapperProps> = ({ children }) => {
  const wrapperStyle = css`
    position: relative;
    width: 60vw;
    max-width: 60vw;
  `;

  return <Box css={wrapperStyle}>{children}</Box>;
};

export default EditWrapper;
