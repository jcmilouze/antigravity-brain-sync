interface Task { id: number; name: string; done: boolean }

/**
 * Sorts tasks alphabetically by name and returns only incomplete tasks.
 * @param tasks Array of Task objects
 * @returns Sorted and filtered array of Task
 */
export const taskManager = (tasks: Task[]): Task[] => {
  return tasks
    .filter((t) => !t.done) // keep only incomplete tasks
    .sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort
};
