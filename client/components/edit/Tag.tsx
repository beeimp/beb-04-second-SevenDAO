import { css } from '@emotion/react';
import React, { ChangeEventHandler, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { editActions } from '../../store/editSlice';

interface EditTagProps { }

const EditTag: FunctionComponent<EditTagProps> = () => {
  const dispatch = useDispatch();
  const optionValue = ['Programming', 'Media', 'Technology', 'Community', 'Others'];

  const selectHandler: ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'Programming':
        dispatch(editActions.setTag('Programming'));
        break;
      case 'Media':
        dispatch(editActions.setTag('Media'));
        break;
      case 'Technology':
        dispatch(editActions.setTag('Technology'));
        break;
      case 'Community':
        dispatch(editActions.setTag('Community'));
        break;
      case 'Others':
        dispatch(editActions.setTag('Others'));
        break;
      default:
        dispatch(editActions.setTag('All'));
    }
  };

  const wrapperStyle = css`
    margin: 1em 0;
  `;

  const selectStyle = css`
    font-size: 1.5em;
    color: gray;
    border: 1px solid gray;
    border-radius: 1em;
    padding: 0.3em 1em;
  `;

  return (
    <div css={wrapperStyle}>
      <select css={selectStyle} onChange={selectHandler}>
        <option value="">--카테고리 선택--</option>
        {optionValue.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditTag;
