import { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import { hashColor } from '../styles/color';

interface AvatarProps {
  username: string;
  size?: number;
}

const Avatar: FunctionComponent<AvatarProps> = ({ username, size = 40 }) => {
  const avatarColor = hashColor(username);
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
    border: ${size * 0.03}px solid gray;
    border-radius: 100% 100%;
    background-color: ${avatarColor};
    margin: ${size * 0.06}px;

    :hover {
      box-shadow: rgb(0 0 0 / 30%) 0 0 10px;
      transition: 0.2s ease;
    }
  `;

  return (
    <div css={wrapperStyle}>
      <div css={avatarStyle}></div>
    </div>
  );
};

export default Avatar;
