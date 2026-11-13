import { InMemoryRepository } from "../JS-TS/solutions/repository";
import { TodoApi, TodoNotFoundError } from "../JS-TS/solutions/todo-api";
import { TodoService } from "../JS-TS/solutions/todo-service";
import { TodoStatus } from "../JS-TS/solutions/types";

describe("Task 09: TodoService", () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(new TodoApi());
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("create should add todo", async () => {
    const creating = service.create("Service Item");
    await jest.runAllTimersAsync();
    const created = await creating;
    expect(created.title).toBe("Service Item");
  });

  it("toggleStatus should change status", async () => {
    const creating = service.create("Service Item");
    await jest.runAllTimersAsync();
    const todo = await creating;

    const toggling = service.toggleStatus(todo.id);
    await jest.runAllTimersAsync();
    const toggled = await toggling;
    expect(toggled.status).toBe(TodoStatus.IN_PROGRESS);
  });

  it("setStatus should set the given status", async () => {
    const creating = service.create("Service Item");
    await jest.runAllTimersAsync();
    const todo = await creating;

    const updating = service.setStatus(todo.id, TodoStatus.COMPLETED);
    await jest.runAllTimersAsync();
    const updated = await updating;
    expect(updated.status).toBe(TodoStatus.COMPLETED);
  });

  it("setStatus should throw for a non-existing id", async () => {
    const checking = expect(
      service.setStatus(-1, TodoStatus.COMPLETED),
    ).rejects.toThrow();
    await jest.runAllTimersAsync();
    await checking;
  });

  it("search should match titles and descriptions regardless of case", async () => {
    const creatingByTitle = service.create("Finish work");
    const creatingByDescription = service.create(
      "Buy milk",
      "Pick up after work",
    );
    const creatingOther = service.create("Buy bread", "Pick up on Saturday");

    await jest.runAllTimersAsync();

    const [byTitle, byDescription] = await Promise.all([
      creatingByTitle,
      creatingByDescription,
      creatingOther,
    ]);

    const searching = service.search("WORK");
    await jest.runAllTimersAsync();
    const list = await searching;

    expect(list).toHaveLength(2);
    expect(list).toEqual(expect.arrayContaining([byTitle, byDescription]));
  });
  it("create should reject an empty or whitespace-only title", async () => {
    await expect(service.create("")).rejects.toThrow();
    await expect(service.create("   ")).rejects.toThrow();
  });

  it("setStatus should reject an invalid status", async () => {
    await expect(service.setStatus(1, "INVALID" as TodoStatus)).rejects.toThrow(
      "Invalid status",
    );
  });

  it("toggleStatus should reject a missing id", async () => {
    const checking = expect(service.toggleStatus(-1)).rejects.toThrow(
      TodoNotFoundError,
    );

    await jest.runAllTimersAsync();
    await checking;
  });
});

describe("Task 09: InMemoryRepository", () => {
  interface Entity {
    id: number;
    value: string;
  }
  let repo: InMemoryRepository<Entity>;

  beforeEach(() => {
    repo = new InMemoryRepository<Entity>();
    repo.add({ id: 1, value: "A" });
    repo.add({ id: 2, value: "B" });
  });

  it("add and findAll should work", () => {
    expect(repo.findAll().length).toBe(2);
  });

  it("findById should return correct entity", () => {
    const e = repo.findById(1);
    expect(e?.value).toBe("A");
  });

  it("findById should return undefined when not found", () => {
    expect(repo.findById(-1)).toBeUndefined();
  });

  it("update should patch entity", () => {
    repo.update(1, { value: "AA" });
    expect(repo.findById(1)?.value).toBe("AA");
  });

  it("update should throw error when not found", () => {
    expect(() => repo.update(-1, { value: "AA" })).toThrow("Not found");
  });

  it("remove should delete entity", () => {
    repo.remove(2);
    expect(repo.findById(2)).toBeUndefined();
  });

  it("remove should throw error when not found", () => {
    expect(() => repo.remove(-1)).toThrow("Not found");
  });
});
