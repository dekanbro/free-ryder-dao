import { createContract } from '@daohaus/tx-builder';
import ClaimAbi from '../abis/claimShaman.json';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import React from 'react';
import { useQuery } from 'react-query';

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
      lastClaimed: lastClaimed.toPoo(),
      claimAmt: claimAmt.toString(),
      claimPeriod: claimPeriod.toString(),
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useClaim = ({
  shamanAddress,
  userAddress,
  chainId,
  rpcs,
}: {
  shamanAddress: string;
  userAddress: string | undefined | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const { data, ...rest } = useQuery(
    'claimData',
    () =>
      fetchUserClaim({
        shamanAddress,
        userAddress: userAddress as string,
        chainId,
        rpcs,
      }),
    { enabled: !!userAddress }
  );
  const hasClaimed = data?.lastClaimed && Number(data.lastClaimed) > 0;
  return { data, hasClaimed, ...rest };
};
