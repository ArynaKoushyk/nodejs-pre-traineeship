import { TodoService } from "./todo-service";
import { TodoApi } from "./todo-api";
import { InMemoryRepository } from "./repository";
import { Todo, TodoStatus } from "./types";

export class ToDoManager {
  private readonly repo = new InMemoryRepository<Todo>();
  private readonly api = new TodoApi(this.repo);
  private readonly service = new TodoService(this.api);

  async init(): Promise<void> {
    await this.add("Demo task", "Example description");
  }

  async add(title: string, description?: string): Promise<void> {
    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    await this.service.setStatus(id, TodoStatus.COMPLETED);
  }

  async list(): Promise<Todo[]> {
    return await this.api.getAll();
  }
}
