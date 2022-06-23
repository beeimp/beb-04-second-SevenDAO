import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import ContentsWrapper from '../components/contents/ContentsWrapper';
import ProfileCard from '../components/contents/ProfileCard';
import Title from '../components/contents/Title';
import ContentsText from '../components/contents/ContentsText';
import Date from '../components/contents/Date';
import ImgBox from '../components/contents/ImgBox';
import CategoryButton from '../components/contents/CategoryButton';
import RecommendationSign from '../components/contents/RecommendationSign';

interface LayoutProps {}

const Header: FunctionComponent<LayoutProps> = () => {
  const textWrapperStyle = css`
    display: flex;
    flex-direction: column;
    align-content: center;
  `;
  const wrapperRowStyle = css`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  `;
  const wrapperColStyle = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  `;
  const imgWrapperStyle = css`
    display: flex;
    align-content: center;
  `;

  return (
    <>
      <ContentsWrapper>
        <div css={textWrapperStyle}>
          <div css={wrapperRowStyle}>
            <ProfileCard iconUrl={'/sevendao-logo.png'} writer={'sdao'} size={'44px'} />
            <Date create_date={'오늘은 6월 23일'} />
          </div>
          <div>
            <div css={wrapperColStyle}>
              <Title title={'오늘 여름 소나기가 온다.'} />
              <ContentsText contents="아침부터 습하다. 아침에 달리기를 하는데 2키로 뛰고 지쳤다. 습하니깐 심장도 물 찬 것 같이 무겁다. 장마 시작되면 다들 무거워지겠지." />
            </div>
            <div css={wrapperRowStyle}>
              <CategoryButton category={'sevendaodao'} />
              <RecommendationSign />
            </div>
          </div>
        </div>
        <div css={imgWrapperStyle}>
          <ImgBox imgUrl={'/sevendao-logo.png'} />
        </div>
      </ContentsWrapper>
    </>
  );
};

export default Header;
