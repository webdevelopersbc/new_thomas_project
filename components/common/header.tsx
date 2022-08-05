import React, { FunctionComponent } from 'react';
import { TopHeader, NavBar } from '@components';

export const Header: FunctionComponent = () => (
    <header className="font-body">
      <TopHeader />
      <NavBar />
    </header>
  )
