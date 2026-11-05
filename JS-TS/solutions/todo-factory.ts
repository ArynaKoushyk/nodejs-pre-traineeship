import { Todo, NewTodo, TodoStatus } from "./types";

let nextId = 1;

export function createTodo(input: NewTodo): Todo {
  const id = nextId++;
  const { title, description } = input;
  return {
    id,
    title,
    description,
    status: TodoStatus.PENDING,
    createdAt: new Date(),
  };
}


