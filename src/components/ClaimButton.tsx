import { useState } from 'react';

import { Button, ParMd } from '@daohaus/ui';
import { useTxBuilder } from '@daohaus/tx-builder';

import { TX } from '../legos/tx';

export enum StatusMsg {
  Compile = 'Compiling Transaction Data',
  Request = 'Requesting Signature',
  Await = 'Transaction Submitted',
  TxErr = 'Transaction Error',
  TxSuccess = 'Transaction Success',
  PollStart = 'Syncing TX (Subgraph)',
  PollSuccess = 'Success: TX Confirmed!',
  PollError = 'Sync Error (Subgraph)',
}

export const ClaimButton = ({
  onError,
  onSuccess,
}: {
  onError?: () => void;
  onSuccess?: () => void;
}) => {
  const { fireTransaction } = useTxBuilder();
  const [txStatus, setTxStatus] = useState<StatusMsg | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    fireTransaction({
      tx: TX.CLAIM,
      lifeCycleFns: {
        onRequestSign() {
          setTxStatus(StatusMsg.Request);
        },
        onTxHash() {
          setTxStatus(StatusMsg.Await);
        },
        onTxError() {
          setTxStatus(StatusMsg.TxErr);
          onError?.();
          setIsLoading(false);
        },
        onTxSuccess() {
          setTxStatus(StatusMsg.TxSuccess);
        },
        onPollStart() {
          setTxStatus(StatusMsg.PollStart);
        },
        onPollError() {
          setTxStatus(StatusMsg.PollError);
          onError?.();
          setIsLoading(false);
        },
        onPollSuccess() {
          setTxStatus(StatusMsg.PollSuccess);
          onSuccess?.();
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <>
      <Button
        size="lg"
        onClick={handleClick}
        style={{ marginTop: '2rem', marginBottom: '2rem' }}
        disabled={isLoading}
      >
        Claim Shares
      </Button>
      <ParMd>{txStatus}</ParMd>
    </>
  );
};
