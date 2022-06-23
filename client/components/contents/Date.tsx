import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface DateProps {
  create_date: string;
}

const Date: FunctionComponent<DateProps> = ({ create_date }) => {
  const wrapperStyle = css`
    display: flex;
    align-items: center;
  `;

  const dateStyle = css`
    color: #a7a7a7ff;
    font-size: 15px;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={dateStyle}>{'· ' + create_date}</div>
    </div>
  );
};

export default Date;
