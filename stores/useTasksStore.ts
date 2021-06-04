import React from 'react';
import { MobXProviderContext } from 'mobx-react';

const useTasksStore = () => {
  const stores = React.useContext(MobXProviderContext);
  return stores.tasksStore;
};

export default useTasksStore;
