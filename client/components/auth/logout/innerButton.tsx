import { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { removeCookies } from 'cookies-next';

interface InnerButtonProps {}

const InnerButton: FunctionComponent<InnerButtonProps> = () => {
  const router = useRouter();
  const isLogined = useSelector((state: RootState) => state.auth.isAuth);

  function clickLogoutButton() {
    removeCookies('jwt');
    router.push('/');
  }

  const outerStyle = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  `;
  const buttonStyle = css`
    all: unset;
    padding: 10px;
  `;
  return (
    <>
      <div>
        {isLogined ? (
          <div css={outerStyle}>
            <div onClick={clickLogoutButton}>
              <button css={buttonStyle}>로그아웃</button>
            </div>
            <div onClick={() => router.push('/mypage')}>
              <button css={buttonStyle}>마이페이지</button>
            </div>
          </div>
        ) : (
          <div css={outerStyle} onClick={() => router.push('/sign-in')}>
            <button css={buttonStyle}>로그인</button>
          </div>
        )}
      </div>
    </>
  );
};

export default InnerButton;
