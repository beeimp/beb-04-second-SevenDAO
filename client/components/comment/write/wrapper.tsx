import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface CommenWritetWrapperProps {
  children: ReactNode;
}

const CommenWritetWrapper: FunctionComponent<CommenWritetWrapperProps> = ({ children }) => {
  const wrapperStyle = css`
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-template-rows: 1fr;
    align-items: center;
  `;
  return <div css={wrapperStyle}>{children}</div>;
};

export default CommenWritetWrapper;
