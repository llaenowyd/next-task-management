import React from 'react';
import { StoreContext } from '../StoreProvider';
import { Store, UserStore } from '../../store';

const useUserStore: () => UserStore = () => {
  const store: Store = React.useContext(StoreContext);
  return store.userStore;
};

export default useUserStore;
