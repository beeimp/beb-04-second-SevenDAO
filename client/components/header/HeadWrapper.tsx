import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const wrapperStyle = css`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  min-width: 80px;
  width: 20%;
  height: 99vh;
  padding: 20px 0 20px 10px;
  z-index: 999;
  margin: 0;

  border-right: 1px solid #a0a0a0ff;
`;

const HeadWrapper: FunctionComponent<WrapperProps> = ({ children }) => {
  return <div css={wrapperStyle}>{children}</div>;
};

export default HeadWrapper;
