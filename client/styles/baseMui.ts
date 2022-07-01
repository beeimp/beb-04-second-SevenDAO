import { css } from '@emotion/react';

const textFieldStyle = css`
  margin: 1em;
  & > div > label {
    color: black;
  }
  & > div {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const buttonDefaultStyle = css`
  color: white;
  background-color: #a0a0a0ff;
  :hover {
    color: white;
    background-color: #777777ff;
  }
`;

const buttonWhiteStyle = css`
  ${buttonDefaultStyle}
  color: #a0a0a0ff;
  background-color: white;
`;

export { textFieldStyle, buttonDefaultStyle, buttonWhiteStyle };
