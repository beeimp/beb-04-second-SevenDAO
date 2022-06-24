import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import Img from 'next/image';

interface ImgBoxProps {
  imgUrl: string;
}

const ImgBox: FunctionComponent<ImgBoxProps> = ({ imgUrl }) => {
  const wrapperStyle = css`
    display: flex;
    align-items: center;
    margin: 20px;
  `;

  return (
    <div css={wrapperStyle}>
      <Img src={imgUrl} width={'200px'} height={'200px'} priority />
    </div>
  );
};

export default ImgBox;
