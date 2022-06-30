import { css } from '@emotion/react';
import { FunctionComponent, useState, useEffect } from 'react';

interface Props {
  created_date: number;
}

const RecommendationSign: FunctionComponent<Props> = ({ created_date }) => {
  const line = [
    'Based on your reading history',
    'Selected for you',
    'Editors’ Pick',
    'Popular on SevenDAO',
    'Based on your reading history',
    'Selected for you',
    'Editors’ Pick',
    'Popular on SevenDAO',
    'Popular on SevenDAO',
    'Selected for you',
  ];

  const [randomNum, setRandomNum] = useState(1);

  const createrandomNum = (n: number): number => {
    var nums = 0;
    do {
      nums += n % 10;
      n = Math.floor(n / 10);
    } while (n < 0);

    return nums;
  };

  useEffect(() => {
    setRandomNum(createrandomNum(created_date));
  }, [created_date]);

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
      <div css={dateStyle}>{randomNum + ' min read  ·  ' + line[randomNum]}</div>
    </div>
  );
};

export default RecommendationSign;
