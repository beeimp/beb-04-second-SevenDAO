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

const OUTER_FEE: number = 10;

interface TransferOuterWithdrawalProps {
  token: number;
}

const TransferOuterWithdrawal: FunctionComponent<TransferOuterWithdrawalProps> = ({ token }) => {
  // State
  const [withdraw, setWithdraw] = useState<{ address: string; token: string }>({
    address: '',
    token: '',
  });
  const [error, setError] = useState<{ address: boolean; token: boolean }>({
    address: false,
    token: false,
  });

  const [errorMessage, setErrorMessage] = useState<{ address: string; token: string }>({
    address: '',
    token: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handler
  const onChangeHandler: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'address':
        const address = event.target.value;
        setWithdraw((state) => ({ ...state, address: event.target.value }));
        setError((state) => ({ ...state, address: !/0x[0-9A-Fa-f]{40}$/.test(address) }));
        setErrorMessage((state) => ({
          ...state,
          address: /0x[0-9A-Fa-f]{40}$/.test(address) ? '' : '주소를 정확하게 입력해주세요!',
        }));
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
          token: event.target.value === '' || tokenValue <= 0 || tokenValue + OUTER_FEE > token,
        }));
        setErrorMessage((state) => ({
          ...state,
          token:
            event.target.value === '' || tokenValue <= 0
              ? '토큰을 1개 이상 입력해주세요!'
              : tokenValue + OUTER_FEE > token
              ? `소유한 토큰이 부족합니다.(출금 가능 : ${
                  token > OUTER_FEE ? token - OUTER_FEE : 0
                } SDAO))`
              : '',
        }));
        break;
    }
  };

  const withdrawHandler: MouseEventHandler = async () => {
    if (withdraw.address === '' || withdraw.token === '' || withdraw.token === '0') {
      setError(() => ({ address: true, token: true }));
      setErrorMessage(() => ({
        address: '주소를 입력해주세요!',
        token: '토큰을 1개 이상 입력해주세요!',
      }));
    } else if (error.address || error.token) {
    } else if (parseInt(withdraw.token) + OUTER_FEE > token) {
      // 수수료를 포함한 보내는 토큰의 개수보다 소유한 토큰 개수가 적은 경우
    } else {
      try {
        setIsLoading(() => true);
        const res = (
          await axios.post(
            'http://localhost:8080/token/withdraw',
            {
              address: withdraw.address,
              value: parseInt(withdraw.token),
            },
            {
              withCredentials: true,
            }
          )
        ).data;
        setIsLoading(() => false);
        // console.log(res.message);
        if (res.message === 'trx error')
          throw new Error('토큰 전송에 실패했습니다. 잠시 후 다시 시도해주세요!');
        if (res.message === 'you do not have enough tokens ') throw new Error('토큰이 부족합니다!');
        if (res.message === `this address is our site's user. please use exchange api`) {
          alert(
            '이용자 간의 이동 서비스는 준비 중입니다.\n외부 출금할 계정의 주소를 입력해주세요!'
          );
          setError((state) => ({ ...state, address: true }));
          setErrorMessage((state) => ({ ...state, address: '주소를 변경해주세요!' }));
          return;
        } else if (res.message === 'transaction success!') {
          alert('토큰 전송에 성공했습니다!');
        }
      } catch (err) {
        alert(err);
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
        label="출금 주소"
        name="address"
        onChange={onChangeHandler}
        error={error.address}
        helperText={errorMessage.address}
        placeholder="0x"
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
      <div css={helperStyle}>출금 수수료는 {OUTER_FEE} SDAO 입니다.</div>
      <Button variant="contained" onClick={withdrawHandler}>
        출금하기
      </Button>
      {isLoading ? <Progress></Progress> : undefined}
    </div>
  );
};

export default TransferOuterWithdrawal;
