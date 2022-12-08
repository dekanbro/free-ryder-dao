import { createContract } from '@daohaus/tx-builder';
import ClaimAbi from '../abis/claimShaman.json';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import React from 'react';

const fetchUserClaim = async ({
  shamanAddress,
  userAddress,
  chainId,
  rpcs,
}: {
  shamanAddress: string;
  userAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const claimsContract = createContract({
    address: shamanAddress,
    abi: ClaimAbi,
    chainId,
    rpcs,
  });

  try {
    const lastClaimed = await claimsContract.claims(userAddress);
    const claimAmt = await claimsContract.perPeriod();
    const claimPeriod = await claimsContract.period();

    return {
      lastClaimed,
      claimAmt,
      claimPeriod,
    };
  } catch (error) {
    console.log(error);
  }
};

export const useClaim = () => {
  return null;
};
