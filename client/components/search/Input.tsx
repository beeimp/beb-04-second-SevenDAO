import { css } from '@emotion/react';
import { ChangeEvent, ChangeEventHandler, FunctionComponent, KeyboardEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { searchActions } from '../../store/searchSlice';
import { RootState } from '../../store';

interface InputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  enterHandler: KeyboardEventHandler;
}

const Input: FunctionComponent<InputProps> = ({ enterHandler = () => {}, inputRef }) => {
  const dispatch = useDispatch();
  const searchHandler: ChangeEventHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(searchActions.setSearchword(event.target.value));
  };
  const searchWord = useSelector((state: RootState) => state.search.searchWord);
  const recentSearchArr = useSelector((state: RootState) => state.search.recentSearchArr);

  const wrapperStyle = css`
    padding: 50px;
  `;
  const containerStyle = css`
    display: flex;
    align-items: center;
    background-color: #eeeeee;
    height: 45px;
    width: '100%';
    border-radius: 25px;
    cursor: text;
    padding: 15px;
    margin-right: 10px;
  `;

  const inputStyle = css`
    color: #292929ff;
    font-size: 15px;
    font-weight: 500;
    all: unset;
    padding-left: 10px;
    max-width: 300px;
  `;

  return (
    <div css={wrapperStyle}>
      <div css={containerStyle}>
        <AiOutlineSearch size={'25px'} color={'#707A83'} />
        <input
          css={inputStyle}
          placeholder="search"
          onChange={searchHandler}
          onKeyUp={enterHandler}
          ref={inputRef}
          value={searchWord}
        ></input>
      </div>
    </div>
  );
};

export default Input;
