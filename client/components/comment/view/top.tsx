import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { displayCreatedAt } from '../../../utils/display';
import Avatar from '../../Avatar';

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

  const userWrapperStyle = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-left: 0.5em;
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
      <Avatar username={username}></Avatar>
      <div css={userWrapperStyle}>
        <span css={usernameStyle}>{username}</span>
        <span css={dotStyle}>・</span>
        <span css={dateStyle}>{displayCreatedAt(date)}</span>
      </div>
    </div>
  );
};

export default CommentViewTop;
