import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface AboutMyPageInfoItemProps {
  title: string;
  children: ReactNode;
}

const AboutMyPageInfoItem: FunctionComponent<AboutMyPageInfoItemProps> = ({ title, children }) => {
  const itemStyle = css`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px;
  `;
  const titleStyle = css`
    width: 100%;
    margin: 0 1em;
    text-align: center;
  `;
  const contentsStyle = css`
    width: 100%;
    color: #808080;
    margin: 0 1em;
  `;
  return (
    <li css={itemStyle}>
      <h3 css={titleStyle}>{title}</h3>
      <div css={contentsStyle}>{children}</div>
    </li>
  );
};

export default AboutMyPageInfoItem;
