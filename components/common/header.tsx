import React, { FunctionComponent } from 'react';
import { TopHeader, NavBar } from '@components';
import Head from 'next/head';
//  import css
import styles from '../styles/Home.module.css';
export const Header: FunctionComponent = () => (
  <>
    {/* use head and add meta tag in head component  */}
      <Head>
        <title>Home App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" 
          rel="stylesheet"
        />
      </Head>
    <header className="font-body">
      <TopHeader />
      <NavBar />
    </header>
    </>
  )
