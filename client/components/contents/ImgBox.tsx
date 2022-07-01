import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import Img from 'next/image';

interface ImgBoxProps {
  imgUrl: string;
  size: string;
}

const ImgBox: FunctionComponent<ImgBoxProps> = ({ imgUrl, size = '200px' }) => {
  const wrapperStyle = css`
    position: relative;
    display: flex;
    align-items: center;
    width: ${size};
    height: ${size};
    overflow: hidden;
    position: relative;
    margin: 20px;
    max-width: 200;
    width: ${size};
    height: ${size};
  `;

  const imgStyle = css`
    width: ${size};
    height: ${size};
    background-image: url(${imgUrl});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `;

  return (
    <div css={wrapperStyle}>
      {false ? (
        <Img src={'/sevendao-logo-col.png'} width={size} height={size} priority />
      ) : (
        <div css={imgStyle} />
      )}
    </div>
  );
};

export default ImgBox;
