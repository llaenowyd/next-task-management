import React from 'react';
import { Provider } from 'mobx-react';
import TasksService from '../services/tasks.service';
import AuthService from '../services/auth.service';
import TasksStore from '../stores/tasks.store';
import UserStore from '../stores/user.store';

import '../styles.css';

interface Services {
  tasksService?: TasksService;
  authService?: AuthService;
}

interface Stores {
  tasksStore?: TasksStore;
  userStore?: UserStore;
}

interface PageProps {
  initialState: object;
}

interface OwnProps {
  Component: React.FC<any>;
  pageProps: PageProps;
}

const services: Services = {};

services.tasksService = new TasksService();
services.authService = new AuthService();

const stores: Stores = {};

stores.tasksStore = new TasksStore(services.tasksService);
stores.userStore = new UserStore(services.authService);

const App: React.FC<OwnProps> = ({ Component, pageProps }) => {
  return (
    <Provider {...stores}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
