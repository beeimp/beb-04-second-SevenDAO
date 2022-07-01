import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { BiHomeSmile, BiSearchAlt2, BiDetail, BiMinus, BiEditAlt } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface HeadProps {}

const HeadMenuButton: FunctionComponent<HeadProps> = () => {
  const router = useRouter();
  const isLogined = useSelector((state: RootState) => state.auth.isAuth);

  const buttonWrapperStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50px;
    height: 300px;
  `;
  const buttonStyle = css`
    width: 30px;
    height: 30px;
    margin-bottom: 3px;
    color: #a0a0a0ff;
    cursor: pointer;
    :hover {
      color: #777777ff;
    }
  `;
  const dashStyle = css`
    width: 20px;
    color: #a0a0a0ff;
    margin-left: 5px;
  `;

  return (
    <div css={buttonWrapperStyle}>
      <BiHomeSmile
        css={buttonStyle}
        onClick={() => {
          router.push('/');
        }}
      ></BiHomeSmile>
      <BiSearchAlt2
        css={buttonStyle}
        onClick={() => {
          if (router.pathname === '/search') {
            router.reload();
          }
          router.push('/search');
        }}
      ></BiSearchAlt2>
      <BiDetail
        css={buttonStyle}
        onClick={() => {
          router.push(isLogined ? '/mypage' : '/sign-in');
        }}
      ></BiDetail>
      <BiMinus css={dashStyle}></BiMinus>
      <BiEditAlt
        css={buttonStyle}
        onClick={() => {
          router.push(isLogined ? '/edit' : '/sign-in');
        }}
      ></BiEditAlt>
    </div>
  );
};

export default HeadMenuButton;
