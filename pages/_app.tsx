import React from 'react';
import StoreProvider from '../components/StoreProvider';

import '../styles.css';

interface PageProps {
  initialState: object;
}

interface OwnProps {
  Component: React.FC<any>;
  pageProps: PageProps;
}

const App: React.FC<OwnProps> = ({ Component, pageProps }) => {
  return (
    <StoreProvider {...pageProps}>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default App;
