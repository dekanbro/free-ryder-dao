import { useDHConnect } from '@daohaus/connect';
import {
  Button,
  DataIndicator,
  DataLg,
  DataXl,
  H2,
  H3,
  ParMd,
  SingleColumnLayout,
  Spinner,
} from '@daohaus/ui';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useClaim } from '../hooks/useClaim';
import { formatPeriods, formatValueTo, fromWei } from '@daohaus/utils';
import { useTxBuilder } from '@daohaus/tx-builder';
import { TX } from '../legos/tx';
import { nowInSeconds } from '@daohaus/utils';

export const Claims = () => {
  const { address } = useDHConnect();
  const { isIdle, isLoading, error, data, hasClaimed, canClaim, refetch } =
    useClaim({
      shamanAddress: '0xbC9364441E42f3bbA5D5bB9A6c113E6D46026c14',
      userAddress: address,
      chainId: '0x64',
    });

  if (isIdle)
    return (
      <DisplayClaim
        heading="Connect Your Wallet"
        description="You need to connect your wallet in order to see if you are eligable for a claim"
      />
    );
  if (isLoading)
    return (
      <DisplayClaim
        heading="Loading Claim Data"
        description="Please wait while we load your claim data"
        element={<Spinner size="12rem" />}
      />
    );
  if (error)
    return (
      <DisplayClaim
        heading="Error"
        description={'Error fetching claim data from network RPC'}
      />
    );
  // Has Claimed, but needs to wait for the next claim period
  if (data && hasClaimed && !canClaim)
    return (
      <DisplayClaim
        heading="Time until next claim period."
        description="You have already claimed your shares. You will be able to claim again in the next claim period."
        element={
          <>
            <Countdown
              claimPeriod={data.claimPeriod}
              lastClaimed={data.lastClaimed}
            />
            <ClaimDetails
              claimAmt={data.claimAmt}
              claimPeriod={data.claimPeriod}
            />
          </>
        }
      />
    );
  // Has not claimed
  if (data && !hasClaimed)
    return (
      <DisplayClaim
        heading="It's time to claim your shares!"
        description="You have not claimed your shares yet. Claiming your shares will allow you to participate in the DAO."
        element={
          <>
            <ClaimDetails
              claimAmt={data.claimAmt}
              claimPeriod={data.claimPeriod}
            />
            <ClaimButton onSuccess={() => refetch()} />
          </>
        }
      />
    );
  if (data && canClaim)
    return (
      <DisplayClaim
        heading="It's time to claim your shares!"
        description="You have not claimed your shares yet. Claiming your shares will allow you to participate in the DAO."
        element={
          <>
            <ClaimDetails
              claimAmt={data.claimAmt}
              claimPeriod={data.claimPeriod}
            />
            <ClaimButton onSuccess={() => refetch()} />
          </>
        }
      />
    );

  return null;
};

const DisplayClaim = ({
  heading,
  description,
  element,
}: {
  heading: string;
  description?: string;
  element?: React.ReactNode;
}) => {
  return (
    <SingleColumnLayout>
      <H2 style={{ marginBottom: '2rem' }}>{heading}</H2>
      <ParMd style={{ marginBottom: '2rem' }}>{description}</ParMd>
      {element}
    </SingleColumnLayout>
  );
};

const DetailsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 30%;
  justify-content: space-between;
`;

const ClaimDetails = ({
  claimAmt,
  claimPeriod,
}: {
  claimAmt: string;
  claimPeriod: string;
}) => {
  return (
    <DetailsBox>
      <DataIndicator
        label="Claim Amout"
        data={formatValueTo({
          value: fromWei(claimAmt),
          decimals: 2,
          format: 'numberShort',
          unit: 'Shares',
        })}
      />
      <DataIndicator label="Claim Period" data={formatPeriods(claimPeriod)} />
    </DetailsBox>
  );
};

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

const Countdown = ({
  claimPeriod,
  lastClaimed,
}: {
  claimPeriod: string;
  lastClaimed: string;
}) => {
  const [timeLeft, setTimeLeft] = useState<string | 0>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(
        formatPeriods(
          Math.floor(
            Number(claimPeriod) + Number(lastClaimed) - nowInSeconds()
          ).toString()
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <DataXl style={{ marginBottom: '2rem' }}>{timeLeft}</DataXl>;
};

const ClaimButton = ({
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
