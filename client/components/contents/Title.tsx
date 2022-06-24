import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface TitleProps {
  title: string;
}

const Title: FunctionComponent<TitleProps> = ({ title }) => {
  const wrapperStyle = css`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  `;

  const titleStyle = css`
    color: #292929ff;
    font-size: 30px;
    font-weight: 700;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={titleStyle}>{title}</div>
    </div>
  );
};

export default Title;
