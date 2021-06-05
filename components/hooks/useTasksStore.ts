import React from 'react';
import { StoreContext } from '../StoreProvider';
import { Store, TasksStore } from '../../store';

const useTasksStore: () => TasksStore = () => {
  const store: Store = React.useContext(StoreContext);
  return store.tasksStore;
};

export default useTasksStore;
