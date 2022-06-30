import { css } from '@emotion/react';
import { FunctionComponent, useState, useEffect, Dispatch } from 'react';
import ContentsWrapper from '../../components/contents/ContentsWrapper';
import ProfileCard from '../../components/contents/ProfileCard';
import Title from '../../components/contents/Title';
import ContentsText from '../../components/contents/ContentsText';
import Date from '../../components/contents/Date';
import ImgBox from '../../components/contents/ImgBox';
import CategoryButton from '../../components/contents/CategoryButton';
import RecommendationSign from '../../components/contents/RecommendationSign';
import { PostType } from '../../types/post';
import { useRouter } from 'next/router';

interface LayoutProps {
  postList: PostType[];
  setPostList: Dispatch<PostType[]>;
}

const ContentsList: FunctionComponent<LayoutProps> = ({ postList, setPostList }) => {
  console.log(postList);
  const router = useRouter();

  // 이미지 썸네일 추가
  const addImageUrl = (postList: PostType[]) => {
    return postList.map((post) => {
      const div = document.createElement('div');
      div.innerHTML = post.contents;
      const img = div.querySelector('img');
      let imgUrl = '';
      if (img === null) {
      } else {
        imgUrl = img.src ?? '';
      }
      return {
        ...post,
        imgUrl: imgUrl,
      };
    });
  };

  useEffect(() => {
    setPostList(() => addImageUrl(postList));
  }, []);

  const textWrapperStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    /* max-width: 600px; */
    width: 100%;
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
      {postList
        .sort((a, b) => b.created_date - a.created_date)
        .map((content, index) => {
          return (
            <ContentsWrapper key={index}>
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
                    {/* <ContentsText contents={shortenContents(content.contents)} /> */}
                    <ContentsText
                      contents={content.contents.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi, '')}
                    />
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

export default ContentsList;
