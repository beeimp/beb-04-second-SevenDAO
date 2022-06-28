import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import Img from 'next/image';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InnerButton from '../auth/logout/innerButton';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

interface HeadProps {
  iconUrl: string;
  size?: string;
}

const HeadAccountButton: FunctionComponent<HeadProps> = ({ iconUrl, size = '44px' }) => {
  const buttonStyle = css`
    background-color: #e5e8eb;
    width: ${size};
    height: ${size};
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;

    :hover {
      box-shadow: rgb(0 0 0 / 30%) 0 0 20px;
      transition: 0.2s ease;
    }
  `;
  const innerStyle = css`
    all: unset;
  `;

  return (
    <div css={buttonStyle}>
      <BootstrapTooltip
        title={
          <React.Fragment>
            <InnerButton />
          </React.Fragment>
        }
      >
        <button css={innerStyle}>
          <Img src={iconUrl} width={size} height={size} />
        </button>
      </BootstrapTooltip>
    </div>
  );
};

export default HeadAccountButton;
