import { observable, action, makeAutoObservable } from 'mobx';
import TasksService from '../services/tasks.service';

export default class TasksStore {
  @observable tasks = [];

  constructor(private tasksService: TasksService) {
    makeAutoObservable(this);
  }

  @action
  setTasks(nextTasks) {
    this.tasks = nextTasks;
  }

  @action updateTaskStatus(id, status) {
    const task = this.tasks.find((task) => task.id === id);
    task.status = status;
  }

  @action
  async createTask(title, description) {
    const result = await this.tasksService.createTask(title, description);

    if (result) {
      this.tasks.push(result.data);
    }
  }

  @action
  async deleteTask(id) {
    const idx = this.tasks.findIndex((task) => task.id === id);
    await this.tasksService.deleteTask(id);
    this.tasks.splice(idx, 1);
  }
}
