import { observable, action, makeAutoObservable } from 'mobx';

export default class TasksStore {
  @observable tasks = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setTasks(nextTasks) {
    this.tasks = nextTasks;
  }

  @action
  clearTasks() {
    if (this.tasks.length > 0) {
      this.tasks = [];
    }
  }

  @action updateTaskStatus(id, status) {
    const task = this.tasks.find((task) => task.id === id);
    task.status = status;
  }

  @action
  addTask(task) {
    this.tasks.push(task);
  }

  @action
  removeTask(id) {
    const idx = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(idx, 1);
  }
}
