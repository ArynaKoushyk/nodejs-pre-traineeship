import { ToDoManager } from "./todo-manager";

async function main(): Promise<void> {
  const [command = "list", argument, description] = process.argv.slice(2);

  const manager = new ToDoManager();
  await manager.init();

  switch (command) {
    case "list":
      break;

    case "add":
      if (!argument) {
        throw new Error('Usage: add "Title" "Optional description"');
      }

      await manager.add(argument, description);
      break;

    case "complete": {
      const id = Number(argument);
      if (!Number.isSafeInteger(id) || id < 1) {
        throw new Error("Usage: complete <id>");
      }

      await manager.complete(id);
      break;
    }

    default:
      throw new Error("Available commands: list, add, complete");
  }

  console.table(await manager.list());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
