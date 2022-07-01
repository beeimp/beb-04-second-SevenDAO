import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface AboutCreatedWrapperProps {
  title: string;
  children: ReactNode;
}

const AboutCreatedWrapper: FunctionComponent<AboutCreatedWrapperProps> = ({ children, title }) => {
  const wrapperStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 3em 1em;
  `;
  const titleStyle = css`
    padding: 1em 0;
  `;
  const listStyle = css`
    list-style: none;
    margin: 0;
    padding: 0;
  `;
  return (
    <div css={wrapperStyle}>
      <h2 css={titleStyle}>{title}</h2>
      <ul css={listStyle}>{children}</ul>
    </div>
  );
};

export default AboutCreatedWrapper;
