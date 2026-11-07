export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    this.items.push(entity);
    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new Error("Not found");
    }
    const updatedItem = { ...item, ...patch };
    this.items = this.items.map((i) => (i.id === id ? updatedItem : i));
    return updatedItem;
  }

  remove(id: number): void {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new Error("Not found");
    }

    this.items = this.items.filter((i) => i.id !== id);
  }

  findById(id: number): T | undefined {
    return this.items.find((i) => i.id === id);
  }

  findAll(): T[] {
    return [...this.items];
  }
}
