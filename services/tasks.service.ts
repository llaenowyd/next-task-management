import BaseHttpService from './base-http.service';

export default class TasksService extends BaseHttpService {
  async deleteTask(id) {
    await this.delete(`tasks/${id}`);
  }

  createTask(title, description) {
    return this.post(`tasks`, { title, description });
  }
}
