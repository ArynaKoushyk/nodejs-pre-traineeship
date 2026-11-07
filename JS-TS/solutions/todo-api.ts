import { InMemoryRepository } from "./repository";
import { createTodo } from "./todo-factory";
import { Todo, NewTodo } from "./types";

export class TodoNotFoundError extends Error {
  public readonly id: number;
  constructor(id: number) {
    super();
    this.name = "TodoNotFoundError";
    this.id = id;
  }
}

async function delay(): Promise<void> {
  const ms = Math.floor(Math.random() * 301) + 300;

  await new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
export class TodoApi {
  // Task 6 stores todos in a plain array; Task 7 replaces it with InMemoryRepository
  constructor(private readonly repo = new InMemoryRepository<Todo>()) {}

  async getAll(): Promise<Todo[]> {
    await delay();
    return this.repo.findAll();
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await delay();
    const todo = createTodo(newTodo);
    return this.repo.add(todo);
  }

  async update(
    id: number,
    update: Partial<Omit<Todo, "id" | "createdAt">>,
  ): Promise<Todo> {
    await delay();

    const todo = this.repo.findById(id);

    if (!todo) {
      throw new TodoNotFoundError(id);
    }

    return this.repo.update(id, update);
  }

  async remove(id: number): Promise<void> {
    await delay();

    const todo = this.repo.findById(id);

    if (!todo) {
      throw new TodoNotFoundError(id);
    }
    this.repo.remove(id);
  }
}
