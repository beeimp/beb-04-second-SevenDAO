import { FunctionComponent, KeyboardEventHandler, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import SearchWrapper from '../../components/search/Wrapper';
import Input from '../../components/search/Input';
import PostTitle from '../../components/search/PostTitle';
import PreTitle from '../../components/search/PreTitle';
import PostSearch from '../../components/search/PostSearch';
import axios, { AxiosRequestConfig } from 'axios';
import { SearchResultType } from '../../types/post';
import NoSearchResult from '../../components/search/NoSearchResult';

interface SearchEngineProps {}

const SearchEngine: FunctionComponent<SearchEngineProps> = () => {
  const [error, setError] = useState<boolean>(false);
  const [list, setList] = useState<SearchResultType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [recentSearch, setRecentSearch] = useState<string>('');
  const [recentSearchStr, setRecentSearchStr] = useState<string | null>('');
  const [remove, setRemove] = useState<boolean>(false);

  const getSearchDate = async (value: string) => {
    setRecentSearch(value);
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `http://localhost:8080/search?searchword=${value}`,
      withCredentials: true,
    };
    const res = await axios(config);
    const searchData = res.data;
    if (searchData.length !== 0) {
      setList(searchData);
    } else {
      //GET 요청 후 검색한 결과가 없다면
      setList([]);
      setError(true);
    }
    if (!recentSearchStr) {
      localStorage.setItem('recentSearchStr', value);
    } else if (recentSearchStr && !recentSearchStr.split(';;;').includes(value)) {
      localStorage.setItem('recentSearchStr', recentSearchStr + ';;;' + value);
    }
  };

  const clickRecentSearch = (el: string) => {
    getSearchDate(el);
    setInputValue(el);
  };

  const enterHandler: KeyboardEventHandler = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    try {
      //엔터를 누르고 입력값이 있으면 : 최종검색어배열저장 + 서버에 게시물 검색 GET 요청
      if (event.code === 'NumpadEnter' || event.code === 'Enter') {
        if (inputValue === '') {
          return alert('검색어를 입력해주세요.');
        }
        getSearchDate(inputValue);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    setRecentSearchStr(localStorage.getItem('recentSearchStr'));
  }, [inputValue]);

  useEffect(() => {
    setRecentSearchStr(localStorage.getItem('recentSearchStr'));
  }, [remove]);

  const removeRecentSearch = (el: string) => {
    const newStr: string =
      recentSearchStr
        ?.split(';;;')
        .filter((i) => i !== el)
        .join(';;;') ?? '';
    localStorage.setItem('recentSearchStr', newStr);
    setRemove(!remove);
  };

  const coverStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px;
  `;

  const buttonWrapperStyle = css`
    display: flex;
    padding: 10px 50px;
    gap: 10px;
  `;

  const buttonStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    font-size: 25px;
    padding: 7px 20px;
    cursor: pointer;
    background-color: #1a8817ff;
    color: white;
    border: none;
  `;

  const closeButtonStyle = css`
    color: #191919ff;
    padding-left: 20px;
  `;

  return (
    <div css={coverStyle}>
      <SearchWrapper>
        <Input
          onKeyUp={enterHandler}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></Input>
        {inputValue === '' && recentSearchStr !== '' ? (
          <div>
            <PreTitle />
            <div css={buttonWrapperStyle}>
              {recentSearchStr !== ''
                ? recentSearchStr?.split(';;;').map((el, index) => (
                    <button key={index} css={buttonStyle}>
                      <span onClick={() => clickRecentSearch(el)}>{el}</span>
                      <span css={closeButtonStyle} onClick={() => removeRecentSearch(el)}>
                        &times;
                      </span>
                    </button>
                  ))
                : null}
            </div>
          </div>
        ) : null}
        {recentSearch === '' ? null : (
          <div>
            <PostTitle title={recentSearch} />
            <PostSearch searchs={list} />
          </div>
        )}
        {error ? (
          <div>
            <NoSearchResult />
          </div>
        ) : null}
      </SearchWrapper>
    </div>
  );
};

export default SearchEngine;
