import { Routes as Router, Route, useLocation } from 'react-router-dom';

import { DHLayout, useDHConnect } from '@daohaus/connect';
import { TXBuilder } from '@daohaus/tx-builder';

import { Claims } from './pages/Claims';
import { Home } from './pages/Home';

export const Routes = () => {
  const { pathname } = useLocation();
  const { provider } = useDHConnect();
  return (
    <DHLayout
      pathname={pathname}
      navLinks={[
        { label: 'Home', href: '/' },
        { label: 'Claim Tokens!', href: '/claim' },
      ]}
    >
      <Router>
        <Route path="/" element={<Home />} />
        <Route
          path="/claim"
          element={
            <TXBuilder
              provider={provider}
              chainId="0x64"
              daoId="0x7ca3494cc9b31afa05c2f51ba5a2aa5affb3b659"
              safeId="0xd3acdd0211b30407825370621e34fec53bf3d288"
              appState={{}}
            >
              <Claims />
            </TXBuilder>
          }
        />
      </Router>
    </DHLayout>
  );
};
