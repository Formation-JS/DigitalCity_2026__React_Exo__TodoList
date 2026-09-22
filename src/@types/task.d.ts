export type TaskPriority = 'LOW' | 'NORMAL' | 'URGENT';

export type TaskData = {
    name: string;
    desc: string | null;
    priority: TaskPriority;
};

export type Task = TaskData & {
    id: string;
    isDone: boolean;
};

export type TaskSelectOption = { label: string, value: TaskPriority}[]