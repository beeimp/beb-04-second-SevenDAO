import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface TitleProps {}

const PreTitle: FunctionComponent<TitleProps> = () => {
  const wrapperStyle = css`
    display: flex;
    align-items: center;
    padding: 20px 0 0 50px;
  `;

  const titleStyle = css`
    color: #292929ff;
    font-size: 50px;
    font-weight: 700;
    padding-right: 10px;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={titleStyle}>Recent</div>
      <div css={titleStyle}>searches</div>
    </div>
  );
};

export default PreTitle;
