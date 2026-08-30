import type { Task } from "@/types/task";

declare global {
  var globalTasksStore: Task[] | undefined;
}

const initialTasks: Task[] = [
  { id: 1, title: "Review Route Handlers", completed: false },
  { id: 2, title: "Build Tasks API", completed: false },
];

export const tasks = globalThis.globalTasksStore ?? initialTasks;

if (!globalThis.globalTasksStore) {
  globalThis.globalTasksStore = tasks;
}
