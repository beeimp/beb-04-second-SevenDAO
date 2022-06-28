import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface Props {}

const NoSearchResult: FunctionComponent<Props> = () => {
  const wrapperStyle = css`
    display: flex;
    align-items: flex-start;
    padding: 20px 0 0 50px;
    flex-direction: column;
  `;

  const guidanceStyle = css`
    color: #292929ff;
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 10px;
  `;

  return (
    <div css={wrapperStyle}>
      <span css={guidanceStyle}>Make sure all words are spelled correctly.</span>
      <span css={guidanceStyle}>Try different keywords.</span>
      <span css={guidanceStyle}>Try more general keywords.</span>
    </div>
  );
};

export default NoSearchResult;
