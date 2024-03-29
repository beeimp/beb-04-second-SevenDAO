import { FunctionComponent, KeyboardEventHandler, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import SearchWrapper from '../../components/search/Wrapper';
import Input from '../../components/search/Input';
import PostTitle from '../../components/search/PostTitle';
import PreTitle from '../../components/search/PreTitle';
import axios, { AxiosRequestConfig } from 'axios';
import { PostType } from '../../types/post';
import NoSearchResult from '../../components/search/NoSearchResult';
import PreComment from '../../components/search/PreComment';
import ContentsList from '../contents/ContentsList';

interface SearchEngineProps {}

const SearchEngine: FunctionComponent<SearchEngineProps> = () => {
  const [noResultMsg, setNoResultMsg] = useState<boolean>(false);
  const [list, setList] = useState<PostType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [recentSearch, setRecentSearch] = useState<string>('');
  const [recentSearchStr, setRecentSearchStr] = useState<string | null>('');
  const [remove, setRemove] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const getSearchDate = async (value: string) => {
    setIsSearch(() => true);
    setRecentSearch(value);
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/api/search?searchword=${value}&pageNum=1&count=5`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    const res = await axios(config);
    const searchData = res.data;
    if (searchData.length !== 0) {
      setList(searchData);
      setNoResultMsg(false);
    } else {
      //GET 요청 후 검색한 결과가 없다면
      setList([]);
      setNoResultMsg(true);
      setIsSearch(false);
    }
    //로컬스토리지에 최근검색어 저장
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
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    try {
      if (event.code === 'NumpadEnter' || event.code === 'Enter') {
        if (inputValue === '') {
          return alert('검색어를 입력해주세요.');
        }
        //엔터를 누르고 입력값이 있으면 : 최종검색어배열저장 + 서버에 게시물 검색 GET 요청
        getSearchDate(inputValue);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    setRecentSearchStr(localStorage.getItem('recentSearchStr'));
  }, [inputValue, remove]);

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
    display: -webkit-box;
    padding: 10px 50px;
    gap: 10px;
    overflow: auto;
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
            // 다시 시작
            if (e.target.value === '') {
              setList(() => []);
              setIsSearch(() => false);
            }
            setInputValue(e.target.value);
          }}
        ></Input>
        {inputValue === '' && ( //인풋입력값에 따라 최신검색어 혹은 검색메세지
          <div>
            <PreTitle />
            <div css={buttonWrapperStyle}>
              {recentSearchStr !== '' ? (
                recentSearchStr?.split(';;;').map((el, index) => (
                  <button key={index} css={buttonStyle}>
                    <span onClick={() => clickRecentSearch(el)}>{el}</span>
                    <span css={closeButtonStyle} onClick={() => removeRecentSearch(el)}>
                      &times;
                    </span>
                  </button>
                ))
              ) : (
                <PreComment />
              )}
            </div>
          </div>
        )}
        {recentSearch !== '' && ( //검색결과
          <div>
            <PostTitle title={recentSearch} />
            {/* <PostSearch searchs={list} /> */}
            {isSearch ? (
              <ContentsList
                postList={list}
                setPostList={setList}
                requestUrl={`/api/search?searchword=${recentSearch}`}
                pageStartNumber={2}
              ></ContentsList>
            ) : undefined}
          </div>
        )}
        {noResultMsg && ( //검색 조회 후 결과없으면
          <div>
            <NoSearchResult />
          </div>
        )}
      </SearchWrapper>
    </div>
  );
};

export default SearchEngine;
