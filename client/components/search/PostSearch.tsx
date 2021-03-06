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
import { SearchResultType } from '../../types/post';
import { useRouter } from 'next/router';

interface LayoutProps {
  searchs: SearchResultType[];
}

const PostSearch: FunctionComponent<LayoutProps> = ({ searchs }) => {
  const router = useRouter();

  const shortenContents = (contents: string) => {
    if (contents.length > 60) {
      return `${contents.slice(0, 60)}...`;
    } else {
      return contents;
    }
  };

  const textWrapperStyle = css`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-content: center;
    max-width: 800px;
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
    cursor: pointer;
  `;
  const imgWrapperStyle = css`
    display: flex;
    align-content: center;
  `;

  return (
    <>
      {searchs
        .sort((a, b) => b.created_date - a.created_date)
        .map((content) => {
          return (
            <ContentsWrapper key={content._id}>
              <div
                css={textWrapperStyle}
                onClick={() => {
                  // 클릭 시 postId에 해당하는 상세페이지로 라우팅
                  router.push(`/detail/${content._id}`);
                }}
              >
                <div css={wrapperRowStyle}>
                  <ProfileCard
                    iconUrl={'/sevendao-logo.png'}
                    writer={content.username}
                    size={'44px'}
                  />
                  <Date created_date={content.created_date} />
                </div>
                <div>
                  <div css={wrapperColStyle}>
                    <Title title={content.title} />
                    <ContentsText contents={shortenContents(content.contents)} />
                  </div>
                  <div css={wrapperRowStyle}>
                    <CategoryButton category={content.tag} />
                    <RecommendationSign created_date={content.created_date} />
                  </div>
                </div>
              </div>
              <div css={imgWrapperStyle}>
                <ImgBox imgUrl={content.imgUrl ?? ''} size={'200px'} />
              </div>
            </ContentsWrapper>
          );
        })}
    </>
  );
};

export default PostSearch;
