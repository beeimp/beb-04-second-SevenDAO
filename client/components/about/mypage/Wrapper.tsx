import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface AboutMypageWrapperProps {
  children: ReactNode;
}

const AboutMypageWrapper: FunctionComponent<AboutMypageWrapperProps> = ({ children }) => {
  const wrapperStyle = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 5px;

    @media screen and (max-width: 800px) {
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  `;
  return <div css={wrapperStyle}>{children}</div>;
};

export default AboutMypageWrapper;
