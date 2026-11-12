import { TodoApi, TodoNotFoundError } from "./todo-api";
import { Todo, TodoStatus } from "./types";

const NEXT_STATUS: Record<TodoStatus, TodoStatus> = {
  [TodoStatus.PENDING]: TodoStatus.IN_PROGRESS,
  [TodoStatus.IN_PROGRESS]: TodoStatus.COMPLETED,
  [TodoStatus.COMPLETED]: TodoStatus.PENDING,
};

export class TodoService {
  constructor(private readonly api: TodoApi) {}

  async create(title: string, description?: string): Promise<Todo> {
    if (!title.trim()) {
      throw new Error("Title cannot be empty");
    }
    const newTodo = {
      title: title.trim(),
      description,
    };
    return this.api.add(newTodo);
  }

  async toggleStatus(id: number): Promise<Todo> {
    const todos = await this.api.getAll();
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new TodoNotFoundError(id);
    }

    const updatedTodo = {
      status: NEXT_STATUS[todo.status],
    };
    return this.api.update(id, updatedTodo);
  }

  async setStatus(id: number, status: TodoStatus): Promise<Todo> {
    if (!this.isUserStatus(status)) {
      throw new Error("Invalid status");
    }
    const todo = {
      status,
    };
    return this.api.update(id, todo);
  }

  async search(keyword: string): Promise<Todo[]> {
    const todos = await this.api.getAll();
    const normalizedKeyword = keyword.trim().toLowerCase();

    return todos.filter((todo) => {
      const titleMatches = todo.title.toLowerCase().includes(normalizedKeyword);
      const descriptionMatches = todo.description
        ? todo.description.toLowerCase().includes(normalizedKeyword)
        : false;

      return titleMatches || descriptionMatches;
    });
  }

  private isUserStatus(value: any): value is TodoStatus {
    return Object.values(TodoStatus).includes(value);
  }
}
