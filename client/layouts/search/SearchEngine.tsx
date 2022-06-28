import { FunctionComponent, KeyboardEventHandler, useRef, useState } from 'react';
import { css } from '@emotion/react';
import SearchWrapper from '../../components/search/Wrapper';
import Input from '../../components/search/Input';
import PostTitle from '../../components/search/PostTitle';
import PreTitle from '../../components/search/PreTitle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { searchActions } from '../../store/searchSlice';
import PostSearch from '../../components/search/PostSearch';
import axios, { AxiosRequestConfig } from 'axios';
import { SearchResultType } from '../../types/post';

interface SearchEngineProps {}

const SearchEngine: FunctionComponent<SearchEngineProps> = () => {
  const [list, setList] = useState<SearchResultType[]>([
    {
      _id: '',
      username: '',
      title: '',
      tag: '',
      modified_data: 1,
      created_date: 1,
      contents: '',
      imgUrl: '',
    },
  ]);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchWord = useSelector((state: RootState) => state.search.searchWord);
  const recentSearchArr = useSelector((state: RootState) => state.search.recentSearchArr);

  const enterHandler: KeyboardEventHandler = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    try {
      if (event.code === 'Enter' && searchWord !== '') {
        //엔터를 누르면 : 최종검색어배열저장 + 서버에 게시물 검색 GET 요청
        dispatch(searchActions.addRecentSearchArr(searchWord));
        const config: AxiosRequestConfig = {
          method: 'get',
          url: `http://localhost:8080/search?searchword=${searchWord}`,
          withCredentials: true,
        };
        const res = await axios(config);
        const searchData = res.data;
        if (searchData.length !== 0) {
          setList(searchData);
          dispatch(searchActions.setSearchword(''));
        }
        // console.log(searchData + '는 없음');
        // console.log(list[0]._id);
      }
    } catch (err) {
      alert(err);
    }
  };

  const coverStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px;
  `;

  return (
    <div css={coverStyle}>
      <SearchWrapper>
        <Input inputRef={inputRef} enterHandler={enterHandler}></Input>
        {searchWord.length === 0 ? <PreTitle /> : <PostTitle title={recentSearchArr[0]} />}
        {recentSearchArr[0] && list[0]._id === '' ? null : <PostSearch searchs={list} />}
      </SearchWrapper>
    </div>
  );
};

export default SearchEngine;
