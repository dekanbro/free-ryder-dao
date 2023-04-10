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
              daoId="0xfbddea58ca7dd83e03fd16f3eeee94d4eeea6632"
              safeId="0x9dd0ef4a97825a77f35e03aefd412adf848d5341"
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
