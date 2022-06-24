import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import Img from 'next/image';

interface ImgBoxProps {
  imgUrl: string;
  size: string;
}

const ImgBox: FunctionComponent<ImgBoxProps> = ({ imgUrl, size = '200px' }) => {
  const wrapperStyle = css`
    display: flex;
    align-items: center;
    margin: 20px;
    max-width: 200;
  `;

  return (
    <div css={wrapperStyle}>
      <Img src={imgUrl} width={size} height={size} priority />
    </div>
  );
};

export default ImgBox;
