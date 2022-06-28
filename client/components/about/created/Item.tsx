import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { displayCreatedAt } from '../../../utils/display';

interface AboutCreatedItemProps {
  title: string;
  contents: string;
  created_date: number;
  onClick?: React.MouseEventHandler;
}

const AboutCreatedItem: FunctionComponent<AboutCreatedItemProps> = ({
  title,
  contents,
  created_date,
  onClick = () => {},
}) => {
  const wrapperStyle = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    > * {
      margin: 1em;
    }

    :hover {
      opacity: 0.5;
      transition-duration: 0.3s;
    }
  `;
  const titleStyle = css`
    flex: 0 0 11em;
    width: 100%;
    padding: 0;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    :hover {
      cursor: pointer;
    }
  `;
  const contentsStyle = css`
    display: flex;
    flex: 0 0 21em;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;

    font-size: 1em;
    font-weight: 500;

    > * {
      padding: 0 0.5em 0 0;
      margin: 0;
      font-size: 1em;
      font-weight: 500;
    }
    &:nth-last-child() {
      padding: 0;
    }

    /* 이미지 제거 */
    img {
      display: none;
    }
    div {
      background-image: none;
    }

    @media screen and (max-width: 800px) {
      display: none;
    }

    :hover {
      cursor: pointer;
    }
  `;
  const created_dateStyle = css`
    flex: 0 0 8em;
    width: 100%;
  `;
  return (
    <li css={wrapperStyle}>
      <h3 css={titleStyle}>{title}</h3>
      <div
        css={contentsStyle}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: contents }}
      ></div>
      <div css={created_dateStyle}>{displayCreatedAt(created_date)}</div>
    </li>
  );
};

export default AboutCreatedItem;
