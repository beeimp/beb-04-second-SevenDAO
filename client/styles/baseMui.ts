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
  background-color: #69c8ca;
  :hover {
    color: white;
    background-color: #59b8ba;
  }
`;

const buttonWhiteStyle = css`
  ${buttonDefaultStyle}
  color: #69c8ca;
  background-color: white;
`;

export { textFieldStyle, buttonDefaultStyle, buttonWhiteStyle };
