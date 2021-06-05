import React from 'react';
import { MaybeStoreInitializer, Store, createStore } from '../store';

type MaybeStore = Store | null;
type Context = React.Context<MaybeStore>;

let store: MaybeStore = null;

export const StoreContext: Context = React.createContext<MaybeStore>(null);

const initializeStore: (MaybeStoreInitializer) => Store = (
  initialData: MaybeStoreInitializer = null,
) => {
  const _store: Store = store ?? createStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData);
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

interface StoreProviderProps {
  children: React.ReactChildren | React.ReactChild;
  initialState: MaybeStoreInitializer;
}

const StoreProvider: React.FC<StoreProviderProps> = ({
  children,
  initialState: initialData,
}) => {
  const store: Store = initializeStore(initialData);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
