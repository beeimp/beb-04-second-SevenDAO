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
  padding: 10px;
  margin: 0;
  background-color: green;

  border-right: 1px solid #a7a7a7ff;
`;

const HeadWrapper: FunctionComponent<WrapperProps> = ({ children }) => {
  return <div css={wapperStyle}>{children}</div>;
};

export default HeadWrapper;
