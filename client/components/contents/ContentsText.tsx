import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface ContentsTextProps {
  contents: string;
}

const ContentsText: FunctionComponent<ContentsTextProps> = ({ contents = 'JUN 23' }) => {
  const wrapperStyle = css`
    display: flex;
    align-items: center;
  `;

  const contenstTextStyle = css`
    color: #292929ff;
    font-size: 15px;
    line-height: 25px;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={contenstTextStyle}>{contents}</div>
    </div>
  );
};

export default ContentsText;
