import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface AboutMyPageInfoListProps {
  children: ReactNode;
}

const AboutMyPageInfoList: FunctionComponent<AboutMyPageInfoListProps> = ({ children }) => {
  const wrapperStyle = css`
    padding: 25px;
    width: 100%;
  `;
  const listStyle = css`
    list-style: none;
    margin: 0;
    padding: 0;
  `;
  return (
    <div css={wrapperStyle}>
      <ul css={listStyle}>{children}</ul>
    </div>
  );
};

export default AboutMyPageInfoList;
