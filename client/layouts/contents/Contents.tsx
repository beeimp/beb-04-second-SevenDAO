import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import ContentsWrapper from '../../components/contents/ContentsWrapper';
import ProfileCard from '../../components/contents/ProfileCard';
import Title from '../../components/contents/Title';
import ContentsText from '../../components/contents/ContentsText';
import Date from '../../components/contents/Date';
import ImgBox from '../../components/contents/ImgBox';
import CategoryButton from '../../components/contents/CategoryButton';
import RecommendationSign from '../../components/contents/RecommendationSign';
import { PostType } from '../../types/post';

interface LayoutProps {
  content: PostType;
}

const Contents: FunctionComponent<LayoutProps> = ({ content }) => {
  const textWrapperStyle = css`
    display: flex;
    flex-direction: column;
    align-content: center;
    flex: 1 1 auto;
  `;
  const wrapperRowStyle = css`
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
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
      <ContentsWrapper key={content._id}>
        <div css={textWrapperStyle}>
          <div css={wrapperRowStyle}>
            <ProfileCard iconUrl={'/sevendao-logo.png'} writer={content.username} size={'44px'} />
            <Date created_date={content.created_date} />
          </div>
          <div>
            <div css={wrapperColStyle}>
              <Title title={content.title} />
              <div css={imgWrapperStyle}>
                <ImgBox imgUrl={content.imgUrl ?? ''} size={'600px'} />
              </div>
              <ContentsText contents={content.contents} />
            </div>
            <div css={wrapperRowStyle}>
              <CategoryButton category={content.tag} />
              <RecommendationSign />
            </div>
          </div>
        </div>
      </ContentsWrapper>
    </>
  );
};

export default Contents;
