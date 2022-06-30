import { css } from '@emotion/react';
import {
  FunctionComponent,
  useState,
  useEffect,
  Dispatch,
  useCallback,
  SetStateAction,
} from 'react';
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
  setPostList: Dispatch<SetStateAction<PostType[]>>;
  pageNum: number;
}

const ContentsList: FunctionComponent<LayoutProps> = ({ postList, setPostList, pageNum }) => {
  const [postListLength, setPostListLength] = useState<number>(0);
  const router = useRouter();
  console.log(postList);

  // 이미지 썸네일 추가
  const addImage = useCallback(
    (index: number, postList: PostType[]) => {
      for (let i = index; i < postList.length; i++) {
        const div = document.createElement('div');
        div.innerHTML = postList[i].contents;
        const img = div.querySelector('img');
        let imgUrl = '';
        if (img === null) {
        } else {
          imgUrl = img.src ?? '';
        }
        postList[i].imgUrl = imgUrl;
      }
      setPostList([...postList]);
    },
    [setPostList]
  );

  useEffect(() => {
    if (postList.length !== postListLength) {
      addImage(postListLength, postList);
      setPostListLength(() => postList.length);
    }
  }, [addImage, postList, postListLength]);

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
          console.log(content.imgUrl);
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
