import { Button, css } from '@mui/material';
import { FunctionComponent } from 'react';

interface TransferButtonProps {}

const TransferButton: FunctionComponent<TransferButtonProps> = () => {
  const wrapperStyle = css``;
  const buttonStyle = css``;
  return (
    <div css={wrapperStyle}>
      <Button css={buttonStyle}>입출금</Button>
    </div>
  );
};

export default TransferButton;
