import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';

const Container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface LayoutProps {}

const ContentsSkeleton: FunctionComponent<LayoutProps> = () => {
  return (
    <div css={Container}>
      <Image src="/img/spinner.gif" alt="로딩중" width="100px" height="100px" />
    </div>
  );
};

export default ContentsSkeleton;
