import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import Avatar from '../Avatar';

interface ProfileCardProps {
  iconUrl: string;
  writer: string;
  size: string;
}

const ProfileCard: FunctionComponent<ProfileCardProps> = ({ writer, size = '30px' }) => {
  const wrapperStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
  `;

  const userIconStyle = css`
    background-color: #e5e8eb;
    width: ${size};
    height: ${size};
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;

    :hover {
      box-shadow: rgb(0 0 0 / 30%) 0 0 10px;
      transition: 0.2s ease;
    }
  `;
  const usernameStyle = css`
    color: #292929ff;
    font-size: 15px;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={userIconStyle}>
        {/* <Img src={iconUrl} alt="userIcon" width={size} height={size} /> */}
        <Avatar username={writer} size={44}></Avatar>
      </div>
      <div css={usernameStyle}>{writer}</div>
    </div>
  );
};

export default ProfileCard;
