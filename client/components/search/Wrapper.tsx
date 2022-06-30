import { css } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';

interface SearchWrapperProps {
  children: ReactNode;
}

const SearchWrapper: FunctionComponent<SearchWrapperProps> = ({ children }) => {
  const wrapperStyle = css`
    position: relative;
    max-width: 1100px;
  `;

  return <div css={wrapperStyle}>{children}</div>;
};

export default SearchWrapper;
