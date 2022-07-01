import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface AboutWrapperProps {
  children: ReactNode;
}

const AboutWrapper: FunctionComponent<AboutWrapperProps> = ({ children }) => {
  const wrapperStyle = css`
    position: relative;
    width: calc(100% - 100px);
    max-width: 1100px;
    padding: 50px;
  `;
  const titleWrapperStyle = css`
    margin: 0;
    margin-top: 25px;
  `;
  const titleStyle = css`
    padding: 0;
    margin: 0 0 0 15px;
  `;
  return (
    <div css={wrapperStyle}>
      <div css={titleWrapperStyle}>
        <h1 css={titleStyle}>MyPage</h1>
      </div>
      {children}
    </div>
  );
};

export default AboutWrapper;
