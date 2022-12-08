import { DHLayout } from '@daohaus/connect';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { Claims } from './pages/Claims';
import { FormTest } from './pages/FormTest';
import { Home } from './pages/Home';

export const Routes = () => {
  const { pathname } = useLocation();
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
        <Route path="/claim" element={<Claims />} />
      </Router>
    </DHLayout>
  );
};
