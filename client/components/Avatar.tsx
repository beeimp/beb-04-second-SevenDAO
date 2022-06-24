import { FunctionComponent } from 'react';
import crypto from 'crypto';
import { css } from '@emotion/react';

interface AvatarProps {
  username: string;
}

const Avatar: FunctionComponent<AvatarProps> = ({ username }) => {
  const hashed = crypto
    .createHash('sha256')
    .update(username ?? '')
    .digest('hex');
  const wrapperStyle = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
  `;
  const avatarStyle = css`
    width: 40px;
    height: 40px;
    border: 2px solid gray;
    border-radius: 100% 100%;
    background-color: #${hashed.slice(0, 6)};
    margin: 3px;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={avatarStyle}></div>
    </div>
  );
};

export default Avatar;
