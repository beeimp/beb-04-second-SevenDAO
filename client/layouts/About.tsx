import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { AboutWrapper } from '../components/about';
import { AboutCreatedItem, AboutCreatedWrapper } from '../components/about/created';
import { AboutMyPageInfoItem, AboutMyPageInfoList } from '../components/about/mypage';
import AboutMypageWrapper from '../components/about/mypage/Wrapper';
import Avatar from '../components/Avatar';
import { WroteCommetType } from '../types/comment';
import { PostType } from '../types/post';
import { UserInfoType } from '../types/user';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/modalSlice';

interface AboutProps {
  userInfo: UserInfoType;
  wrotePost: PostType[];
  wroteComments: WroteCommetType[];
}

const About: FunctionComponent<AboutProps> = ({ userInfo, wrotePost, wroteComments }) => {
  const router = useRouter();
  const dispatch = useDispatch();
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

  const copyButtonStyle = css`
    position: relative;
    width: 1em;
    height: 1em;
    border: none;

    background: none;
    padding: 0;
    margin: 0;
  `;

  const copyIconStyle = css`
    font-size: 1em;
    color: gray;

    :active {
      color: black;
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
          <AboutMyPageInfoItem title={'지갑 주소'}>
            {userInfo.address.slice(0, 5) + '...' + userInfo.address.slice(36)}
            <button
              css={copyButtonStyle}
              onClick={() => {
                navigator.clipboard.writeText(userInfo.address);
              }}
            >
              <ContentCopyIcon css={copyIconStyle}></ContentCopyIcon>
            </button>
          </AboutMyPageInfoItem>
          <AboutMyPageInfoItem title={'소유 Token'}>{userInfo.token} SDAO</AboutMyPageInfoItem>
          <AboutMyPageInfoItem title={'입금 ・ 출금'}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(modalActions.setDisplayTransfer(true));
              }}
              color="success"
            >
              입출금
            </Button>
          </AboutMyPageInfoItem>
        </AboutMyPageInfoList>
      </AboutMypageWrapper>
      <AboutCreatedWrapper title="작성한 게시글">
        {wrotePost.length > 0 ? (
          wrotePost
            .sort((a, b) => b.created_date - a.created_date)
            .map((post, index) => {
              return (
                <AboutCreatedItem
                  key={index}
                  title={post.title}
                  contents={post.contents}
                  created_date={post.created_date}
                  onClick={() => {
                    router.push(`/detail/${post._id}`);
                  }}
                ></AboutCreatedItem>
              );
            })
        ) : (
          <div>작성한 게시글이 없습니다</div>
        )}
      </AboutCreatedWrapper>
      <AboutCreatedWrapper title="작성한 댓글">
        {wroteComments.length > 0 ? (
          wroteComments
            .sort((a, b) => b.created_date - a.created_date)
            .map((comment, index) => {
              return (
                <AboutCreatedItem
                  key={index}
                  title=""
                  contents={comment.comment}
                  created_date={comment.created_date}
                  onClick={() => {
                    router.push(`/detail/${comment.postId}`);
                  }}
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
