import React from 'react';
import './App.css';
import Promo from '../Promo/Promo.jsx';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Footer from '../Footer/Footer';

export default function App() {
  return (
    <div className='app'>
      <Promo />
      <AboutProject />
      <Techs />
      <Footer />
    </div>
  );
}
