import { css } from '@emotion/react';
import { NextPage } from 'next';
import Header from '../layouts/Header';
import SearchEngine from '../layouts/search/SearchEngine';

interface SearchPageProps {}

const SearchPage: NextPage<SearchPageProps> = () => {
  const wrapperStyle = css`
    display: flex;
  `;

  return (
    <div css={wrapperStyle}>
      <Header />
      <div>
        <SearchEngine></SearchEngine>
      </div>
    </div>
  );
};

export default SearchPage;
