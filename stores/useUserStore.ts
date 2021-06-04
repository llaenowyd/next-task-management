import React from 'react';
import { MobXProviderContext } from 'mobx-react';

const useUserStore = () => {
  const stores = React.useContext(MobXProviderContext);
  return stores.userStore;
};

export default useUserStore;
