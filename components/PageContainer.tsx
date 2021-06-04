import React from 'react';
import Head from 'next/head';
import FullScreenWrapper from './FullScreenWrapper';

interface OwnProps {
  children: React.ReactChild;
}

const PageContainer: React.FC<OwnProps> = ({ children }) => (
  <>
    <Head>
      <title>Task Management</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
    <FullScreenWrapper>{children}</FullScreenWrapper>
  </>
);

export default PageContainer;
