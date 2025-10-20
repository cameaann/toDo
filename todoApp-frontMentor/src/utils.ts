export type TStatus = "todo" | "in-progress" | "done";
export type TTask = { id: string; text: string; status: TStatus };
export const taskDataKey = Symbol("task");

export type TTaskData = { [taskDataKey]: true; taskId: TTask["id"] };

export function isTaskData(
  data: Record<string | symbol, unknown>
): data is TTaskData {
  return data[taskDataKey] === true;
}
