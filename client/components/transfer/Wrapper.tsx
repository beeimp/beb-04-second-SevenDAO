import { css } from '@emotion/react';
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';
import CloseIcon from '@mui/icons-material/Close';

interface TransferWrapperProps {
  children: ReactNode;
  title: string;
}

const TransferWrapper: FunctionComponent<TransferWrapperProps> = ({ title, children }) => {
  const dispatch = useDispatch();
  const undisplayTransferHandler: MouseEventHandler = (
    event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      dispatch(modalActions.setDisplayTransfer(false));
    }
  };

  const coverStyle = css`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    backdrop-filter: blur(8px);

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  `;
  const closeStyle = css`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5em;

    cursor: pointer;
  `;

  const wrapperStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: white;
    border: 1px solid black;
    padding: 50px;
  `;

  const titleWrapperStyle = css``;
  const titleStyle = css``;
  const childrenWrapperStyle = css``;

  return (
    <div css={coverStyle} onClick={undisplayTransferHandler}>
      <div css={wrapperStyle}>
        <div css={titleWrapperStyle}>
          <h1 css={titleStyle}>{title}</h1>
        </div>
        <div css={childrenWrapperStyle}>{children}</div>
        <div css={closeStyle} onClick={undisplayTransferHandler}>
          <CloseIcon sx={{ fontSize: '2em' }} onClick={undisplayTransferHandler}></CloseIcon>
        </div>
      </div>
    </div>
  );
};

export default TransferWrapper;
