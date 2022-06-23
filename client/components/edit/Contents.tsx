import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import React, { FunctionComponent } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { editActions } from '../../store/editSlice';
import Progress from '../Progress';

const QuillWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Progress></Progress>,
});

interface EditContentsProps { }

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

const EditContents: FunctionComponent<EditContentsProps> = () => {
  const dispatch = useDispatch();

  const ContentsHandler = (event: string) => {
    dispatch(editActions.setContent(event));
  };

  const style = css`
    .ql-editor {
      min-height: 50em;
    }
  `;

  return (
    <QuillWrapper
      css={style}
      theme="snow"
      modules={modules}
      formats={formats}
      placeholder="글쓰기..."
      onChange={(event) => ContentsHandler(event)}
    />
  );
};

export default EditContents;
