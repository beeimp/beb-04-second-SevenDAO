import { FunctionComponent } from 'react';
import {
  TransferDeposit,
  TransferInnerWithdrawal,
  TransferOuterWithdrawal,
  TransferWrapper,
} from '../components/transfer';
import TransferWithdrawal from '../components/transfer/Withdrawal';

interface TransferProps {
  address: string;
  token: number;
}

const Transfer: FunctionComponent<TransferProps> = ({ address, token }) => {
  return (
    <TransferWrapper title="입출금">
      <TransferDeposit address={address}></TransferDeposit>
      <TransferWithdrawal
        tab1={<TransferOuterWithdrawal token={token}></TransferOuterWithdrawal>}
        tab2={<TransferInnerWithdrawal token={token}></TransferInnerWithdrawal>}
      ></TransferWithdrawal>
    </TransferWrapper>
  );
};

export default Transfer;
