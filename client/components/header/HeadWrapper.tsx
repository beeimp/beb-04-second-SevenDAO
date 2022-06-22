import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const wapperStyle = css`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  left: 0;
  align-items: flex-end;
  min-width: 80px;
  width: 20%;
  height: 100%;
  padding: 20px 0 20px 10px;
  margin: 0;
  z-index: 999;

  border-right: 1px solid #a0a0a0ff;
`;

const HeadWrapper: FunctionComponent<WrapperProps> = ({ children }) => {
  return <div css={wapperStyle}>{children}</div>;
};

export default HeadWrapper;
