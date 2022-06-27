import { FunctionComponent } from 'react';
import crypto from 'crypto';
import { css } from '@emotion/react';

interface AvatarProps {
  username: string;
  size?: number;
}

const Avatar: FunctionComponent<AvatarProps> = ({ username, size = 40 }) => {
  const hashed = crypto
    .createHash('sha256')
    .update(username ?? '')
    .digest('hex');
  const wrapperStyle = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${size}px;
    height: ${size}px;
  `;
  const avatarStyle = css`
    width: ${size * 0.9}px;
    height: ${size * 0.9}px;
    border: ${size * 0.04}px solid gray;
    border-radius: 100% 100%;
    background-color: #${hashed.slice(0, 6)};
    margin: ${size * 0.06}px;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={avatarStyle}></div>
    </div>
  );
};

export default Avatar;
