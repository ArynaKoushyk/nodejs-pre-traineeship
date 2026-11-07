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

const ms = Math.floor(Math.random() * 301) + 300;
export class TodoApi {
  // Task 6 stores todos in a plain array; Task 7 replaces it with InMemoryRepository
  private todos: Todo[] = [];

  async getAll(): Promise<Todo[]> {
    await new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    return this.todos;
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    const todo = createTodo(newTodo);
    this.todos.push(todo);
    return todo;
  }

  async update(
    id: number,
    update: Partial<Omit<Todo, "id" | "createdAt">>,
  ): Promise<Todo> {
    await new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new TodoNotFoundError(id);
    }
    const updatedTodo = { ...todo, ...update };
    this.todos = this.todos.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );

    return updatedTodo;
  }

  async remove(id: number): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new TodoNotFoundError(id);
    }

    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
