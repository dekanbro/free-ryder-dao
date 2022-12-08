import { DHLayout, useDHConnect } from '@daohaus/connect';
import { TXBuilder } from '@daohaus/tx-builder';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { Claims } from './pages/Claims';
import { FormTest } from './pages/FormTest';
import { Home } from './pages/Home';

export const Routes = () => {
  const { pathname } = useLocation();
  const { provider } = useDHConnect();
  return (
    <DHLayout
      pathname={pathname}
      navLinks={[
        { label: 'Home', href: '/' },
        { label: 'Form Test', href: '/claim' },
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
              daoId="0xbC9364441E42f3bbA5D5bB9A6c113E6D46026c14"
              safeId="0xb8b9f7047223b82578f03b141db405ed1a41dda0"
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
