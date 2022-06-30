import { ChangeEventHandler, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { editActions } from '../../store/editSlice';
import { editTitleInputStyle, editTitleWrapperStyle } from '../../styles/edit/title';

interface EditTitleProps {}

const EditTitle: FunctionComponent<EditTitleProps> = () => {
  const dispatch = useDispatch();

  const titleHandler: ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editActions.setTitle(event.target.value));
  };

  return (
    <div css={editTitleWrapperStyle}>
      {/* <label css={editTitleLabelStyle}>Title</label> */}
      <input
        css={editTitleInputStyle}
        type="text"
        name="title"
        onChange={titleHandler}
        placeholder="제목.."
      ></input>
    </div>
  );
};

export default EditTitle;
