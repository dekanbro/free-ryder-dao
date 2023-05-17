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
        Everyone is free to claim 1 shares once every 3 hours.
      </ParMd>
      <LinkBox>
        <Link href="claim">Claim Shares</Link>
        <Link
          href="https://admin.daohaus.fun/#/molochv3/0x64/0x7ca3494cc9b31afa05c2f51ba5a2aa5affb3b659"
          linkType="external"
        >
          ELI5 DAO
        </Link>

      </LinkBox>
    </SingleColumnLayout>
  );
};
