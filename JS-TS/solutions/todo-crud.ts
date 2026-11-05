import { Todo } from "./types";

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  return [...state, todo];
}

export function updateTodo(
  state: Todo[],
  id: number,
  update: Partial<Omit<Todo, "id" | "createdAt">>,
): Todo[] {
  const todo = state.find((todo) => todo.id === id);
  if (!todo) {
    throw new Error("Not found");
  }
  return state.map((todo) => {
    if (todo.id === id) {
      return { ...todo, ...update };
    }
    return todo;
  });
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  const todo = state.find((todo) => todo.id === id);
  if (!todo) {
    throw new Error("Not found");
  }
  return state.filter((todo) => todo.id !== id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  return state.find((todo) => todo.id === id);
}
