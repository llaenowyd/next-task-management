import AuthService from '../services/auth.service';
import TasksService from '../services/tasks.service';
import TasksStore from './tasks.store';
import UserStore from './user.store';

export interface StoreInitializer {}
export type MaybeStoreInitializer = StoreInitializer | null;

export interface Store {
  tasksStore: TasksStore;
  userStore: UserStore;
  hydrate: (MaybeStoreInitializer) => void;
}

export const createStore: () => Store = () => ({
  tasksStore: new TasksStore(new TasksService()),
  userStore: new UserStore(new AuthService()),
  hydrate: () => {},
});

export { TasksStore, UserStore };
