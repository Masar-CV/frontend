import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const SiteLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default SiteLayout;
