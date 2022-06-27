import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { AboutWrapper } from '../components/about';
import { AboutCreatedItem, AboutCreatedWrapper } from '../components/about/created';
import { AboutMyPageInfoItem, AboutMyPageInfoList } from '../components/about/mypage';
import AboutMypageWrapper from '../components/about/mypage/Wrapper';
import Avatar from '../components/Avatar';
import { CommentType } from '../types/comment';
import { PostType } from '../types/post';

interface AboutProps {
  userInfo: { username: string; email: string };
  balance: number;
  wrotePost: PostType[];
  wroteComments: CommentType[];
}

const About: FunctionComponent<AboutProps> = ({ userInfo, balance, wrotePost, wroteComments }) => {
  const avatarWrapperStyle = css`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 50px;
    text-align: center;

    @media screen and (max-width: 800px) {
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  `;

  return (
    <AboutWrapper>
      <AboutMypageWrapper>
        <div css={avatarWrapperStyle}>
          <Avatar username={userInfo.username} size={200}></Avatar>
        </div>
        <AboutMyPageInfoList>
          <AboutMyPageInfoItem title={'Username'}>{userInfo.username}</AboutMyPageInfoItem>
          <AboutMyPageInfoItem title={'email'}>{userInfo.email}</AboutMyPageInfoItem>
          <AboutMyPageInfoItem title={'소유 Token'}>{balance} SDAO</AboutMyPageInfoItem>
          <AboutMyPageInfoItem title={'출금하기'}>출금하기</AboutMyPageInfoItem>
        </AboutMyPageInfoList>
      </AboutMypageWrapper>
      <AboutCreatedWrapper title="작성한 게시글">
        {wrotePost.length > 0 ? (
          wrotePost.map((post, index) => {
            return (
              <AboutCreatedItem
                key={index}
                title={post.title}
                contents={post.contents}
                created_date={post.created_date}
              ></AboutCreatedItem>
            );
          })
        ) : (
          <div>작성한 게시글이 없습니다</div>
        )}
      </AboutCreatedWrapper>
      <AboutCreatedWrapper title="작성한 댓글">
        {wroteComments.length > 0 ? (
          wroteComments.map((comment, index) => {
            return (
              <AboutCreatedItem
                key={index}
                title=""
                contents={comment.comment}
                created_date={comment.created_date}
              ></AboutCreatedItem>
            );
          })
        ) : (
          <div>작성한 댓글이 없습니다.</div>
        )}
      </AboutCreatedWrapper>
    </AboutWrapper>
  );
};

export default About;
