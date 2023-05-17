import { useDHConnect } from '@daohaus/connect';
import { Spinner } from '@daohaus/ui';

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { useClaim } from '../hooks/useClaim';
import { DisplayClaim } from '../components/DisplayClaim';
import { Countdown } from '../components/Countdown';
import { ClaimDetails } from '../components/DetailsBox';
import { ClaimButton } from '../components/ClaimButton';
import { useState } from 'react';

export const Claims = () => {
  const { address, chainId } = useDHConnect();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  
  const { isIdle, isLoading, error, data, hasClaimed, canClaim, isMember, refetch } =
    useClaim({
      shamanAddress: '0x2e67b1aced59cebfc186ca1f69082c50a1055528',
      userAddress: address,
      chainId: '0x64',
    });

  const isGnosis = chainId === '0x64';

  if (isIdle)
    return (
      <DisplayClaim
        heading="Connect Your Wallet"
        description="You need to connect your wallet in order to see if you are eligable for a claim"
      />
    );
  if (!isGnosis) {
    return (
      <DisplayClaim
        heading="Connect to Gnosis Chain"
        description="Free Ryder DAO is only on Gnosis Chain."
      />
    );
  }

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
  if (!isMember)
    return (
      <DisplayClaim
        heading="You must be a member"
        description={'Your are not a member or do not have enough shares to meet the claim threshold.'}
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
          {showConfetti && <Confetti width={width} height={height} gravity={.05} recycle={false} onConfettiComplete={()=>setShowConfetti(false)} />}
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
            <ClaimButton onSuccess={() => {refetch(); setShowConfetti(true);}} />
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
            <ClaimButton onSuccess={() => {refetch(); setShowConfetti(true);}} />
          </>
        }
      />
    );

  return null;
};
