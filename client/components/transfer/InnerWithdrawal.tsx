import { Button, css, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  MouseEventHandler,
  useState,
} from 'react';
import Progress from '../Progress';

const INNER_FEE: number = 5;

interface TransferInnerWithdrawalProps {
  token: number;
}

const TransferInnerWithdrawal: FunctionComponent<TransferInnerWithdrawalProps> = ({ token }) => {
  // State
  const [withdraw, setWithdraw] = useState<{ username: string; token: string }>({
    username: '',
    token: '',
  });
  const [error, setError] = useState<{ username: boolean; token: boolean }>({
    username: false,
    token: false,
  });

  const [errorMessage, setErrorMessage] = useState<{ username: string; token: string }>({
    username: '',
    token: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handler
  const onChangeHandler: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'username':
        setWithdraw((state) => ({ ...state, username: event.target.value }));
        break;
      case 'token':
        const tokenValue = parseInt(event.target.value);
        setWithdraw((state) => ({
          ...state,
          token:
            event.target.value === '' || tokenValue === NaN || tokenValue < 0
              ? String(0)
              : String(tokenValue),
        }));

        setError((state) => ({
          ...state,
          token: event.target.value === '' || tokenValue <= 0 || tokenValue + INNER_FEE > token,
        }));
        setErrorMessage((state) => ({
          ...state,
          token:
            event.target.value === '' || tokenValue <= 0
              ? '토큰을 1개 이상 입력해주세요!'
              : tokenValue + INNER_FEE > token
              ? `소유한 토큰이 부족합니다.(출금 가능 : ${token - INNER_FEE} SDAO))`
              : '',
        }));
        break;
    }
  };

  const withdrawHandler: MouseEventHandler = async () => {
    if (withdraw.username === '' || withdraw.token === '' || withdraw.token === '0') {
      setError(() => ({ username: true, token: true }));
      setErrorMessage(() => ({
        username: '받으시는 사용자명을 입력해주세요!',
        token: '토큰을 1개 이상 입력해주세요!',
      }));
    } else if (error.username || error.token) {
    } else if (parseInt(withdraw.token) + INNER_FEE > token) {
      // 수수료를 포함한 보내는 토큰의 개수보다 소유한 토큰 개수가 적은 경우
    } else {
      try {
        setIsLoading(() => true);
        const res = (
          await axios.post(
            'http://localhost:8080/token/exchange',
            {
              username: withdraw.username,
              value: parseInt(withdraw.token),
            },
            {
              withCredentials: true,
            }
          )
        ).data;
        setIsLoading(() => false);
        // console.log(res.message);
        if (res.message === 'trx error') throw new Error();
        if (res.message === 'transaction success!') {
          alert('토큰 전송에 성공했습니다!');
        }
      } catch (err) {
        alert('토큰 전송에 실패했습니다. 잠시 후 다시 시도해주세요!');
      }
      router.reload();
    }
  };

  const wrapperStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 28em;
  `;

  const textFieldStyle = css`
    margin-top: 20px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    width: 100%;
  `;

  const tokenInpuStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  `;

  const helperStyle = css`
    color: gray;
    margin-bottom: 20px;
  `;

  return (
    <div css={wrapperStyle}>
      <TextField
        css={textFieldStyle}
        variant="outlined"
        label="받으시는 사용자명"
        name="username"
        onChange={onChangeHandler}
        error={error.username}
        helperText={errorMessage.username}
        placeholder="ex) sdao"
      ></TextField>
      <div css={tokenInpuStyle}>
        <TextField
          css={textFieldStyle}
          type="number"
          variant="standard"
          label={`토큰 개수(보유 수량 : ${token} SDAO)`}
          name="token"
          onChange={onChangeHandler}
          error={error.token}
          helperText={errorMessage.token}
          value={withdraw.token}
          sx={{ input: { textAlign: 'right' } }}
        ></TextField>
        <div style={{ marginTop: '1em' }}>SDAO</div>
      </div>
      <div css={helperStyle}>수수료는 {INNER_FEE} SDAO 입니다.</div>
      <Button variant="contained" onClick={withdrawHandler}>
        선물하기
      </Button>
      {isLoading ? <Progress></Progress> : undefined}
    </div>
  );
};

export default TransferInnerWithdrawal;
