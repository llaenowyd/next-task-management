import { useRouter } from 'next/router';
import useTasksStore from '../useTasksStore';
import useUserStore from '../useUserStore';
import createTask from './createTask';
import deleteTask from './deleteTask';
import fetchTasks from './fetchTasks';
import signIn from './signIn';
import signUp from './signUp';
import updateTaskStatus from './updateTaskStatus';

const createServiceRequestMethods = (accessToken, handle401) => ({
  createTask: createTask(accessToken, handle401),
  deleteTask: deleteTask(accessToken, handle401),
  fetchTasks: fetchTasks(accessToken, handle401),
  signIn,
  signOut: handle401,
  signUp,
  updateTaskStatus: updateTaskStatus(accessToken, handle401),
});

const useApi = () => {
  const router = useRouter();
  const tasksStore = useTasksStore();
  const userStore = useUserStore();

  const routeToIndex = () => router.push('/');

  const handle401 = async () => {
    window.localStorage.removeItem('accessToken');
    tasksStore.clearTasks();
    await routeToIndex();
  };

  return createServiceRequestMethods(userStore.accessToken, handle401);
};

export default useApi;
