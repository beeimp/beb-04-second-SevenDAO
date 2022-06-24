import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface CommentViewTopProps {
  username: string;
  date: number;
}

const CommentViewTop: FunctionComponent<CommentViewTopProps> = ({
  username = 'username',
  date = 1656055842380,
}) => {
  const wrapperStyle = css`
    display: flex;
    width: 100%;
  `;

  const avatarWrapperStyle = css`
    display: flex;
    justify-content: center;
    width: 50px;
    height: 50px;
  `;

  const userWrapperStyle = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  `;

  const usernameStyle = css`
    color: gray;
  `;

  const dotStyle = css`
    margin: 0 0.2em;
  `;

  const dateStyle = css`
    color: gray;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={avatarWrapperStyle}>
        <div>Avatar</div>
      </div>
      <div css={userWrapperStyle}>
        <span css={usernameStyle}>{username}</span>
        <span css={dotStyle}>・</span>
        <span css={dateStyle}>{date}</span>
      </div>
    </div>
  );
};

export default CommentViewTop;
