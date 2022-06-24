import { FunctionComponent, ReactNode } from 'react';
import { Button } from '@mui/material';
import { buttonDefaultStyle, buttonWhiteStyle } from '../../styles/baseMui';

interface MuiButtonProps {
  children: ReactNode;
  type?: 'default' | 'white';
  onClick?: React.MouseEventHandler;
}

const MuiButton: FunctionComponent<MuiButtonProps> = ({
  children,
  type = 'default',
  onClick = () => {},
}) => {
  const props = () => {
    switch (type) {
      case 'white':
        return {
          css: buttonWhiteStyle,
        };
      case 'default':
      default:
        return {
          css: buttonDefaultStyle,
        };
    }
  };

  return (
    <Button {...props()} onClick={onClick}>
      {children}
    </Button>
  );
};

export default MuiButton;
