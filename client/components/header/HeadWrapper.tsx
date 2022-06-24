import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const wrapperStyle = css`
  display: flex;
  position: static;
  flex-direction: column;
  justify-content: space-between;
  left: 0;
  align-items: flex-end;
  min-width: 80px;
  width: 20%;
  height: 100vh;
  padding: 20px 0 20px 10px;
  margin: 0;
  z-index: 999;

  border-right: 1px solid #a0a0a0ff;
`;

const HeadWrapper: FunctionComponent<WrapperProps> = ({ children }) => {
  return <div css={wrapperStyle}>{children}</div>;
};

export default HeadWrapper;
