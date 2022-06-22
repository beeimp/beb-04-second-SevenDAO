import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { BiHomeSmile } from 'react-icons/bi';

interface HeadProps {}

const HeadMenuButton: FunctionComponent<HeadProps> = () => {
  const buttonWrapperStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: blue;
    width: 50px;
    height: 300px;
    border: 1px solid #e5e8eb;
    margin-right: 8px;
  `;
  const buttonStyle = css`
    background-color: yellow;
    width: 50px;
    height: 50px;
    border: 1px solid #e5e8eb;
  `;

  return (
    <div css={buttonWrapperStyle}>
      <button css={buttonStyle}>{BiHomeSmile}</button>
      <button css={buttonStyle}></button>
      <button css={buttonStyle}></button>
      <button css={buttonStyle}></button>
      <button css={buttonStyle}></button>
    </div>
  );
};

export default HeadMenuButton;
