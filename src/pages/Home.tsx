import styled from 'styled-components';

import { H2, Link, ParMd, SingleColumnLayout } from '@daohaus/ui';

import { HausAnimated } from '../components/HausAnimated';

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const Home = () => {
  return (
    <SingleColumnLayout>
      <H2>Free Ryder Claims App</H2>
      <HausAnimated />
      <ParMd>
        Earn shares by simply pressing a button. No merit, hard work, effort, or
        even proof of person-hood required!
      </ParMd>

      <ParMd style={{ marginBottom: '2.4rem' }}>
        Everyone is free to claim 10 shares once every 24 hours.
      </ParMd>
      <LinkBox>
        <Link href="claim">Claim Shares</Link>
        <Link
          href="https://admin.daohaus.fun/#/molochv3/0x64/0x7e72ba58d3d331d339566db9ff3ec184b293477d"
          linkType="external"
        >
          Free Ryder DAO
        </Link>
        <Link href="/formtest">Leaderboard</Link>
      </LinkBox>
    </SingleColumnLayout>
  );
};
