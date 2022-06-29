import { css } from '@emotion/react';
import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface TransferDepositProps {
  address: string;
  size?: number;
}

const TransferDeposit: FunctionComponent<TransferDepositProps> = ({ address, size = 177 }) => {
  const [image, setImage] = useState<string>('');
  useEffect(() => {
    axios
      .get(`https://chart.googleapis.com/chart`, {
        params: {
          cht: 'qr',
          chs: `${size}x${size}`,
          choe: 'ISO-8859-1',
          chl: address,
        },
        responseType: 'blob',
      })
      // .then((res) => Buffer.from(res.data, 'binary').toString('base64'))
      .then((res) => {
        const imageUrl = URL.createObjectURL(res.data);
        setImage(imageUrl);
      });
  }, [address, size]);

  const wrapperStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  `;

  const copyStyle = css`
    cursor: pointer;
    color: black;

    :active {
      color: gray;

      > svg {
        color: black;
      }
    }
  `;

  const titleStyle = css`
    text-align: center;
    padding: 0;
    margin: 0;
  `;

  const copyIconStyle = css`
    font-size: 1em;
    color: gray;
  `;

  const imageStyle = css`
    width: ${size}px;
    height: ${size}px;
    background-image: url(${image});
  `;

  return (
    <div css={wrapperStyle}>
      <div css={imageStyle}></div>
      <div>
        <h3 css={titleStyle}>입금 주소</h3>
        <div
          css={copyStyle}
          onClick={() => {
            navigator.clipboard.writeText(address);
          }}
        >
          <span>{address}</span>
          <ContentCopyIcon css={copyIconStyle}></ContentCopyIcon>
        </div>
      </div>
    </div>
  );
};

export default TransferDeposit;
