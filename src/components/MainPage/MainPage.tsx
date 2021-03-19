import { Link } from 'react-router-dom';
import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

const MainPage: React.FC = () => (
  <>
    <Header />
    <main>
      <Link to="/dictionary">Dictionary</Link>
    </main>
    <Footer />
  </>
);

export default MainPage;
