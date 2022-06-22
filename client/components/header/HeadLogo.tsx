import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import Img from 'next/image';
import { useRouter } from 'next/router';

interface HeadProps {}

const HeadLogo: FunctionComponent<HeadProps> = () => {
  const router = useRouter();

  const sampleStyle = css`
    background-color: white;
    flex-direction: row;
    cursor: pointer;
  `;

  return (
    <div
      css={sampleStyle}
      onClick={() => {
        router.push('/');
      }}
    >
      <Img src="/sevendao-logo-col.png" width="100px" height="100px" />
    </div>
  );
};

export default HeadLogo;
