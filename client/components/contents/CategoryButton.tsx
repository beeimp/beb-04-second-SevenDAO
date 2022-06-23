import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface CategoryProps {
  category: string;
}

const CategoryButton: FunctionComponent<CategoryProps> = ({ category }) => {
  const wrapperStyle = css`
    display: flex;
    align-items: center;
    background-color: #eeeeee;
    border-radius: 30px;
    height: 20px;
    cursor: pointer;
    padding: 15px;
    margin-right: 10px;
  `;

  const categoryStyle = css`
    color: #292929ff;
    font-size: 15px;
    font-weight: 500;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={categoryStyle}>{category}</div>
    </div>
  );
};

export default CategoryButton;
