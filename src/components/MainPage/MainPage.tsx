import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

const MainPage: React.FC = () => (
  <>
    <Header />
    <main>
      <Link to="/wordbook">WordBook</Link>
    </main>
    <Footer />
  </>
);

export default MainPage;
