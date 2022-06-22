import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import Img from 'next/image';

interface HeadProps {
  iconUrl: string;
  size?: string;
}

const HeadAccountButton: FunctionComponent<HeadProps> = ({ iconUrl, size = '44px' }) => {
  const buttonStyle = css`
    background-color: #e5e8eb;
    width: ${size};
    height: ${size};
    border: 1px solid #e5e8eb;
    border-radius: 50%;
    margin-right: 10px;

    :hover {
      box-shadow: rgb(0 0 0 / 30%) 0 0 20px;
      transition: 0.2s ease;
    }
  `;

  return (
    <div css={buttonStyle}>
      <Img src={iconUrl} width={size} height={size} />
    </div>
  );
};

export default HeadAccountButton;
