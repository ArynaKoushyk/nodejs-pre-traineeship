import { Todo, TodoStatus } from "./types";

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  const targetStatus = completed ? TodoStatus.COMPLETED : TodoStatus.PENDING;

  return state.map((todo) => {
    return {
      ...todo,
      status: targetStatus,
    };
  });
}

export function clearCompleted(state: Todo[]): Todo[] {
  return state.filter((todo) => todo.status !== TodoStatus.COMPLETED);
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
  return state.reduce((acc: number, todo: Todo) => {
    if (todo.status === status) {
      return acc + 1;
    }
    return acc;
  }, 0);
}
