import { FunctionComponent } from 'react';
import { TransferDeposit, TransferWithdrawal, TransferWrapper } from '../components/transfer';

interface TransferProps {
  address: string;
  token: number;
}

const Transfer: FunctionComponent<TransferProps> = ({ address, token }) => {
  return (
    <TransferWrapper title="입출금">
      <TransferDeposit address={address}></TransferDeposit>
      <TransferWithdrawal token={token}></TransferWithdrawal>
    </TransferWrapper>
  );
};

export default Transfer;
