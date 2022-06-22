import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import Img from 'next/image';

interface HeadProps {}

const HeadLogo: FunctionComponent<HeadProps> = () => {
  const sampleStyle = css`
    background-color: white;
    flex-direction: row;
    padding-top: 20px;
  `;

  return (
    <div css={sampleStyle}>
      <Img src="/sevendao-logo.png" width="200px" height="100px" />
    </div>
  );
};

export default HeadLogo;
