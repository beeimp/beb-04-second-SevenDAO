import { css } from '@emotion/react';
import { FunctionComponent, useState, useEffect } from 'react';

interface Props {}

const RecommendationSign: FunctionComponent<Props> = () => {
  const line = [
    'Based on your reading history',
    'Selected for you',
    'Popular on SevenDAO',
    'Editors’ Pick',
  ];

  const [randomNum, setRandomNum] = useState(1);
  const [otherNum, setOtherNum] = useState(1);

  const randomMention = 1;

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 10) + 1);
    setOtherNum(Math.floor(Math.random() * 4));
  }, []);

  const wrapperStyle = css`
    display: flex;
    align-items: center;
  `;

  const dateStyle = css`
    color: #a7a7a7ff;
    font-size: 15px;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={dateStyle}>{randomNum + ' min read  ·  ' + line[otherNum]}</div>
    </div>
  );
};

export default RecommendationSign;
