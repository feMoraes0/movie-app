import React from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import Scaffold from '../../components/scaffold';

function Detail() {
  const { pathname } = useLocation();

  return (
    <Scaffold>
      <p>{pathname}</p>
    </Scaffold>
  );
}

export default Detail;
