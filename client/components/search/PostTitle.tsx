import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface TitleProps {
  title: string;
}

const PostTitle: FunctionComponent<TitleProps> = ({ title }) => {
  const wrapperStyle = css`
    display: flex;
    align-items: center;
    padding: 20px 0 0 50px;
  `;

  const guidanceStyle = css`
    color: #7b7b7b;
    font-size: 50px;
    font-weight: 700;
    padding-right: 10px;
  `;

  const titleStyle = css`
    color: #292929ff;
    font-size: 50px;
    font-weight: 700;
  `;

  return (
    <div css={wrapperStyle}>
      <span css={guidanceStyle}>Results</span>
      <span css={guidanceStyle}>for</span>
      <span css={titleStyle}>{title ?? '...'}</span>
    </div>
  );
};

export default PostTitle;
