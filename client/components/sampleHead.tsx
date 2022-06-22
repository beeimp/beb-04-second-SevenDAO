import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface SampleHeadProps {}

const SampleHead: FunctionComponent<SampleHeadProps> = () => {
  const sampleStyle = css`
    background-color: orange;
    left: 0;
    width: 100%;
    height: 100%;
  `;

  return (
    <div css={sampleStyle}>
      <h3>Header</h3>
    </div>
  );
};

export default SampleHead;
