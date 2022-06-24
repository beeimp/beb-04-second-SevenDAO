import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import Img from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface HeadProps {
  iconUrl: string;
  size?: string;
}

const HeadAccountButton: FunctionComponent<HeadProps> = ({ iconUrl, size = '44px' }) => {
  const router = useRouter();
  const isLogined = useSelector((state: RootState) => state.auth.isAuth);

  const buttonStyle = css`
    background-color: #e5e8eb;
    width: ${size};
    height: ${size};
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;

    :hover {
      box-shadow: rgb(0 0 0 / 30%) 0 0 20px;
      transition: 0.2s ease;
    }
  `;

  return (
    <div
      css={buttonStyle}
      onClick={() => {
        router.push(isLogined ? '/' : '/sign-in');
      }}
    >
      <Img src={iconUrl} width={size} height={size} />
    </div>
  );
};

export default HeadAccountButton;
