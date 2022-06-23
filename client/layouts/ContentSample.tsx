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
import { PostType } from '../types/post';

interface LayoutProps {}

const Contents: FunctionComponent<LayoutProps> = () => {
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
            <ProfileCard iconUrl={'/sevendao-logo.png'} writer={'감자'} size={'44px'} />
            <Date created_date={1237459146} />
          </div>
          <div>
            <div css={wrapperColStyle}>
              <Title title={'장마'} />
              <ContentsText contents={'오늘부터 장마가 시작됐다.'} />
            </div>
            <div css={wrapperRowStyle}>
              <CategoryButton category={'Daily'} />
              <RecommendationSign />
            </div>
          </div>
        </div>
        <div css={imgWrapperStyle}>
          <ImgBox imgUrl={'/sevendao-logo.png'} />
        </div>
      </ContentsWrapper>
      ;
    </>
  );
};

export default Contents;
