import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface TitleProps {}

const PreComment: FunctionComponent<TitleProps> = () => {
  const wrapperStyle = css`
    display: flex;
    align-items: flex-start;
    padding: 10px 0 0 10px;
    flex-direction: column;
  `;

  const guidanceStyle = css`
    color: #a6a5a5;
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 10px;
  `;

  return (
    <div css={wrapperStyle}>
      <span css={guidanceStyle}>You have no recent searches.</span>
    </div>
  );
};

export default PreComment;
