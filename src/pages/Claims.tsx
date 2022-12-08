import { useDHConnect } from '@daohaus/connect';
import React from 'react';
import { useClaim } from '../hooks/useClaim';

export const Claims = () => {
  const { address } = useDHConnect();
  const { isIdle, isLoading, error, data, status } = useClaim({
    shamanAddress: '0xbC9364441E42f3bbA5D5bB9A6c113E6D46026c14',
    userAddress: address,
    chainId: '0x64',
  });
  console.log('error', error);
  console.log('status', status);
  return <div>Claims</div>;
};
