import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const wrapperStyle = css`
  display: flex;
  flex-direction: row;
  min-width: 180px;
  width: 100%;
  padding: 10px;
  margin: 30px;

  border-bottom: 1px solid #a0a0a0ff;
`;

const ContentsWrapper: FunctionComponent<WrapperProps> = ({ children }) => {
  return <div css={wrapperStyle}>{children}</div>;
};

export default ContentsWrapper;
