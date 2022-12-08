import styled from 'styled-components';

import { DataIndicator } from '@daohaus/ui';
import { formatPeriods, formatValueTo, fromWei } from '@daohaus/utils';

const DetailsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 30%;
  justify-content: space-between;
`;

export const ClaimDetails = ({
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
