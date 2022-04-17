import * as React from 'react';
import { Transactions } from './pages';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from './components/header';
export default () => {
  return (
    <>
      <Header />
      <Transactions />
      <CssBaseline />
    </>
  );
};