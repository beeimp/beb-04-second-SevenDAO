import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface SampleWrapperProps {
  children: ReactNode;
}

const wapperStyle = css`
  display: flex;
  position: fixed;
  justify-content: space-between;
  left: 0;
  align-items: center;
  width: 20%;
  height: 100%;
  padding: 0;
  margin: 0;

  border-right: 1px solid black;
`;

const SampleWrapper: FunctionComponent<SampleWrapperProps> = ({ children }) => {
  return <div css={wapperStyle}>{children}</div>;
};

export default SampleWrapper;
